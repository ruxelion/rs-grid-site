# API ColumnDef

## ColumnDef

```rust
pub struct ColumnDef {
    pub key: String,
    pub label: String,
    pub width: f64,
    pub format: Option<CellFormat>,
    pub editor: Option<CellEditor>,
    pub validator: Option<CellValidator>,
    pub rules: Vec<ValidationRule>,
}
```

| Champ       | Type                    | Description                                                                                                                                          |
| ----------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `key`       | `String`                | Identifiant unique, utilisé pour rechercher les valeurs de cellules                                                                                  |
| `label`     | `String`                | Texte affiché dans l'en-tête de colonne                                                                                                              |
| `width`     | `f64`                   | Largeur en pixels logiques                                                                                                                           |
| `format`    | `Option<CellFormat>`    | Format d'affichage (`None` = texte brut)                                                                                                             |
| `editor`    | `Option<CellEditor>`    | Type d'éditeur (`None` = champ texte par défaut)                                                                                                     |
| `validator` | `Option<CellValidator>` | Validateur historique, conservé pour compatibilité ascendante. Préférez `rules` pour du nouveau code — voir [Validation](/fr/features/validation.md) |
| `rules`     | `Vec<ValidationRule>`   | Règles de validation déclaratives, vérifiées dans l'ordre avant `validator`                                                                          |

### Constructeur

```rust
pub fn new(key: impl Into<String>, label: impl Into<String>, width: f64) -> Self
```

Crée une colonne sans format et sans surcharge d'éditeur.

## CellFormat

```rust
#[non_exhaustive]
pub enum CellFormat {
    Number { decimal_places: u8, thousands_sep: Option<char>, decimal_sep: char },
    Percent { decimal_places: u8 },
    Currency { symbol: String, decimal_places: u8, thousands_sep: Option<char>, symbol_after: bool },
    Boolean { true_label: String, false_label: String },
    Custom(Rc<dyn Fn(&str) -> FormattedCell>),
    Image { base_url: Option<String>, border_radius: f64, padding: f64 },
    ImageText { base_url: String, suffix: String, image_size: f64, border_radius: f64, gap: f64 },
}
```

### Méthodes

| Méthode           | Retour | Description                       |
| ----------------- | ------ | --------------------------------- |
| `is_image()`      | `bool` | Vrai pour la variante `Image`     |
| `is_image_text()` | `bool` | Vrai pour la variante `ImageText` |

## FormattedCell

```rust
pub struct FormattedCell {
    pub text: String,
    pub align: Option<CellAlign>,
    pub bold: bool,
    pub color: Option<[u8; 4]>,  // RGBA
}
```

## CellAlign

```rust
pub enum CellAlign {
    Left,    // par défaut
    Center,
    Right,
}
```

## CellValidator

```rust
pub struct CellValidator(pub Rc<dyn Fn(&str) -> Result<(), String>>);
```

Callback de validation par colonne. Utilisez `CellValidator::new` pour en créer un :

```rust
CellValidator::new(|v| {
    v.parse::<f64>()
        .map(|_| ())
        .map_err(|_| "pas un nombre".to_string())
})
```

| Méthode                 | Description                                                 |
| ----------------------- | ----------------------------------------------------------- |
| `new(f)`                | Encapsule une closure en validateur                         |
| `validate(value: &str)` | Exécute le validateur ; retourne `Ok(())` ou `Err(message)` |

Voir [Validation](/fr/features/validation.md) pour le guide complet.

## ValidationRule

```rust
#[non_exhaustive]
pub enum ValidationRule {
    Required,
    MinLength(usize),
    MaxLength(usize),
    Range(f64, f64),
    OneOf(Vec<String>),
    Custom(CellValidator),
}
```

Règles déclaratives attachées à `ColumnDef::rules`, vérifiées **dans
l'ordre, la première échec l'emporte**, avant le validateur historique.

### Sucre syntaxique sur `ColumnDef`

| Méthode                                     | Ajoute                            | Retour |
| ------------------------------------------- | --------------------------------- | ------ |
| `.required()`                               | `ValidationRule::Required`        | `Self` |
| `.with_min_length(min: usize)`              | `ValidationRule::MinLength(min)`  | `Self` |
| `.with_max_length(max: usize)`              | `ValidationRule::MaxLength(max)`  | `Self` |
| `.with_range(min: f64, max: f64)`           | `ValidationRule::Range(min, max)` | `Self` |
| `.with_allowed_values(values: Vec<String>)` | `ValidationRule::OneOf(values)`   | `Self` |
| `.with_rules(rules: Vec<ValidationRule>)`   | remplace `rules` entièrement      | `Self` |

### `ColumnDef::validate_value`

```rust
pub fn validate_value(&self, value: &str) -> Result<(), String>
```

Exécute `rules` dans l'ordre, puis `validator` si toutes les règles ont
passé. Retourne le message du premier échec, le cas échéant.

Voir [Validation](/fr/features/validation.md) pour `InvalidEditMode` et le
retour live à chaque frappe.

## EditablePredicate

```rust
pub struct EditablePredicate(pub Rc<dyn Fn(u64, &GridModel) -> bool>);
```

Une surcharge dynamique de l'éditabilité par cellule, attachée à
`ColumnDef.editable_predicate`. Reçoit l'index de ligne et le
[`GridModel`](/fr/api/grid-model.md) complet, ce qui lui permet d'implémenter
une logique inter-colonnes (ex. verrouiller une cellule quand la valeur
d'une autre colonne est `"locked"`) — pas seulement la valeur de sa propre
colonne.

```rust
EditablePredicate::new(|row, model| {
    model.get_cell(row, "status").as_deref() != Some("locked")
})
```

| Méthode                                    | Description                                   |
| ------------------------------------------ | --------------------------------------------- |
| `new(f)`                                   | Encapsule une closure en prédicat             |
| `is_editable(row: u64, model: &GridModel)` | Exécute le prédicat ; retourne `true`/`false` |

### Sucre syntaxique sur `ColumnDef`

| Méthode             | Définit              | Retour |
| ------------------- | -------------------- | ------ |
| `.editable_when(f)` | `editable_predicate` | `Self` |

### `ColumnDef::is_cell_editable`

```rust
pub fn is_cell_editable(&self, row: u64, model: &GridModel) -> bool
```

Résout si `row` est éditable dans cette colonne : `false` si le flag
statique `editable` est `false` (le prédicat n'est même pas appelé) ;
sinon le résultat du prédicat, ou `true` si aucun prédicat n'est défini.

Voir [Verrouillage par cellule](/fr/features/editing.md#verrouillage-par-cellule)
pour le guide complet, incluant le curseur `not-allowed` et le style
thémé des cellules verrouillées.

## CellEditor

```rust
#[non_exhaustive]
pub enum CellEditor {
    Text,
    Select { options: Vec<SelectOption> },
}
```

## SelectOption

```rust
pub struct SelectOption {
    pub value: String,
    pub label: String,
    pub icon: Option<String>,
}
```

## ColumnOffsets

```rust
pub struct ColumnOffsets {
    pub offsets: Vec<f64>,
    pub total_width: f64,
}
```

| Méthode                                     | Description                                             |
| ------------------------------------------- | ------------------------------------------------------- |
| `compute(columns: &[ColumnDef])`            | Construit les offsets à partir des largeurs de colonnes |
| `hit_column(x: f64, columns: &[ColumnDef])` | Trouve la colonne à la position x                       |
