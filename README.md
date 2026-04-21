# worse-select

Native-first, dependency-free custom selects with search, multi-select, and no framework lock-in.

The name is intentional. In the Unix tradition of `less` (which does more than `more`), worse-select does *less* than most custom select libraries — by design. It doesn't reimplement form state, validation, or change events. It enhances the browser instead of replacing it.

---

## Why worse-select

Most custom select libraries own the form control. They maintain their own value state, wire up their own change events, and require you to feed them data in a specific format. When something goes wrong, you're debugging their abstraction instead of your app.

worse-select keeps the native `<select>` as the source of truth. It hides the native element, renders a styled companion UI next to it, and syncs from the real control. Form submission, validation, `disabled` state, and `change` events all come from the browser — not from a reimplementation.

That means:

- Drop it into any form and it works with what the browser already does
- No framework adapter needed — it enhances a standard HTML element
- Integrates cleanly with Svelte, React, Vue, and plain HTML
- Dynamically added selects are handled with optional observer-based auto-mount
- Custom behavior lives in `data-*` attributes, keeping the API close to standard HTML

---

## Features

- Native-first state model — `<select>` stays canonical
- Dependency-free
- Searchable option lists with match highlighting and screen reader announcements
- Listbox mode via native `size`
- Multi-select via native `multiple`
- Placeholder option support via the conventional `<option value="" disabled>` pattern
- Dynamic DOM support with optional observer-based auto-mount
- Theming through CSS custom properties
- Full keyboard navigation with ARIA state management
- Cleanup API for SPA usage

---

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

---

## HTML examples

### Single select with placeholder

```html
<select>
  <option value="" disabled selected>Choose one</option>
  <option value="ford">Ford</option>
  <option value="honda">Honda</option>
  <option value="toyota">Toyota</option>
</select>
```

The placeholder text is shown in the button when the dropdown is closed and cleared when it opens.

### Single select with search

```html
<select data-searchable="true">
  <option value="" disabled selected>Choose one</option>
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

---

## Configuration

Custom widget behavior is configured with `data-*` attributes on the native `<select>`.

| Attribute | Type | Default | Description |
|---|---|---|---|
| `data-searchable` | `true \| false` | `false` | Adds a search input above the options list |
| `data-dropdown-height-px` | `number` | `400` | Sets the max height of the options scroller |
| `data-width` | `string` | `100%` | Overrides the rendered widget width |
| `data-height` | `string` | `32px` | Overrides the rendered widget height |

## Native attributes

These stay native on purpose:

- `size` — triggers listbox mode
- `multiple` — enables multi-select
- `disabled` — disables the control

That split keeps the API aligned with standard HTML instead of introducing parallel widget options.

---

## API

### `worseSelect(root?, options?)`

```ts
worseSelect(root?: ParentNode, options?: { observe?: boolean }): () => void
```

Enhances native `<select>` elements under the given root. Safe to call multiple times — each select is mounted at most once.

```ts
worseSelect();                          // scans document
worseSelect(someContainerElement);      // scans a subtree
```

To automatically enhance selects added after the initial call:

```ts
const cleanup = worseSelect(document, { observe: true });
```

The returned cleanup function disconnects observers and destroys all mounted instances under the root. Useful for SPA route teardown.

---

## Styling

worse-select uses CSS custom properties for theming. Override only what you need.

```css
:root {
    --ws-border-color: #767676;
    --ws-border-radius: 2px;
    --ws-bg: #fff;
    --ws-text-color: inherit;
    --ws-disabled-bg: #f0f0f0;
    --ws-disabled-text-color: #6d6d6d;
    --ws-hover-bg: #f1f1f1;
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

---

## Accessibility

Keyboard navigation and ARIA state management are built in:

- Full arrow key, Home/End, Page Up/Down navigation
- `role="listbox"` and `role="option"` with `aria-selected`, `aria-disabled`, and `aria-activedescendant`
- `aria-expanded` on the trigger button
- Screen reader announcements for search results via a visually-hidden live region

Custom select behavior can have browser- and assistive-technology-specific edge cases. Validate in your target environments before relying on it broadly.

---

## Limitations

- Does not support virtualization, async/remote search, or full combobox-style widgets
- Runtime changes to `size` or `multiple` may be better handled with teardown and remount if the control changes mode significantly
- Designed to stay small and predictable — not every possible custom select feature is in scope

---

## Status

Suitable for early production use in applications that want a native-first custom select without a dependency-heavy abstraction layer.

---

## Philosophy

- Native form state stays canonical
- Standard HTML attributes stay standard
- Custom behavior lives in `data-*` attributes
- Keep the code small
- Prefer predictable behavior over feature creep

---

## License

AGPL-3.0-or-later
