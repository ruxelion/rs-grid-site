# Validation

## Vue d'ensemble

rs-grid valide une édition de cellule **avant** qu'elle soit validée. La
validation s'exécute en deux couches, vérifiées dans l'ordre :

1. **Règles déclaratives** (`ColumnDef::rules: Vec<ValidationRule>`) — la
   façon recommandée de valider. Les règles intégrées couvrent les cas
   courants (`Required`, `MinLength`, `MaxLength`, `Range`, `OneOf`), plus
   une échappatoire `Custom`.
2. **Validateur historique** (`ColumnDef::validator: Option<CellValidator>`)
   — une closure libre, toujours prise en charge pour compatibilité
   ascendante. Il ne s'exécute qu'une fois toutes les règles passées.

```
StartEdit → l'utilisateur saisit → ValidateEdit (à chaque frappe, live) → CommitEdit
  → règles (dans l'ordre) → validateur historique (le cas échéant)
      Ok(())   → patch écrit → on_change()
      Err(msg) → InvalidEditMode décide de la suite
```

La validation est appliquée à l'intérieur de `GridState::apply`, pas
seulement au niveau de l'interface — elle s'applique donc à tout
consommateur (tests natifs, rendu canvas, tout futur renderer personnalisé).

## Ajouter des règles

Le sucre syntaxique sur `ColumnDef` couvre les cas courants :

```rust
use rs_grid_core::column::ColumnDef;

let name = ColumnDef::new("name", "Nom", 160.0).required();

let bio = ColumnDef::new("bio", "Bio", 240.0)
    .with_min_length(10)
    .with_max_length(500);

let age = ColumnDef::new("age", "Âge", 80.0).with_range(0.0, 130.0);

let status = ColumnDef::new("status", "Statut", 120.0)
    .with_allowed_values(vec!["active".into(), "inactive".into()]);
```

Ou définissez la liste complète directement avec `ValidationRule`, par
exemple pour une règle `Custom` :

```rust
use rs_grid_core::{
    column::ColumnDef,
    validation::ValidationRule,
};

let sku = ColumnDef::new("sku", "SKU", 120.0).with_rules(vec![
    ValidationRule::required(),
    ValidationRule::Custom(CellValidator::new(|v| {
        v.starts_with("SKU-")
            .then_some(())
            .ok_or_else(|| "Doit commencer par SKU-".to_string())
    })),
]);
```

Variantes de `ValidationRule` :

| Variante                | Rejette quand                                               |
| ----------------------- | ----------------------------------------------------------- |
| `Required`              | La valeur est vide                                          |
| `MinLength(usize)`      | Moins de caractères que le minimum                          |
| `MaxLength(usize)`      | Plus de caractères que le maximum                           |
| `Range(f64, f64)`       | La valeur ne se parse pas en nombre, ou sort de `min..=max` |
| `OneOf(Vec<String>)`    | La valeur n'est pas l'une des chaînes autorisées            |
| `Custom(CellValidator)` | La closure encapsulée retourne `Err`                        |

Les règles s'exécutent **dans l'ordre, la première échec l'emporte**. Une
fois toutes les règles passées, le validateur historique (s'il est défini)
s'exécute toujours :

```rust
pub fn validate_value(&self, value: &str) -> Result<(), String>
```

## Annuler ou bloquer : `InvalidEditMode`

`GridModel::invalid_edit_mode` (par défaut `Revert`) contrôle ce qui se
passe quand un `CommitEdit` échoue à la validation :

| Mode              | Comportement                                                                                                                                    |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `Revert` (défaut) | La session d'édition se termine et la cellule revient à sa valeur précédente — comme avant l'existence de la validation.                        |
| `Block`           | La session d'édition **reste ouverte** avec l'erreur attachée, pour que l'utilisateur puisse corriger la valeur sur place au lieu de la perdre. |

Le définir à la construction :

```rust
use rs_grid_core::{GridModelBuilder, validation::InvalidEditMode};

let model = GridModelBuilder::new(columns, Box::new(data))
    .invalid_edit_mode(InvalidEditMode::Block)
    .build();
```

ou le basculer à l'exécution avec `GridCommand::SetInvalidEditMode(mode)`.

Les deux modes émettent `CommandOutput::ValidationError { row, col_key, message }`.

## Retour live pendant la saisie

`GridCommand::ValidateEdit { value }` revérifie la valeur en cours d'édition
**sans valider** — c'est un no-op sans édition active et ça ne crée aucune
entrée d'annulation. `rs-grid-web` le déclenche automatiquement à chaque
frappe, si bien que l'édition en cours reflète toujours l'état de
validation courant, pas seulement la dernière tentative de validation.

Lire l'état live à la demande :

```rust
pub fn validation_error(&self) -> Option<(u64, String, String)>
```

`Some((row, col_key, message))` tant que l'édition en cours est invalide,
`None` sinon.

## Écouter la validation

Il existe deux callbacks — choisissez selon le moment où vous devez réagir :

| Callback                      | Se déclenche                                                                             | À utiliser pour                                                                                                     |
| ----------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `on_validation_state_changed` | Chaque `StartEdit` / `ValidateEdit` / `CommitEdit` / `CancelEdit` — donc à chaque frappe | Une interface de validation live et personnalisée (tooltip, bannière, icône) qui suit la valeur au fil de la saisie |
| `on_validation_error`         | Seulement quand un `CommitEdit` est rejeté                                               | Une notification ponctuelle (toast, log) quand une tentative de sauvegarde échoue                                   |


**[object Object]**

```rust
let validation_state = RwSignal::new(None::<(u64, String, String)>);

view! {
    <GridCanvas
        model=model
        on_validation_state_changed=Some(Box::new(move |state| {
            validation_state.set(state);
        }))
        on_validation_error=Some(Box::new(move |_row, col, msg| {
            log::warn!("[{col}] rejeté : {msg}");
        }))
    />
}
```


**[object Object]**

```rust
gc.set_on_validation_state_changed(move |state| {
    match state {
        Some((row, col_key, message)) => show_my_tooltip(row, &col_key, &message),
        None => hide_my_tooltip(),
    }
});

gc.set_on_validation_error(|row, col_key, message| {
    web_sys::console::warn_1(
        &format!("[{col_key}] ligne {row} : {message}").into()
    );
});
```


**[object Object]**

```rust
rsx! {
    GridCanvas {
        model: model_slot,
        on_validation_state_changed: move |state: Option<(u64, String, String)>| {
            validation_state.set(state);
        },
        on_validation_error: move |(_, col, msg): (u64, String, String)| {
            error.set(format!("[{col}] {msg}"));
        },
    }
}
```


**[object Object]**

```rust
use rs_grid_yew::{GridCanvas, ValidationStateChangedCb};

let vsc_cb: ValidationStateChangedCb = Rc::new(|state| {
    validation_state.set(state);
});

html! {
    <GridCanvas model={model}
        on_validation_state_changed={Some(vsc_cb)} />
}
```


rs-grid n'impose pas de widget d'erreur de validation (pas de composant
tooltip intégré) — il expose l'état brut pour que vous puissiez en
construire un avec votre propre framework/CSS.

## Positionner une interface de validation personnalisée

`GridCanvas::cell_client_rect(row, col_key)` retourne le rectangle en
espace client de la cellule `(left, top, width, height)` en pixels CSS
relatifs à la page — prêt à positionner un tooltip ou une bannière en
`position: fixed` à côté de la cellule en erreur :

```rust
if let Some((row, col_key, message)) = canvas.validation_error() {
    if let Some((left, top, _w, height)) = canvas.cell_client_rect(row, &col_key) {
        show_tooltip(left, top + height + 4.0, &message); // juste sous la cellule
    }
}
```

Retourne `None` si `col_key` n'existe pas. C'est de la géométrie pure — ça
ne vérifie pas si la cellule est actuellement visible dans le viewport.

## Repli tooltip natif `title`

Par défaut, l'`<input>` d'édition en ligne reçoit un attribut `title` natif
reflétant le message de validation courant — un tooltip navigateur
zero-config qui ne nécessite aucune intégration. Désactivez-le une fois
votre propre interface branchée, pour que les deux ne se concurrencent pas :

```rust
canvas.set_native_validation_tooltip(false);
```

## Comportement

- La validation s'exécute **uniquement sur les éditions utilisateur**
  (`CommitEdit` / `ValidateEdit`). Les écritures programmatiques via
  `GridModel::set_cell` la contournent.
- Les éditeurs `Select` sont validés aussi — la valeur de l'option
  sélectionnée est vérifiée comme n'importe quelle autre.
- Les règles et le validateur historique sont **synchrones**. Pour une
  validation asynchrone (ex. vérification serveur), validez de façon
  optimiste puis revenez en arrière avec `GridCommand::Undo` si la
  vérification échoue côté serveur.
- Le mode `Revert` ne crée aucune entrée d'annulation ; le mode `Block`
  non plus, puisque la session d'édition ne se ferme jamais en cas
  d'échec.

## Voir aussi

- [Édition](/fr/features/editing.md) — cycle de vie de l'édition et types d'éditeurs
- [API ColumnDef](/fr/api/column-def.md) — référence des types `ValidationRule` / `CellValidator`
- [API GridCommand](/fr/api/grid-command.md) — `ValidateEdit`, `SetInvalidEditMode`
- [Annuler / Rétablir](/fr/features/undo-redo.md) — comportement de la pile d'annulation
