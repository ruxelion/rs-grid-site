# Editing

## Overview

rs-grid supports inline cell editing. Double-click a cell (or press Enter on
a selected cell) to start editing. The web layer overlays a DOM input element
over the canvas cell.

## Editing lifecycle

```
StartEdit → user types → CommitEdit (Enter) or CancelEdit (Escape)
```

### Start editing

```rust
state.apply(GridCommand::StartEdit {
    row: 5,
    col_key: "name".into(),
});
```

The grid stores the current cell value in an `EditCell` snapshot so it can
be restored on cancel.

### Commit

```rust
state.apply(GridCommand::CommitEdit {
    row: 5,
    col_key: "name".into(),
    value: "New Value".into(),
});
```

The new value is written to the data source (or the patches layer for
read-only sources). The edit is recorded in the undo history.

### Cancel

```rust
state.apply(GridCommand::CancelEdit);
```

Restores the original value. No undo entry is created.

## Cell editors

The editor type is controlled by `ColumnDef::editor`:

### Text input

When `editor` is `Some(CellEditor::Text)`, a plain `<input type="text">` is shown:

```rust
col.editor = Some(CellEditor::Text);
```

### No editor (`None`)

When `editor` is `None` (the default for a new column), double-clicking the cell
dispatches `CancelEdit` and shows no DOM overlay. To enable plain-text editing on
a column, set `editor` explicitly:

```rust
col.editor = Some(CellEditor::Text);
```

### Select dropdown

For fixed-choice columns, use `CellEditor::Select`:

```rust
col.editor = Some(CellEditor::Select {
    options: vec![
        SelectOption {
            value: "active".into(),
            label: "Active".into(),
            icon: None,
        },
        SelectOption {
            value: "inactive".into(),
            label: "Inactive".into(),
            icon: None,
        },
    ],
});
```

Each `SelectOption` has:

- `value` — stored in the cell on commit
- `label` — displayed in the dropdown
- `icon` — optional icon URL shown left of the label

## Undo support

Cell edits are automatically recorded in the undo history. Press **Ctrl+Z**
to undo or **Ctrl+Y** to redo. See [Undo & Redo](/features/undo-redo.md) for details.

## Editing with read-only data sources

Even `FnDataSource` (which has no `set_cell`) supports editing — the new value
is stored in `GridModel::patches`, which overrides the data source for that cell.

## Per-cell editability

`ColumnDef::editable` locks an entire column. For finer control — locking
individual cells based on row data — set a dynamic predicate with
`.editable_when(...)`:

```rust
use rs_grid_core::column::ColumnDef;

let notes = ColumnDef::new("notes", "Notes", 160.0).editable_when(
    |row, model| model.get_cell(row, "status").as_deref() != Some("locked"),
);
```

The predicate receives the row index and the full [`GridModel`](/api/grid-model.md),
so it can read _any_ column's value for that row — not just its own — to
decide whether a cell is editable. This mirrors AG Grid's
`colDef.editable` callback.

Checked only when the static `editable` flag is `true` — if a column is
statically read-only, the predicate is never called:

```
StartEdit → editable == false?  → blocked, predicate not evaluated
          → editable == true    → editable_when(row, model)?
```

When a cell resolves to non-editable, `rs-grid-web` shows a `not-allowed`
cursor on hover and renders the cell with a themed locked-cell background
and text color (`Theme::locked_cell_bg` / `Theme::locked_cell_text`, CSS
variables `--rs-grid-locked-cell-bg` / `--rs-grid-locked-cell-text` — see
[Theming](/theming/css-variables.md)).

See [EditablePredicate](/api/column-def.md#editablepredicate) for the full
type reference.

## Validation

`CommitEdit` (and the live `ValidateEdit` command fired on every keystroke)
run through per-column validation before the value is accepted. See
[Validation](/features/validation.md) for declarative rules, the
revert-or-block policy, and live feedback UI hooks.
