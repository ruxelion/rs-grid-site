# Guide : Pagination côté serveur

Ce guide montre comment connecter rs-grid à une API REST qui pagine les données
côté serveur. La grille charge les pages à la demande et affiche des cellules
squelettes pendant le chargement.

## Prérequis

Ajouter la crate web dans `Cargo.toml` :

```toml
rs-grid-web  = { git = "https://github.com/ruxelion/rs-grid", tag = "rs-grid-core-v0.1.3" }
```

## 1. Construire un GridModel en mode serveur

```rust
use rs_grid_core::{
    column::ColumnDef,
    model::{GridModel, DataSourceMode},
};
use rs_grid_web::canvas::fetcher::PageCacheDataSource;

let columns = vec![
    ColumnDef::new("id",   "ID",    60.0),
    ColumnDef::new("name", "Nom",  200.0),
    ColumnDef::new("email","Email",250.0),
];

// Valeur provisoire — mise à jour après la première requête
let page_cache = PageCacheDataSource::new(0, columns.len());

let mut model = GridModel::with_data_source(
    columns,
    Box::new(page_cache.clone()),
    32.0,
    40.0,
);
model.mode = DataSourceMode::ServerSide;
```

## 2. Monter la grille et activer le chargement asynchrone

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
                            "/api/users?page={}&size={}",
                            req.page_num, req.page_size
                        )
                    }),
                    parse_response: Box::new(|js_val| {
                        // Désérialiser la réponse JSON de votre API
                        let obj = js_val.dyn_into::<js_sys::Object>()
                            .map_err(|_| "Pas un objet".to_string())?;
                        let total = js_sys::Reflect::get(&obj, &"total".into())
                            .ok()
                            .and_then(|v| v.as_f64())
                            .unwrap_or(0.0) as u64;
                        let items_val = js_sys::Reflect::get(&obj, &"items".into())
                            .map_err(|_| "Champ items absent".to_string())?;
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

## 3. Format de réponse attendu

```json
{
  "total": 50000,
  "items": [
    { "id": "1", "name": "Alice", "email": "alice@example.com" },
    { "id": "2", "name": "Bob",   "email": "bob@example.com" }
  ]
}
```

## Fonctionnement

- La grille calcule quelles lignes sont dans le viewport.
- Pour chaque page non vue, elle appelle `build_url` et la charge.
- Pendant le chargement, les cellules affichent `CellStatus::Loading` (squelette).
- À l'arrivée de la réponse, `parse_response` la convertit en `PageFetchResponse`.
- La grille appelle `GridCommand::NotifyPageLoaded` en interne et se re-rend.

## Tri et filtrage côté serveur

En mode `ServerSide`, les commandes de tri et de filtrage mettent à jour
`GridState` mais ne réordonnent **pas** les lignes localement. Votre `build_url`
reçoit le tri et les filtres actuels via `PageFetchRequest` :

```rust
build_url: Box::new(|req: &PageFetchRequest| {
    let mut url = format!("/api/users?page={}&size={}", req.page_num, req.page_size);
    if let Some(sort) = &req.sort {
        url += &format!("&sort={}&dir={:?}", sort.col_key, sort.dir);
    }
    for (col_key, text) in &req.filters {
        url += &format!("&filter[{}]={}", col_key, text);
    }
    url
}),
```

## Voir aussi

- [Source de données PageCache](/fr/data/page-cache.md)
- [API DataSource](/fr/api/datasource.md)
- [Callbacks et persistance](/fr/features/callbacks.md)
