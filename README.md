# worse-select

Native-first, dependency-free custom selects with search, multi-select, a plugin API, and no framework lock-in.

**[Live demo](https://solox174.github.io/WorseSelect/)** · **[npm](https://www.npmjs.com/package/worse-select)**

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
- Searchable option lists with match highlighting and screen reader announcements (matches are highlighted and scrolled into view; non-matching options stay visible to preserve context)
- Listbox mode via native `size`
- Multi-select via native `multiple`
- Type-ahead option find
- Placeholder option support via the conventional `<option value="" disabled>` pattern
- Dynamic DOM support with optional observer-based auto-mount
- Dark mode — follows the page preference automatically when it declares dark mode support
- Theming through CSS custom properties
- Full keyboard navigation with ARIA state management
- Plugin API for extending or replacing built-in behavior
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

### Option groups

```html
<select>
  <optgroup label="Cars">
    <option value="ford">Ford</option>
    <option value="honda">Honda</option>
  </optgroup>
  <optgroup label="Discontinued" disabled>
    <option value="pontiac">Pontiac</option>
    <option value="oldsmobile">Oldsmobile</option>
  </optgroup>
</select>
```

Disabled optgroups propagate to their child options automatically.

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
import { worseSelect } from 'worse-select';
import type { Plugin, PluginContext } from 'worse-select';

worseSelect(root?: ParentNode, options?: { observe?: boolean; plugins?: Plugin[] }): () => void
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

## Plugins

The plugin API is how you extend worse-select with custom behavior. It is also how worse-select grows — the built-in search is itself a plugin, and new first-party features will be added the same way. That means the API gets the same level of care as everything else in the library.

A plugin is a factory function that returns a `Plugin` object:

```ts
import { worseSelect } from 'worse-select';
import type { Plugin, PluginContext } from 'worse-select';

function createMyPlugin(): Plugin {
    return {
        name: 'my-plugin',
        init(context: PluginContext) {
            // use context.on() so event listeners are removed automatically on destroy
            context.on(context.headerElement, 'click', () => { /* ... */ });
        },
        onOpen() { /* dropdown opened */ },
        onClose() { /* dropdown closed */ },
        onSync() { /* native select state changed */ },
        destroy() { /* instance torn down */ },
    };
}

worseSelect(document, {
    plugins: [createMyPlugin()]
});
```

`PluginContext` gives access to the widget elements and a small utility API:

| Property / Method | Description |
|---|---|
| `selectElement` | The native `<select>` |
| `headerElement` | The trigger button |
| `optionsListElement` | The options scroller |
| `searchInputElement` | The search input, if `data-searchable="true"` |
| `setMessage(text)` | Posts a message to the visually-hidden live region for screen readers |
| `clearMessage()` | Clears the live region |
| `on(target, event, handler)` | Registers an event listener that is removed automatically when the instance is destroyed |

> `PluginContext` exposes live DOM elements owned by worse-select. Attaching listeners via `context.on()`, reading state, and applying narrowly scoped classes or attributes is fine — removing or restructuring core elements can break the widget.

### Example: remote search

The built-in search highlights matching options client-side. To replace it with server-side filtering, provide a plugin named `'search'` — worse-select skips the built-in when a plugin with that name is already registered.

Replacing native `<option>` elements triggers worse-select's mutation observer, which rebuilds the option list automatically.

```ts
function createRemoteSearchPlugin(url: string): Plugin {
    return {
        name: 'search', // overrides the built-in search plugin
        init(context) {
            const { searchInputElement, selectElement } = context;
            if (!searchInputElement) return;

            let debounce: ReturnType<typeof setTimeout>;

            context.on(searchInputElement, 'input', (event) => {
                const term = (event.target as HTMLInputElement).value.trim();
                clearTimeout(debounce);

                if (!term) {
                    selectElement.innerHTML = '';
                    context.clearMessage();
                    return;
                }

                debounce = setTimeout(async () => {
                    context.setMessage('Loading...');

                    const res = await fetch(`${url}?q=${encodeURIComponent(term)}`);
                    const items: { value: string; label: string }[] = await res.json();

                    selectElement.innerHTML = items
                        .map(({ value, label }) => `<option value="${value}">${label}</option>`)
                        .join('');

                    context.setMessage(items.length ? `${items.length} results` : 'No results found');
                }, 300);
            });
        },
    };
}

worseSelect(document.querySelector('#my-form')!, {
    plugins: [createRemoteSearchPlugin('/api/search')]
});
```

---

## Dark mode

worse-select reads the `color-scheme` computed on each select element to decide whether to apply dark styles. If the page preference is dark and `color-scheme` includes `dark` on the select or any of its ancestors, the component switches automatically — no configuration needed.

To opt the whole page in:

```css
:root {
    color-scheme: light dark;
}
```

To opt in only a section of the page:

```css
.my-dark-panel {
    color-scheme: light dark;
}
```

worse-select will not apply dark styles to controls outside a dark-mode context, so a light-only page is never affected by the system preference.

---

## Styling

worse-select uses CSS custom properties for theming. Override only what you need.

### Light mode

| Variable | Default |
|---|---|
| `--ws-bg` | `#fff` |
| `--ws-border-color` | `#767676` |
| `--ws-border-radius` | `4px` |
| `--ws-text-color` | `inherit` |
| `--ws-disabled-bg` | `#f0f0f0` |
| `--ws-disabled-text-color` | `#6d6d6d` |
| `--ws-hover-bg` | `#f1f1f1` |
| `--ws-active-bg` | `#eef4ff` |
| `--ws-active-outline` | `#2563eb` |
| `--ws-selected-bg` | `#d2e3fc` |
| `--ws-selected-text-color` | `#174ea6` |
| `--ws-focus-outline` | `#2563eb` |
| `--ws-search-border-color` | `#b7b7b7` |
| `--ws-divider-color` | `#d0d0d0` |
| `--ws-optgroup-label-color` | `#6b7280` |
| `--ws-highlight-bg` | `#fff3a3` |
| `--ws-shadow` | `0 4px 12px rgba(0, 0, 0, 0.16)` |

### Dark mode

Dark mode has its own set of variables so light and dark overrides don't interfere with each other.

| Variable | Default |
|---|---|
| `--ws-dark-bg` | `#1e1e1e` |
| `--ws-dark-border-color` | `#555` |
| `--ws-dark-text-color` | `#e8eaed` |
| `--ws-dark-disabled-bg` | `#2a2a2a` |
| `--ws-dark-disabled-text-color` | `#777` |
| `--ws-dark-hover-bg` | `#3a3a3a` |
| `--ws-dark-active-bg` | `#1a3a5c` |
| `--ws-dark-active-outline` | `#60a5fa` |
| `--ws-dark-selected-bg` | `#1e3a5f` |
| `--ws-dark-selected-text-color` | `#93c5fd` |
| `--ws-dark-focus-outline` | `#60a5fa` |
| `--ws-dark-search-border-color` | `#555` |
| `--ws-dark-divider-color` | `#3a3a3a` |
| `--ws-dark-optgroup-label-color` | `#9ca3af` |
| `--ws-dark-highlight-bg` | `#4a3c00` |
| `--ws-dark-shadow` | `0 4px 12px rgba(0, 0, 0, 0.4)` |

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

- Does not support virtualization or full combobox-style widgets out of the box — async/remote search can be built with a custom plugin (see Plugins)
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

LGPL-3.0-or-later
