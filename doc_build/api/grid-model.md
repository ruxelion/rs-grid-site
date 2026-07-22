# GridModel API

## Definition

```rust
pub struct GridModel {
    pub columns: Vec<ColumnDef>,
    pub data: Box<dyn DataSource>,
    pub row_height: f64,
    pub header_height: f64,
    pub filter_row_height: f64,
    pub show_filter_row: bool,
    pub column_offsets: ColumnOffsets,
    pub patches: HashMap<(u64, String), String>,
    pub row_number_width: f64,
    pub sort_order: Vec<u64>,
    pub pinned_count: usize,
    pub filters: HashMap<String, FilterCondition>,
    pub value_filters: HashMap<String, HashSet<String>>,
    pub filtered_indices: Vec<u64>,
    pub mode: DataSourceMode,
    pub scrollbar_size: f64,
    pub editable: bool,
    pub selectable: bool,
    pub column_reorderable: bool,
    pub invalid_edit_mode: InvalidEditMode,
}
```

## Fields

| Field                | Type                               | Default      | Description                                                                                                                 |
| -------------------- | ---------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `columns`            | `Vec<ColumnDef>`                   | —            | Ordered column definitions                                                                                                  |
| `data`               | `Box<dyn DataSource>`              | —            | Backing data provider                                                                                                       |
| `row_height`         | `f64`                              | —            | Height of data rows (logical px)                                                                                            |
| `header_height`      | `f64`                              | —            | Height of header row (logical px)                                                                                           |
| `filter_row_height`  | `f64`                              | `36.0`       | Height of the floating filter row (logical px) — see [Filtering](/features/filtering.md)                                    |
| `show_filter_row`    | `bool`                             | `false`      | Show the floating filter row — a quick "contains" filter per column, and the only click path to the filter popup            |
| `column_offsets`     | `ColumnOffsets`                    | computed     | Precomputed left-edge offsets                                                                                               |
| `patches`            | `HashMap<(u64, String), String>`   | empty        | Cell value overrides                                                                                                        |
| `row_number_width`   | `f64`                              | auto         | Gutter width (auto from row count)                                                                                          |
| `sort_order`         | `Vec<u64>`                         | empty        | Display→physical row mapping                                                                                                |
| `pinned_count`       | `usize`                            | `0`          | Number of pinned leading columns                                                                                            |
| `filters`            | `HashMap<String, FilterCondition>` | empty        | Per-column filter conditions — see [Filtering](/features/filtering.md)                                                      |
| `value_filters`      | `HashMap<String, HashSet<String>>` | empty        | Per-column value-set restrictions (checklist filter), AND-combined with `filters` — see [Filtering](/features/filtering.md) |
| `filtered_indices`   | `Vec<u64>`                         | empty        | Filtered physical row indices — only meaningful when `is_filter_applied()` is `true`                                        |
| `mode`               | `DataSourceMode`                   | `ClientSide` | Client or server-side data                                                                                                  |
| `scrollbar_size`     | `f64`                              | `14.0`       | Scrollbar reserved space                                                                                                    |
| `editable`           | `bool`                             | `true`       | Global inline-edit toggle (per-column flag still applies)                                                                   |
| `selectable`         | `bool`                             | `true`       | Global selection toggle; clears selection when set to `false`                                                               |
| `column_reorderable` | `bool`                             | `true`       | Allow header drag-to-reorder. `MoveColumn` works regardless                                                                 |
| `invalid_edit_mode`  | `InvalidEditMode`                  | `Revert`     | Policy applied when a `CommitEdit` fails validation — see [Validation](/features/validation.md)                             |

## Constructors

```rust
// In-memory data
pub fn new(columns: Vec<ColumnDef>, rows: Vec<RowRecord>, row_height: f64, header_height: f64) -> Self

// Custom data source
pub fn with_data_source(columns: Vec<ColumnDef>, data: Box<dyn DataSource>, row_height: f64, header_height: f64) -> Self
```

## Methods

| Method                        | Signature                                        | Description                                                                                                                              |
| ----------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `get_cell`                    | `(row: u64, col_key: &str) -> Option<String>`    | Read cell (patches first, then data source)                                                                                              |
| `set_cell`                    | `(row: u64, col_key: &str, value: String)`       | Write cell to data source                                                                                                                |
| `logical_to_physical`         | `(logical: u64) -> u64`                          | Map display row to data row                                                                                                              |
| `display_row_count`           | `() -> u64`                                      | Visible row count (respects filters)                                                                                                     |
| `total_width`                 | `() -> f64`                                      | Sum of column widths                                                                                                                     |
| `total_height`                | `() -> f64`                                      | `row_count × row_height + data_top()`                                                                                                    |
| `pinned_width`                | `() -> f64`                                      | Total width of pinned columns                                                                                                            |
| `compute_row_number_width`    | `(row_count: u64) -> f64`                        | Auto-compute gutter width                                                                                                                |
| `effective_header_height`     | `() -> f64`                                      | `header_height` (`0` if `show_header` is `false`)                                                                                        |
| `effective_filter_row_height` | `() -> f64`                                      | `filter_row_height` (`0` if `show_filter_row` is `false`)                                                                                |
| `data_top`                    | `() -> f64`                                      | `effective_header_height() + effective_filter_row_height()` — where scrollable data starts                                               |
| `column_screen_x`             | `(col_idx: usize, scroll_x: f64) -> Option<f64>` | On-screen X of a column's left edge, pinned-aware                                                                                        |
| `is_filter_applied`           | `() -> bool`                                     | Whether `filtered_indices` should be trusted as-is, including when empty (zero rows match) — vs. being empty because no filter is active |
| `unique_values`               | `(col_key: &str, cap: usize) -> UniqueValues`    | Distinct values for a column (sorted), up to `cap` — backs the checklist filter UI                                                       |

## GridModelBuilder

An ergonomic builder for constructing a `GridModel` with sensible defaults:

```rust
pub struct GridModelBuilder { /* ... */ }

impl GridModelBuilder {
    pub fn new(
        columns: Vec<ColumnDef>,
        data: Box<dyn DataSource>,
    ) -> Self;

    pub fn row_height(self, h: f64) -> Self;       // default 30.0
    pub fn header_height(self, h: f64) -> Self;     // default 40.0
    pub fn filter_row_height(self, h: f64) -> Self; // default 36.0
    pub fn show_filter_row(self, v: bool) -> Self;  // default false
    pub fn pinned_count(self, n: usize) -> Self;    // default 0
    pub fn mode(self, m: DataSourceMode) -> Self;   // default ClientSide
    pub fn scrollbar_size(self, s: f64) -> Self;    // default 14.0
    pub fn editable(self, v: bool) -> Self;         // default true
    pub fn selectable(self, v: bool) -> Self;       // default true
    pub fn column_reorderable(self, v: bool) -> Self; // default true
    pub fn invalid_edit_mode(self, m: InvalidEditMode) -> Self; // default Revert
    pub fn build(self) -> GridModel;
}
```

### Example

```rust
let model = GridModelBuilder::new(columns, Box::new(data))
    .row_height(40.0)
    .pinned_count(2)
    .build();
```

`pinned_count` is clamped to the number of columns if it exceeds `columns.len()`.

The existing constructors `GridModel::new()` and `GridModel::with_data_source()` remain available.

## DataSourceMode

```rust
pub enum DataSourceMode {
    ClientSide,  // sort/filter done locally (default)
    ServerSide,  // sort/filter delegated to server
}
```

## InvalidEditMode

```rust
pub enum InvalidEditMode {
    Revert,  // drop the edit session, revert the cell (default)
    Block,   // keep the edit session open with the error attached
}
```

Toggle at runtime with `GridCommand::SetInvalidEditMode`. See
[Validation](/features/validation.md) for the full behaviour.
