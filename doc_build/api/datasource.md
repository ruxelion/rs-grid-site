# DataSource API

## DataSource trait

All row data in rs-grid is accessed through a common trait:

```rust
pub trait DataSource: Debug {
    fn row_count(&self) -> u64;
    fn get_cell(&self, row: u64, col_key: &str) -> Option<String>;
    fn get_cell_ref(&self, row: u64, col_key: &str) -> Option<Cow<'_, str>>;
    fn clone_box(&self) -> Option<Box<dyn DataSource>>;

    // Optional — provided implementations do nothing / return Ready
    fn set_cell(&mut self, row: u64, col_key: &str, value: String) {}
    fn cell_status(&self, row: u64, col_key: &str) -> CellStatus {
        CellStatus::Ready(self.get_cell(row, col_key).unwrap_or_default())
    }
}
```

See [Data Sources Overview](/data/overview.md) for the full explanation and
[VecDataSource](/data/vec-datasource.md), [FnDataSource](/data/fn-datasource.md),
[PageCache](/data/page-cache.md) for built-in implementations.

## CellStatus

```rust
#[non_exhaustive]
pub enum CellStatus {
    Ready(String),  // value available — render it
    Loading,        // async page not yet fetched — render a skeleton
    Absent,         // fetched but no value — render empty
}
```

`VecDataSource` and `FnDataSource` always return `Ready` or `Absent`.
`PageCacheDataSource` returns `Loading` while the page is being fetched.

## DataSourceMode

```rust
#[non_exhaustive]
pub enum DataSourceMode {
    ClientSide,  // default — sort and filter run in the browser
    ServerSide,  // sort/filter are no-ops; server owns them
}
```

Set via `model.mode = DataSourceMode::ServerSide`.

## RowRecord

Used internally by `VecDataSource`:

```rust
pub struct RowRecord {
    pub id: u64,
    pub cells: HashMap<String, CellValue>,
}

impl RowRecord {
    pub fn new(id: u64) -> Self;
    pub fn set(&mut self, key: impl Into<String>, value: impl Into<String>) -> &mut Self;
    pub fn get(&self, key: &str) -> Option<&str>;
}
```

## storage module

Browser `localStorage` helpers from `rs_grid_web::storage`:

```rust
pub fn get_item(key: &str) -> Option<String>;
pub fn set_item(key: &str, value: &str) -> Result<(), String>;
pub fn remove_item(key: &str) -> Result<(), String>;
```

Typical use — persist column widths on change:

```rust
use rs_grid_web::storage;

canvas.set_on_columns_changed(move || {
    let widths = canvas.column_widths();
    let json = serde_json::to_string(&widths).unwrap_or_default();
    let _ = storage::set_item("my-grid-columns", &json);
});
```

Restore on mount:

```rust
on_mount=Box::new(move |canvas| {
    if let Some(json) = storage::get_item("my-grid-columns") {
        if let Ok(widths) = serde_json::from_str::<Vec<(String, f64)>>(&json) {
            for (col_key, width) in widths {
                canvas.apply(GridCommand::ResizeColumn {
                    col_idx: canvas.column_order()
                        .iter()
                        .position(|k| k == &col_key)
                        .unwrap_or(0),
                    new_width: width,
                });
            }
        }
    }
})
```
