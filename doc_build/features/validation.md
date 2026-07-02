# Validation

## Overview

rs-grid validates a cell edit **before** it is committed. Validation runs in
two layers, checked in order:

1. **Declarative rules** (`ColumnDef::rules: Vec<ValidationRule>`) — the
   recommended way to validate. Built-in rules cover the common cases
   (`Required`, `MinLength`, `MaxLength`, `Range`, `OneOf`), plus a `Custom`
   escape hatch.
2. **Legacy validator** (`ColumnDef::validator: Option<CellValidator>`) — a
   free-form closure, still supported for backward compatibility. It only
   runs once every rule has passed.

```
StartEdit → user types → ValidateEdit (every keystroke, live) → CommitEdit
  → rules (in order) → legacy validator (if any)
      Ok(())   → patch written → on_change()
      Err(msg) → InvalidEditMode decides what happens next
```

Validation is enforced inside `GridState::apply`, not just at the UI layer —
so it holds for every consumer (native tests, the canvas renderer, any
future custom renderer). It's also checked outside an edit session: pasting
skips invalid target cells (see _Paste validation_ below), and the canvas
renderer flags any cell whose current value fails validation even when it's
never been edited (see _At-rest indicator_ below).

## Adding rules

Builder sugar on `ColumnDef` covers the common cases:

```rust
use rs_grid_core::column::ColumnDef;

let name = ColumnDef::new("name", "Name", 160.0).required();

let bio = ColumnDef::new("bio", "Bio", 240.0)
    .with_min_length(10)
    .with_max_length(500);

let age = ColumnDef::new("age", "Age", 80.0).with_range(0.0, 130.0);

let status = ColumnDef::new("status", "Status", 120.0)
    .with_allowed_values(vec!["active".into(), "inactive".into()]);
```

Or set the full list at once with `ValidationRule` directly, e.g. for a
`Custom` rule:

```rust
use rs_grid_core::{
    column::ColumnDef,
    validation::ValidationRule,
};

let sku = ColumnDef::new("sku", "SKU", 120.0).with_rules(vec![
    ValidationRule::required(),
    ValidationRule::Custom(CellValidator::new(|v| {
        v.starts_with("SKU-")
            .then_some(())
            .ok_or_else(|| "Must start with SKU-".to_string())
    })),
]);
```

`ValidationRule` variants:

| Variant                 | Rejects when                                                  |
| ----------------------- | ------------------------------------------------------------- |
| `Required`              | Value is empty                                                |
| `MinLength(usize)`      | Fewer characters than the minimum                             |
| `MaxLength(usize)`      | More characters than the maximum                              |
| `Range(f64, f64)`       | Value doesn't parse as a number, or falls outside `min..=max` |
| `OneOf(Vec<String>)`    | Value isn't one of the allowed strings                        |
| `Custom(CellValidator)` | The wrapped closure returns `Err`                             |

Rules run **in order, first failure wins**. Once all rules pass, the legacy
`validator` (if set) still runs:

```rust
pub fn validate_value(&self, value: &str) -> Result<(), String>
```

## Revert or block: `InvalidEditMode`

`GridModel::invalid_edit_mode` (default `Revert`) controls what happens when
`CommitEdit` fails validation:

| Mode               | Behaviour                                                                                                             |
| ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `Revert` (default) | The edit session ends and the cell reverts to its previous value — same as before validation existed.                 |
| `Block`            | The edit session **stays open** with the error attached, so the user can fix the value in place instead of losing it. |

Set it at build time:

```rust
use rs_grid_core::{GridModelBuilder, validation::InvalidEditMode};

let model = GridModelBuilder::new(columns, Box::new(data))
    .invalid_edit_mode(InvalidEditMode::Block)
    .build();
```

or toggle it at runtime with `GridCommand::SetInvalidEditMode(mode)`.

Both modes emit `CommandOutput::ValidationError { row, col_key, message }`.

## Live feedback while typing

`GridCommand::ValidateEdit { value }` re-checks the in-progress edit's
pending value **without committing** — it's a no-op without an active edit
and creates no undo entry. `rs-grid-web` dispatches it automatically on every
keystroke, so the in-progress edit always reflects the current validation
state, not just the last commit attempt.

Read the live state on demand:

```rust
pub fn validation_error(&self) -> Option<(u64, String, String)>
```

`Some((row, col_key, message))` while the in-progress edit is invalid,
`None` otherwise.

## Listening to validation

There are two callbacks — pick based on when you need to react:

| Callback                      | Fires                                                                                      | Use it for                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `on_validation_state_changed` | Every `StartEdit` / `ValidateEdit` / `CommitEdit` / `CancelEdit` — i.e. on every keystroke | A live, custom validation UI (tooltip, banner, icon) that tracks the value as the user types |
| `on_validation_error`         | Only when a `CommitEdit` is rejected                                                       | A one-shot notification (toast, log) when a save attempt fails                               |


**[object Object]**

```rust
let validation_state = RwSignal::new(None::<(u64, String, String)>);

view! {
    <GridCanvas
        model=model
        on_validation_state_changed=Some(Box::new(move |state| {
            validation_state.set(state);
        }))
        on_validation_error=Some(Box::new(move |_row, col, msg| {
            log::warn!("[{col}] rejected: {msg}");
        }))
    />
}
```


**[object Object]**

```rust
gc.set_on_validation_state_changed(move |state| {
    match state {
        Some((row, col_key, message)) => show_my_tooltip(row, &col_key, &message),
        None => hide_my_tooltip(),
    }
});

gc.set_on_validation_error(|row, col_key, message| {
    web_sys::console::warn_1(
        &format!("[{col_key}] row {row}: {message}").into()
    );
});
```


**[object Object]**

```rust
rsx! {
    GridCanvas {
        model: model_slot,
        on_validation_state_changed: move |state: Option<(u64, String, String)>| {
            validation_state.set(state);
        },
        on_validation_error: move |(_, col, msg): (u64, String, String)| {
            error.set(format!("[{col}] {msg}"));
        },
    }
}
```


**[object Object]**

```rust
use rs_grid_yew::{GridCanvas, ValidationStateChangedCb};

let vsc_cb: ValidationStateChangedCb = Rc::new(|state| {
    validation_state.set(state);
});

html! {
    <GridCanvas model={model}
        on_validation_state_changed={Some(vsc_cb)} />
}
```


rs-grid does not impose a validation-error widget (no built-in tooltip
component) — it exposes the raw state so you can build one with your own
framework/CSS.

## Positioning a custom validation UI

`GridCanvas::cell_client_rect(row, col_key)` returns the cell's client-space
rectangle `(left, top, width, height)` in CSS pixels relative to the page —
ready to position a `position: fixed` tooltip or banner next to the failing
cell:

```rust
if let Some((row, col_key, message)) = canvas.validation_error() {
    if let Some((left, top, _w, height)) = canvas.cell_client_rect(row, &col_key) {
        show_tooltip(left, top + height + 4.0, &message); // just below the cell
    }
}
```

Returns `None` if `col_key` doesn't exist. It's geometry only — it doesn't
check whether the cell is currently scrolled into view.

## At-rest indicator

A cell can be invalid without ever being edited — e.g. loaded that way from
the data source. The canvas renderer checks every visible cell's current
value against `ColumnDef::validate_value` and, on failure, draws a themed
border (`Theme::invalid_cell_border` / `--rs-grid-invalid-cell-border`)
around it — no click or edit session required. This is separate from (and
doesn't wait for) the inline editor's invalid style described above; it
fires purely from the cell's current value.

Transparent `invalid_cell_border` (alpha `0`) disables the indicator
entirely, same convention as `locked_cell_bg`.

## Hover tooltip for invalid cells

Hovering an at-rest-invalid cell shows a tooltip — a single DOM element
reused across every cell (not one per invalid cell, so the cost is the same
whether one cell or thousands are invalid), positioned automatically over
the hovered cell. rs-grid renders no visual of its own for it: the class is
entirely yours, so you can reproduce daisyUI's tooltip directly:

```rust
canvas.set_validation_tooltip_class(Some(
    "tooltip tooltip-open tooltip-error".into(),
));
```

`tooltip-open` (or an equivalent always-open modifier) is required — this
element never receives a real `:hover` from the mouse (it sits on top of
the canvas with `pointer-events: none`), so rs-grid opens/closes it itself
via its own `display` toggle rather than relying on CSS `:hover`. Without a
class set, the tooltip element exists but is invisible.

The validation message itself is exposed as the standard `data-tip`
attribute, which daisyUI (and any CSS using `content: attr(data-tip)`)
reads directly — you never need to duplicate the message text yourself.

To check a cell's at-rest validity outside of hovering (e.g. for a custom
indicator), use `canvas.cell_validation_error(row, col_key) ->
Option<String>` — independent of any active edit session, unlike
`validation_error()` above.

## Paste validation

`GridCommand::PasteAt` validates each target cell's incoming value before
writing it — a cell whose pasted value fails validation is silently skipped
(the write doesn't happen), while the rest of the pasted block still
applies. This mirrors how Excel and AG Grid handle the same case: neither
blocks a paste outright, and when a rejection exists it's always per-cell,
never all-or-nothing.

`GridCommand::CutSelection` clears cells by writing an empty string — still
a write, so it's validated the same way: a cell whose rules reject an empty
value (e.g. `.required()`) keeps its original value instead of being
cleared. The copied text on the clipboard is unaffected either way — cut
always copies the full original values first.

## Native `title` tooltip fallback

By default, the inline edit `<input>` gets a native `title` attribute
reflecting the current validation message — a zero-config browser tooltip
that needs no integration work. Disable it once you wire up a custom UI, so
the two don't compete:

```rust
canvas.set_native_validation_tooltip(false);
```

## Behaviour

- Validation runs on user edits (`CommitEdit` / `ValidateEdit`) and on
  `PasteAt` (see _Paste validation_ above). Direct programmatic writes via
  `GridModel::set_cell` still bypass it — that's the lowest-level API and
  intentionally has no validation layer of its own.
- `Select` editors are validated too — the selected option's value is
  checked like any other.
- Rules and the legacy validator are **synchronous**. For async validation
  (e.g. a server check), commit optimistically and revert with
  `GridCommand::Undo` if the check fails server-side.
- `Revert` mode creates no undo entry; `Block` mode doesn't either, since
  the edit session never closes on failure.

## See also

- [Editing](/features/editing.md) — editing lifecycle and editor types
- [ColumnDef API](/api/column-def.md) — `ValidationRule` / `CellValidator` type reference
- [GridCommand API](/api/grid-command.md) — `ValidateEdit`, `SetInvalidEditMode`
- [Undo / Redo](/features/undo-redo.md) — undo stack behaviour
