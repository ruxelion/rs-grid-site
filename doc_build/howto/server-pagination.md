# 

***

title: How-To: Server-side Pagination
description: Fetch large datasets from a server using PageCacheDataSource and FetchConfig.
------------------------------------------------------------------------------------------

This guide shows how to connect rs-grid to a REST API that paginates data
server-side. The grid fetches pages on demand and shows skeleton cells while
loading.

## Prerequisites

Add the web crate to your `Cargo.toml`:

```toml
rs-grid-web  = { git = "https://github.com/ruxelion/rs-grid", tag = "rs-grid-core-v0.1.3" }
```

## 1. Build a GridModel in server-side mode

```rust
use rs_grid_core::{
    column::ColumnDef,
    model::{GridModel, DataSourceMode},
};
use rs_grid_web::canvas::fetcher::PageCacheDataSource;

let columns = vec![
    ColumnDef::new("id",   "ID",    60.0),
    ColumnDef::new("name", "Name", 200.0),
    ColumnDef::new("email","Email",250.0),
];

// Placeholder — actual count will be updated after the first fetch
let page_cache = PageCacheDataSource::new(0, columns.len());

let mut model = GridModel::with_data_source(
    columns,
    Box::new(page_cache.clone()),
    32.0,
    40.0,
);
model.mode = DataSourceMode::ServerSide;
```

## 2. Mount the grid and enable async fetch

```rust
use rs_grid_web::canvas::fetcher::{FetchConfig, PageFetchRequest, PageFetchResponse};
use rs_grid_core::row::RowRecord;

view! {
    <GridCanvas
        model=model
        width="100%"
        height="600px"
        on_mount=Box::new(move |canvas| {
            canvas.enable_async_fetch(
                page_cache,
                FetchConfig {
                    build_url: Box::new(|req: &PageFetchRequest| {
                        format!(
                            "/api/users?page={}&size={}&sort={}&dir={}",
                            req.page_num,
                            req.page_size,
                            req.sort.as_ref().map(|s| s.col_key.as_str()).unwrap_or(""),
                            req.sort.as_ref().map(|s| format!("{:?}", s.dir)).unwrap_or_default(),
                        )
                    }),
                    parse_response: Box::new(|js_val| {
                        // Deserialize the JSON response from your API
                        let obj = js_val.dyn_into::<js_sys::Object>()
                            .map_err(|_| "Not an object".to_string())?;
                        let total = js_sys::Reflect::get(&obj, &"total".into())
                            .ok()
                            .and_then(|v| v.as_f64())
                            .unwrap_or(0.0) as u64;
                        let items_val = js_sys::Reflect::get(&obj, &"items".into())
                            .map_err(|_| "No items field".to_string())?;
                        let items = js_sys::Array::from(&items_val);
                        let rows: Vec<RowRecord> = (0..items.length())
                            .filter_map(|i| {
                                let item = items.get(i).dyn_into::<js_sys::Object>().ok()?;
                                let mut r = RowRecord::new(i as u64);
                                for key in ["id", "name", "email"] {
                                    let val = js_sys::Reflect::get(&item, &key.into())
                                        .ok()
                                        .and_then(|v| v.as_string())
                                        .unwrap_or_default();
                                    r.set(key, val);
                                }
                                Some(r)
                            })
                            .collect();
                        Ok(PageFetchResponse { rows, total_rows: total })
                    }),
                    buffer_pages: 2,
                },
            );
        })
    />
}
```

## 3. Expected API response shape

```json
{
  "total": 50000,
  "items": [
    { "id": "1", "name": "Alice", "email": "alice@example.com" },
    { "id": "2", "name": "Bob",   "email": "bob@example.com" }
  ]
}
```

## How it works

- The grid calculates which rows are in the viewport.
- For each unseen page, it calls `build_url` and fetches it.
- While a page loads, affected cells show `CellStatus::Loading` (skeleton).
- When the response arrives, `parse_response` converts it to `PageFetchResponse`.
- The grid calls `GridCommand::SetTotalRowCount` (keeps the row-number
  gutter sized to the real total — see [PageCache data source](/data/page-cache.md))
  then `GridCommand::NotifyPageLoaded` internally, and re-renders.

## Sorting and filtering server-side

When `model.mode = DataSourceMode::ServerSide`, sort and filter commands
(`ToggleSort`, `SetColumnFilter`, etc.) update `GridState` but do **not**
reorder rows locally. Your `build_url` receives the current sort and filters
via `PageFetchRequest`:

```rust
build_url: Box::new(|req: &PageFetchRequest| {
    let mut url = format!("/api/users?page={}&size={}", req.page_num, req.page_size);
    if let Some(sort) = &req.sort {
        url += &format!("&sort={}&dir={:?}", sort.col_key, sort.dir);
    }
    for (col_key, condition) in &req.filters {
        url += &format!(
            "&filter[{}][op]={:?}&filter[{}][value]={}",
            col_key, condition.op, col_key, condition.value
        );
    }
    url
}),
```

## Related

- [PageCache data source](/data/page-cache.md)
- [DataSource API](/api/datasource.md)
- [Callbacks & Persistence](/features/callbacks.md)
