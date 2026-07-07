# Selection

rs-grid utilise un modele de selection ancre/focus. L'ancre est le point de
depart de la selection ; le focus est le point ou elle se termine
actuellement. Le shift-clic etend la selection de l'ancre vers un nouveau
focus.

## SelectionState

`SelectionState` suit deux positions :

| Champ    | Description                                              |
| -------- | -------------------------------------------------------- |
| `anchor` | Origine de la selection (definie au mousedown)           |
| `focus`  | Fin actuelle de la selection (mise a jour au shift-clic) |

Chaque position peut faire reference a une **cellule**, une **ligne** ou
une **colonne**. La granularite mixte (ancre sur une cellule, focus sur
une ligne) n'est pas supportee.

## Commandes

```rust
// Selectionner une cellule unique
grid_state.apply(GridCommand::SelectCell { row: 0, col: 2 });

// Etendre la selection (equivalent du shift-clic)
grid_state.apply(GridCommand::ExtendSelection { row: 5, col: 2 });

// Selectionner une ligne entiere
grid_state.apply(GridCommand::SelectRow { row: 3 });

// Selectionner une colonne entiere
grid_state.apply(GridCommand::SelectColumn { col: 1 });

// Effacer la selection
grid_state.apply(GridCommand::ClearSelection);
```

## Hit-testing

Etant donne une coordonnee pixel `(x, y)` relative au canvas, le
hit-testing retourne la cellule sous le curseur :

```rust
let hit = grid_state.hit_test(x, y);
// Retourne Option<HitResult> avec { row: u64, col: usize }
```

Le hit-testing utilise le meme tableau precalcule de decalages de colonnes
que le viewport, offrant une performance **O(log n)**. Le hit-testing
des lignes est O(1) avec une hauteur de ligne uniforme.

:::warning
N'introduisez jamais un parcours O(n) dans le chemin du hit-testing.
La garantie O(log n) est un invariant fondamental.
:::

## Rendu de la selection

`SceneBuilder` lit `SelectionState` et emet des entrees
`ScenePrimitive::Rect` avec la couleur de surbrillance de selection pour
chaque cellule selectionnee dans le viewport.

:::tip
Meme avec une selection de toute la grille (toutes les lignes x toutes les
colonnes), seules les primitives des cellules visibles sont construites.
La taille de la scene est limitee par le viewport, pas par la taille de
la selection.
:::

## Colonne de cases a cocher (selection de lignes)

Independamment de la selection ancre/focus ci-dessus, rs-grid propose une
colonne de cases a cocher optionnelle pour la selection de lignes, avec
une case par ligne et une case tri-etat dans le header ("tout cocher").
Contrairement a la gouttiere des numeros de ligne, ce n'est pas une bande
fixe/epinglee — c'est la premiere colonne de la zone scrollable, elle
disparait donc au scroll horizontal comme une colonne normale.

```rust
let model = GridModelBuilder::new(columns, data)
    .row_selection_checkboxes(true)
    .build();
```

L'etat coche est suivi separement de `SelectionState`, par id **physique**
de ligne (pas par position d'affichage), donc il survit au tri et au
filtrage :

```rust
// Basculer une seule ligne (par index logique/d'affichage)
grid_state.apply(GridCommand::ToggleRowChecked(3));

// Basculer la case du header — coche ou decoche toutes les lignes
// qui passent actuellement le filtre actif (ou toutes les lignes, si aucun filtre)
grid_state.apply(GridCommand::ToggleAllFilteredChecked);

// Afficher/masquer la colonne a l'execution
grid_state.apply(GridCommand::SetShowCheckboxColumn(true));
```

`CheckboxTriState` (`Checked` / `Unchecked` / `Indeterminate`) decrit l'etat
de la case du header — `Indeterminate` quand certaines lignes du perimetre
sont cochees mais pas toutes. Cliquer sur une case indeterminee coche
toutes les lignes du perimetre plutot que de les decocher.

Sur `GridCanvas` (l'integration navigateur) :

| Methode                           | Description                                   |
| --------------------------------- | --------------------------------------------- |
| `checked_row_indices()`           | Ids physiques des lignes actuellement cochees |
| `checkbox_header_state()`         | `CheckboxTriState` actuel du header           |
| `set_show_checkbox_column(bool)`  | Afficher/masquer la colonne                   |
| `set_on_checked_rows_changed(cb)` | Callback declenche apres chaque bascule       |

:::tip
"Tout cocher" n'affecte que les lignes qui passent le filtre actif, pas
l'ensemble du jeu de donnees — cocher des lignes masquees par un filtre
serait surprenant pour une action en masse ulterieure (coherent avec la
convention utilisee par la plupart des bibliotheques de grilles de donnees).
:::
