# worse-select

Native-first, dependency-free custom selects with search, multi-select, and no framework lock-in.

WorseSelect keeps the native `<select>` as the source of truth and layers a custom UI on top. That means form submission, validation, disabled state, and change events still come from the real control instead of a reimplementation.

## Why use it

Most custom select libraries replace the browser. WorseSelect enhances it.

- Keeps native form behavior intact
- Dependency-free and small
- Framework-agnostic by design
- Works well with Svelte, React, Vue, and plain HTML because it enhances native `<select>` elements instead of replacing them
- Supports dynamically added selects with optional observer-based auto-mount
- Uses standard HTML attributes where possible

## How it works

WorseSelect hides the native `<select>` and renders a companion UI next to it. User interaction updates the native element, and the custom UI syncs from that canonical state. That keeps integration predictable because your app still deals with a real form control.

Options are linked to rendered elements internally, and a `MutationObserver` can keep the UI in sync when options are added, removed, or updated dynamically. That makes the library a good fit for applications that render or change the DOM after initial page load.

When search is enabled, WorseSelect highlights matching options and scrolls the first match into view. It does not try to turn the control into a remote-search or virtualized combobox system.

## Features

- Native-first state model
- Dependency-free
- Searchable option lists with match highlighting
- Listbox support via native `size`
- Multi-select support via native `multiple`
- Dynamic DOM support with optional observer-based auto-mount
- Theming through CSS variables
- Cleanup support for SPA usage

## Status

WorseSelect is suitable for early production use in applications that want a native-first custom select without a dependency-heavy abstraction layer.

Keyboard interaction and ARIA state management are built in, but custom select behavior can have browser- and assistive-technology-specific edge cases. Validate the behavior in your target environments before relying on it broadly.

## Performance

WorseSelect is designed to stay small and predictable rather than chase every possible feature.

Its performance story is straightforward:

- No runtime dependency tree to load
- Native `<select>` remains canonical, so form state does not have to be duplicated in a separate model
- Direct DOM enhancement works well in apps that already render standard HTML
- Optional DOM observation is available when you need it, instead of being required for every use case

For typical form UIs, the goal is low overhead, predictable behavior, and simple integration.

## Install

```bash
npm install worse-select
```

## Basic usage

```ts
import { worseSelect } from 'worse-select';

worseSelect();
```

With no arguments, `worseSelect()` scans `document` and enhances every native `<select>` it finds.

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

Custom widget behavior is configured with `data-*` attributes on the native `<select>`.

| Attribute | Type | Default | Description                                 |
|---|---|---|---------------------------------------------|
| `data-searchable` | `true \| false` | `false` | Adds a search input above the options list  |
| `data-dropdown-height-px` | `number` | `500` | Sets the max height of the options scroller |
| `data-width` | `string` | `100%` | Overrides the rendered widget width         |
| `data-height` | `string` | `32px` | Overrides the rendered widget height        |

## Native attributes

These stay native on purpose:

- `size` controls listbox behavior
- `multiple` controls multi-select behavior
- `disabled` disables the control

That split keeps the API aligned with standard HTML instead of introducing parallel widget options.

## API

### `worseSelect()`

```ts
worseSelect(root?: ParentNode, options?: { observe?: boolean }): () => void
```

Enhances native `<select>` elements under the given root.

```ts
worseSelect();                 // same as worseSelect(document)
worseSelect(document);
worseSelect(someContainerElement);
```

To automatically enhance selects added later:

```ts
const cleanup = worseSelect(document, { observe: true });
```

Call the returned cleanup function to disconnect observers and destroy mounted instances.

## Styling

WorseSelect uses CSS custom properties for theming.

```css
:root {
    --ws-border-color: #767676;
    --ws-border-radius: 2px;
    --ws-bg: #fff;
    --ws-text-color: inherit;
    --ws-disabled-bg: #f0f0f0;
    --ws-disabled-text-color: #6d6d6d;
    --ws-hover-bg: #e8f0fe;
    --ws-active-bg: #eef4ff;
    --ws-active-outline: #2563eb;
    --ws-selected-bg: #d2e3fc;
    --ws-selected-text-color: #174ea6;
    --ws-focus-outline: #2563eb;
    --ws-search-border-color: #b7b7b7;
    --ws-divider-color: #d0d0d0;
    --ws-highlight-bg: #fff3a3;
    --ws-shadow: 0 4px 12px rgba(0, 0, 0, 0.16);
}
```

Override only what you need.

## Limitations

- This package enhances native selects; it does not try to reproduce every browser-specific select behavior
- Runtime changes to `size` or `multiple` may be better handled with teardown and remount if the control changes mode significantly
- It is designed to stay small and predictable rather than cover every possible custom-select feature
- It is not intended to replace virtualization, async search, or full combobox-style widgets

## Philosophy

WorseSelect is built around a few rules:

- Native form state stays canonical
- Standard HTML attributes stay standard
- Custom behavior lives in `data-*` attributes
- Keep the code small
- Prefer predictable behavior over feature creep

## License

AGPL-3.0-or-later
