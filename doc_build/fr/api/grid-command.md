# API GridCommand

## Définition

```rust
#[non_exhaustive]
pub enum GridCommand { /* 47 variantes */ }
```

Toutes les mutations de `GridState` passent par `state.apply(GridCommand)`.

## Toutes les variantes

### Sélection

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

### Cases a cocher de ligne

```rust
ToggleRowChecked(u64)          // index logique de ligne — clic sur la colonne checkbox
ToggleAllFilteredChecked       // bascule toutes les lignes qui passent le filtre actif (ou toutes les lignes, sans filtre)
SetShowCheckboxColumn(bool)    // afficher/masquer la colonne de selection par cases a cocher
SetCheckboxColumnWidth(f64)    // largeur en px logiques (la case reste centree — controle aussi la marge)
```

:::note
L'etat coche (`GridState.checked_rows`) est suivi separement de
`SelectionState`, indexe par id **physique** de ligne afin de survivre
au tri/filtrage. Voir [Selection](/fr/concepts/selection.md#colonne-de-cases-a-cocher-selection-de-lignes)
pour le modele complet.
:::

### Défilement et viewport

```rust
ScrollTo { x: f64, y: f64 }
ScrollBy { dx: f64, dy: f64 }
Resize { width: f64, height: f64 }
```

### Colonnes

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
`CommitColumnResize` enregistre l'ancienne taille pour l'historique d'annulation.
Pour un redimensionnement programmatique, utiliser `ResizeColumn` directement.
:::

### Tri et filtrage

```rust
ToggleSort { col_key: String }               // alterne asc → desc → off
SetSort { col_key: String, dir: SortDir }    // direction explicite
ClearSort
SetColumnFilter { col_key: String, condition: FilterCondition } // opérateur + valeur
SetColumnValueFilter { col_key: String, values: HashSet<String> } // filtre à cases à cocher
ClearColumnValueFilter { col_key: String }
ClearAllFilters
SetShowFilterRow(bool)      // afficher/masquer la ligne de filtre flottante
SetFilterRowHeight(f64)     // hauteur en px logiques, ignoré si <= 0.0
```

Voir [Filtrage](/fr/features/filtering.md) pour `FilterCondition`/`FilterOp`/`UniqueValues`.

### Édition

```rust
StartEdit { row: u64, col_key: String }
ValidateEdit { value: String }
CommitEdit { row: u64, col_key: String, value: String }
CancelEdit
SetInvalidEditMode(InvalidEditMode)
ClearCells   // Suppr/Retour arrière — efface les cellules sélectionnées, sans presse-papiers
```

:::note
`ValidateEdit` revérifie la valeur en cours d'édition **sans valider** —
un no-op sans édition active, et ça ne crée aucune entrée d'annulation.
`rs-grid-web` le déclenche à chaque frappe pour un retour live. Voir
[Validation](/fr/features/validation.md) pour `ValidationRule` et
`InvalidEditMode`.
:::

### Presse-papiers

```rust
CopySelection
CutSelection
PasteAt { text: String }
```

### Recherche

```rust
Search { query: String }
SearchNext
SearchPrev
ClearSearch
```

### Annuler / Rétablir

```rust
Undo
Redo
```

### Affichage

```rust
SetHeaderHeight(f64)
SetRowHeight(f64)
SetShowHeader(bool)
SetShowRowNumbers(bool)
SetHoveredRow(Option<u64>)
```

### Données côté serveur

```rust
NotifyPageLoaded       // signal qu'un chargement de page est terminé
SetTotalRowCount(u64)  // mettre à jour le nombre total de lignes (mode serveur)
```

### Toggles de comportement

```rust
SetEditable(bool)          // édition inline globale on/off
SetSelectable(bool)        // sélection globale on/off (vide la sélection si false)
SetColumnReorderable(bool) // drag-to-reorder des en-têtes on/off (MoveColumn intact)
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

| Commande              | Résultat                                                                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `CopySelection`       | `CopyText(tsv)` ou `CopyError`                                                                                                            |
| `CutSelection`        | `CopyText(tsv)` ou `CopyError`                                                                                                            |
| `CommitEdit` (rejeté) | `ValidationError { row, col_key, message }` — déclenché pour `InvalidEditMode::Revert` comme `::Block`                                    |
| `PasteAt`             | `PasteApplied { cells }` — coordonnées réellement écrites, un sous-ensemble du rectangle cible (cellules verrouillées/invalides ignorées) |
| `ClearCells`          | `CellsCleared { cells }` — coordonnées réellement effacées, un sous-ensemble de la sélection ; non émis si rien n'a été effacé            |
| Toutes les autres     | `None`                                                                                                                                    |

`cells` de `PasteApplied`/`CellsCleared` est ce que `rs-grid-web` transmet
à son animation de flash de succès, plutôt que le rectangle complet de
sélection/cible — voir [Sélection et presse-papiers](/fr/features/selection-clipboard.md).
