# worse-select

A lightweight, dependency-free progressive-enhancement wrapper for native HTML `<select>` elements.

`worse-select` keeps the native `<select>` as the source of truth while rendering a custom UI layer that is easier to style, search, and extend. It is designed for projects that want better presentation without fully replacing native form semantics in their own application state.

## Features

- Enhances existing native `<select>` elements.
- Uses the native element as the source of truth for `value`, `disabled`, `size`, and `multiple`.
- Supports searchable option lists with match highlighting.
- Supports single-select dropdown mode and listbox mode via the native `size` attribute.
- Supports multi-select behavior via the native `multiple` attribute.
- Tracks dynamic option changes with `MutationObserver`.
- Ships with no runtime dependencies.

## Install

```bash
npm install worse-select
```

## Basic usage

```ts
import { worseSelect } from 'worse-select';

worseSelect();
```

This scans the document for native `<select>` elements and enhances each one once.

## HTML examples

### Single select with search

```html
<select data-searchable="true">
  <option value="">Choose one</option>
  <option value="ford">Ford</option>
  <option value="honda">Honda</option>
  <option value="toyota">Toyota</option>
</select>
```

### Listbox mode

```html
<select size="6" data-searchable="true">
  <option>One</option>
  <option>Two</option>
  <option>Three</option>
  <option>Four</option>
  <option>Five</option>
  <option>Six</option>
</select>
```

### Multi-select listbox

```html
<select multiple size="8" data-searchable="true">
  <option>Maryland</option>
  <option>Virginia</option>
  <option>Pennsylvania</option>
  <option>Delaware</option>
</select>
```

## Configuration

Custom widget settings are provided with `data-*` attributes on the native `<select>`.

| Attribute | Type | Default | Description |
|---|---|---|---|
| `data-searchable` | `true \| false` | `false` | Adds a search input above the options list. |
| `data-dropdown-height-px` | `number` | `500` | Sets the max height of the options scroller. |
| `data-width` | `string` | `100%` | Overrides the rendered header width. |
| `data-height` | `string` | `32px` | Overrides the rendered header height. |

### Native attributes

These are intentionally **not** configured through custom widget options:

- `size` controls whether the widget behaves like a listbox.
- `multiple` controls multi-select behavior.
- `disabled` disables the control.

That split keeps the API aligned with standard HTML behavior.

## API

### `worseSelect(root?: ParentNode): void`

Enhances every native `<select>` element found under the provided root.

```ts
worseSelect(document);
worseSelect(someContainerElement);
```

The function is safe to call multiple times. A given `<select>` is mounted only once.

## How it works

The library hides the native `<select>` and inserts a styled DOM structure next to it. User interaction updates the native control first, and then the custom UI syncs from that canonical state. This makes the widget easier to integrate into existing forms, because change events still originate from the real form control.

Options are linked to rendered elements through `WeakMap`s, and a `MutationObserver` keeps the custom UI synchronized when options are added or removed dynamically.

## Styling

The package injects a default stylesheet the first time it is mounted. If you want to customize appearance, start by overriding the generated class names in your own CSS:

- `.worse-select-container`
- `.worse-select-header`
- `.worse-select-options`
- `.worse-select-options-scroller`
- `.worse-select-option`
- `.worse-select-search-input`

## Limitations

- Keyboard navigation and full ARIA behavior are not complete yet.
- Runtime changes to `size` or `multiple` update state classes, but structural mode changes may still be better handled by a teardown and remount strategy.
- This package enhances native selects; it does not attempt to emulate every browser-specific behavior.

## Development notes

This package is designed around a few core principles:

- Native form state stays canonical.
- Standard HTML attributes stay standard.
- Custom widget behavior lives in `data-*` attributes.
- Internal implementation stays dependency-free and small.

## License

MIT
