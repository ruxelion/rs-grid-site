# Édition

## Vue d'ensemble

rs-grid prend en charge l'édition de cellules en ligne. Double-cliquez sur une
cellule (ou appuyez sur Entrée sur une cellule sélectionnée) pour commencer
l'édition. La couche web superpose un élément DOM input par-dessus la cellule
du canvas.

## Cycle de vie de l'édition

```
StartEdit → l'utilisateur saisit → CommitEdit (Entrée) ou CancelEdit (Échap)
```

### Démarrer l'édition

```rust
state.apply(GridCommand::StartEdit {
    row: 5,
    col_key: "name".into(),
});
```

La grille stocke la valeur actuelle de la cellule dans un snapshot `EditCell`
afin de pouvoir la restaurer en cas d'annulation.

### Valider

```rust
state.apply(GridCommand::CommitEdit {
    row: 5,
    col_key: "name".into(),
    value: "New Value".into(),
});
```

La nouvelle valeur est écrite dans la source de données (ou dans la couche
de patches pour les sources en lecture seule). L'édition est enregistrée
dans l'historique d'annulation.

### Annuler

```rust
state.apply(GridCommand::CancelEdit);
```

Restaure la valeur d'origine. Aucune entrée d'annulation n'est créée.

## Éditeurs de cellules

Le type d'éditeur est contrôlé par `ColumnDef::editor` :

### Champ texte

Lorsque `editor` vaut `Some(CellEditor::Text)`, un simple `<input type="text">` est affiché :

```rust
col.editor = Some(CellEditor::Text);
```

### Pas d'éditeur (`None`)

Lorsque `editor` vaut `None` (valeur par défaut pour une nouvelle colonne),
le double-clic déclenche `CancelEdit` et n'affiche aucune superposition DOM.
Pour activer l'édition texte sur une colonne, définissez `editor` explicitement :

```rust
col.editor = Some(CellEditor::Text);
```

### Menu déroulant

Pour les colonnes à choix fixes, utilisez `CellEditor::Select` :

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

Chaque `SelectOption` possède :

- `value` — valeur stockée dans la cellule lors de la validation
- `label` — texte affiché dans le menu déroulant
- `icon` — URL d'icône optionnelle affichée à gauche du libellé

## Support de l'annulation

Les éditions de cellules sont automatiquement enregistrées dans l'historique
d'annulation. Appuyez sur **Ctrl+Z** pour annuler ou **Ctrl+Y** pour rétablir.
Voir [Annuler et Rétablir](/fr/features/undo-redo.md) pour plus de détails.

## Édition avec des sources de données en lecture seule

Même `FnDataSource` (qui n'a pas de `set_cell`) prend en charge l'édition —
la nouvelle valeur est stockée dans `GridModel::patches`, qui remplace la
source de données pour cette cellule.

## Verrouillage par cellule

`ColumnDef::editable` verrouille une colonne entière. Pour un contrôle plus
fin — verrouiller des cellules individuelles selon les données de la
ligne — définissez un prédicat dynamique avec `.editable_when(...)` :

```rust
use rs_grid_core::column::ColumnDef;

let notes = ColumnDef::new("notes", "Notes", 160.0).editable_when(
    |row, model| model.get_cell(row, "status").as_deref() != Some("locked"),
);
```

Le prédicat reçoit l'index de ligne et le [`GridModel`](/fr/api/grid-model.md)
complet, ce qui lui permet de lire la valeur de _n'importe quelle_ colonne
de cette ligne — pas seulement la sienne — pour décider si une cellule est
éditable. Ceci reproduit le callback `colDef.editable` d'AG Grid.

Vérifié uniquement quand le flag statique `editable` est `true` — si une
colonne est en lecture seule statiquement, le prédicat n'est jamais
appelé :

```
StartEdit → editable == false ?  → bloqué, prédicat non évalué
          → editable == true     → editable_when(row, model) ?
```

Quand une cellule résout à non-éditable, `rs-grid-web` affiche un curseur
`not-allowed` au survol et rend la cellule avec un fond et une couleur de
texte thémés (`Theme::locked_cell_bg` / `Theme::locked_cell_text`,
variables CSS `--rs-grid-locked-cell-bg` / `--rs-grid-locked-cell-text` —
voir [Theming](/fr/theming/css-variables.md)).

Voir [EditablePredicate](/fr/api/column-def.md#editablepredicate) pour la
référence complète du type.

## Décoration par cellule

Parfois une règle métier concerne deux colonnes et aucune des deux n'est
invalide _en isolation_ — par ex. une ligne est incohérente si l'une d'une
paire fichier/libellé est remplie et l'autre vide. Aucune des deux colonnes
ne peut exprimer ça avec la [Validation](/fr/features/validation.md) seule,
puisque chacune accepte une valeur vide isolément. Attachez un décorateur
dynamique avec `.decorated_when(...)` pour signaler la cellule de façon
persistante, au repos — pas seulement pendant son édition :

```rust
use rs_grid_core::column::{CellDecoration, ColumnDef};

let doc1_file = ColumnDef::new("doc1_file", "Doc 1 file", 160.0)
    .decorated_when(|row, model| {
        let file = model.get_cell(row, "doc1_file").unwrap_or_default();
        let label = model.get_cell(row, "doc1_label").unwrap_or_default();
        (file.is_empty() != label.is_empty()).then(|| {
            CellDecoration::default().with_border_color([239, 68, 68, 255])
        })
    });
```

Comme `.editable_when(...)`, la closure reçoit l'index de ligne et le
[`GridModel`](/fr/api/grid-model.md) complet, ce qui lui permet de lire la
valeur de n'importe quelle autre colonne pour cette ligne. Contrairement à
l'éditabilité ou à la validation, la décoration ne bloque jamais rien —
elle est purement cosmétique, et il n'y a pas de garde statique pour la
court-circuiter.

La couleur de bordure et la teinte de fond sont des valeurs RGBA que vous
fournissez directement dans `CellDecoration` — elles ne sont pas lues
depuis le thème. Seule l'épaisseur de la bordure est thémée
(`--rs-grid-decoration-border-width`), car elle est uniforme pour toutes
les cellules décorées, quelle que soit la couleur choisie.

Voir [CellDecoration](/fr/api/column-def.md#celldecoration) et
[CellDecorator](/fr/api/column-def.md#celldecorator) pour la référence
complète du type.

## Validation

`CommitEdit` (ainsi que la commande live `ValidateEdit` déclenchée à chaque
frappe) passent par une validation par colonne avant que la valeur soit
acceptée. Voir [Validation](/fr/features/validation.md) pour les règles
déclaratives, la politique bloquer-ou-annuler, et les hooks d'interface
pour le retour live.
