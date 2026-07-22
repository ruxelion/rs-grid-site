# API GridModel

## Définition

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

## Champs

| Champ                | Type                               | Défaut       | Description                                                                                                                                             |
| -------------------- | ---------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `columns`            | `Vec<ColumnDef>`                   | —            | Définitions de colonnes ordonnées                                                                                                                       |
| `data`               | `Box<dyn DataSource>`              | —            | Fournisseur de données sous-jacent                                                                                                                      |
| `row_height`         | `f64`                              | —            | Hauteur des lignes de données (px logiques)                                                                                                             |
| `header_height`      | `f64`                              | —            | Hauteur de la ligne d'en-tête (px logiques)                                                                                                             |
| `filter_row_height`  | `f64`                              | `36.0`       | Hauteur de la ligne de filtre flottante (px logiques) — voir [Filtrage](/fr/features/filtering.md)                                                      |
| `show_filter_row`    | `bool`                             | `false`      | Afficher la ligne de filtre flottante — un filtre rapide « contient » par colonne, et seul point d'accès au popup de filtre                             |
| `column_offsets`     | `ColumnOffsets`                    | calculé      | Offsets de bord gauche précalculés                                                                                                                      |
| `patches`            | `HashMap<(u64, String), String>`   | vide         | Surcharges de valeurs de cellules                                                                                                                       |
| `row_number_width`   | `f64`                              | auto         | Largeur du gutter (auto selon le nombre de lignes)                                                                                                      |
| `sort_order`         | `Vec<u64>`                         | vide         | Correspondance affichage → ligne physique                                                                                                               |
| `pinned_count`       | `usize`                            | `0`          | Nombre de colonnes épinglées en tête                                                                                                                    |
| `filters`            | `HashMap<String, FilterCondition>` | vide         | Conditions de filtre par colonne — voir [Filtrage](/fr/features/filtering.md)                                                                           |
| `value_filters`      | `HashMap<String, HashSet<String>>` | vide         | Restrictions par ensemble de valeurs par colonne (filtre à cases à cocher), combinées en ET avec `filters` — voir [Filtrage](/fr/features/filtering.md) |
| `filtered_indices`   | `Vec<u64>`                         | vide         | Indices physiques des lignes filtrées — significatif uniquement quand `is_filter_applied()` vaut `true`                                                 |
| `mode`               | `DataSourceMode`                   | `ClientSide` | Données côté client ou côté serveur                                                                                                                     |
| `scrollbar_size`     | `f64`                              | `14.0`       | Espace réservé à la scrollbar                                                                                                                           |
| `editable`           | `bool`                             | `true`       | Édition inline globale (le drapeau par colonne s'applique aussi)                                                                                        |
| `selectable`         | `bool`                             | `true`       | Sélection globale ; vide la sélection si passée à `false`                                                                                               |
| `column_reorderable` | `bool`                             | `true`       | Drag-to-reorder des en-têtes. `MoveColumn` fonctionne toujours                                                                                          |
| `invalid_edit_mode`  | `InvalidEditMode`                  | `Revert`     | Politique appliquée quand un `CommitEdit` échoue à la validation — voir [Validation](/fr/features/validation.md)                                        |

## Constructeurs

```rust
// Données en mémoire
pub fn new(columns: Vec<ColumnDef>, rows: Vec<RowRecord>, row_height: f64, header_height: f64) -> Self

// Source de données personnalisée
pub fn with_data_source(columns: Vec<ColumnDef>, data: Box<dyn DataSource>, row_height: f64, header_height: f64) -> Self
```

## Méthodes

| Méthode                       | Signature                                        | Description                                                                                                                                                       |
| ----------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `get_cell`                    | `(row: u64, col_key: &str) -> Option<String>`    | Lire une cellule (patches d'abord, puis source de données)                                                                                                        |
| `set_cell`                    | `(row: u64, col_key: &str, value: String)`       | Écrire une cellule dans la source de données                                                                                                                      |
| `logical_to_physical`         | `(logical: u64) -> u64`                          | Correspondance ligne affichée → ligne de données                                                                                                                  |
| `display_row_count`           | `() -> u64`                                      | Nombre de lignes visibles (respecte les filtres)                                                                                                                  |
| `total_width`                 | `() -> f64`                                      | Somme des largeurs de colonnes                                                                                                                                    |
| `total_height`                | `() -> f64`                                      | `row_count × row_height + data_top()`                                                                                                                             |
| `pinned_width`                | `() -> f64`                                      | Largeur totale des colonnes épinglées                                                                                                                             |
| `compute_row_number_width`    | `(row_count: u64) -> f64`                        | Calcul auto de la largeur du gutter                                                                                                                               |
| `effective_header_height`     | `() -> f64`                                      | `header_height` (`0` si `show_header` est `false`)                                                                                                                |
| `effective_filter_row_height` | `() -> f64`                                      | `filter_row_height` (`0` si `show_filter_row` est `false`)                                                                                                        |
| `data_top`                    | `() -> f64`                                      | `effective_header_height() + effective_filter_row_height()` — où commencent les données défilables                                                                |
| `column_screen_x`             | `(col_idx: usize, scroll_x: f64) -> Option<f64>` | Position X à l'écran du bord gauche d'une colonne, sensible à l'épinglage                                                                                         |
| `is_filter_applied`           | `() -> bool`                                     | Si `filtered_indices` doit être considéré comme fiable tel quel, y compris vide (zéro ligne correspond) — par opposition à vide parce qu'aucun filtre n'est actif |
| `unique_values`               | `(col_key: &str, cap: usize) -> UniqueValues`    | Valeurs distinctes d'une colonne (triées), jusqu'à `cap` — alimente l'interface du filtre à cases à cocher                                                        |

## GridModelBuilder

Un builder ergonomique pour construire un `GridModel` avec des valeurs par defaut sensees :

```rust
pub struct GridModelBuilder { /* ... */ }

impl GridModelBuilder {
    pub fn new(
        columns: Vec<ColumnDef>,
        data: Box<dyn DataSource>,
    ) -> Self;

    pub fn row_height(self, h: f64) -> Self;       // defaut 30.0
    pub fn header_height(self, h: f64) -> Self;     // defaut 40.0
    pub fn filter_row_height(self, h: f64) -> Self; // defaut 36.0
    pub fn show_filter_row(self, v: bool) -> Self;  // defaut false
    pub fn pinned_count(self, n: usize) -> Self;    // defaut 0
    pub fn mode(self, m: DataSourceMode) -> Self;   // defaut ClientSide
    pub fn scrollbar_size(self, s: f64) -> Self;    // defaut 14.0
    pub fn editable(self, v: bool) -> Self;         // defaut true
    pub fn selectable(self, v: bool) -> Self;       // defaut true
    pub fn column_reorderable(self, v: bool) -> Self; // defaut true
    pub fn invalid_edit_mode(self, m: InvalidEditMode) -> Self; // defaut Revert
    pub fn build(self) -> GridModel;
}
```

### Exemple

```rust
let model = GridModelBuilder::new(columns, Box::new(data))
    .row_height(40.0)
    .pinned_count(2)
    .build();
```

`pinned_count` est ramene au nombre de colonnes si la valeur depasse `columns.len()`.

Les constructeurs existants `GridModel::new()` et `GridModel::with_data_source()` restent disponibles.

## DataSourceMode

```rust
pub enum DataSourceMode {
    ClientSide,  // tri/filtre effectué localement (par défaut)
    ServerSide,  // tri/filtre délégué au serveur
}
```

## InvalidEditMode

```rust
pub enum InvalidEditMode {
    Revert,  // termine la session d'édition, revient à la valeur précédente (défaut)
    Block,   // garde la session d'édition ouverte avec l'erreur attachée
}
```

Basculer à l'exécution avec `GridCommand::SetInvalidEditMode`. Voir
[Validation](/fr/features/validation.md) pour le comportement complet.
