# GridCommand API

## Definition

```rust
#[non_exhaustive]
pub enum GridCommand { /* 44 variants */ }
```

All mutations to `GridState` go through `state.apply(GridCommand)`.

## All variants

### Selection

```rust
SelectCell(CellCoord)
ExtendSelection(CellCoord)
ClearSelection
MoveSelection { delta_row: i64, delta_col: i64, extend: bool }
SelectRow(u64)
ExtendRowSelection(u64)
SelectCol(usize)
ExtendColSelection(usize)
```

### Scrolling & Viewport

```rust
ScrollTo { x: f64, y: f64 }
ScrollBy { dx: f64, dy: f64 }
Resize { width: f64, height: f64 }
```

### Columns

```rust
ResizeColumn { col_idx: usize, new_width: f64 }
CommitColumnResize { col_idx: usize, old_width: f64, old_flex: Option<f64> }
AutoFitColumn {
    col_idx: usize, char_width: f64,
    header_char_width: f64, cell_padding: f64, header_right_reserve: f64,
}
AutoFitAllColumns {
    char_width: f64, header_char_width: f64,
    cell_padding: f64, header_right_reserve: f64,
}
MoveColumn { from_idx: usize, to_idx: usize }
SetPinnedColumnCount { count: usize }
```

:::note
`CommitColumnResize` records the old size for undo history. For programmatic
resizing use `ResizeColumn` directly.
:::

### Sorting & Filtering

```rust
ToggleSort { col_key: String }               // cycles asc → desc → off
SetSort { col_key: String, dir: SortDir }    // explicit direction
ClearSort
SetColumnFilter { col_key: String, text: String }
ClearAllFilters
```

### Editing

```rust
StartEdit { row: u64, col_key: String }
ValidateEdit { value: String }
CommitEdit { row: u64, col_key: String, value: String }
CancelEdit
SetInvalidEditMode(InvalidEditMode)
ClearCells   // Delete/Backspace — clears selected cells, no clipboard
```

:::note
`ValidateEdit` re-checks the in-progress edit's pending value **without
committing** — a no-op without an active edit, and it creates no undo entry.
`rs-grid-web` dispatches it on every keystroke for live feedback. See
[Validation](/features/validation.md) for `ValidationRule` and
`InvalidEditMode`.
:::

### Clipboard

```rust
CopySelection
CutSelection
PasteAt { text: String }
```

### Search

```rust
Search { query: String }
SearchNext
SearchPrev
ClearSearch
```

### Undo / Redo

```rust
Undo
Redo
```

### Display

```rust
SetHeaderHeight(f64)
SetRowHeight(f64)
SetShowHeader(bool)
SetShowRowNumbers(bool)
SetHoveredRow(Option<u64>)
```

### Server-side data

```rust
NotifyPageLoaded       // signal that a page fetch completed
SetTotalRowCount(u64)  // update total row count in server-side mode
```

### Behaviour toggles

```rust
SetEditable(bool)          // global inline-edit on/off
SetSelectable(bool)        // global selection on/off (clears selection when false)
SetColumnReorderable(bool) // header drag-to-reorder on/off (MoveColumn unaffected)
```

## CommandOutput

```rust
#[non_exhaustive]
pub enum CommandOutput {
    None,
    CopyText(String),
    CopyError(CopyError),
    ValidationError { row: u64, col_key: String, message: String },
    PasteApplied { cells: Vec<CellCoord> },
    CellsCleared { cells: Vec<CellCoord> },
}

#[non_exhaustive]
pub enum CopyError {
    NoSelection,
    TooManyRows,
}
```

| Command                 | Output                                                                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `CopySelection`         | `CopyText(tsv)` or `CopyError`                                                                                               |
| `CutSelection`          | `CopyText(tsv)` or `CopyError`                                                                                               |
| `CommitEdit` (rejected) | `ValidationError { row, col_key, message }` — fires for both `InvalidEditMode::Revert` and `::Block`                         |
| `PasteAt`               | `PasteApplied { cells }` — coordinates actually written, a subset of the target rectangle (locked/invalid cells are skipped) |
| `ClearCells`            | `CellsCleared { cells }` — coordinates actually cleared, a subset of the selection; not emitted if nothing was cleared       |
| All others              | `None`                                                                                                                       |

`PasteApplied`/`CellsCleared`'s `cells` is what `rs-grid-web` passes to its
success-flash animation, instead of the full selection/target rectangle —
see [Selection & Clipboard](/features/selection-clipboard.md).
