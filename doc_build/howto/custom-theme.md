# 

***

title: How-To: Custom Theme
description: Apply a custom visual theme to rs-grid using CSS variables or a Theme struct.
------------------------------------------------------------------------------------------

rs-grid supports two theming approaches: CSS custom properties (recommended
for runtime switching) and a Rust `Theme` struct (for static or programmatic
control).

## Approach 1 — CSS variables (recommended)

Define `--rs-grid-*` variables on `:root` (or any ancestor of the canvas).
Call `theme_from_css_vars()` to read them into a `Theme` struct, then pass
it to the grid.

### 1. Define your palette in CSS

```css
/* light.css */
:root {
    --rs-grid-bg:                  #ffffff;
    --rs-grid-header-bg:           #f5f7fa;
    --rs-grid-header-text:         #374151;
    --rs-grid-cell-text:           #111827;
    --rs-grid-border:              #e5e7eb;
    --rs-grid-selection-bg:        rgba(59, 130, 246, 0.15);
    --rs-grid-selection-border:    #3b82f6;
    --rs-grid-hover-bg:            rgba(0, 0, 0, 0.04);
    --rs-grid-scrollbar-thumb:     #d1d5db;
    --rs-grid-scrollbar-track:     #f9fafb;
    --rs-grid-font-size:           13px;
    --rs-grid-font-family:         "Inter", system-ui, sans-serif;
}

/* dark.css */
:root.dark {
    --rs-grid-bg:                  #1e1e2e;
    --rs-grid-header-bg:           #181825;
    --rs-grid-header-text:         #cdd6f4;
    --rs-grid-cell-text:           #cdd6f4;
    --rs-grid-border:              #313244;
    --rs-grid-selection-bg:        rgba(137, 180, 250, 0.2);
    --rs-grid-selection-border:    #89b4fa;
    --rs-grid-hover-bg:            rgba(255, 255, 255, 0.05);
    --rs-grid-scrollbar-thumb:     #585b70;
    --rs-grid-scrollbar-track:     #181825;
}
```

See [CSS Variables reference](/theming/css-variables.md) for the full list.

### 2. Build a Theme from CSS vars in Rust

```rust
use rs_grid_web::css_theme::theme_from_css_vars;

let theme = theme_from_css_vars(); // reads current CSS vars from document
```

### 3. Pass it to the grid component

```rust
// Leptos example: reactive theme that updates when CSS class changes
let theme = create_memo(move |_| theme_from_css_vars());

view! {
    <GridCanvas
        model=model
        width="100%"
        height="600px"
        theme=Some(theme)
    />
}
```

### 4. Switch themes at runtime

Toggle a CSS class and re-read the variables:

```rust
let (dark, set_dark) = create_signal(false);

let theme = create_memo(move |_| {
    let _ = dark.get(); // subscribe
    theme_from_css_vars()
});

let toggle = move |_| {
    set_dark.update(|d| *d = !*d);
    document()
        .document_element()
        .unwrap()
        .class_list()
        .toggle("dark")
        .unwrap();
};
```

## Approach 2 — Rust Theme struct

Build a `Theme` directly without CSS variables. Useful for server-side
theming, tests, or embedding in a non-browser context.

```rust
use rs_grid_scene::theme::Theme;

let mut theme = Theme::light(); // or Theme::dark()

// Override individual fields
theme.bg = [255, 255, 255, 255];           // RGBA
theme.header_bg = [245, 247, 250, 255];
theme.selection_bg = [59, 130, 246, 38];   // alpha 15%
theme.font_size = 13.0;
theme.row_height = 32.0;

canvas.set_theme(theme);
```

## Built-in themes

```rust
use rs_grid_scene::theme::Theme;

Theme::light()   // light background
Theme::dark()    // dark background
Theme::dimmed()  // medium contrast
```

See [Built-in Themes](/theming/built-in-themes.md) for the color values.

## Apply per-cell CSS classes

For cell-level styling beyond the global theme, use `CellFormat::Styled`:

```rust
use rs_grid_core::format::{CellFormat, CellElement, CellAlign};
use std::rc::Rc;

let status_col = ColumnDef::new("status", "Status", 120.0)
    .with_format(CellFormat::Styled(Rc::new(|raw: &str| {
        let class = match raw {
            "active"   => "text-green-600 font-semibold",
            "inactive" => "text-gray-400",
            "error"    => "text-red-600",
            _          => "",
        };
        vec![CellElement {
            text: raw.to_string(),
            class: class.to_string(),
            align: CellAlign::Left,
        }]
    })));
```

Then wire up a class resolver on the canvas to map class strings to colors:

```rust
use rs_grid_web::canvas::ClassResolver;
use std::rc::Rc;

canvas.set_class_resolver(Rc::new(|class: &str| {
    match class {
        c if c.contains("text-green-600")  => Some([22, 163, 74, 255]),
        c if c.contains("text-gray-400")   => Some([156, 163, 175, 255]),
        c if c.contains("text-red-600")    => Some([220, 38, 38, 255]),
        _ => None,
    }
}));
```

## Related

- [CSS Variables reference](/theming/css-variables.md)
- [Built-in Themes](/theming/built-in-themes.md)
- [Cell Formatting](/features/cell-formatting.md)
- [Theme API](/api/theme.md)
