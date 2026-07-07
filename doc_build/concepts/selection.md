# Selection

rs-grid uses an anchor/focus selection model. The anchor is where the selection
started; the focus is where it currently ends. Shift-click extends the
selection from the anchor to a new focus.

## SelectionState

`SelectionState` tracks two positions:

| Field    | Description                                           |
| -------- | ----------------------------------------------------- |
| `anchor` | Origin of the selection (set on mousedown)            |
| `focus`  | Current end of the selection (updated on shift-click) |

Each position can refer to a **cell**, a **row**, or a **column**. Mixed
granularity (anchor on a cell, focus on a row) is not supported.

## Commands

```rust
// Select a single cell
grid_state.apply(GridCommand::SelectCell { row: 0, col: 2 });

// Extend selection (shift-click equivalent)
grid_state.apply(GridCommand::ExtendSelection { row: 5, col: 2 });

// Select an entire row
grid_state.apply(GridCommand::SelectRow { row: 3 });

// Select an entire column
grid_state.apply(GridCommand::SelectColumn { col: 1 });

// Clear selection
grid_state.apply(GridCommand::ClearSelection);
```

## Hit-testing

Given a pixel coordinate `(x, y)` relative to the canvas, hit-testing returns
the cell under the cursor:

```rust
let hit = grid_state.hit_test(x, y);
// Returns Option<HitResult> with { row: u64, col: usize }
```

Hit-testing uses the same precomputed column offset array as the viewport,
giving **O(log n)** performance. Row hit-testing is O(1) with uniform row
height.

:::warning
Never introduce an O(n) scan in the hit-testing path. The O(log n) guarantee
is a core invariant.
:::

## Rendering the selection

`SceneBuilder` reads `SelectionState` and emits `ScenePrimitive::Rect` entries
with the selection highlight color for every selected cell in the viewport.

:::tip
Even with a full-grid selection (all rows x all columns), only the primitives
for visible cells are built. The scene size is bounded by the viewport, not
the selection size.
:::

## Row-selection checkbox column

Separate from the anchor/focus selection above, rs-grid supports an opt-in
row-selection checkbox column, with a per-row checkbox and a tri-state
header checkbox ("select all"). Unlike the row-number gutter, it is not a
fixed/pinned band — it's the first column of the scrollable region, so it
scrolls away with the data on horizontal scroll, just like a regular
column.

```rust
let model = GridModelBuilder::new(columns, data)
    .row_selection_checkboxes(true)
    .build();
```

Checked state is tracked separately from `SelectionState`, by **physical**
row id (not display position), so it survives sorting and filtering:

```rust
// Toggle a single row (by logical/display index)
grid_state.apply(GridCommand::ToggleRowChecked(3));

// Toggle the header checkbox — checks or unchecks every row
// currently passing the active filter (or every row, if unfiltered)
grid_state.apply(GridCommand::ToggleAllFilteredChecked);

// Show/hide the column at runtime
grid_state.apply(GridCommand::SetShowCheckboxColumn(true));
```

`CheckboxTriState` (`Checked` / `Unchecked` / `Indeterminate`) describes the
header checkbox's state — `Indeterminate` when some but not all rows in
scope are checked. Clicking an indeterminate header checks every row in
scope rather than unchecking them.

On `GridCanvas` (the browser integration):

| Method                            | Description                              |
| --------------------------------- | ---------------------------------------- |
| `checked_row_indices()`           | Physical row ids currently checked       |
| `checkbox_header_state()`         | Current `CheckboxTriState` of the header |
| `set_show_checkbox_column(bool)`  | Show/hide the column                     |
| `set_on_checked_rows_changed(cb)` | Callback fired after any checkbox toggle |

:::tip
"Select all" only affects rows passing the active filter, not the entire
dataset — checking rows hidden by a filter would be surprising for a
subsequent bulk action (matches the convention used by most data-grid
libraries).
:::
