// src/worse-select/internal-types.ts
var DEFAULT_CONFIG = {
  searchable: false,
  dropdownHeightPx: 400,
  height: "32px",
  width: "100%"
};

// src/worse-select/css.ts
function createCSS() {
  return (
    /* language=CSS */
    `
    :root {
        --ws-border-color: #767676;
        --ws-border-radius: 4px;
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
        --ws-height: ${DEFAULT_CONFIG.height};
        --ws-motion-duration: 200ms;
        --ws-motion-ease: cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .worse-select-container {
        position: relative;
        display: inline-block;
        min-width: 0;
        font: inherit;
        vertical-align: middle;
        color: var(--ws-text-color);
    }

    .worse-select-container:not(.listbox) {
        height: var(--ws-height);
    }
    
    .worse-select-container.listbox {
        width: 100%;
    }

    .worse-select-header {
        box-sizing: border-box;
        width: ${DEFAULT_CONFIG.width};
        height: var(--ws-height);
        padding: 0 28px 0 8px;
        border: 1px solid var(--ws-border-color);
        border-radius: var(--ws-border-radius);
        background-color: var(--ws-bg);
        color: var(--ws-text-color);
        font: inherit;
        line-height: normal;
        text-align: left;
        cursor: pointer;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .worse-select-header::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 8px;
        width: 10px;
        height: 10px;
        pointer-events: none;
        transform: translateY(-50%) rotate(0deg);
        transform-origin: center;
        transition: transform var(--ws-motion-duration) var(--ws-motion-ease);
        background-repeat: no-repeat;
        background-position: center;
        background-size: 10px 10px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%23333333' stroke-width='1.1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }

    .worse-select-container.open .worse-select-header::after {
        transform: translateY(-50%) rotate(180deg);
    }

    .worse-select-container.listbox .worse-select-header {
        display: none;
    }

    .worse-select-container.disabled .worse-select-header {
        background-color: var(--ws-disabled-bg);
        color: var(--ws-disabled-text-color);
        cursor: not-allowed;
    }

    .worse-select-options-scroller:focus-visible {
        outline: none !important;
    }
    
    .worse-select-header:focus-visible,
    .worse-select-search-input:focus-visible {
        outline: 2px solid var(--ws-focus-outline) !important;
        outline-offset: 1px;
    }

    .worse-select-options {
        box-sizing: border-box;
        position: absolute;
        top: calc(100% + 2px);
        left: 0;
        right: 0;
        z-index: 1000;
        display: none;
        opacity: 0;
        pointer-events: none;
        transform: translateY(-6px);
        border: 1px solid var(--ws-border-color);
        border-radius: var(--ws-border-radius);
        background: var(--ws-bg);
        box-shadow: var(--ws-shadow);
        padding: 2px;
        transform-origin: top center;
        transition:
            display var(--ws-motion-duration) allow-discrete,
            opacity var(--ws-motion-duration) var(--ws-motion-ease),
            transform var(--ws-motion-duration) var(--ws-motion-ease);
    }

    .worse-select-container.open .worse-select-options {
        display: block;
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
        transition:
            display var(--ws-motion-duration) allow-discrete,
            opacity var(--ws-motion-duration) var(--ws-motion-ease),
            transform var(--ws-motion-duration) var(--ws-motion-ease);
    }

    @starting-style {
        .worse-select-container.open .worse-select-options {
            opacity: 0;
            transform: translateY(-6px);
        }
    }

    .worse-select-container.listbox .worse-select-options {
        position: relative;
        top: 0;
        left: 0;
        right: auto;
        display: block;
        box-shadow: none;
        opacity: 1;
        pointer-events: auto;
        transform: none;
        transition: none;
    }

    .worse-select-search {
        padding: 4px;
        border-bottom: 1px solid var(--ws-divider-color);
        margin-bottom: 2px;
    }

    .worse-select-search-input {
        box-sizing: border-box;
        width: 100%;
        height: 32px;
        padding: 0 8px;
        border: 1px solid var(--ws-search-border-color);
        border-radius: var(--ws-border-radius);
        font: inherit;
        color: var(--ws-text-color);
        background: var(--ws-bg);
    }

    .worse-select-container:not(.listbox) .worse-select-options-scroller {
        max-height: ${DEFAULT_CONFIG.dropdownHeightPx}px;
    }
    
    .worse-select-options-scroller {
        overflow-y: auto;
    }

    .worse-select-option {
        padding: 4px 8px;
        border-radius: var(--ws-border-radius);
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--ws-text-color);
    }

    .worse-select-option:hover {
        background: var(--ws-hover-bg);
    }

    .worse-select-option.active {
        background: var(--ws-active-bg);
        outline: 1px solid var(--ws-active-outline);
        outline-offset: -1px;
    }

    .worse-select-option.selected {
        background: var(--ws-selected-bg);
        color: var(--ws-selected-text-color);
    }

    .worse-select-option.selected.active {
        outline: 1px solid var(--ws-active-outline);
        outline-offset: -1px;
    }

    .worse-select-option.disabled {
        color: var(--ws-disabled-text-color);
        cursor: not-allowed;
        background: var(--ws-disabled-bg);
    }


    .worse-select-option.hidden {
        display: none;
    }

    .matches {
        background: var(--ws-highlight-bg);
    }

    .worse-select-visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    @media (prefers-reduced-motion: reduce) {
        .worse-select-header::after,
        .worse-select-options {
            transition: none;
        }
    }

.worse-select-container.dark {
        color-scheme: dark;
        --ws-border-color: var(--ws-dark-border-color, #555);
        --ws-bg: var(--ws-dark-bg, #1e1e1e);
        --ws-text-color: var(--ws-dark-text-color, #e8eaed);
        --ws-disabled-bg: var(--ws-dark-disabled-bg, #2a2a2a);
        --ws-disabled-text-color: var(--ws-dark-disabled-text-color, #777);
        --ws-hover-bg: var(--ws-dark-hover-bg, #3a3a3a);
        --ws-active-bg: var(--ws-dark-active-bg, #1a3a5c);
        --ws-active-outline: var(--ws-dark-active-outline, #60a5fa);
        --ws-selected-bg: var(--ws-dark-selected-bg, #1e3a5f);
        --ws-selected-text-color: var(--ws-dark-selected-text-color, #93c5fd);
        --ws-focus-outline: var(--ws-dark-focus-outline, #60a5fa);
        --ws-search-border-color: var(--ws-dark-search-border-color, #555);
        --ws-divider-color: var(--ws-dark-divider-color, #3a3a3a);
        --ws-highlight-bg: var(--ws-dark-highlight-bg, #4a3c00);
        --ws-shadow: var(--ws-dark-shadow, 0 4px 12px rgba(0, 0, 0, 0.4));
    }
    `
  );
}

// src/worse-select/config.ts
var configKeys = Object.keys(DEFAULT_CONFIG);
function toKebabCase(value) {
  return value.replace(/[A-Z]/g, (character) => `-${character.toLowerCase()}`);
}
function parseConfigValue(key, attr) {
  const defaultValue = DEFAULT_CONFIG[key];
  if (typeof defaultValue === "boolean") {
    return attr === "true";
  }
  if (typeof defaultValue === "number") {
    return Number(attr);
  }
  return attr;
}
function getConfig(selectElement) {
  const config = { ...DEFAULT_CONFIG };
  for (let i = 0; i < configKeys.length; i++) {
    const key = configKeys[i];
    const dataAttributeName = `data-${toKebabCase(key)}`;
    const attr = selectElement.getAttribute(dataAttributeName);
    if (attr === null) continue;
    config[key] = parseConfigValue(key, attr);
  }
  return config;
}

// src/worse-select/select-helpers.ts
function shouldUseListboxMode(worseSelectInstance) {
  return worseSelectInstance.selectElement.size > 1;
}
function isMultipleSelect(worseSelectInstance) {
  return worseSelectInstance.selectElement.multiple;
}
function isPlaceholderOption(selectOption) {
  return selectOption !== null && selectOption.value === "" && selectOption.disabled;
}
function getListBoxHeight(selectElement, worseOptionElement) {
  if (selectElement.size <= 1) return null;
  const oneRowHeight = worseOptionElement.getBoundingClientRect().height;
  const totalHeight = oneRowHeight * selectElement.size;
  const selectParentHeight = selectElement.parentElement?.getBoundingClientRect().height ?? 1e4;
  return Math.min(totalHeight, selectParentHeight) + "px";
}

// src/worse-select/option-map.ts
var optionToDiv = /* @__PURE__ */ new WeakMap();
var divToOption = /* @__PURE__ */ new WeakMap();
function linkOption(selectOption, worseOptionElement) {
  optionToDiv.set(selectOption, worseOptionElement);
  divToOption.set(worseOptionElement, selectOption);
}
function unlinkOption(selectOption) {
  const worseOptionElement = optionToDiv.get(selectOption);
  if (!worseOptionElement) return;
  optionToDiv.delete(selectOption);
  divToOption.delete(worseOptionElement);
}
function getWorseOptionElement(selectOption) {
  return optionToDiv.get(selectOption);
}
function getSelectOptionElement(worseOptionElement) {
  return divToOption.get(worseOptionElement);
}

// src/worse-select/dom.ts
function scrollOptionIntoView(selectOption) {
  if (!selectOption) return;
  const el = getWorseOptionElement(selectOption);
  if (!(el instanceof HTMLDivElement)) return;
  el.scrollIntoView({ block: "nearest" });
}
function buildStyleAttribute(styleParts) {
  return styleParts.length > 0 ? ` style="${styleParts.join(" ")}"` : "";
}
function buildWorseSelectHeaderStyleAttribute(worseSelectInstance) {
  const headerStyleParts = [];
  if (worseSelectInstance.config.width !== DEFAULT_CONFIG.width) {
    headerStyleParts.push(`width: ${worseSelectInstance.config.width};`);
  }
  if (worseSelectInstance.config.height !== DEFAULT_CONFIG.height) {
    headerStyleParts.push(`height: ${worseSelectInstance.config.height};`);
  }
  return buildStyleAttribute(headerStyleParts);
}
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function getOptionId(worseSelectInstance, optionIndex) {
  return `${worseSelectInstance.instanceId}-option-${optionIndex}`;
}
function getWorseOptionClasses(selectOption) {
  const classes = ["worse-select-option"];
  if (selectOption.disabled) {
    classes.push("disabled");
  }
  if (selectOption.selected) {
    classes.push("selected");
  }
  return classes.join(" ");
}
function createWorseOptionHtml(worseSelectInstance, selectOption, optionIndex) {
  const worseOptionClasses = getWorseOptionClasses(selectOption);
  const optionText = selectOption.textContent ?? "";
  return `
    <div id="${getOptionId(worseSelectInstance, optionIndex)}"
         class="${worseOptionClasses}"
         data-value="${escapeHtml(selectOption.value)}"
         role="option"
         aria-selected="${selectOption.selected ? "true" : "false"}"
         aria-disabled="${selectOption.disabled ? "true" : "false"}">
      ${escapeHtml(optionText)}
    </div>
    `;
}
function createWorseOptionElement(worseSelectInstance, selectOption, optionIndex) {
  return document.createRange().createContextualFragment(
    createWorseOptionHtml(worseSelectInstance, selectOption, optionIndex)
  ).firstElementChild;
}
function createSearchHtml(worseSelectInstance) {
  if (!worseSelectInstance.config.searchable) {
    return "";
  }
  return `
    <div class="worse-select-search">
      <input type="text"
             class="worse-select-search-input"
             placeholder="Search list"
             autocomplete="off"
             aria-label="Search options" />
    </div>
    `;
}
function createMessageHtml() {
  return `
    <div class="worse-select-message worse-select-visually-hidden"
         role="status"
         aria-live="polite"
         aria-atomic="true"></div>
    `;
}
function createWorseSelect(worseSelectInstance) {
  const headerStyleAttribute = buildWorseSelectHeaderStyleAttribute(worseSelectInstance);
  const containerClasses = ["worse-select-container"];
  if (shouldUseListboxMode(worseSelectInstance)) {
    containerClasses.push("listbox");
  }
  if (isMultipleSelect(worseSelectInstance)) {
    containerClasses.push("multiple");
  }
  const htmlString = `
    <div class="${containerClasses.join(" ")}">
      <button
        type="button"
        class="worse-select-header"
        aria-haspopup="listbox"
        aria-expanded="false">
        <span class="worse-select-header-label"></span>
      </button>
      <div class="worse-select-options">
        ${createSearchHtml(worseSelectInstance)}
        ${createMessageHtml()}
        <div class="worse-select-options-scroller"${headerStyleAttribute}></div>
      </div>
    </div>
    `;
  const worseSelectElement = document.createRange().createContextualFragment(
    htmlString
  ).firstElementChild;
  const optionsListElement = worseSelectElement.querySelector(".worse-select-options-scroller");
  optionsListElement.setAttribute("role", "listbox");
  optionsListElement.tabIndex = shouldUseListboxMode(worseSelectInstance) ? 0 : -1;
  if (isMultipleSelect(worseSelectInstance)) {
    optionsListElement.setAttribute("aria-multiselectable", "true");
  }
  const selectOptions = Array.from(worseSelectInstance.selectElement.options);
  for (let i = 0; i < selectOptions.length; i++) {
    const selectOption = selectOptions[i];
    const worseOptionElement = createWorseOptionElement(
      worseSelectInstance,
      selectOption,
      i
    );
    linkOption(selectOption, worseOptionElement);
    optionsListElement.appendChild(worseOptionElement);
  }
  return worseSelectElement;
}

// src/worse-select/features/search.ts
function applyHighlight(context, searchTerm) {
  const term = searchTerm.trim().toLowerCase();
  Array.from(context.optionsListElement.children).forEach((worseOption) => {
    if (!(worseOption instanceof HTMLDivElement)) return;
    const matches = term !== "" && worseOption.textContent.toLowerCase().includes(term);
    worseOption.classList.toggle("matches", matches);
  });
  if (!term) {
    context.clearMessage();
    return;
  }
  const matchCount = context.optionsListElement.querySelectorAll(".worse-select-option.matches").length;
  const message = matchCount === 0 ? "No results found" : matchCount === 1 ? "1 result available" : `${matchCount} results available`;
  context.setMessage(message);
  const firstMatch = context.optionsListElement.querySelector(".worse-select-option.matches");
  if (firstMatch instanceof HTMLDivElement) {
    firstMatch.scrollIntoView({ block: "nearest" });
  }
}
function createBuiltinSearchPlugin() {
  let searchTerm = "";
  let pluginContext = null;
  return {
    name: "search",
    init(context) {
      pluginContext = context;
      const { searchInputElement } = context;
      if (!searchInputElement) return;
      context.on(searchInputElement, "input", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement)) return;
        searchTerm = target.value;
        applyHighlight(context, searchTerm);
      });
    },
    onSync() {
      if (!pluginContext) return;
      applyHighlight(pluginContext, searchTerm);
    },
    onClose() {
      if (!pluginContext) return;
      searchTerm = "";
      const { searchInputElement } = pluginContext;
      if (searchInputElement instanceof HTMLInputElement) {
        searchInputElement.value = "";
      }
      applyHighlight(pluginContext, "");
    },
    destroy() {
      pluginContext = null;
      searchTerm = "";
    }
  };
}

// src/worse-select/core.ts
var instances = /* @__PURE__ */ new WeakMap();
var nextInstanceId = 0;
var _WorseSelect = class _WorseSelect {
  constructor(selectElement, config = {}, root = document, plugins = []) {
    this.typeAheadText = "";
    this.typeAheadTimeout = 1e3;
    this.open = false;
    this.plugins = [];
    this.pluginListeners = [];
    this.handleTypeAhead = (e) => {
      if (e.key.length !== 1 || document.activeElement === this.searchInputElement) return;
      const worseOptions = this.optionsListElement?.children;
      this.typeAheadText += e.key;
      let typeAheadText = this.typeAheadText.toLowerCase();
      if (worseOptions && typeAheadText) {
        const matchingWorseOption = Array.from(worseOptions).find((worseOption) => {
          return worseOption.textContent.trim().toLowerCase().startsWith(typeAheadText);
        });
        this.optionsListElement?.querySelector(".active")?.classList.remove("active");
        matchingWorseOption?.classList.add("active");
        if (matchingWorseOption) matchingWorseOption.scrollIntoView({ block: "nearest" });
      }
      if (this.typeAheadTimerId) {
        clearTimeout(this.typeAheadTimerId);
      }
      this.typeAheadTimerId = setTimeout(() => {
        this.typeAheadText = "";
      }, this.typeAheadTimeout);
    };
    this.selectElement = selectElement;
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.root = root;
    this.instanceId = `ws-${++nextInstanceId}`;
    this.plugins = [...plugins];
    if (this.config.searchable && !plugins.some((p) => p.name === "search")) {
      this.plugins.push(createBuiltinSearchPlugin());
    }
  }
  static handleDocumentPointerDown(event) {
    const target = event.target;
    if (!(target instanceof Node)) return;
    for (const instance of _WorseSelect.mountedInstances) {
      if (instance.worseSelectElement && !instance.worseSelectElement.contains(target)) {
        instance.closeDropdown();
      }
    }
  }
  mount() {
    if (this.worseSelectElement) return;
    ensureStyles();
    this.worseSelectElement = createWorseSelect(this);
    this.headerElement = this.worseSelectElement.querySelector(".worse-select-header");
    this.dropdownPanelElement = this.worseSelectElement.querySelector(".worse-select-options");
    this.optionsListElement = this.worseSelectElement.querySelector(".worse-select-options-scroller");
    this.searchInputElement = this.worseSelectElement.querySelector(".worse-select-search-input");
    this.messageElement = this.worseSelectElement.querySelector(".worse-select-message");
    if (_WorseSelect.mountedInstances.size === 0) {
      document.addEventListener("pointerdown", _WorseSelect.handleDocumentPointerDown);
    }
    this.worseSelectElement.addEventListener("keyup", this.handleTypeAhead);
    _WorseSelect.mountedInstances.add(this);
    this.render();
    this.bindEvents();
    this.observeOptions();
    this.initPlugins();
  }
  destroy() {
    this.optionObserver?.disconnect();
    this.optionObserver = void 0;
    for (const plugin of this.plugins) {
      plugin.destroy?.();
    }
    for (const { target, event, handler } of this.pluginListeners) {
      target.removeEventListener(event, handler);
    }
    this.pluginListeners = [];
    this.plugins = [];
    if (this.onSelectChange) {
      this.selectElement.removeEventListener("change", this.onSelectChange);
      this.onSelectChange = void 0;
    }
    if (this.onOptionsClick && this.dropdownPanelElement) {
      this.dropdownPanelElement.removeEventListener("click", this.onOptionsClick);
      this.onOptionsClick = void 0;
    }
    if (this.onHeaderClick && this.headerElement) {
      this.headerElement.removeEventListener("click", this.onHeaderClick);
      this.onHeaderClick = void 0;
    }
    if (this.onHeaderKeyDown && this.headerElement) {
      this.headerElement.removeEventListener("keydown", this.onHeaderKeyDown);
      this.onHeaderKeyDown = void 0;
    }
    if (this.onOptionsKeyDown && this.optionsListElement) {
      this.optionsListElement.removeEventListener("keydown", this.onOptionsKeyDown);
      this.onOptionsKeyDown = void 0;
    }
    if (this.onSearchKeyDown && this.searchInputElement) {
      this.searchInputElement.removeEventListener("keydown", this.onSearchKeyDown);
      this.onSearchKeyDown = void 0;
    }
    if (this.onListboxFocus && this.optionsListElement) {
      this.optionsListElement.removeEventListener("focus", this.onListboxFocus);
      this.onListboxFocus = void 0;
    }
    _WorseSelect.mountedInstances.delete(this);
    if (_WorseSelect.mountedInstances.size === 0) {
      document.removeEventListener("pointerdown", _WorseSelect.handleDocumentPointerDown);
    }
    this.worseSelectElement?.removeEventListener("keyup", this.handleTypeAhead);
    Array.from(this.selectElement.options).forEach(unlinkOption);
    this.worseSelectElement?.remove();
    this.selectElement.style.display = "";
    this.worseSelectElement = void 0;
    this.headerElement = void 0;
    this.dropdownPanelElement = void 0;
    this.optionsListElement = void 0;
    this.searchInputElement = void 0;
    this.messageElement = void 0;
    this.open = false;
    this.activeOption = void 0;
  }
  syncDimensions() {
    const { worseSelectElement, headerElement, optionsListElement, selectElement, config } = this;
    if (!(worseSelectElement instanceof HTMLDivElement)) return;
    if (!(headerElement instanceof HTMLButtonElement)) return;
    if (!(optionsListElement instanceof HTMLDivElement)) return;
    const computedStyle = window.getComputedStyle(selectElement);
    if (computedStyle.width && computedStyle.width !== "auto" && computedStyle.width !== "0px") {
      worseSelectElement.style.width = computedStyle.width;
    }
    headerElement.style.font = computedStyle.font;
    if (shouldUseListboxMode(this)) {
      const firstOption = optionsListElement.children[0];
      const height = firstOption ? getListBoxHeight(selectElement, firstOption) : null;
      if (height) optionsListElement.style.height = height;
    } else {
      optionsListElement.style.maxHeight = `${config.dropdownHeightPx}px`;
    }
  }
  updateOpenState() {
    if (!(this.worseSelectElement instanceof HTMLDivElement)) return;
    const isListboxMode = shouldUseListboxMode(this);
    const isOpen = isListboxMode ? true : this.open;
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches && getComputedStyle(this.selectElement).colorScheme.includes("dark");
    this.worseSelectElement.classList.toggle("open", isOpen);
    this.worseSelectElement.classList.toggle("listbox", isListboxMode);
    this.worseSelectElement.classList.toggle("multiple", isMultipleSelect(this));
    this.worseSelectElement.classList.toggle("dark", isDark);
    if (this.headerElement instanceof HTMLButtonElement) {
      this.headerElement.setAttribute("aria-expanded", String(isOpen));
    }
    if (this.optionsListElement instanceof HTMLDivElement) {
      this.optionsListElement.setAttribute("aria-multiselectable", String(isMultipleSelect(this)));
      this.optionsListElement.tabIndex = isOpen ? 0 : -1;
    }
    this.updateHeaderState();
  }
  updateSelectedState() {
    const { optionsListElement, selectElement } = this;
    if (!(optionsListElement instanceof HTMLDivElement)) return;
    Array.from(optionsListElement.children).forEach((el) => {
      if (!(el instanceof HTMLDivElement)) return;
      el.classList.remove("selected");
      el.setAttribute("aria-selected", "false");
    });
    Array.from(selectElement.options).forEach((selectOption) => {
      if (!selectOption.selected) return;
      if (isPlaceholderOption(selectOption)) return;
      const el = getWorseOptionElement(selectOption);
      el?.classList.add("selected");
      el?.setAttribute("aria-selected", "true");
    });
  }
  updateDisabledState() {
    const { worseSelectElement, selectElement, headerElement, searchInputElement } = this;
    if (!(worseSelectElement instanceof HTMLDivElement)) return;
    worseSelectElement.classList.toggle("disabled", selectElement.disabled);
    if (headerElement instanceof HTMLButtonElement) {
      headerElement.disabled = selectElement.disabled;
      headerElement.setAttribute("aria-disabled", String(selectElement.disabled));
    }
    if (searchInputElement instanceof HTMLInputElement) {
      searchInputElement.disabled = selectElement.disabled;
    }
    Array.from(selectElement.options).forEach((selectOption) => {
      const el = getWorseOptionElement(selectOption);
      el?.classList.toggle("disabled", selectOption.disabled);
      el?.setAttribute("aria-disabled", String(selectOption.disabled));
    });
  }
  updateHeaderState() {
    const { headerElement, selectElement } = this;
    if (!(headerElement instanceof HTMLButtonElement)) return;
    const labelEl = headerElement.querySelector(".worse-select-header-label");
    if (!(labelEl instanceof HTMLSpanElement)) return;
    const selectedOption = selectElement.selectedOptions[0] ?? selectElement.options[selectElement.selectedIndex] ?? null;
    const label = isPlaceholderOption(selectedOption) && this.open ? "" : selectedOption?.textContent?.trim() || "";
    labelEl.textContent = label;
    headerElement.title = label;
    headerElement.setAttribute("aria-label", label ? `Selected: ${label}` : "Select an option");
  }
  updateActiveDescendant() {
    const { optionsListElement, activeOption } = this;
    if (!(optionsListElement instanceof HTMLDivElement)) return;
    if (!activeOption) {
      optionsListElement.removeAttribute("aria-activedescendant");
      return;
    }
    const el = getWorseOptionElement(activeOption);
    if (!(el instanceof HTMLDivElement)) {
      optionsListElement.removeAttribute("aria-activedescendant");
      return;
    }
    optionsListElement.setAttribute("aria-activedescendant", el.id);
  }
  updateActiveOptionState() {
    const { optionsListElement, activeOption } = this;
    if (!(optionsListElement instanceof HTMLDivElement)) return;
    Array.from(optionsListElement.children).forEach((el) => {
      if (el instanceof HTMLDivElement) el.classList.remove("active");
    });
    if (activeOption) {
      getWorseOptionElement(activeOption)?.classList.add("active");
    }
  }
  syncAll() {
    this.updateSelectedState();
    this.updateDisabledState();
    this.updateOpenState();
    this.syncDimensions();
    for (const plugin of this.plugins) {
      plugin.onSync?.();
    }
  }
  setMessage(text) {
    const { messageElement } = this;
    if (!(messageElement instanceof HTMLDivElement)) return;
    messageElement.textContent = "";
    window.setTimeout(() => {
      if (this.messageElement === messageElement) {
        messageElement.textContent = text;
      }
    }, 0);
  }
  clearMessage() {
    if (!(this.messageElement instanceof HTMLDivElement)) return;
    this.messageElement.textContent = "";
  }
  openDropdown() {
    if (this.selectElement.disabled) return;
    if (shouldUseListboxMode(this)) return;
    this.open = true;
    this.updateOpenState();
    for (const plugin of this.plugins) {
      plugin.onOpen?.();
    }
  }
  closeDropdown() {
    if (shouldUseListboxMode(this)) return;
    if (!this.open) return;
    this.open = false;
    for (const plugin of this.plugins) {
      plugin.onClose?.();
    }
    this.root.querySelector(".active")?.classList.remove("active");
    this.updateOpenState();
  }
  toggleDropdown() {
    if (shouldUseListboxMode(this)) return;
    this.open ? this.closeDropdown() : this.openDropdown();
  }
  openDropdownAndFocusList() {
    this.openDropdown();
    const { optionsListElement } = this;
    if (!(optionsListElement instanceof HTMLDivElement)) return;
    optionsListElement.tabIndex = 0;
    optionsListElement.focus();
    scrollOptionIntoView(this.activeOption);
  }
  closeDropdownAndFocusHeader() {
    this.closeDropdown();
    this.headerElement?.focus();
  }
  getVisibleEnabledOptions() {
    return Array.from(this.selectElement.options).filter((opt) => {
      if (opt.disabled) return false;
      return getWorseOptionElement(opt) instanceof HTMLDivElement;
    });
  }
  setActiveOption(selectOption, scroll = true) {
    this.activeOption = selectOption;
    this.updateActiveDescendant();
    this.updateActiveOptionState();
    if (scroll) scrollOptionIntoView(selectOption);
  }
  moveActiveOption(delta) {
    const options = this.getVisibleEnabledOptions();
    if (options.length === 0) return;
    const currentIndex = this.activeOption ? options.indexOf(this.activeOption) : -1;
    const nextIndex = currentIndex === -1 ? delta >= 0 ? 0 : options.length - 1 : Math.max(0, Math.min(options.length - 1, currentIndex + delta));
    this.setActiveOption(options[nextIndex]);
  }
  moveActiveToBoundary(boundary) {
    const options = this.getVisibleEnabledOptions();
    if (options.length === 0) return;
    this.setActiveOption(boundary === "start" ? options[0] : options[options.length - 1]);
  }
  getPageJumpSize() {
    const { optionsListElement } = this;
    if (!(optionsListElement instanceof HTMLDivElement)) return 10;
    const firstOption = Array.from(optionsListElement.querySelectorAll(".worse-select-option")).find((el) => el instanceof HTMLDivElement);
    if (!(firstOption instanceof HTMLDivElement)) return 10;
    const optionHeight = firstOption.offsetHeight || 1;
    return Math.max(1, Math.floor(optionsListElement.clientHeight / optionHeight));
  }
  moveActiveByPage(direction) {
    this.moveActiveOption(this.getPageJumpSize() * direction);
  }
  commitActiveOptionSelection() {
    const { activeOption, selectElement } = this;
    if (!activeOption || activeOption.disabled) return;
    if (selectElement.multiple) {
      activeOption.selected = !activeOption.selected;
    } else {
      selectElement.selectedIndex = Array.from(selectElement.options).indexOf(activeOption);
    }
    selectElement.dispatchEvent(new Event("change", { bubbles: true }));
  }
  initPlugins() {
    if (!(this.headerElement instanceof HTMLButtonElement)) return;
    if (!(this.optionsListElement instanceof HTMLDivElement)) return;
    const context = {
      selectElement: this.selectElement,
      headerElement: this.headerElement,
      optionsListElement: this.optionsListElement,
      searchInputElement: this.searchInputElement,
      setMessage: (text) => this.setMessage(text),
      clearMessage: () => this.clearMessage(),
      on: (target, event, handler) => {
        target.addEventListener(event, handler);
        this.pluginListeners.push({ target, event, handler });
      }
    };
    for (const plugin of this.plugins) {
      plugin.init(context);
    }
  }
  // Keyboard contracts for header, list, and search are kept together here — splitting them
  // would scatter related key handling across multiple methods. If this grows significantly,
  // consider breaking out per-component handlers.
  bindEvents() {
    const { worseSelectElement, selectElement, dropdownPanelElement, optionsListElement, headerElement, searchInputElement } = this;
    if (!(worseSelectElement instanceof HTMLDivElement)) return;
    if (!(dropdownPanelElement instanceof HTMLDivElement)) return;
    if (!(optionsListElement instanceof HTMLDivElement)) return;
    if (!(headerElement instanceof HTMLButtonElement)) return;
    const onOptionsClick = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const optionEl = target.closest(".worse-select-option");
      if (!(optionEl instanceof HTMLDivElement)) return;
      if (!dropdownPanelElement.contains(optionEl)) return;
      if (optionEl.classList.contains("disabled")) return;
      const selectOption = getSelectOptionElement(optionEl);
      if (!selectOption || selectOption.disabled) return;
      this.setActiveOption(selectOption, false);
      if (selectElement.multiple) {
        selectOption.selected = !selectOption.selected;
      } else {
        selectElement.selectedIndex = Array.from(selectElement.options).indexOf(selectOption);
      }
      selectElement.dispatchEvent(new Event("change", { bubbles: true }));
      this.closeDropdown();
    };
    const onSelectChange = () => this.syncAll();
    const onHeaderClick = () => this.toggleDropdown();
    const onHeaderKeyDown = (event) => {
      if (!(event instanceof KeyboardEvent)) return;
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          this.openDropdownAndFocusList();
          this.moveActiveOption(1);
          break;
        case "ArrowUp":
          event.preventDefault();
          this.openDropdownAndFocusList();
          this.moveActiveOption(-1);
          break;
        case "Home":
          event.preventDefault();
          this.openDropdownAndFocusList();
          this.moveActiveToBoundary("start");
          break;
        case "End":
          event.preventDefault();
          this.openDropdownAndFocusList();
          this.moveActiveToBoundary("end");
          break;
        case "PageDown":
          event.preventDefault();
          this.openDropdownAndFocusList();
          this.moveActiveByPage(1);
          break;
        case "PageUp":
          event.preventDefault();
          this.openDropdownAndFocusList();
          this.moveActiveByPage(-1);
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          this.open ? this.closeDropdownAndFocusHeader() : this.openDropdownAndFocusList();
          break;
      }
    };
    const onOptionsKeyDown = (event) => {
      if (!(event instanceof KeyboardEvent)) return;
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          this.moveActiveOption(1);
          break;
        case "ArrowUp":
          event.preventDefault();
          this.moveActiveOption(-1);
          break;
        case "Home":
          event.preventDefault();
          this.moveActiveToBoundary("start");
          break;
        case "End":
          event.preventDefault();
          this.moveActiveToBoundary("end");
          break;
        case "PageDown":
          event.preventDefault();
          this.moveActiveByPage(1);
          break;
        case "PageUp":
          event.preventDefault();
          this.moveActiveByPage(-1);
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          this.commitActiveOptionSelection();
          if (!selectElement.multiple) this.closeDropdownAndFocusHeader();
          break;
        case "Escape":
          event.preventDefault();
          this.closeDropdownAndFocusHeader();
          break;
      }
    };
    const onSearchKeyDown = (event) => {
      if (!(event instanceof KeyboardEvent)) return;
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          optionsListElement.focus();
          this.moveActiveOption(1);
          break;
        case "ArrowUp":
          event.preventDefault();
          optionsListElement.focus();
          this.moveActiveOption(-1);
          break;
        case "Home":
          event.preventDefault();
          optionsListElement.focus();
          this.moveActiveToBoundary("start");
          break;
        case "End":
          event.preventDefault();
          optionsListElement.focus();
          this.moveActiveToBoundary("end");
          break;
        case "PageDown":
          event.preventDefault();
          optionsListElement.focus();
          this.moveActiveByPage(1);
          break;
        case "PageUp":
          event.preventDefault();
          optionsListElement.focus();
          this.moveActiveByPage(-1);
          break;
        case "Escape":
          event.preventDefault();
          this.closeDropdownAndFocusHeader();
          break;
      }
    };
    dropdownPanelElement.addEventListener("click", onOptionsClick);
    selectElement.addEventListener("change", onSelectChange);
    headerElement.addEventListener("click", onHeaderClick);
    headerElement.addEventListener("keydown", onHeaderKeyDown);
    optionsListElement.addEventListener("keydown", onOptionsKeyDown);
    const onListboxFocus = () => {
      if (!shouldUseListboxMode(this) || this.activeOption) return;
      const selected = Array.from(selectElement.options).find((o) => o.selected && !isPlaceholderOption(o));
      const first = this.getVisibleEnabledOptions()[0];
      const target = selected ?? first;
      if (target) this.setActiveOption(target, true);
    };
    optionsListElement.addEventListener("focus", onListboxFocus);
    if (searchInputElement instanceof HTMLInputElement) {
      searchInputElement.addEventListener("keydown", onSearchKeyDown);
      this.onSearchKeyDown = onSearchKeyDown;
    }
    this.onOptionsClick = onOptionsClick;
    this.onSelectChange = onSelectChange;
    this.onHeaderClick = onHeaderClick;
    this.onHeaderKeyDown = onHeaderKeyDown;
    this.onOptionsKeyDown = onOptionsKeyDown;
    this.onListboxFocus = onListboxFocus;
    this.syncAll();
  }
  // DOM diffing is kept inline here because the mutation cases are tightly coupled to each
  // other and the scroller's child order. If this grows (e.g. option groups, reordering
  // animations), extract into a dedicated reconciler.
  observeOptions() {
    const { selectElement, optionsListElement } = this;
    if (!(optionsListElement instanceof HTMLDivElement)) return;
    const observer = new MutationObserver((mutationList) => {
      let shouldRebuild = false;
      let shouldUpdateState = false;
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          shouldRebuild = true;
          shouldUpdateState = true;
        }
        if (mutation.type === "attributes") {
          shouldUpdateState = true;
        }
      }
      if (shouldRebuild) {
        Array.from(optionsListElement.children).forEach((child) => {
          if (!(child instanceof HTMLDivElement)) return;
          const linkedOption = getSelectOptionElement(child);
          if (!linkedOption || !Array.from(selectElement.options).includes(linkedOption)) {
            if (linkedOption) unlinkOption(linkedOption);
            child.remove();
          }
        });
        Array.from(selectElement.options).forEach((selectOption, optionIndex) => {
          let el = getWorseOptionElement(selectOption);
          if (!(el instanceof HTMLDivElement)) {
            el = createWorseOptionElement(this, selectOption, optionIndex);
            linkOption(selectOption, el);
          }
          el.id = getOptionId(this, optionIndex);
          const currentAtIndex = optionsListElement.children[optionIndex];
          if (currentAtIndex !== el) {
            currentAtIndex ? currentAtIndex.before(el) : optionsListElement.appendChild(el);
          }
        });
        Array.from(optionsListElement.children).forEach((child) => {
          if (child instanceof HTMLDivElement && !getSelectOptionElement(child)) {
            child.remove();
          }
        });
      }
      if (shouldUpdateState) {
        this.syncAll();
      }
    });
    observer.observe(selectElement, {
      childList: true,
      subtree: false,
      attributes: true,
      attributeFilter: ["style", "class", "disabled", "multiple", "size"]
    });
    this.optionObserver = observer;
  }
  render() {
    const { selectElement, worseSelectElement, optionsListElement } = this;
    if (!(worseSelectElement instanceof HTMLDivElement)) return;
    selectElement.style.display = "none";
    selectElement.after(worseSelectElement);
  }
};
// Tracks all mounted instances so a single document-level pointerdown listener can close any
// open dropdown when the user clicks outside, instead of registering one listener per instance.
// Note: `private` is a TypeScript-only constraint and is not enforced in the compiled output.
_WorseSelect.mountedInstances = /* @__PURE__ */ new Set();
var WorseSelect = _WorseSelect;
function worseSelect(root = document, options = {}) {
  const plugins = options.plugins ?? [];
  mountSelectsInRoot(root, plugins);
  let rootObserver;
  if (options.observe) {
    rootObserver = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type !== "childList") continue;
        mutation.addedNodes.forEach((addedNode) => {
          if (!(addedNode instanceof Element)) return;
          if (addedNode instanceof HTMLSelectElement) {
            mountSelectElement(addedNode, root, plugins);
            return;
          }
          addedNode.querySelectorAll("select").forEach((el) => {
            mountSelectElement(el, root, plugins);
          });
        });
      }
    });
    rootObserver.observe(root, { childList: true, subtree: true });
  }
  return () => {
    rootObserver?.disconnect();
    getSelectElementsInRoot(root).forEach((selectElement) => {
      const instance = instances.get(selectElement);
      if (!instance) return;
      instance.destroy();
      instances.delete(selectElement);
    });
  };
}
function ensureStyles() {
  if (document.querySelector('[data-worse-select-styles="true"]')) return;
  const styleElement = document.createElement("style");
  styleElement.setAttribute("data-worse-select-styles", "true");
  styleElement.textContent = createCSS();
  document.head.appendChild(styleElement);
}
function getSelectElementsInRoot(root) {
  return Array.from(root.querySelectorAll("select"));
}
function mountSelectsInRoot(root, plugins) {
  getSelectElementsInRoot(root).forEach((selectElement) => mountSelectElement(selectElement, root, plugins));
}
function mountSelectElement(selectElement, root, plugins) {
  if (instances.get(selectElement)) return;
  const instance = new WorseSelect(selectElement, getConfig(selectElement), root, plugins);
  instance.mount();
  instances.set(selectElement, instance);
}
export {
  worseSelect
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3dvcnNlLXNlbGVjdC9pbnRlcm5hbC10eXBlcy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2Nzcy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2NvbmZpZy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L3NlbGVjdC1oZWxwZXJzLnRzIiwgIi4uL3NyYy93b3JzZS1zZWxlY3Qvb3B0aW9uLW1hcC50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2RvbS50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2ZlYXR1cmVzL3NlYXJjaC50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2NvcmUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTkZJRyA9IHtcbiAgICBzZWFyY2hhYmxlOiBmYWxzZSxcbiAgICBkcm9wZG93bkhlaWdodFB4OiA0MDAsXG4gICAgaGVpZ2h0OiAnMzJweCcsXG4gICAgd2lkdGg6ICcxMDAlJ1xufTtcblxuLy8gTWFwcyBlYWNoIGNvbmZpZyB2YWx1ZSB0byBpdHMgd2lkZW5lZCBwcmltaXRpdmUgdHlwZSAoZS5nLiB0cnVlIFx1MjE5MiBib29sZWFuKSBzbyB0aGF0XG4vLyBTZWxlY3RDb25maWcgYWNjZXB0cyBhbnkgdmFsaWQgdmFsdWUgb2YgdGhhdCB0eXBlLCBub3QganVzdCB0aGUgc3BlY2lmaWMgZGVmYXVsdCBsaXRlcmFsLlxuZXhwb3J0IHR5cGUgV2lkZW48VD4gPSBUIGV4dGVuZHMgYm9vbGVhbiA/IGJvb2xlYW4gOiBUIGV4dGVuZHMgc3RyaW5nID8gc3RyaW5nIDogVCBleHRlbmRzIG51bWJlciA/IG51bWJlciA6IFQ7XG5cbmV4cG9ydCB0eXBlIFNlbGVjdENvbmZpZyA9IHtcbiAgICBbSyBpbiBrZXlvZiB0eXBlb2YgREVGQVVMVF9DT05GSUddOiBXaWRlbjwodHlwZW9mIERFRkFVTFRfQ09ORklHKVtLXT5cbn07XG5cbmV4cG9ydCB0eXBlIENvbmZpZ0tleSA9IGtleW9mIFNlbGVjdENvbmZpZztcbmV4cG9ydCB0eXBlIFJvb3ROb2RlID0gUGFyZW50Tm9kZTtcblxuZXhwb3J0IHR5cGUgUGx1Z2luQ29udGV4dCA9IHtcbiAgICByZWFkb25seSBzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICByZWFkb25seSBoZWFkZXJFbGVtZW50OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICByZWFkb25seSBvcHRpb25zTGlzdEVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xuICAgIHJlYWRvbmx5IHNlYXJjaElucHV0RWxlbWVudD86IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgc2V0TWVzc2FnZSh0ZXh0OiBzdHJpbmcpOiB2b2lkO1xuICAgIGNsZWFyTWVzc2FnZSgpOiB2b2lkO1xuICAgIG9uKHRhcmdldDogRXZlbnRUYXJnZXQsIGV2ZW50OiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIpOiB2b2lkO1xufTtcblxuZXhwb3J0IHR5cGUgUGx1Z2luID0ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBpbml0KGNvbnRleHQ6IFBsdWdpbkNvbnRleHQpOiB2b2lkO1xuICAgIG9uU3luYz8oKTogdm9pZDtcbiAgICBvbk9wZW4/KCk6IHZvaWQ7XG4gICAgb25DbG9zZT8oKTogdm9pZDtcbiAgICBkZXN0cm95PygpOiB2b2lkO1xufTtcblxuZXhwb3J0IHR5cGUgV29yc2VTZWxlY3RPcHRpb25zID0ge1xuICAgIG9ic2VydmU/OiBib29sZWFuO1xuICAgIHBsdWdpbnM/OiBQbHVnaW5bXTtcbn07XG5cbi8vIE1pbmltYWwgaW50ZXJmYWNlIGV4cG9zZWQgdG8gZG9tLnRzIGFuZCBzZWxlY3QtaGVscGVycy50cy4gUmVzdHJpY3RzIHRob3NlIG1vZHVsZXMgdG8gdGhlXG4vLyBwcm9wZXJ0aWVzIHRoZXkgYWN0dWFsbHkgbmVlZCwga2VlcGluZyB0aGUgZnVsbCBXb3JzZVNlbGVjdCBjbGFzcyBpbnRlcm5hbCB0byBjb3JlLnRzLlxuZXhwb3J0IGludGVyZmFjZSBXb3JzZVNlbGVjdENvbnRleHQge1xuICAgIHNlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIGNvbmZpZzogU2VsZWN0Q29uZmlnO1xuICAgIGluc3RhbmNlSWQ6IHN0cmluZztcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQgeyBERUZBVUxUX0NPTkZJRyB9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ1NTKCkge1xuICAgIHJldHVybiAgLyogbGFuZ3VhZ2U9Q1NTICovIGBcbiAgICA6cm9vdCB7XG4gICAgICAgIC0td3MtYm9yZGVyLWNvbG9yOiAjNzY3Njc2O1xuICAgICAgICAtLXdzLWJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgLS13cy1iZzogI2ZmZjtcbiAgICAgICAgLS13cy10ZXh0LWNvbG9yOiBpbmhlcml0O1xuICAgICAgICAtLXdzLWRpc2FibGVkLWJnOiAjZjBmMGYwO1xuICAgICAgICAtLXdzLWRpc2FibGVkLXRleHQtY29sb3I6ICM2ZDZkNmQ7XG4gICAgICAgIC0td3MtaG92ZXItYmc6ICNmMWYxZjE7XG4gICAgICAgIC0td3MtYWN0aXZlLWJnOiAjZWVmNGZmO1xuICAgICAgICAtLXdzLWFjdGl2ZS1vdXRsaW5lOiAjMjU2M2ViO1xuICAgICAgICAtLXdzLXNlbGVjdGVkLWJnOiAjZDJlM2ZjO1xuICAgICAgICAtLXdzLXNlbGVjdGVkLXRleHQtY29sb3I6ICMxNzRlYTY7XG4gICAgICAgIC0td3MtZm9jdXMtb3V0bGluZTogIzI1NjNlYjtcbiAgICAgICAgLS13cy1zZWFyY2gtYm9yZGVyLWNvbG9yOiAjYjdiN2I3O1xuICAgICAgICAtLXdzLWRpdmlkZXItY29sb3I6ICNkMGQwZDA7XG4gICAgICAgIC0td3MtaGlnaGxpZ2h0LWJnOiAjZmZmM2EzO1xuICAgICAgICAtLXdzLXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTYpO1xuICAgICAgICAtLXdzLWhlaWdodDogJHtERUZBVUxUX0NPTkZJRy5oZWlnaHR9O1xuICAgICAgICAtLXdzLW1vdGlvbi1kdXJhdGlvbjogMjAwbXM7XG4gICAgICAgIC0td3MtbW90aW9uLWVhc2U6IGN1YmljLWJlemllcigwLjE2LCAxLCAwLjMsIDEpO1xuICAgIH1cbiAgICBcbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBtaW4td2lkdGg6IDA7XG4gICAgICAgIGZvbnQ6IGluaGVyaXQ7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy10ZXh0LWNvbG9yKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lcjpub3QoLmxpc3Rib3gpIHtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS13cy1oZWlnaHQpO1xuICAgIH1cbiAgICBcbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5saXN0Ym94IHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1oZWFkZXIge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB3aWR0aDogJHtERUZBVUxUX0NPTkZJRy53aWR0aH07XG4gICAgICAgIGhlaWdodDogdmFyKC0td3MtaGVpZ2h0KTtcbiAgICAgICAgcGFkZGluZzogMCAyOHB4IDAgOHB4O1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS13cy1ib3JkZXItY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td3MtYmcpO1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtdGV4dC1jb2xvcik7XG4gICAgICAgIGZvbnQ6IGluaGVyaXQ7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7XG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWhlYWRlcjo6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICByaWdodDogOHB4O1xuICAgICAgICB3aWR0aDogMTBweDtcbiAgICAgICAgaGVpZ2h0OiAxMHB4O1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpIHJvdGF0ZSgwZGVnKTtcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xuICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gdmFyKC0td3MtbW90aW9uLWR1cmF0aW9uKSB2YXIoLS13cy1tb3Rpb24tZWFzZSk7XG4gICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiAxMHB4IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTInIGhlaWdodD0nMTInIHZpZXdCb3g9JzAgMCAxMiAxMicgZmlsbD0nbm9uZSclM0UlM0NwYXRoIGQ9J00zIDQuNUw2IDcuNUw5IDQuNScgc3Ryb2tlPSclMjMzMzMzMzMnIHN0cm9rZS13aWR0aD0nMS4xJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLyUzRSUzQy9zdmclM0VcIik7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIub3BlbiAud29yc2Utc2VsZWN0LWhlYWRlcjo6YWZ0ZXIge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSkgcm90YXRlKDE4MGRlZyk7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIubGlzdGJveCAud29yc2Utc2VsZWN0LWhlYWRlciB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIuZGlzYWJsZWQgLndvcnNlLXNlbGVjdC1oZWFkZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13cy1kaXNhYmxlZC1iZyk7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy1kaXNhYmxlZC10ZXh0LWNvbG9yKTtcbiAgICAgICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXI6Zm9jdXMtdmlzaWJsZSB7XG4gICAgICAgIG91dGxpbmU6IG5vbmUgIWltcG9ydGFudDtcbiAgICB9XG4gICAgXG4gICAgLndvcnNlLXNlbGVjdC1oZWFkZXI6Zm9jdXMtdmlzaWJsZSxcbiAgICAud29yc2Utc2VsZWN0LXNlYXJjaC1pbnB1dDpmb2N1cy12aXNpYmxlIHtcbiAgICAgICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXdzLWZvY3VzLW91dGxpbmUpICFpbXBvcnRhbnQ7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAxcHg7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IGNhbGMoMTAwJSArIDJweCk7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICB6LWluZGV4OiAxMDAwO1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02cHgpO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS13cy1ib3JkZXItY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3MtYmcpO1xuICAgICAgICBib3gtc2hhZG93OiB2YXIoLS13cy1zaGFkb3cpO1xuICAgICAgICBwYWRkaW5nOiAycHg7XG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IHRvcCBjZW50ZXI7XG4gICAgICAgIHRyYW5zaXRpb246XG4gICAgICAgICAgICBkaXNwbGF5IHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgYWxsb3ctZGlzY3JldGUsXG4gICAgICAgICAgICBvcGFjaXR5IHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgdmFyKC0td3MtbW90aW9uLWVhc2UpLFxuICAgICAgICAgICAgdHJhbnNmb3JtIHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgdmFyKC0td3MtbW90aW9uLWVhc2UpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLm9wZW4gLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gICAgICAgIHRyYW5zaXRpb246XG4gICAgICAgICAgICBkaXNwbGF5IHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgYWxsb3ctZGlzY3JldGUsXG4gICAgICAgICAgICBvcGFjaXR5IHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgdmFyKC0td3MtbW90aW9uLWVhc2UpLFxuICAgICAgICAgICAgdHJhbnNmb3JtIHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgdmFyKC0td3MtbW90aW9uLWVhc2UpO1xuICAgIH1cblxuICAgIEBzdGFydGluZy1zdHlsZSB7XG4gICAgICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLm9wZW4gLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTZweCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5saXN0Ym94IC53b3JzZS1zZWxlY3Qtb3B0aW9ucyB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICByaWdodDogYXV0bztcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICAgICAgICB0cmFuc2Zvcm06IG5vbmU7XG4gICAgICAgIHRyYW5zaXRpb246IG5vbmU7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1zZWFyY2gge1xuICAgICAgICBwYWRkaW5nOiA0cHg7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS13cy1kaXZpZGVyLWNvbG9yKTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMnB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtc2VhcmNoLWlucHV0IHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMzJweDtcbiAgICAgICAgcGFkZGluZzogMCA4cHg7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXdzLXNlYXJjaC1ib3JkZXItY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgZm9udDogaW5oZXJpdDtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXRleHQtY29sb3IpO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1iZyk7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXI6bm90KC5saXN0Ym94KSAud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXIge1xuICAgICAgICBtYXgtaGVpZ2h0OiAke0RFRkFVTFRfQ09ORklHLmRyb3Bkb3duSGVpZ2h0UHh9cHg7XG4gICAgfVxuICAgIFxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9ucy1zY3JvbGxlciB7XG4gICAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb24ge1xuICAgICAgICBwYWRkaW5nOiA0cHggOHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXRleHQtY29sb3IpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3MtaG92ZXItYmcpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLmFjdGl2ZSB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWFjdGl2ZS1iZyk7XG4gICAgICAgIG91dGxpbmU6IDFweCBzb2xpZCB2YXIoLS13cy1hY3RpdmUtb3V0bGluZSk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAtMXB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLnNlbGVjdGVkIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3Mtc2VsZWN0ZWQtYmcpO1xuICAgICAgICBjb2xvcjogdmFyKC0td3Mtc2VsZWN0ZWQtdGV4dC1jb2xvcik7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb24uc2VsZWN0ZWQuYWN0aXZlIHtcbiAgICAgICAgb3V0bGluZTogMXB4IHNvbGlkIHZhcigtLXdzLWFjdGl2ZS1vdXRsaW5lKTtcbiAgICAgICAgb3V0bGluZS1vZmZzZXQ6IC0xcHg7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb24uZGlzYWJsZWQge1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtZGlzYWJsZWQtdGV4dC1jb2xvcik7XG4gICAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWRpc2FibGVkLWJnKTtcbiAgICB9XG5cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLmhpZGRlbiB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuXG4gICAgLm1hdGNoZXMge1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1oaWdobGlnaHQtYmcpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtdmlzdWFsbHktaGlkZGVuIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogMXB4O1xuICAgICAgICBoZWlnaHQ6IDFweDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgbWFyZ2luOiAtMXB4O1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBjbGlwOiByZWN0KDAsIDAsIDAsIDApO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBib3JkZXI6IDA7XG4gICAgfVxuXG4gICAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgICAgICAgLndvcnNlLXNlbGVjdC1oZWFkZXI6OmFmdGVyLFxuICAgICAgICAud29yc2Utc2VsZWN0LW9wdGlvbnMge1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogbm9uZTtcbiAgICAgICAgfVxuICAgIH1cblxuLndvcnNlLXNlbGVjdC1jb250YWluZXIuZGFyayB7XG4gICAgICAgIGNvbG9yLXNjaGVtZTogZGFyaztcbiAgICAgICAgLS13cy1ib3JkZXItY29sb3I6IHZhcigtLXdzLWRhcmstYm9yZGVyLWNvbG9yLCAjNTU1KTtcbiAgICAgICAgLS13cy1iZzogdmFyKC0td3MtZGFyay1iZywgIzFlMWUxZSk7XG4gICAgICAgIC0td3MtdGV4dC1jb2xvcjogdmFyKC0td3MtZGFyay10ZXh0LWNvbG9yLCAjZThlYWVkKTtcbiAgICAgICAgLS13cy1kaXNhYmxlZC1iZzogdmFyKC0td3MtZGFyay1kaXNhYmxlZC1iZywgIzJhMmEyYSk7XG4gICAgICAgIC0td3MtZGlzYWJsZWQtdGV4dC1jb2xvcjogdmFyKC0td3MtZGFyay1kaXNhYmxlZC10ZXh0LWNvbG9yLCAjNzc3KTtcbiAgICAgICAgLS13cy1ob3Zlci1iZzogdmFyKC0td3MtZGFyay1ob3Zlci1iZywgIzNhM2EzYSk7XG4gICAgICAgIC0td3MtYWN0aXZlLWJnOiB2YXIoLS13cy1kYXJrLWFjdGl2ZS1iZywgIzFhM2E1Yyk7XG4gICAgICAgIC0td3MtYWN0aXZlLW91dGxpbmU6IHZhcigtLXdzLWRhcmstYWN0aXZlLW91dGxpbmUsICM2MGE1ZmEpO1xuICAgICAgICAtLXdzLXNlbGVjdGVkLWJnOiB2YXIoLS13cy1kYXJrLXNlbGVjdGVkLWJnLCAjMWUzYTVmKTtcbiAgICAgICAgLS13cy1zZWxlY3RlZC10ZXh0LWNvbG9yOiB2YXIoLS13cy1kYXJrLXNlbGVjdGVkLXRleHQtY29sb3IsICM5M2M1ZmQpO1xuICAgICAgICAtLXdzLWZvY3VzLW91dGxpbmU6IHZhcigtLXdzLWRhcmstZm9jdXMtb3V0bGluZSwgIzYwYTVmYSk7XG4gICAgICAgIC0td3Mtc2VhcmNoLWJvcmRlci1jb2xvcjogdmFyKC0td3MtZGFyay1zZWFyY2gtYm9yZGVyLWNvbG9yLCAjNTU1KTtcbiAgICAgICAgLS13cy1kaXZpZGVyLWNvbG9yOiB2YXIoLS13cy1kYXJrLWRpdmlkZXItY29sb3IsICMzYTNhM2EpO1xuICAgICAgICAtLXdzLWhpZ2hsaWdodC1iZzogdmFyKC0td3MtZGFyay1oaWdobGlnaHQtYmcsICM0YTNjMDApO1xuICAgICAgICAtLXdzLXNoYWRvdzogdmFyKC0td3MtZGFyay1zaGFkb3csIDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjQpKTtcbiAgICB9XG4gICAgYDtcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQge0NvbmZpZ0tleSwgREVGQVVMVF9DT05GSUcsIFNlbGVjdENvbmZpZ30gZnJvbSBcIi4vaW50ZXJuYWwtdHlwZXNcIjtcblxuY29uc3QgY29uZmlnS2V5cyA9IE9iamVjdC5rZXlzKERFRkFVTFRfQ09ORklHKSBhcyBDb25maWdLZXlbXTtcblxuZnVuY3Rpb24gdG9LZWJhYkNhc2UodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9bQS1aXS9nLCBjaGFyYWN0ZXIgPT4gYC0ke2NoYXJhY3Rlci50b0xvd2VyQ2FzZSgpfWApO1xufVxuXG5mdW5jdGlvbiBwYXJzZUNvbmZpZ1ZhbHVlPEsgZXh0ZW5kcyBDb25maWdLZXk+KGtleTogSywgYXR0cjogc3RyaW5nKTogU2VsZWN0Q29uZmlnW0tdIHtcbiAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSBERUZBVUxUX0NPTkZJR1trZXldO1xuXG4gICAgaWYgKHR5cGVvZiBkZWZhdWx0VmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICByZXR1cm4gKGF0dHIgPT09ICd0cnVlJykgYXMgU2VsZWN0Q29uZmlnW0tdO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGVmYXVsdFZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gTnVtYmVyKGF0dHIpIGFzIFNlbGVjdENvbmZpZ1tLXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXR0ciBhcyBTZWxlY3RDb25maWdbS107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb25maWcoc2VsZWN0RWxlbWVudDogRWxlbWVudCk6IFNlbGVjdENvbmZpZyB7XG4gICAgY29uc3QgY29uZmlnOiBTZWxlY3RDb25maWcgPSB7IC4uLkRFRkFVTFRfQ09ORklHIH07XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZ0tleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qga2V5ID0gY29uZmlnS2V5c1tpXTtcbiAgICAgICAgY29uc3QgZGF0YUF0dHJpYnV0ZU5hbWUgPSBgZGF0YS0ke3RvS2ViYWJDYXNlKGtleSl9YDtcbiAgICAgICAgY29uc3QgYXR0ciA9IHNlbGVjdEVsZW1lbnQuZ2V0QXR0cmlidXRlKGRhdGFBdHRyaWJ1dGVOYW1lKTtcblxuICAgICAgICBpZiAoYXR0ciA9PT0gbnVsbCkgY29udGludWU7XG5cbiAgICAgICAgKGNvbmZpZyBhcyBSZWNvcmQ8Q29uZmlnS2V5LCBzdHJpbmcgfCBib29sZWFuIHwgbnVtYmVyPilba2V5XSA9IHBhcnNlQ29uZmlnVmFsdWUoa2V5LCBhdHRyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uZmlnO1xufSIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQge1dvcnNlU2VsZWN0Q29udGV4dH0gZnJvbSBcIi4vaW50ZXJuYWwtdHlwZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZFVzZUxpc3Rib3hNb2RlKHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCkge1xuICAgIHJldHVybiB3b3JzZVNlbGVjdEluc3RhbmNlLnNlbGVjdEVsZW1lbnQuc2l6ZSA+IDE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc011bHRpcGxlU2VsZWN0KHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCkge1xuICAgIHJldHVybiB3b3JzZVNlbGVjdEluc3RhbmNlLnNlbGVjdEVsZW1lbnQubXVsdGlwbGU7XG59XG5cbi8vIE1hdGNoZXMgdGhlIGNvbnZlbnRpb25hbCBIVE1MIHBsYWNlaG9sZGVyIHBhdHRlcm46IDxvcHRpb24gdmFsdWU9XCJcIiBkaXNhYmxlZD5MYWJlbDwvb3B0aW9uPi5cbi8vIE9wdGlvbnMgdGhhdCBhcmUgbm90IGRpc2FibGVkIG9yIGhhdmUgYSBub24tZW1wdHkgdmFsdWUgYXJlIHRyZWF0ZWQgYXMgc2VsZWN0YWJsZS5cbmV4cG9ydCBmdW5jdGlvbiBpc1BsYWNlaG9sZGVyT3B0aW9uKHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQgfCBudWxsKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHNlbGVjdE9wdGlvbiAhPT0gbnVsbCAmJiBzZWxlY3RPcHRpb24udmFsdWUgPT09ICcnICYmIHNlbGVjdE9wdGlvbi5kaXNhYmxlZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldExpc3RCb3hIZWlnaHQoc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQsIHdvcnNlT3B0aW9uRWxlbWVudDogSFRNTERpdkVsZW1lbnQpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAoc2VsZWN0RWxlbWVudC5zaXplIDw9IDEpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3Qgb25lUm93SGVpZ2h0ID0gd29yc2VPcHRpb25FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICBjb25zdCB0b3RhbEhlaWdodCA9IG9uZVJvd0hlaWdodCAqIHNlbGVjdEVsZW1lbnQuc2l6ZTtcblxuICAgIGNvbnN0IHNlbGVjdFBhcmVudEhlaWdodCA9IHNlbGVjdEVsZW1lbnQucGFyZW50RWxlbWVudD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0ID8/IDEwMDAwO1xuICAgIHJldHVybiBNYXRoLm1pbih0b3RhbEhlaWdodCwgc2VsZWN0UGFyZW50SGVpZ2h0KSArICdweCc7XG59IiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbi8vIFR3byBXZWFrTWFwcyBtYWludGFpbiBhIGJpZGlyZWN0aW9uYWwgbGluayBiZXR3ZWVuIG5hdGl2ZSA8b3B0aW9uPiBlbGVtZW50cyBhbmQgdGhlaXJcbi8vIHJlbmRlcmVkIHdpZGdldCBkaXZzLiBXZWFrTWFwIGtleXMgYWxsb3cgR0MgdG8gcmVjbGFpbSBlbGVtZW50cyByZW1vdmVkIGZyb20gdGhlIERPTVxuLy8gd2l0aG91dCByZXF1aXJpbmcgZXhwbGljaXQgY2xlYW51cCBvbiBldmVyeSByZW1vdmFsIHBhdGguXG5jb25zdCBvcHRpb25Ub0RpdiA9IG5ldyBXZWFrTWFwPEhUTUxPcHRpb25FbGVtZW50LCBIVE1MRGl2RWxlbWVudD4oKTtcbmNvbnN0IGRpdlRvT3B0aW9uID0gbmV3IFdlYWtNYXA8SFRNTERpdkVsZW1lbnQsIEhUTUxPcHRpb25FbGVtZW50PigpO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5rT3B0aW9uKHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQsIHdvcnNlT3B0aW9uRWxlbWVudDogSFRNTERpdkVsZW1lbnQpIHtcbiAgICBvcHRpb25Ub0Rpdi5zZXQoc2VsZWN0T3B0aW9uLCB3b3JzZU9wdGlvbkVsZW1lbnQpO1xuICAgIGRpdlRvT3B0aW9uLnNldCh3b3JzZU9wdGlvbkVsZW1lbnQsIHNlbGVjdE9wdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmxpbmtPcHRpb24oc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCkge1xuICAgIGNvbnN0IHdvcnNlT3B0aW9uRWxlbWVudCA9IG9wdGlvblRvRGl2LmdldChzZWxlY3RPcHRpb24pO1xuICAgIGlmICghd29yc2VPcHRpb25FbGVtZW50KSByZXR1cm47XG5cbiAgICBvcHRpb25Ub0Rpdi5kZWxldGUoc2VsZWN0T3B0aW9uKTtcbiAgICBkaXZUb09wdGlvbi5kZWxldGUod29yc2VPcHRpb25FbGVtZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdvcnNlT3B0aW9uRWxlbWVudChzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50KSB7XG4gICAgcmV0dXJuIG9wdGlvblRvRGl2LmdldChzZWxlY3RPcHRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VsZWN0T3B0aW9uRWxlbWVudCh3b3JzZU9wdGlvbkVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KSB7XG4gICAgcmV0dXJuIGRpdlRvT3B0aW9uLmdldCh3b3JzZU9wdGlvbkVsZW1lbnQpO1xufSIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQgeyBERUZBVUxUX0NPTkZJRywgV29yc2VTZWxlY3RDb250ZXh0IH0gZnJvbSAnLi9pbnRlcm5hbC10eXBlcyc7XG5pbXBvcnQgeyBpc011bHRpcGxlU2VsZWN0LCBzaG91bGRVc2VMaXN0Ym94TW9kZSB9IGZyb20gJy4vc2VsZWN0LWhlbHBlcnMnO1xuaW1wb3J0IHsgZ2V0V29yc2VPcHRpb25FbGVtZW50LCBsaW5rT3B0aW9uIH0gZnJvbSAnLi9vcHRpb24tbWFwJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbE9wdGlvbkludG9WaWV3KHNlbGVjdE9wdGlvbj86IEhUTUxPcHRpb25FbGVtZW50KSB7XG4gICAgaWYgKCFzZWxlY3RPcHRpb24pIHJldHVybjtcbiAgICBjb25zdCBlbCA9IGdldFdvcnNlT3B0aW9uRWxlbWVudChzZWxlY3RPcHRpb24pO1xuICAgIGlmICghKGVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgZWwuc2Nyb2xsSW50b1ZpZXcoeyBibG9jazogJ25lYXJlc3QnIH0pO1xufVxuXG5cbmZ1bmN0aW9uIGJ1aWxkU3R5bGVBdHRyaWJ1dGUoc3R5bGVQYXJ0czogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gc3R5bGVQYXJ0cy5sZW5ndGggPiAwID8gYCBzdHlsZT1cIiR7c3R5bGVQYXJ0cy5qb2luKCcgJyl9XCJgIDogJyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFdvcnNlU2VsZWN0SGVhZGVyU3R5bGVBdHRyaWJ1dGUod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgY29uc3QgaGVhZGVyU3R5bGVQYXJ0czogc3RyaW5nW10gPSBbXTtcblxuICAgIGlmICh3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy53aWR0aCAhPT0gREVGQVVMVF9DT05GSUcud2lkdGgpIHtcbiAgICAgICAgaGVhZGVyU3R5bGVQYXJ0cy5wdXNoKGB3aWR0aDogJHt3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy53aWR0aH07YCk7XG4gICAgfVxuXG4gICAgaWYgKHdvcnNlU2VsZWN0SW5zdGFuY2UuY29uZmlnLmhlaWdodCAhPT0gREVGQVVMVF9DT05GSUcuaGVpZ2h0KSB7XG4gICAgICAgIGhlYWRlclN0eWxlUGFydHMucHVzaChgaGVpZ2h0OiAke3dvcnNlU2VsZWN0SW5zdGFuY2UuY29uZmlnLmhlaWdodH07YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1aWxkU3R5bGVBdHRyaWJ1dGUoaGVhZGVyU3R5bGVQYXJ0cyk7XG59XG5cblxuZnVuY3Rpb24gZXNjYXBlSHRtbCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIC5yZXBsYWNlKC8mL2csICcmYW1wOycpXG4gICAgICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAgICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgICAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgICAgIC5yZXBsYWNlKC8nL2csICcmIzM5OycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3B0aW9uSWQod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0LCBvcHRpb25JbmRleDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGAke3dvcnNlU2VsZWN0SW5zdGFuY2UuaW5zdGFuY2VJZH0tb3B0aW9uLSR7b3B0aW9uSW5kZXh9YDtcbn1cblxuZnVuY3Rpb24gZ2V0V29yc2VPcHRpb25DbGFzc2VzKHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQpIHtcbiAgICBjb25zdCBjbGFzc2VzID0gWyd3b3JzZS1zZWxlY3Qtb3B0aW9uJ107XG5cbiAgICBpZiAoc2VsZWN0T3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaCgnZGlzYWJsZWQnKTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0T3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaCgnc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JzZU9wdGlvbkh0bWwoXG4gICAgd29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0LFxuICAgIHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQsXG4gICAgb3B0aW9uSW5kZXg6IG51bWJlcixcbikge1xuICAgIGNvbnN0IHdvcnNlT3B0aW9uQ2xhc3NlcyA9IGdldFdvcnNlT3B0aW9uQ2xhc3NlcyhzZWxlY3RPcHRpb24pO1xuICAgIGNvbnN0IG9wdGlvblRleHQgPSBzZWxlY3RPcHRpb24udGV4dENvbnRlbnQgPz8gJyc7XG5cbiAgICByZXR1cm4gYFxuICAgIDxkaXYgaWQ9XCIke2dldE9wdGlvbklkKHdvcnNlU2VsZWN0SW5zdGFuY2UsIG9wdGlvbkluZGV4KX1cIlxuICAgICAgICAgY2xhc3M9XCIke3dvcnNlT3B0aW9uQ2xhc3Nlc31cIlxuICAgICAgICAgZGF0YS12YWx1ZT1cIiR7ZXNjYXBlSHRtbChzZWxlY3RPcHRpb24udmFsdWUpfVwiXG4gICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9XCIke3NlbGVjdE9wdGlvbi5zZWxlY3RlZCA/ICd0cnVlJyA6ICdmYWxzZSd9XCJcbiAgICAgICAgIGFyaWEtZGlzYWJsZWQ9XCIke3NlbGVjdE9wdGlvbi5kaXNhYmxlZCA/ICd0cnVlJyA6ICdmYWxzZSd9XCI+XG4gICAgICAke2VzY2FwZUh0bWwob3B0aW9uVGV4dCl9XG4gICAgPC9kaXY+XG4gICAgYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcnNlT3B0aW9uRWxlbWVudChcbiAgICB3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQsXG4gICAgc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCxcbiAgICBvcHRpb25JbmRleDogbnVtYmVyLFxuKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KFxuICAgICAgICBjcmVhdGVXb3JzZU9wdGlvbkh0bWwod29yc2VTZWxlY3RJbnN0YW5jZSwgc2VsZWN0T3B0aW9uLCBvcHRpb25JbmRleClcbiAgICApLmZpcnN0RWxlbWVudENoaWxkIGFzIEhUTUxEaXZFbGVtZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VhcmNoSHRtbCh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQpIHtcbiAgICBpZiAoIXdvcnNlU2VsZWN0SW5zdGFuY2UuY29uZmlnLnNlYXJjaGFibGUpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgPGRpdiBjbGFzcz1cIndvcnNlLXNlbGVjdC1zZWFyY2hcIj5cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgY2xhc3M9XCJ3b3JzZS1zZWxlY3Qtc2VhcmNoLWlucHV0XCJcbiAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBsaXN0XCJcbiAgICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJTZWFyY2ggb3B0aW9uc1wiIC8+XG4gICAgPC9kaXY+XG4gICAgYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1lc3NhZ2VIdG1sKCkge1xuICAgIHJldHVybiBgXG4gICAgPGRpdiBjbGFzcz1cIndvcnNlLXNlbGVjdC1tZXNzYWdlIHdvcnNlLXNlbGVjdC12aXN1YWxseS1oaWRkZW5cIlxuICAgICAgICAgcm9sZT1cInN0YXR1c1wiXG4gICAgICAgICBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICAgICAgICAgYXJpYS1hdG9taWM9XCJ0cnVlXCI+PC9kaXY+XG4gICAgYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcnNlU2VsZWN0KHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCkge1xuICAgIGNvbnN0IGhlYWRlclN0eWxlQXR0cmlidXRlID0gYnVpbGRXb3JzZVNlbGVjdEhlYWRlclN0eWxlQXR0cmlidXRlKHdvcnNlU2VsZWN0SW5zdGFuY2UpO1xuICAgIGNvbnN0IGNvbnRhaW5lckNsYXNzZXMgPSBbJ3dvcnNlLXNlbGVjdC1jb250YWluZXInXTtcblxuICAgIGlmIChzaG91bGRVc2VMaXN0Ym94TW9kZSh3b3JzZVNlbGVjdEluc3RhbmNlKSkge1xuICAgICAgICBjb250YWluZXJDbGFzc2VzLnB1c2goJ2xpc3Rib3gnKTtcbiAgICB9XG5cbiAgICBpZiAoaXNNdWx0aXBsZVNlbGVjdCh3b3JzZVNlbGVjdEluc3RhbmNlKSkge1xuICAgICAgICBjb250YWluZXJDbGFzc2VzLnB1c2goJ211bHRpcGxlJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaHRtbFN0cmluZyA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiJHtjb250YWluZXJDbGFzc2VzLmpvaW4oJyAnKX1cIj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzPVwid29yc2Utc2VsZWN0LWhlYWRlclwiXG4gICAgICAgIGFyaWEtaGFzcG9wdXA9XCJsaXN0Ym94XCJcbiAgICAgICAgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwid29yc2Utc2VsZWN0LWhlYWRlci1sYWJlbFwiPjwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGRpdiBjbGFzcz1cIndvcnNlLXNlbGVjdC1vcHRpb25zXCI+XG4gICAgICAgICR7Y3JlYXRlU2VhcmNoSHRtbCh3b3JzZVNlbGVjdEluc3RhbmNlKX1cbiAgICAgICAgJHtjcmVhdGVNZXNzYWdlSHRtbCgpfVxuICAgICAgICA8ZGl2IGNsYXNzPVwid29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXJcIiR7aGVhZGVyU3R5bGVBdHRyaWJ1dGV9PjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgYDtcblxuICAgIGNvbnN0IHdvcnNlU2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KFxuICAgICAgICBodG1sU3RyaW5nXG4gICAgKS5maXJzdEVsZW1lbnRDaGlsZCBhcyBIVE1MRGl2RWxlbWVudDtcblxuICAgIGNvbnN0IG9wdGlvbnNMaXN0RWxlbWVudCA9IHdvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXInKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICBvcHRpb25zTGlzdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2xpc3Rib3gnKTtcbiAgICBvcHRpb25zTGlzdEVsZW1lbnQudGFiSW5kZXggPSBzaG91bGRVc2VMaXN0Ym94TW9kZSh3b3JzZVNlbGVjdEluc3RhbmNlKSA/IDAgOiAtMTtcblxuICAgIGlmIChpc011bHRpcGxlU2VsZWN0KHdvcnNlU2VsZWN0SW5zdGFuY2UpKSB7XG4gICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJywgJ3RydWUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gQXJyYXkuZnJvbSh3b3JzZVNlbGVjdEluc3RhbmNlLnNlbGVjdEVsZW1lbnQub3B0aW9ucyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdE9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9uID0gc2VsZWN0T3B0aW9uc1tpXTtcbiAgICAgICAgY29uc3Qgd29yc2VPcHRpb25FbGVtZW50ID0gY3JlYXRlV29yc2VPcHRpb25FbGVtZW50KFxuICAgICAgICAgICAgd29yc2VTZWxlY3RJbnN0YW5jZSxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbixcbiAgICAgICAgICAgIGlcbiAgICAgICAgKTtcbiAgICAgICAgbGlua09wdGlvbihzZWxlY3RPcHRpb24sIHdvcnNlT3B0aW9uRWxlbWVudCk7XG4gICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5hcHBlbmRDaGlsZCh3b3JzZU9wdGlvbkVsZW1lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiB3b3JzZVNlbGVjdEVsZW1lbnQ7XG59IiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmltcG9ydCB0eXBlIHsgUGx1Z2luLCBQbHVnaW5Db250ZXh0IH0gZnJvbSAnLi4vaW50ZXJuYWwtdHlwZXMnO1xuaW1wb3J0IHsgZ2V0V29yc2VPcHRpb25FbGVtZW50IH0gZnJvbSAnLi4vb3B0aW9uLW1hcCc7XG5cbmZ1bmN0aW9uIGFwcGx5SGlnaGxpZ2h0KGNvbnRleHQ6IFBsdWdpbkNvbnRleHQsIHNlYXJjaFRlcm06IHN0cmluZykge1xuICAgIGNvbnN0IHRlcm0gPSBzZWFyY2hUZXJtLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgQXJyYXkuZnJvbShjb250ZXh0Lm9wdGlvbnNMaXN0RWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaCh3b3JzZU9wdGlvbiA9PiB7XG4gICAgICAgIGlmICghKHdvcnNlT3B0aW9uIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSB0ZXJtICE9PSAnJyAmJiB3b3JzZU9wdGlvbi50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHRlcm0pO1xuICAgICAgICB3b3JzZU9wdGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdtYXRjaGVzJywgbWF0Y2hlcyk7XG4gICAgfSk7XG5cbiAgICBpZiAoIXRlcm0pIHtcbiAgICAgICAgY29udGV4dC5jbGVhck1lc3NhZ2UoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGNoQ291bnQgPSBjb250ZXh0Lm9wdGlvbnNMaXN0RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yc2Utc2VsZWN0LW9wdGlvbi5tYXRjaGVzJykubGVuZ3RoO1xuICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgICBtYXRjaENvdW50ID09PSAwID8gJ05vIHJlc3VsdHMgZm91bmQnIDpcbiAgICAgICAgbWF0Y2hDb3VudCA9PT0gMSA/ICcxIHJlc3VsdCBhdmFpbGFibGUnIDpcbiAgICAgICAgYCR7bWF0Y2hDb3VudH0gcmVzdWx0cyBhdmFpbGFibGVgO1xuXG4gICAgY29udGV4dC5zZXRNZXNzYWdlKG1lc3NhZ2UpO1xuXG4gICAgY29uc3QgZmlyc3RNYXRjaCA9IGNvbnRleHQub3B0aW9uc0xpc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3Qtb3B0aW9uLm1hdGNoZXMnKTtcbiAgICBpZiAoZmlyc3RNYXRjaCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSB7XG4gICAgICAgIGZpcnN0TWF0Y2guc2Nyb2xsSW50b1ZpZXcoeyBibG9jazogJ25lYXJlc3QnIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJ1aWx0aW5TZWFyY2hQbHVnaW4oKTogUGx1Z2luIHtcbiAgICBsZXQgc2VhcmNoVGVybSA9ICcnO1xuICAgIGxldCBwbHVnaW5Db250ZXh0OiBQbHVnaW5Db250ZXh0IHwgbnVsbCA9IG51bGw7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnc2VhcmNoJyxcblxuICAgICAgICBpbml0KGNvbnRleHQ6IFBsdWdpbkNvbnRleHQpIHtcbiAgICAgICAgICAgIHBsdWdpbkNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICAgICAgY29uc3QgeyBzZWFyY2hJbnB1dEVsZW1lbnQgfSA9IGNvbnRleHQ7XG4gICAgICAgICAgICBpZiAoIXNlYXJjaElucHV0RWxlbWVudCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBjb250ZXh0Lm9uKHNlYXJjaElucHV0RWxlbWVudCwgJ2lucHV0JywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgICAgICAgICAgc2VhcmNoVGVybSA9IHRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICBhcHBseUhpZ2hsaWdodChjb250ZXh0LCBzZWFyY2hUZXJtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uU3luYygpIHtcbiAgICAgICAgICAgIGlmICghcGx1Z2luQ29udGV4dCkgcmV0dXJuO1xuICAgICAgICAgICAgYXBwbHlIaWdobGlnaHQocGx1Z2luQ29udGV4dCwgc2VhcmNoVGVybSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25DbG9zZSgpIHtcbiAgICAgICAgICAgIGlmICghcGx1Z2luQ29udGV4dCkgcmV0dXJuO1xuICAgICAgICAgICAgc2VhcmNoVGVybSA9ICcnO1xuICAgICAgICAgICAgY29uc3QgeyBzZWFyY2hJbnB1dEVsZW1lbnQgfSA9IHBsdWdpbkNvbnRleHQ7XG4gICAgICAgICAgICBpZiAoc2VhcmNoSW5wdXRFbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHNlYXJjaElucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXBwbHlIaWdobGlnaHQocGx1Z2luQ29udGV4dCwgJycpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICBwbHVnaW5Db250ZXh0ID0gbnVsbDtcbiAgICAgICAgICAgIHNlYXJjaFRlcm0gPSAnJztcbiAgICAgICAgfSxcbiAgICB9O1xufVxuIiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmltcG9ydCB0eXBlIHtXb3JzZVNlbGVjdENvbnRleHR9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnO1xuLyoqXG4gKiBQcm9ncmVzc2l2ZS1lbmhhbmNlbWVudCB1dGlsaXRpZXMgZm9yIG5hdGl2ZSB7QGxpbmsgSFRNTFNlbGVjdEVsZW1lbnR9IGNvbnRyb2xzLlxuICpcbiAqIEtlZXBzIHRoZSBuYXRpdmUgYDxzZWxlY3Q+YCBhcyBzb3VyY2Ugb2YgdHJ1dGggZm9yIHZhbHVlLCBkaXNhYmxlZCBzdGF0ZSwgYHNpemVgLCBhbmRcbiAqIGBtdWx0aXBsZWAsIHdoaWxlIG1pcnJvcmluZyB0aGF0IHN0YXRlIGludG8gYSBjdXN0b20gRE9NIHN0cnVjdHVyZSB0aGF0IGlzIGVhc2llciB0byBzdHlsZS5cbiAqXG4gKiBXaWRnZXQtc3BlY2lmaWMgYmVoYXZpb3IgdXNlcyBgZGF0YS0qYCBhdHRyaWJ1dGVzIHN1Y2ggYXMgYGRhdGEtc2VhcmNoYWJsZWAgYW5kXG4gKiBgZGF0YS1kcm9wZG93bi1oZWlnaHQtcHhgLCBrZWVwaW5nIHRoZSBwdWJsaWMgQVBJIGFsaWduZWQgd2l0aCBzdGFuZGFyZCBIVE1MLlxuICovXG5pbXBvcnQge0RFRkFVTFRfQ09ORklHLCBQbHVnaW4sIFBsdWdpbkNvbnRleHQsIFJvb3ROb2RlLCBTZWxlY3RDb25maWcsIFdvcnNlU2VsZWN0T3B0aW9uc30gZnJvbSAnLi9pbnRlcm5hbC10eXBlcyc7XG5pbXBvcnQge2NyZWF0ZUNTU30gZnJvbSAnLi9jc3MnO1xuaW1wb3J0IHtnZXRDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7Y3JlYXRlV29yc2VPcHRpb25FbGVtZW50LCBjcmVhdGVXb3JzZVNlbGVjdCwgZ2V0T3B0aW9uSWQsIHNjcm9sbE9wdGlvbkludG9WaWV3fSBmcm9tICcuL2RvbSc7XG5pbXBvcnQge2dldFNlbGVjdE9wdGlvbkVsZW1lbnQsIGdldFdvcnNlT3B0aW9uRWxlbWVudCwgbGlua09wdGlvbiwgdW5saW5rT3B0aW9ufSBmcm9tICcuL29wdGlvbi1tYXAnO1xuaW1wb3J0IHtnZXRMaXN0Qm94SGVpZ2h0LCBpc011bHRpcGxlU2VsZWN0LCBpc1BsYWNlaG9sZGVyT3B0aW9uLCBzaG91bGRVc2VMaXN0Ym94TW9kZX0gZnJvbSAnLi9zZWxlY3QtaGVscGVycyc7XG5pbXBvcnQge2NyZWF0ZUJ1aWx0aW5TZWFyY2hQbHVnaW59IGZyb20gJy4vZmVhdHVyZXMvc2VhcmNoJztcblxuY29uc3QgaW5zdGFuY2VzID0gbmV3IFdlYWtNYXA8SFRNTFNlbGVjdEVsZW1lbnQsIFdvcnNlU2VsZWN0PigpO1xubGV0IG5leHRJbnN0YW5jZUlkID0gMDtcblxudHlwZSBQbHVnaW5MaXN0ZW5lciA9IHsgdGFyZ2V0OiBFdmVudFRhcmdldDsgZXZlbnQ6IHN0cmluZzsgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciB9O1xuXG5jbGFzcyBXb3JzZVNlbGVjdCBpbXBsZW1lbnRzIFdvcnNlU2VsZWN0Q29udGV4dCB7XG4gICAgLy8gVHJhY2tzIGFsbCBtb3VudGVkIGluc3RhbmNlcyBzbyBhIHNpbmdsZSBkb2N1bWVudC1sZXZlbCBwb2ludGVyZG93biBsaXN0ZW5lciBjYW4gY2xvc2UgYW55XG4gICAgLy8gb3BlbiBkcm9wZG93biB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvdXRzaWRlLCBpbnN0ZWFkIG9mIHJlZ2lzdGVyaW5nIG9uZSBsaXN0ZW5lciBwZXIgaW5zdGFuY2UuXG4gICAgLy8gTm90ZTogYHByaXZhdGVgIGlzIGEgVHlwZVNjcmlwdC1vbmx5IGNvbnN0cmFpbnQgYW5kIGlzIG5vdCBlbmZvcmNlZCBpbiB0aGUgY29tcGlsZWQgb3V0cHV0LlxuICAgIHByaXZhdGUgc3RhdGljIG1vdW50ZWRJbnN0YW5jZXMgPSBuZXcgU2V0PFdvcnNlU2VsZWN0PigpO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaGFuZGxlRG9jdW1lbnRQb2ludGVyRG93bihldmVudDogRXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBOb2RlKSkgcmV0dXJuO1xuICAgICAgICBmb3IgKGNvbnN0IGluc3RhbmNlIG9mIFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMpIHtcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS53b3JzZVNlbGVjdEVsZW1lbnQgJiYgIWluc3RhbmNlLndvcnNlU2VsZWN0RWxlbWVudC5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY2xvc2VEcm9wZG93bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0eXBlQWhlYWRUaW1lcklkPzogbnVtYmVyO1xuICAgIHByaXZhdGUgdHlwZUFoZWFkVGV4dCA9ICcnO1xuICAgIHByaXZhdGUgdHlwZUFoZWFkVGltZW91dCA9IDEwMDA7XG4gICAgc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgY29uZmlnOiBTZWxlY3RDb25maWc7XG4gICAgcm9vdDogUm9vdE5vZGU7XG4gICAgaW5zdGFuY2VJZDogc3RyaW5nO1xuXG4gICAgd29yc2VTZWxlY3RFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgaGVhZGVyRWxlbWVudD86IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIGRyb3Bkb3duUGFuZWxFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgb3B0aW9uc0xpc3RFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgc2VhcmNoSW5wdXRFbGVtZW50PzogSFRNTElucHV0RWxlbWVudDtcbiAgICBtZXNzYWdlRWxlbWVudD86IEhUTUxEaXZFbGVtZW50O1xuICAgIG9wdGlvbk9ic2VydmVyPzogTXV0YXRpb25PYnNlcnZlcjtcblxuICAgIG9uU2VsZWN0Q2hhbmdlPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvbk9wdGlvbnNDbGljaz86IEV2ZW50TGlzdGVuZXI7XG4gICAgb25IZWFkZXJDbGljaz86IEV2ZW50TGlzdGVuZXI7XG4gICAgb25IZWFkZXJLZXlEb3duPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvbk9wdGlvbnNLZXlEb3duPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvblNlYXJjaEtleURvd24/OiBFdmVudExpc3RlbmVyO1xuICAgIG9uTGlzdGJveEZvY3VzPzogRXZlbnRMaXN0ZW5lcjtcblxuICAgIG9wZW4gPSBmYWxzZTtcbiAgICBhY3RpdmVPcHRpb24/OiBIVE1MT3B0aW9uRWxlbWVudDtcblxuICAgIHByaXZhdGUgcGx1Z2luczogUGx1Z2luW10gPSBbXTtcbiAgICBwcml2YXRlIHBsdWdpbkxpc3RlbmVyczogUGx1Z2luTGlzdGVuZXJbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3Ioc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQsIGNvbmZpZzogUGFydGlhbDxTZWxlY3RDb25maWc+ID0ge30sIHJvb3Q6IFJvb3ROb2RlID0gZG9jdW1lbnQsIHBsdWdpbnM6IFBsdWdpbltdID0gW10pIHtcbiAgICAgICAgdGhpcy5zZWxlY3RFbGVtZW50ID0gc2VsZWN0RWxlbWVudDtcbiAgICAgICAgdGhpcy5jb25maWcgPSB7IC4uLkRFRkFVTFRfQ09ORklHLCAuLi5jb25maWcgfTtcbiAgICAgICAgdGhpcy5yb290ID0gcm9vdDtcbiAgICAgICAgdGhpcy5pbnN0YW5jZUlkID0gYHdzLSR7KytuZXh0SW5zdGFuY2VJZH1gO1xuICAgICAgICB0aGlzLnBsdWdpbnMgPSBbLi4ucGx1Z2luc107XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnNlYXJjaGFibGUgJiYgIXBsdWdpbnMuc29tZShwID0+IHAubmFtZSA9PT0gJ3NlYXJjaCcpKSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbnMucHVzaChjcmVhdGVCdWlsdGluU2VhcmNoUGx1Z2luKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBtb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMud29yc2VTZWxlY3RFbGVtZW50KSByZXR1cm47XG5cbiAgICAgICAgZW5zdXJlU3R5bGVzKCk7XG5cbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQgPSBjcmVhdGVXb3JzZVNlbGVjdCh0aGlzKTtcbiAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50ID0gdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1oZWFkZXInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5kcm9wZG93blBhbmVsRWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3Qtb3B0aW9ucycpIGFzIEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3Qtb3B0aW9ucy1zY3JvbGxlcicpIGFzIEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnNlYXJjaElucHV0RWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3Qtc2VhcmNoLWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5tZXNzYWdlRWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3QtbWVzc2FnZScpIGFzIEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmIChXb3JzZVNlbGVjdC5tb3VudGVkSW5zdGFuY2VzLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgV29yc2VTZWxlY3QuaGFuZGxlRG9jdW1lbnRQb2ludGVyRG93bik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmhhbmRsZVR5cGVBaGVhZCk7XG4gICAgICAgIFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMuYWRkKHRoaXMpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICB0aGlzLm9ic2VydmVPcHRpb25zKCk7XG4gICAgICAgIHRoaXMuaW5pdFBsdWdpbnMoKTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLm9wdGlvbk9ic2VydmVyPy5kaXNjb25uZWN0KCk7XG4gICAgICAgIHRoaXMub3B0aW9uT2JzZXJ2ZXIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICBwbHVnaW4uZGVzdHJveT8uKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCB7IHRhcmdldCwgZXZlbnQsIGhhbmRsZXIgfSBvZiB0aGlzLnBsdWdpbkxpc3RlbmVycykge1xuICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGx1Z2luTGlzdGVuZXJzID0gW107XG4gICAgICAgIHRoaXMucGx1Z2lucyA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLm9uU2VsZWN0Q2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5vblNlbGVjdENoYW5nZSk7XG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0Q2hhbmdlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25PcHRpb25zQ2xpY2sgJiYgdGhpcy5kcm9wZG93blBhbmVsRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5kcm9wZG93blBhbmVsRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25PcHRpb25zQ2xpY2spO1xuICAgICAgICAgICAgdGhpcy5vbk9wdGlvbnNDbGljayA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uSGVhZGVyQ2xpY2sgJiYgdGhpcy5oZWFkZXJFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uSGVhZGVyQ2xpY2spO1xuICAgICAgICAgICAgdGhpcy5vbkhlYWRlckNsaWNrID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25IZWFkZXJLZXlEb3duICYmIHRoaXMuaGVhZGVyRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uSGVhZGVyS2V5RG93bik7XG4gICAgICAgICAgICB0aGlzLm9uSGVhZGVyS2V5RG93biA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uT3B0aW9uc0tleURvd24gJiYgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uT3B0aW9uc0tleURvd24pO1xuICAgICAgICAgICAgdGhpcy5vbk9wdGlvbnNLZXlEb3duID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25TZWFyY2hLZXlEb3duICYmIHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vblNlYXJjaEtleURvd24pO1xuICAgICAgICAgICAgdGhpcy5vblNlYXJjaEtleURvd24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vbkxpc3Rib3hGb2N1cyAmJiB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLm9uTGlzdGJveEZvY3VzKTtcbiAgICAgICAgICAgIHRoaXMub25MaXN0Ym94Rm9jdXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBXb3JzZVNlbGVjdC5tb3VudGVkSW5zdGFuY2VzLmRlbGV0ZSh0aGlzKTtcbiAgICAgICAgaWYgKFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBXb3JzZVNlbGVjdC5oYW5kbGVEb2N1bWVudFBvaW50ZXJEb3duKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50Py5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuaGFuZGxlVHlwZUFoZWFkKTtcblxuICAgICAgICBBcnJheS5mcm9tKHRoaXMuc2VsZWN0RWxlbWVudC5vcHRpb25zKS5mb3JFYWNoKHVubGlua09wdGlvbik7XG5cbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQ/LnJlbW92ZSgpO1xuICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuXG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZHJvcGRvd25QYW5lbEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnNlYXJjaElucHV0RWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5tZXNzYWdlRWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5vcGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWN0aXZlT3B0aW9uID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHN5bmNEaW1lbnNpb25zKCkge1xuICAgICAgICBjb25zdCB7IHdvcnNlU2VsZWN0RWxlbWVudCwgaGVhZGVyRWxlbWVudCwgb3B0aW9uc0xpc3RFbGVtZW50LCBzZWxlY3RFbGVtZW50LCBjb25maWcgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKHdvcnNlU2VsZWN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoIShoZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxlY3RFbGVtZW50KTtcblxuICAgICAgICBpZiAoY29tcHV0ZWRTdHlsZS53aWR0aCAmJiBjb21wdXRlZFN0eWxlLndpZHRoICE9PSAnYXV0bycgJiYgY29tcHV0ZWRTdHlsZS53aWR0aCAhPT0gJzBweCcpIHtcbiAgICAgICAgICAgIHdvcnNlU2VsZWN0RWxlbWVudC5zdHlsZS53aWR0aCA9IGNvbXB1dGVkU3R5bGUud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBoZWFkZXJFbGVtZW50LnN0eWxlLmZvbnQgPSBjb21wdXRlZFN0eWxlLmZvbnQ7XG4gICAgICAgIGlmIChzaG91bGRVc2VMaXN0Ym94TW9kZSh0aGlzKSkge1xuICAgICAgICAgICAgY29uc3QgZmlyc3RPcHRpb24gPSBvcHRpb25zTGlzdEVsZW1lbnQuY2hpbGRyZW5bMF0gYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBmaXJzdE9wdGlvbiA/IGdldExpc3RCb3hIZWlnaHQoc2VsZWN0RWxlbWVudCwgZmlyc3RPcHRpb24pIDogbnVsbDtcbiAgICAgICAgICAgIGlmIChoZWlnaHQpIG9wdGlvbnNMaXN0RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gYCR7Y29uZmlnLmRyb3Bkb3duSGVpZ2h0UHh9cHhgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlT3BlblN0YXRlKCkge1xuICAgICAgICBpZiAoISh0aGlzLndvcnNlU2VsZWN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGlzTGlzdGJveE1vZGUgPSBzaG91bGRVc2VMaXN0Ym94TW9kZSh0aGlzKTtcbiAgICAgICAgY29uc3QgaXNPcGVuID0gaXNMaXN0Ym94TW9kZSA/IHRydWUgOiB0aGlzLm9wZW47XG5cbiAgICAgICAgY29uc3QgaXNEYXJrID0gd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzICYmXG4gICAgICAgICAgICBnZXRDb21wdXRlZFN0eWxlKHRoaXMuc2VsZWN0RWxlbWVudCkuY29sb3JTY2hlbWUuaW5jbHVkZXMoJ2RhcmsnKTtcblxuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJywgaXNPcGVuKTtcbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbGlzdGJveCcsIGlzTGlzdGJveE1vZGUpO1xuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdtdWx0aXBsZScsIGlzTXVsdGlwbGVTZWxlY3QodGhpcykpO1xuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdkYXJrJywgaXNEYXJrKTtcblxuICAgICAgICBpZiAodGhpcy5oZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBTdHJpbmcoaXNPcGVuKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLW11bHRpc2VsZWN0YWJsZScsIFN0cmluZyhpc011bHRpcGxlU2VsZWN0KHRoaXMpKSk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudC50YWJJbmRleCA9IGlzT3BlbiA/IDAgOiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlSGVhZGVyU3RhdGUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTZWxlY3RlZFN0YXRlKCkge1xuICAgICAgICBjb25zdCB7IG9wdGlvbnNMaXN0RWxlbWVudCwgc2VsZWN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgQXJyYXkuZnJvbShvcHRpb25zTGlzdEVsZW1lbnQuY2hpbGRyZW4pLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQXJyYXkuZnJvbShzZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmZvckVhY2goc2VsZWN0T3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmICghc2VsZWN0T3B0aW9uLnNlbGVjdGVkKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoaXNQbGFjZWhvbGRlck9wdGlvbihzZWxlY3RPcHRpb24pKSByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBlbCA9IGdldFdvcnNlT3B0aW9uRWxlbWVudChzZWxlY3RPcHRpb24pO1xuICAgICAgICAgICAgZWw/LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICBlbD8uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlRGlzYWJsZWRTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyB3b3JzZVNlbGVjdEVsZW1lbnQsIHNlbGVjdEVsZW1lbnQsIGhlYWRlckVsZW1lbnQsIHNlYXJjaElucHV0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEod29yc2VTZWxlY3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgd29yc2VTZWxlY3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2Rpc2FibGVkJywgc2VsZWN0RWxlbWVudC5kaXNhYmxlZCk7XG5cbiAgICAgICAgaWYgKGhlYWRlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xuICAgICAgICAgICAgaGVhZGVyRWxlbWVudC5kaXNhYmxlZCA9IHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQ7XG4gICAgICAgICAgICBoZWFkZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcsIFN0cmluZyhzZWxlY3RFbGVtZW50LmRpc2FibGVkKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VhcmNoSW5wdXRFbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgc2VhcmNoSW5wdXRFbGVtZW50LmRpc2FibGVkID0gc2VsZWN0RWxlbWVudC5kaXNhYmxlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5mb3JFYWNoKHNlbGVjdE9wdGlvbiA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbCA9IGdldFdvcnNlT3B0aW9uRWxlbWVudChzZWxlY3RPcHRpb24pO1xuICAgICAgICAgICAgZWw/LmNsYXNzTGlzdC50b2dnbGUoJ2Rpc2FibGVkJywgc2VsZWN0T3B0aW9uLmRpc2FibGVkKTtcbiAgICAgICAgICAgIGVsPy5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnLCBTdHJpbmcoc2VsZWN0T3B0aW9uLmRpc2FibGVkKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZUhlYWRlclN0YXRlKCkge1xuICAgICAgICBjb25zdCB7IGhlYWRlckVsZW1lbnQsIHNlbGVjdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKGhlYWRlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBsYWJlbEVsID0gaGVhZGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LWhlYWRlci1sYWJlbCcpO1xuICAgICAgICBpZiAoIShsYWJlbEVsIGluc3RhbmNlb2YgSFRNTFNwYW5FbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID1cbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuc2VsZWN0ZWRPcHRpb25zWzBdID8/XG4gICAgICAgICAgICBzZWxlY3RFbGVtZW50Lm9wdGlvbnNbc2VsZWN0RWxlbWVudC5zZWxlY3RlZEluZGV4XSA/P1xuICAgICAgICAgICAgbnVsbDtcblxuICAgICAgICBjb25zdCBsYWJlbCA9IChpc1BsYWNlaG9sZGVyT3B0aW9uKHNlbGVjdGVkT3B0aW9uKSAmJiB0aGlzLm9wZW4pXG4gICAgICAgICAgICA/ICcnXG4gICAgICAgICAgICA6IHNlbGVjdGVkT3B0aW9uPy50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuXG4gICAgICAgIGxhYmVsRWwudGV4dENvbnRlbnQgPSBsYWJlbDtcbiAgICAgICAgaGVhZGVyRWxlbWVudC50aXRsZSA9IGxhYmVsO1xuICAgICAgICBoZWFkZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGxhYmVsID8gYFNlbGVjdGVkOiAke2xhYmVsfWAgOiAnU2VsZWN0IGFuIG9wdGlvbicpO1xuICAgIH1cblxuICAgIHVwZGF0ZUFjdGl2ZURlc2NlbmRhbnQoKSB7XG4gICAgICAgIGNvbnN0IHsgb3B0aW9uc0xpc3RFbGVtZW50LCBhY3RpdmVPcHRpb24gfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghYWN0aXZlT3B0aW9uKSB7XG4gICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVsID0gZ2V0V29yc2VPcHRpb25FbGVtZW50KGFjdGl2ZU9wdGlvbik7XG4gICAgICAgIGlmICghKGVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSB7XG4gICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsIGVsLmlkKTtcbiAgICB9XG5cbiAgICB1cGRhdGVBY3RpdmVPcHRpb25TdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBvcHRpb25zTGlzdEVsZW1lbnQsIGFjdGl2ZU9wdGlvbiB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgQXJyYXkuZnJvbShvcHRpb25zTGlzdEVsZW1lbnQuY2hpbGRyZW4pLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgaWYgKGVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoYWN0aXZlT3B0aW9uKSB7XG4gICAgICAgICAgICBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoYWN0aXZlT3B0aW9uKT8uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzeW5jQWxsKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkU3RhdGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlT3BlblN0YXRlKCk7XG4gICAgICAgIHRoaXMuc3luY0RpbWVuc2lvbnMoKTtcbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICBwbHVnaW4ub25TeW5jPy4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldE1lc3NhZ2UodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHsgbWVzc2FnZUVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG1lc3NhZ2VFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIG1lc3NhZ2VFbGVtZW50LnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIC8vIERlZmVyIHRoZSB1cGRhdGUgYnkgb25lIHRpY2sgc28gc2NyZWVuIHJlYWRlcnMgYW5ub3VuY2UgYSBjaGFuZ2UgZXZlbiB3aGVuIHRoZVxuICAgICAgICAvLyBtZXNzYWdlIHRleHQgaGFwcGVucyB0byBiZSB0aGUgc2FtZSBzdHJpbmcgYXMgdGhlIHByZXZpb3VzIGFubm91bmNlbWVudC5cbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMubWVzc2FnZUVsZW1lbnQgPT09IG1lc3NhZ2VFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcbiAgICB9XG5cbiAgICBjbGVhck1lc3NhZ2UoKSB7XG4gICAgICAgIGlmICghKHRoaXMubWVzc2FnZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgdGhpcy5tZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9ICcnO1xuICAgIH1cblxuICAgIG9wZW5Ecm9wZG93bigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0RWxlbWVudC5kaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICBpZiAoc2hvdWxkVXNlTGlzdGJveE1vZGUodGhpcykpIHJldHVybjtcblxuICAgICAgICB0aGlzLm9wZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZU9wZW5TdGF0ZSgpO1xuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgICAgICAgIHBsdWdpbi5vbk9wZW4/LigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2VEcm9wZG93bigpIHtcbiAgICAgICAgaWYgKHNob3VsZFVzZUxpc3Rib3hNb2RlKHRoaXMpKSByZXR1cm47XG4gICAgICAgIGlmICghdGhpcy5vcGVuKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5vcGVuID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgICAgICAgcGx1Z2luLm9uQ2xvc2U/LigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucm9vdC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICB0aGlzLnVwZGF0ZU9wZW5TdGF0ZSgpO1xuICAgIH1cblxuICAgIHRvZ2dsZURyb3Bkb3duKCkge1xuICAgICAgICBpZiAoc2hvdWxkVXNlTGlzdGJveE1vZGUodGhpcykpIHJldHVybjtcbiAgICAgICAgdGhpcy5vcGVuID8gdGhpcy5jbG9zZURyb3Bkb3duKCkgOiB0aGlzLm9wZW5Ecm9wZG93bigpO1xuICAgIH1cblxuICAgIG9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpIHtcbiAgICAgICAgdGhpcy5vcGVuRHJvcGRvd24oKTtcblxuICAgICAgICBjb25zdCB7IG9wdGlvbnNMaXN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnRhYkluZGV4ID0gMDtcbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIHNjcm9sbE9wdGlvbkludG9WaWV3KHRoaXMuYWN0aXZlT3B0aW9uKTtcbiAgICB9XG5cbiAgICBjbG9zZURyb3Bkb3duQW5kRm9jdXNIZWFkZXIoKSB7XG4gICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQ/LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZ2V0VmlzaWJsZUVuYWJsZWRPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnNlbGVjdEVsZW1lbnQub3B0aW9ucykuZmlsdGVyKG9wdCA9PiB7XG4gICAgICAgICAgICBpZiAob3B0LmRpc2FibGVkKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gZ2V0V29yc2VPcHRpb25FbGVtZW50KG9wdCkgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlT3B0aW9uKHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQgfCB1bmRlZmluZWQsIHNjcm9sbCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVPcHRpb24gPSBzZWxlY3RPcHRpb247XG4gICAgICAgIHRoaXMudXBkYXRlQWN0aXZlRGVzY2VuZGFudCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUFjdGl2ZU9wdGlvblN0YXRlKCk7XG4gICAgICAgIGlmIChzY3JvbGwpIHNjcm9sbE9wdGlvbkludG9WaWV3KHNlbGVjdE9wdGlvbik7XG4gICAgfVxuXG4gICAgbW92ZUFjdGl2ZU9wdGlvbihkZWx0YTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldFZpc2libGVFbmFibGVkT3B0aW9ucygpO1xuICAgICAgICBpZiAob3B0aW9ucy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSB0aGlzLmFjdGl2ZU9wdGlvbiA/IG9wdGlvbnMuaW5kZXhPZih0aGlzLmFjdGl2ZU9wdGlvbikgOiAtMTtcbiAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gY3VycmVudEluZGV4ID09PSAtMVxuICAgICAgICAgICAgPyAoZGVsdGEgPj0gMCA/IDAgOiBvcHRpb25zLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICA6IE1hdGgubWF4KDAsIE1hdGgubWluKG9wdGlvbnMubGVuZ3RoIC0gMSwgY3VycmVudEluZGV4ICsgZGVsdGEpKTtcblxuICAgICAgICB0aGlzLnNldEFjdGl2ZU9wdGlvbihvcHRpb25zW25leHRJbmRleF0pO1xuICAgIH1cblxuICAgIG1vdmVBY3RpdmVUb0JvdW5kYXJ5KGJvdW5kYXJ5OiAnc3RhcnQnIHwgJ2VuZCcpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2V0VmlzaWJsZUVuYWJsZWRPcHRpb25zKCk7XG4gICAgICAgIGlmIChvcHRpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNldEFjdGl2ZU9wdGlvbihib3VuZGFyeSA9PT0gJ3N0YXJ0JyA/IG9wdGlvbnNbMF0gOiBvcHRpb25zW29wdGlvbnMubGVuZ3RoIC0gMV0pO1xuICAgIH1cblxuICAgIGdldFBhZ2VKdW1wU2l6ZSgpIHtcbiAgICAgICAgY29uc3QgeyBvcHRpb25zTGlzdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuIDEwO1xuXG4gICAgICAgIGNvbnN0IGZpcnN0T3B0aW9uID0gQXJyYXkuZnJvbShvcHRpb25zTGlzdEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcnNlLXNlbGVjdC1vcHRpb24nKSlcbiAgICAgICAgICAgIC5maW5kKGVsID0+IGVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpO1xuICAgICAgICBpZiAoIShmaXJzdE9wdGlvbiBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuIDEwO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbkhlaWdodCA9IGZpcnN0T3B0aW9uLm9mZnNldEhlaWdodCB8fCAxO1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihvcHRpb25zTGlzdEVsZW1lbnQuY2xpZW50SGVpZ2h0IC8gb3B0aW9uSGVpZ2h0KSk7XG4gICAgfVxuXG4gICAgbW92ZUFjdGl2ZUJ5UGFnZShkaXJlY3Rpb246IDEgfCAtMSkge1xuICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24odGhpcy5nZXRQYWdlSnVtcFNpemUoKSAqIGRpcmVjdGlvbik7XG4gICAgfVxuXG4gICAgY29tbWl0QWN0aXZlT3B0aW9uU2VsZWN0aW9uKCkge1xuICAgICAgICBjb25zdCB7IGFjdGl2ZU9wdGlvbiwgc2VsZWN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCFhY3RpdmVPcHRpb24gfHwgYWN0aXZlT3B0aW9uLmRpc2FibGVkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHNlbGVjdEVsZW1lbnQubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGFjdGl2ZU9wdGlvbi5zZWxlY3RlZCA9ICFhY3RpdmVPcHRpb24uc2VsZWN0ZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxlY3RFbGVtZW50LnNlbGVjdGVkSW5kZXggPSBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuaW5kZXhPZihhY3RpdmVPcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZWN0RWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywgeyBidWJibGVzOiB0cnVlIH0pKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRQbHVnaW5zKCkge1xuICAgICAgICBpZiAoISh0aGlzLmhlYWRlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEodGhpcy5vcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBjb250ZXh0OiBQbHVnaW5Db250ZXh0ID0ge1xuICAgICAgICAgICAgc2VsZWN0RWxlbWVudDogdGhpcy5zZWxlY3RFbGVtZW50LFxuICAgICAgICAgICAgaGVhZGVyRWxlbWVudDogdGhpcy5oZWFkZXJFbGVtZW50LFxuICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50OiB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCxcbiAgICAgICAgICAgIHNlYXJjaElucHV0RWxlbWVudDogdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQsXG4gICAgICAgICAgICBzZXRNZXNzYWdlOiAodGV4dCkgPT4gdGhpcy5zZXRNZXNzYWdlKHRleHQpLFxuICAgICAgICAgICAgY2xlYXJNZXNzYWdlOiAoKSA9PiB0aGlzLmNsZWFyTWVzc2FnZSgpLFxuICAgICAgICAgICAgb246ICh0YXJnZXQsIGV2ZW50LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luTGlzdGVuZXJzLnB1c2goeyB0YXJnZXQsIGV2ZW50LCBoYW5kbGVyIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgICAgICAgIHBsdWdpbi5pbml0KGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gS2V5Ym9hcmQgY29udHJhY3RzIGZvciBoZWFkZXIsIGxpc3QsIGFuZCBzZWFyY2ggYXJlIGtlcHQgdG9nZXRoZXIgaGVyZSBcdTIwMTQgc3BsaXR0aW5nIHRoZW1cbiAgICAvLyB3b3VsZCBzY2F0dGVyIHJlbGF0ZWQga2V5IGhhbmRsaW5nIGFjcm9zcyBtdWx0aXBsZSBtZXRob2RzLiBJZiB0aGlzIGdyb3dzIHNpZ25pZmljYW50bHksXG4gICAgLy8gY29uc2lkZXIgYnJlYWtpbmcgb3V0IHBlci1jb21wb25lbnQgaGFuZGxlcnMuXG4gICAgcHJpdmF0ZSBiaW5kRXZlbnRzKCkge1xuICAgICAgICBjb25zdCB7IHdvcnNlU2VsZWN0RWxlbWVudCwgc2VsZWN0RWxlbWVudCwgZHJvcGRvd25QYW5lbEVsZW1lbnQsIG9wdGlvbnNMaXN0RWxlbWVudCwgaGVhZGVyRWxlbWVudCwgc2VhcmNoSW5wdXRFbGVtZW50IH0gPSB0aGlzO1xuXG4gICAgICAgIGlmICghKHdvcnNlU2VsZWN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoIShkcm9wZG93blBhbmVsRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEoaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IG9uT3B0aW9uc0NsaWNrOiBFdmVudExpc3RlbmVyID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uRWwgPSB0YXJnZXQuY2xvc2VzdCgnLndvcnNlLXNlbGVjdC1vcHRpb24nKTtcbiAgICAgICAgICAgIGlmICghKG9wdGlvbkVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoIWRyb3Bkb3duUGFuZWxFbGVtZW50LmNvbnRhaW5zKG9wdGlvbkVsKSkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKG9wdGlvbkVsLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RPcHRpb24gPSBnZXRTZWxlY3RPcHRpb25FbGVtZW50KG9wdGlvbkVsKTtcbiAgICAgICAgICAgIGlmICghc2VsZWN0T3B0aW9uIHx8IHNlbGVjdE9wdGlvbi5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZU9wdGlvbihzZWxlY3RPcHRpb24sIGZhbHNlKTtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdEVsZW1lbnQubXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb24uc2VsZWN0ZWQgPSAhc2VsZWN0T3B0aW9uLnNlbGVjdGVkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RFbGVtZW50LnNlbGVjdGVkSW5kZXggPSBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuaW5kZXhPZihzZWxlY3RPcHRpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxlY3RFbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgb25TZWxlY3RDaGFuZ2U6IEV2ZW50TGlzdGVuZXIgPSAoKSA9PiB0aGlzLnN5bmNBbGwoKTtcbiAgICAgICAgY29uc3Qgb25IZWFkZXJDbGljazogRXZlbnRMaXN0ZW5lciA9ICgpID0+IHRoaXMudG9nZ2xlRHJvcGRvd24oKTtcblxuICAgICAgICBjb25zdCBvbkhlYWRlcktleURvd246IEV2ZW50TGlzdGVuZXIgPSBldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoIShldmVudCBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZVRvQm91bmRhcnkoJ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZVRvQm91bmRhcnkoJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlRG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZVVwJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJyAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW4gPyB0aGlzLmNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpIDogdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgb25PcHRpb25zS2V5RG93bjogRXZlbnRMaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghKGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlVG9Cb3VuZGFyeSgnc3RhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlVG9Cb3VuZGFyeSgnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlVXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnICc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbWl0QWN0aXZlT3B0aW9uU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VsZWN0RWxlbWVudC5tdWx0aXBsZSkgdGhpcy5jbG9zZURyb3Bkb3duQW5kRm9jdXNIZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duQW5kRm9jdXNIZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgb25TZWFyY2hLZXlEb3duOiBFdmVudExpc3RlbmVyID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdzdGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlVG9Cb3VuZGFyeSgnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZVVwJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bkFuZEZvY3VzSGVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGRyb3Bkb3duUGFuZWxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25PcHRpb25zQ2xpY2spO1xuICAgICAgICBzZWxlY3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIG9uU2VsZWN0Q2hhbmdlKTtcbiAgICAgICAgaGVhZGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uSGVhZGVyQ2xpY2spO1xuICAgICAgICBoZWFkZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbkhlYWRlcktleURvd24pO1xuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uT3B0aW9uc0tleURvd24pO1xuXG4gICAgICAgIGNvbnN0IG9uTGlzdGJveEZvY3VzOiBFdmVudExpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFzaG91bGRVc2VMaXN0Ym94TW9kZSh0aGlzKSB8fCB0aGlzLmFjdGl2ZU9wdGlvbikgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuZmluZChvID0+IG8uc2VsZWN0ZWQgJiYgIWlzUGxhY2Vob2xkZXJPcHRpb24obykpO1xuICAgICAgICAgICAgY29uc3QgZmlyc3QgPSB0aGlzLmdldFZpc2libGVFbmFibGVkT3B0aW9ucygpWzBdO1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gc2VsZWN0ZWQgPz8gZmlyc3Q7XG4gICAgICAgICAgICBpZiAodGFyZ2V0KSB0aGlzLnNldEFjdGl2ZU9wdGlvbih0YXJnZXQsIHRydWUpO1xuICAgICAgICB9O1xuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBvbkxpc3Rib3hGb2N1cyk7XG5cbiAgICAgICAgaWYgKHNlYXJjaElucHV0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHNlYXJjaElucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25TZWFyY2hLZXlEb3duKTtcbiAgICAgICAgICAgIHRoaXMub25TZWFyY2hLZXlEb3duID0gb25TZWFyY2hLZXlEb3duO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbk9wdGlvbnNDbGljayA9IG9uT3B0aW9uc0NsaWNrO1xuICAgICAgICB0aGlzLm9uU2VsZWN0Q2hhbmdlID0gb25TZWxlY3RDaGFuZ2U7XG4gICAgICAgIHRoaXMub25IZWFkZXJDbGljayA9IG9uSGVhZGVyQ2xpY2s7XG4gICAgICAgIHRoaXMub25IZWFkZXJLZXlEb3duID0gb25IZWFkZXJLZXlEb3duO1xuICAgICAgICB0aGlzLm9uT3B0aW9uc0tleURvd24gPSBvbk9wdGlvbnNLZXlEb3duO1xuICAgICAgICB0aGlzLm9uTGlzdGJveEZvY3VzID0gb25MaXN0Ym94Rm9jdXM7XG5cbiAgICAgICAgdGhpcy5zeW5jQWxsKCk7XG4gICAgfVxuXG4gICAgLy8gRE9NIGRpZmZpbmcgaXMga2VwdCBpbmxpbmUgaGVyZSBiZWNhdXNlIHRoZSBtdXRhdGlvbiBjYXNlcyBhcmUgdGlnaHRseSBjb3VwbGVkIHRvIGVhY2hcbiAgICAvLyBvdGhlciBhbmQgdGhlIHNjcm9sbGVyJ3MgY2hpbGQgb3JkZXIuIElmIHRoaXMgZ3Jvd3MgKGUuZy4gb3B0aW9uIGdyb3VwcywgcmVvcmRlcmluZ1xuICAgIC8vIGFuaW1hdGlvbnMpLCBleHRyYWN0IGludG8gYSBkZWRpY2F0ZWQgcmVjb25jaWxlci5cbiAgICBwcml2YXRlIG9ic2VydmVPcHRpb25zKCkge1xuICAgICAgICBjb25zdCB7IHNlbGVjdEVsZW1lbnQsIG9wdGlvbnNMaXN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbkxpc3QgPT4ge1xuICAgICAgICAgICAgbGV0IHNob3VsZFJlYnVpbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBzaG91bGRVcGRhdGVTdGF0ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9uTGlzdCkge1xuICAgICAgICAgICAgICAgIGlmIChtdXRhdGlvbi50eXBlID09PSAnY2hpbGRMaXN0Jykge1xuICAgICAgICAgICAgICAgICAgICBzaG91bGRSZWJ1aWxkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkVXBkYXRlU3RhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2F0dHJpYnV0ZXMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZVN0YXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRSZWJ1aWxkKSB7XG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShvcHRpb25zTGlzdEVsZW1lbnQuY2hpbGRyZW4pLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5rZWRPcHRpb24gPSBnZXRTZWxlY3RPcHRpb25FbGVtZW50KGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFsaW5rZWRPcHRpb24gfHwgIUFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5pbmNsdWRlcyhsaW5rZWRPcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlua2VkT3B0aW9uKSB1bmxpbmtPcHRpb24obGlua2VkT3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuZm9yRWFjaCgoc2VsZWN0T3B0aW9uLCBvcHRpb25JbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwgPSBjcmVhdGVXb3JzZU9wdGlvbkVsZW1lbnQodGhpcywgc2VsZWN0T3B0aW9uLCBvcHRpb25JbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rT3B0aW9uKHNlbGVjdE9wdGlvbiwgZWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZWwuaWQgPSBnZXRPcHRpb25JZCh0aGlzLCBvcHRpb25JbmRleCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEF0SW5kZXggPSBvcHRpb25zTGlzdEVsZW1lbnQuY2hpbGRyZW5bb3B0aW9uSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudEF0SW5kZXggIT09IGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50QXRJbmRleCA/IGN1cnJlbnRBdEluZGV4LmJlZm9yZShlbCkgOiBvcHRpb25zTGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBBcnJheS5mcm9tKG9wdGlvbnNMaXN0RWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50ICYmICFnZXRTZWxlY3RPcHRpb25FbGVtZW50KGNoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNob3VsZFVwZGF0ZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jQWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoc2VsZWN0RWxlbWVudCwge1xuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgc3VidHJlZTogZmFsc2UsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbJ3N0eWxlJywgJ2NsYXNzJywgJ2Rpc2FibGVkJywgJ211bHRpcGxlJywgJ3NpemUnXVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm9wdGlvbk9ic2VydmVyID0gb2JzZXJ2ZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgc2VsZWN0RWxlbWVudCwgd29yc2VTZWxlY3RFbGVtZW50LCBvcHRpb25zTGlzdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKHdvcnNlU2VsZWN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIHNlbGVjdEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgc2VsZWN0RWxlbWVudC5hZnRlcih3b3JzZVNlbGVjdEVsZW1lbnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlVHlwZUFoZWFkID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGUua2V5Lmxlbmd0aCAhPT0gMSB8fCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0aGlzLnNlYXJjaElucHV0RWxlbWVudCkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHdvcnNlT3B0aW9ucyA9IHRoaXMub3B0aW9uc0xpc3RFbGVtZW50Py5jaGlsZHJlbjtcbiAgICAgICAgdGhpcy50eXBlQWhlYWRUZXh0ICs9IGUua2V5O1xuICAgICAgICBsZXQgdHlwZUFoZWFkVGV4dCA9IHRoaXMudHlwZUFoZWFkVGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmICh3b3JzZU9wdGlvbnMgJiYgdHlwZUFoZWFkVGV4dCkge1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hpbmdXb3JzZU9wdGlvbiA9IEFycmF5LmZyb20od29yc2VPcHRpb25zKS5maW5kKHdvcnNlT3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd29yc2VPcHRpb24udGV4dENvbnRlbnQudHJpbSgpLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCh0eXBlQWhlYWRUZXh0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQ/LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKT8uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICBtYXRjaGluZ1dvcnNlT3B0aW9uPy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgaWYgKG1hdGNoaW5nV29yc2VPcHRpb24pIG1hdGNoaW5nV29yc2VPcHRpb24uc2Nyb2xsSW50b1ZpZXcoeyBibG9jazogJ25lYXJlc3QnIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnR5cGVBaGVhZFRpbWVySWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnR5cGVBaGVhZFRpbWVySWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHlwZUFoZWFkVGltZXJJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50eXBlQWhlYWRUZXh0ID0gJyc7XG4gICAgICAgIH0sIHRoaXMudHlwZUFoZWFkVGltZW91dCk7XG4gICAgfVxufVxuXG4vKipcbiAqIEVuaGFuY2VzIGV2ZXJ5IG5hdGl2ZSBgPHNlbGVjdD5gIGVsZW1lbnQgaW5zaWRlIHRoZSBwcm92aWRlZCByb290LlxuICpcbiAqIFRoZSBmdW5jdGlvbiBpcyBzYWZlIHRvIGNhbGwgbXVsdGlwbGUgdGltZXMuIEVhY2ggYDxzZWxlY3Q+YCBpcyBtb3VudGVkIGF0IG1vc3Qgb25jZS5cbiAqIElmIGBvcHRpb25zLm9ic2VydmVgIGlzIHRydWUsIG5ld2x5IGFkZGVkIHNlbGVjdHMgdW5kZXIgdGhlIHJvb3QgYXJlIGVuaGFuY2VkIGF1dG9tYXRpY2FsbHkuXG4gKlxuICogUmV0dXJucyBhIGNsZWFudXAgZnVuY3Rpb24gdGhhdCBkaXNjb25uZWN0cyB0aGUgcm9vdCBvYnNlcnZlciBhbmQgZGVzdHJveXMgbW91bnRlZCBpbnN0YW5jZXNcbiAqIHVuZGVyIHRoZSBwcm92aWRlZCByb290LlxuICovXG5leHBvcnQgZnVuY3Rpb24gd29yc2VTZWxlY3Qocm9vdDogUm9vdE5vZGUgPSBkb2N1bWVudCwgb3B0aW9uczogV29yc2VTZWxlY3RPcHRpb25zID0ge30pOiAoKSA9PiB2b2lkIHtcbiAgICBjb25zdCBwbHVnaW5zID0gb3B0aW9ucy5wbHVnaW5zID8/IFtdO1xuICAgIG1vdW50U2VsZWN0c0luUm9vdChyb290LCBwbHVnaW5zKTtcblxuICAgIGxldCByb290T2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBpZiAob3B0aW9ucy5vYnNlcnZlKSB7XG4gICAgICAgIHJvb3RPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9uTGlzdCA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9uTGlzdCkge1xuICAgICAgICAgICAgICAgIGlmIChtdXRhdGlvbi50eXBlICE9PSAnY2hpbGRMaXN0JykgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2goYWRkZWROb2RlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoYWRkZWROb2RlIGluc3RhbmNlb2YgRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYWRkZWROb2RlIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdW50U2VsZWN0RWxlbWVudChhZGRlZE5vZGUsIHJvb3QsIHBsdWdpbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYWRkZWROb2RlLnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTFNlbGVjdEVsZW1lbnQ+KCdzZWxlY3QnKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdW50U2VsZWN0RWxlbWVudChlbCwgcm9vdCwgcGx1Z2lucyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByb290T2JzZXJ2ZXIub2JzZXJ2ZShyb290LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICByb290T2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcblxuICAgICAgICBnZXRTZWxlY3RFbGVtZW50c0luUm9vdChyb290KS5mb3JFYWNoKHNlbGVjdEVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBpbnN0YW5jZXMuZ2V0KHNlbGVjdEVsZW1lbnQpO1xuICAgICAgICAgICAgaWYgKCFpbnN0YW5jZSkgcmV0dXJuO1xuICAgICAgICAgICAgaW5zdGFuY2UuZGVzdHJveSgpO1xuICAgICAgICAgICAgaW5zdGFuY2VzLmRlbGV0ZShzZWxlY3RFbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZW5zdXJlU3R5bGVzKCkge1xuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS13b3JzZS1zZWxlY3Qtc3R5bGVzPVwidHJ1ZVwiXScpKSByZXR1cm47XG5cbiAgICBjb25zdCBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtd29yc2Utc2VsZWN0LXN0eWxlcycsICd0cnVlJyk7XG4gICAgc3R5bGVFbGVtZW50LnRleHRDb250ZW50ID0gY3JlYXRlQ1NTKCk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBnZXRTZWxlY3RFbGVtZW50c0luUm9vdChyb290OiBSb290Tm9kZSkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHJvb3QucXVlcnlTZWxlY3RvckFsbDxIVE1MU2VsZWN0RWxlbWVudD4oJ3NlbGVjdCcpKTtcbn1cblxuZnVuY3Rpb24gbW91bnRTZWxlY3RzSW5Sb290KHJvb3Q6IFJvb3ROb2RlLCBwbHVnaW5zOiBQbHVnaW5bXSkge1xuICAgIGdldFNlbGVjdEVsZW1lbnRzSW5Sb290KHJvb3QpLmZvckVhY2goc2VsZWN0RWxlbWVudCA9PiBtb3VudFNlbGVjdEVsZW1lbnQoc2VsZWN0RWxlbWVudCwgcm9vdCwgcGx1Z2lucykpO1xufVxuXG5mdW5jdGlvbiBtb3VudFNlbGVjdEVsZW1lbnQoc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQsIHJvb3Q6IFJvb3ROb2RlLCBwbHVnaW5zOiBQbHVnaW5bXSkge1xuICAgIGlmIChpbnN0YW5jZXMuZ2V0KHNlbGVjdEVsZW1lbnQpKSByZXR1cm47XG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBXb3JzZVNlbGVjdChzZWxlY3RFbGVtZW50LCBnZXRDb25maWcoc2VsZWN0RWxlbWVudCksIHJvb3QsIHBsdWdpbnMpO1xuICAgIGluc3RhbmNlLm1vdW50KCk7XG4gICAgaW5zdGFuY2VzLnNldChzZWxlY3RFbGVtZW50LCBpbnN0YW5jZSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBR08sSUFBTSxpQkFBaUI7QUFBQSxFQUMxQixZQUFZO0FBQUEsRUFDWixrQkFBa0I7QUFBQSxFQUNsQixRQUFRO0FBQUEsRUFDUixPQUFPO0FBQ1g7OztBQ0hPLFNBQVMsWUFBWTtBQUN4QjtBQUFBO0FBQUEsSUFBMkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBa0JSLGVBQWUsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkF3QjNCLGVBQWUsS0FBSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBbUlmLGVBQWUsZ0JBQWdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBMEZyRDs7O0FDeFFBLElBQU0sYUFBYSxPQUFPLEtBQUssY0FBYztBQUU3QyxTQUFTLFlBQVksT0FBZTtBQUNoQyxTQUFPLE1BQU0sUUFBUSxVQUFVLGVBQWEsSUFBSSxVQUFVLFlBQVksQ0FBQyxFQUFFO0FBQzdFO0FBRUEsU0FBUyxpQkFBc0MsS0FBUSxNQUErQjtBQUNsRixRQUFNLGVBQWUsZUFBZSxHQUFHO0FBRXZDLE1BQUksT0FBTyxpQkFBaUIsV0FBVztBQUNuQyxXQUFRLFNBQVM7QUFBQSxFQUNyQjtBQUVBLE1BQUksT0FBTyxpQkFBaUIsVUFBVTtBQUNsQyxXQUFPLE9BQU8sSUFBSTtBQUFBLEVBQ3RCO0FBRUEsU0FBTztBQUNYO0FBRU8sU0FBUyxVQUFVLGVBQXNDO0FBQzVELFFBQU0sU0FBdUIsRUFBRSxHQUFHLGVBQWU7QUFFakQsV0FBUyxJQUFJLEdBQUcsSUFBSSxXQUFXLFFBQVEsS0FBSztBQUN4QyxVQUFNLE1BQU0sV0FBVyxDQUFDO0FBQ3hCLFVBQU0sb0JBQW9CLFFBQVEsWUFBWSxHQUFHLENBQUM7QUFDbEQsVUFBTSxPQUFPLGNBQWMsYUFBYSxpQkFBaUI7QUFFekQsUUFBSSxTQUFTLEtBQU07QUFFbkIsSUFBQyxPQUF3RCxHQUFHLElBQUksaUJBQWlCLEtBQUssSUFBSTtBQUFBLEVBQzlGO0FBRUEsU0FBTztBQUNYOzs7QUNsQ08sU0FBUyxxQkFBcUIscUJBQXlDO0FBQzFFLFNBQU8sb0JBQW9CLGNBQWMsT0FBTztBQUNwRDtBQUVPLFNBQVMsaUJBQWlCLHFCQUF5QztBQUN0RSxTQUFPLG9CQUFvQixjQUFjO0FBQzdDO0FBSU8sU0FBUyxvQkFBb0IsY0FBaUQ7QUFDakYsU0FBTyxpQkFBaUIsUUFBUSxhQUFhLFVBQVUsTUFBTSxhQUFhO0FBQzlFO0FBRU8sU0FBUyxpQkFBaUIsZUFBa0Msb0JBQW1EO0FBQ2xILE1BQUksY0FBYyxRQUFRLEVBQUcsUUFBTztBQUVwQyxRQUFNLGVBQWUsbUJBQW1CLHNCQUFzQixFQUFFO0FBQ2hFLFFBQU0sY0FBYyxlQUFlLGNBQWM7QUFFakQsUUFBTSxxQkFBcUIsY0FBYyxlQUFlLHNCQUFzQixFQUFFLFVBQVU7QUFDMUYsU0FBTyxLQUFLLElBQUksYUFBYSxrQkFBa0IsSUFBSTtBQUN2RDs7O0FDckJBLElBQU0sY0FBYyxvQkFBSSxRQUEyQztBQUNuRSxJQUFNLGNBQWMsb0JBQUksUUFBMkM7QUFHNUQsU0FBUyxXQUFXLGNBQWlDLG9CQUFvQztBQUM1RixjQUFZLElBQUksY0FBYyxrQkFBa0I7QUFDaEQsY0FBWSxJQUFJLG9CQUFvQixZQUFZO0FBQ3BEO0FBRU8sU0FBUyxhQUFhLGNBQWlDO0FBQzFELFFBQU0scUJBQXFCLFlBQVksSUFBSSxZQUFZO0FBQ3ZELE1BQUksQ0FBQyxtQkFBb0I7QUFFekIsY0FBWSxPQUFPLFlBQVk7QUFDL0IsY0FBWSxPQUFPLGtCQUFrQjtBQUN6QztBQUVPLFNBQVMsc0JBQXNCLGNBQWlDO0FBQ25FLFNBQU8sWUFBWSxJQUFJLFlBQVk7QUFDdkM7QUFFTyxTQUFTLHVCQUF1QixvQkFBb0M7QUFDdkUsU0FBTyxZQUFZLElBQUksa0JBQWtCO0FBQzdDOzs7QUN0Qk8sU0FBUyxxQkFBcUIsY0FBa0M7QUFDbkUsTUFBSSxDQUFDLGFBQWM7QUFDbkIsUUFBTSxLQUFLLHNCQUFzQixZQUFZO0FBQzdDLE1BQUksRUFBRSxjQUFjLGdCQUFpQjtBQUNyQyxLQUFHLGVBQWUsRUFBRSxPQUFPLFVBQVUsQ0FBQztBQUMxQztBQUdBLFNBQVMsb0JBQW9CLFlBQXNCO0FBQy9DLFNBQU8sV0FBVyxTQUFTLElBQUksV0FBVyxXQUFXLEtBQUssR0FBRyxDQUFDLE1BQU07QUFDeEU7QUFFTyxTQUFTLHFDQUFxQyxxQkFBeUM7QUFDMUYsUUFBTSxtQkFBNkIsQ0FBQztBQUVwQyxNQUFJLG9CQUFvQixPQUFPLFVBQVUsZUFBZSxPQUFPO0FBQzNELHFCQUFpQixLQUFLLFVBQVUsb0JBQW9CLE9BQU8sS0FBSyxHQUFHO0FBQUEsRUFDdkU7QUFFQSxNQUFJLG9CQUFvQixPQUFPLFdBQVcsZUFBZSxRQUFRO0FBQzdELHFCQUFpQixLQUFLLFdBQVcsb0JBQW9CLE9BQU8sTUFBTSxHQUFHO0FBQUEsRUFDekU7QUFFQSxTQUFPLG9CQUFvQixnQkFBZ0I7QUFDL0M7QUFHQSxTQUFTLFdBQVcsT0FBZTtBQUMvQixTQUFPLE1BQ0YsUUFBUSxNQUFNLE9BQU8sRUFDckIsUUFBUSxNQUFNLE1BQU0sRUFDcEIsUUFBUSxNQUFNLE1BQU0sRUFDcEIsUUFBUSxNQUFNLFFBQVEsRUFDdEIsUUFBUSxNQUFNLE9BQU87QUFDOUI7QUFFTyxTQUFTLFlBQVkscUJBQXlDLGFBQXFCO0FBQ3RGLFNBQU8sR0FBRyxvQkFBb0IsVUFBVSxXQUFXLFdBQVc7QUFDbEU7QUFFQSxTQUFTLHNCQUFzQixjQUFpQztBQUM1RCxRQUFNLFVBQVUsQ0FBQyxxQkFBcUI7QUFFdEMsTUFBSSxhQUFhLFVBQVU7QUFDdkIsWUFBUSxLQUFLLFVBQVU7QUFBQSxFQUMzQjtBQUVBLE1BQUksYUFBYSxVQUFVO0FBQ3ZCLFlBQVEsS0FBSyxVQUFVO0FBQUEsRUFDM0I7QUFFQSxTQUFPLFFBQVEsS0FBSyxHQUFHO0FBQzNCO0FBRU8sU0FBUyxzQkFDWixxQkFDQSxjQUNBLGFBQ0Y7QUFDRSxRQUFNLHFCQUFxQixzQkFBc0IsWUFBWTtBQUM3RCxRQUFNLGFBQWEsYUFBYSxlQUFlO0FBRS9DLFNBQU87QUFBQSxlQUNJLFlBQVkscUJBQXFCLFdBQVcsQ0FBQztBQUFBLGtCQUMxQyxrQkFBa0I7QUFBQSx1QkFDYixXQUFXLGFBQWEsS0FBSyxDQUFDO0FBQUE7QUFBQSwwQkFFM0IsYUFBYSxXQUFXLFNBQVMsT0FBTztBQUFBLDBCQUN4QyxhQUFhLFdBQVcsU0FBUyxPQUFPO0FBQUEsUUFDMUQsV0FBVyxVQUFVLENBQUM7QUFBQTtBQUFBO0FBRzlCO0FBRU8sU0FBUyx5QkFDWixxQkFDQSxjQUNBLGFBQ0Y7QUFDRSxTQUFPLFNBQVMsWUFBWSxFQUFFO0FBQUEsSUFDMUIsc0JBQXNCLHFCQUFxQixjQUFjLFdBQVc7QUFBQSxFQUN4RSxFQUFFO0FBQ047QUFFTyxTQUFTLGlCQUFpQixxQkFBeUM7QUFDdEUsTUFBSSxDQUFDLG9CQUFvQixPQUFPLFlBQVk7QUFDeEMsV0FBTztBQUFBLEVBQ1g7QUFFQSxTQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNYO0FBRU8sU0FBUyxvQkFBb0I7QUFDaEMsU0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNWDtBQUVPLFNBQVMsa0JBQWtCLHFCQUF5QztBQUN2RSxRQUFNLHVCQUF1QixxQ0FBcUMsbUJBQW1CO0FBQ3JGLFFBQU0sbUJBQW1CLENBQUMsd0JBQXdCO0FBRWxELE1BQUkscUJBQXFCLG1CQUFtQixHQUFHO0FBQzNDLHFCQUFpQixLQUFLLFNBQVM7QUFBQSxFQUNuQztBQUVBLE1BQUksaUJBQWlCLG1CQUFtQixHQUFHO0FBQ3ZDLHFCQUFpQixLQUFLLFVBQVU7QUFBQSxFQUNwQztBQUVBLFFBQU0sYUFBYTtBQUFBLGtCQUNMLGlCQUFpQixLQUFLLEdBQUcsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQVNsQyxpQkFBaUIsbUJBQW1CLENBQUM7QUFBQSxVQUNyQyxrQkFBa0IsQ0FBQztBQUFBLG9EQUN1QixvQkFBb0I7QUFBQTtBQUFBO0FBQUE7QUFLcEUsUUFBTSxxQkFBcUIsU0FBUyxZQUFZLEVBQUU7QUFBQSxJQUM5QztBQUFBLEVBQ0osRUFBRTtBQUVGLFFBQU0scUJBQXFCLG1CQUFtQixjQUFjLGdDQUFnQztBQUM1RixxQkFBbUIsYUFBYSxRQUFRLFNBQVM7QUFDakQscUJBQW1CLFdBQVcscUJBQXFCLG1CQUFtQixJQUFJLElBQUk7QUFFOUUsTUFBSSxpQkFBaUIsbUJBQW1CLEdBQUc7QUFDdkMsdUJBQW1CLGFBQWEsd0JBQXdCLE1BQU07QUFBQSxFQUNsRTtBQUVBLFFBQU0sZ0JBQWdCLE1BQU0sS0FBSyxvQkFBb0IsY0FBYyxPQUFPO0FBRTFFLFdBQVMsSUFBSSxHQUFHLElBQUksY0FBYyxRQUFRLEtBQUs7QUFDM0MsVUFBTSxlQUFlLGNBQWMsQ0FBQztBQUNwQyxVQUFNLHFCQUFxQjtBQUFBLE1BQ3ZCO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNKO0FBQ0EsZUFBVyxjQUFjLGtCQUFrQjtBQUMzQyx1QkFBbUIsWUFBWSxrQkFBa0I7QUFBQSxFQUNyRDtBQUVBLFNBQU87QUFDWDs7O0FDcktBLFNBQVMsZUFBZSxTQUF3QixZQUFvQjtBQUNoRSxRQUFNLE9BQU8sV0FBVyxLQUFLLEVBQUUsWUFBWTtBQUUzQyxRQUFNLEtBQUssUUFBUSxtQkFBbUIsUUFBUSxFQUFFLFFBQVEsaUJBQWU7QUFDbkUsUUFBSSxFQUFFLHVCQUF1QixnQkFBaUI7QUFDOUMsVUFBTSxVQUFVLFNBQVMsTUFBTSxZQUFZLFlBQVksWUFBWSxFQUFFLFNBQVMsSUFBSTtBQUNsRixnQkFBWSxVQUFVLE9BQU8sV0FBVyxPQUFPO0FBQUEsRUFDbkQsQ0FBQztBQUVELE1BQUksQ0FBQyxNQUFNO0FBQ1AsWUFBUSxhQUFhO0FBQ3JCO0FBQUEsRUFDSjtBQUVBLFFBQU0sYUFBYSxRQUFRLG1CQUFtQixpQkFBaUIsOEJBQThCLEVBQUU7QUFDL0YsUUFBTSxVQUNGLGVBQWUsSUFBSSxxQkFDbkIsZUFBZSxJQUFJLHVCQUNuQixHQUFHLFVBQVU7QUFFakIsVUFBUSxXQUFXLE9BQU87QUFFMUIsUUFBTSxhQUFhLFFBQVEsbUJBQW1CLGNBQWMsOEJBQThCO0FBQzFGLE1BQUksc0JBQXNCLGdCQUFnQjtBQUN0QyxlQUFXLGVBQWUsRUFBRSxPQUFPLFVBQVUsQ0FBQztBQUFBLEVBQ2xEO0FBQ0o7QUFFTyxTQUFTLDRCQUFvQztBQUNoRCxNQUFJLGFBQWE7QUFDakIsTUFBSSxnQkFBc0M7QUFFMUMsU0FBTztBQUFBLElBQ0gsTUFBTTtBQUFBLElBRU4sS0FBSyxTQUF3QjtBQUN6QixzQkFBZ0I7QUFDaEIsWUFBTSxFQUFFLG1CQUFtQixJQUFJO0FBQy9CLFVBQUksQ0FBQyxtQkFBb0I7QUFFekIsY0FBUSxHQUFHLG9CQUFvQixTQUFTLENBQUMsVUFBVTtBQUMvQyxjQUFNLFNBQVMsTUFBTTtBQUNyQixZQUFJLEVBQUUsa0JBQWtCLGtCQUFtQjtBQUMzQyxxQkFBYSxPQUFPO0FBQ3BCLHVCQUFlLFNBQVMsVUFBVTtBQUFBLE1BQ3RDLENBQUM7QUFBQSxJQUNMO0FBQUEsSUFFQSxTQUFTO0FBQ0wsVUFBSSxDQUFDLGNBQWU7QUFDcEIscUJBQWUsZUFBZSxVQUFVO0FBQUEsSUFDNUM7QUFBQSxJQUVBLFVBQVU7QUFDTixVQUFJLENBQUMsY0FBZTtBQUNwQixtQkFBYTtBQUNiLFlBQU0sRUFBRSxtQkFBbUIsSUFBSTtBQUMvQixVQUFJLDhCQUE4QixrQkFBa0I7QUFDaEQsMkJBQW1CLFFBQVE7QUFBQSxNQUMvQjtBQUNBLHFCQUFlLGVBQWUsRUFBRTtBQUFBLElBQ3BDO0FBQUEsSUFFQSxVQUFVO0FBQ04sc0JBQWdCO0FBQ2hCLG1CQUFhO0FBQUEsSUFDakI7QUFBQSxFQUNKO0FBQ0o7OztBQ3JEQSxJQUFNLFlBQVksb0JBQUksUUFBd0M7QUFDOUQsSUFBSSxpQkFBaUI7QUFJckIsSUFBTSxlQUFOLE1BQU0sYUFBMEM7QUFBQSxFQThDNUMsWUFBWSxlQUFrQyxTQUFnQyxDQUFDLEdBQUcsT0FBaUIsVUFBVSxVQUFvQixDQUFDLEdBQUc7QUE3QnJJLFNBQVEsZ0JBQWdCO0FBQ3hCLFNBQVEsbUJBQW1CO0FBc0IzQixnQkFBTztBQUdQLFNBQVEsVUFBb0IsQ0FBQztBQUM3QixTQUFRLGtCQUFvQyxDQUFDO0FBa3FCN0MsU0FBUSxrQkFBa0IsQ0FBQyxNQUFxQjtBQUM1QyxVQUFJLEVBQUUsSUFBSSxXQUFXLEtBQUssU0FBUyxrQkFBa0IsS0FBSyxtQkFBb0I7QUFFOUUsWUFBTSxlQUFlLEtBQUssb0JBQW9CO0FBQzlDLFdBQUssaUJBQWlCLEVBQUU7QUFDeEIsVUFBSSxnQkFBZ0IsS0FBSyxjQUFjLFlBQVk7QUFFbkQsVUFBSSxnQkFBZ0IsZUFBZTtBQUMvQixjQUFNLHNCQUFzQixNQUFNLEtBQUssWUFBWSxFQUFFLEtBQUssaUJBQWU7QUFDckUsaUJBQU8sWUFBWSxZQUFZLEtBQUssRUFBRSxZQUFZLEVBQUUsV0FBVyxhQUFhO0FBQUEsUUFDaEYsQ0FBQztBQUNELGFBQUssb0JBQW9CLGNBQWMsU0FBUyxHQUFHLFVBQVUsT0FBTyxRQUFRO0FBQzVFLDZCQUFxQixVQUFVLElBQUksUUFBUTtBQUUzQyxZQUFJLG9CQUFxQixxQkFBb0IsZUFBZSxFQUFFLE9BQU8sVUFBVSxDQUFDO0FBQUEsTUFDcEY7QUFDQSxVQUFJLEtBQUssa0JBQWtCO0FBQ3ZCLHFCQUFhLEtBQUssZ0JBQWdCO0FBQUEsTUFDdEM7QUFDQSxXQUFLLG1CQUFtQixXQUFXLE1BQU07QUFDckMsYUFBSyxnQkFBZ0I7QUFBQSxNQUN6QixHQUFHLEtBQUssZ0JBQWdCO0FBQUEsSUFDNUI7QUFyckJJLFNBQUssZ0JBQWdCO0FBQ3JCLFNBQUssU0FBUyxFQUFFLEdBQUcsZ0JBQWdCLEdBQUcsT0FBTztBQUM3QyxTQUFLLE9BQU87QUFDWixTQUFLLGFBQWEsTUFBTSxFQUFFLGNBQWM7QUFDeEMsU0FBSyxVQUFVLENBQUMsR0FBRyxPQUFPO0FBRTFCLFFBQUksS0FBSyxPQUFPLGNBQWMsQ0FBQyxRQUFRLEtBQUssT0FBSyxFQUFFLFNBQVMsUUFBUSxHQUFHO0FBQ25FLFdBQUssUUFBUSxLQUFLLDBCQUEwQixDQUFDO0FBQUEsSUFDakQ7QUFBQSxFQUNKO0FBQUEsRUFsREEsT0FBZSwwQkFBMEIsT0FBYztBQUNuRCxVQUFNLFNBQVMsTUFBTTtBQUNyQixRQUFJLEVBQUUsa0JBQWtCLE1BQU87QUFDL0IsZUFBVyxZQUFZLGFBQVksa0JBQWtCO0FBQ2pELFVBQUksU0FBUyxzQkFBc0IsQ0FBQyxTQUFTLG1CQUFtQixTQUFTLE1BQU0sR0FBRztBQUM5RSxpQkFBUyxjQUFjO0FBQUEsTUFDM0I7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBNkNBLFFBQVE7QUFDSixRQUFJLEtBQUssbUJBQW9CO0FBRTdCLGlCQUFhO0FBRWIsU0FBSyxxQkFBcUIsa0JBQWtCLElBQUk7QUFDaEQsU0FBSyxnQkFBZ0IsS0FBSyxtQkFBbUIsY0FBYyxzQkFBc0I7QUFDakYsU0FBSyx1QkFBdUIsS0FBSyxtQkFBbUIsY0FBYyx1QkFBdUI7QUFDekYsU0FBSyxxQkFBcUIsS0FBSyxtQkFBbUIsY0FBYyxnQ0FBZ0M7QUFDaEcsU0FBSyxxQkFBcUIsS0FBSyxtQkFBbUIsY0FBYyw0QkFBNEI7QUFDNUYsU0FBSyxpQkFBaUIsS0FBSyxtQkFBbUIsY0FBYyx1QkFBdUI7QUFFbkYsUUFBSSxhQUFZLGlCQUFpQixTQUFTLEdBQUc7QUFDekMsZUFBUyxpQkFBaUIsZUFBZSxhQUFZLHlCQUF5QjtBQUFBLElBQ2xGO0FBQ0EsU0FBSyxtQkFBbUIsaUJBQWlCLFNBQVMsS0FBSyxlQUFlO0FBQ3RFLGlCQUFZLGlCQUFpQixJQUFJLElBQUk7QUFFckMsU0FBSyxPQUFPO0FBQ1osU0FBSyxXQUFXO0FBQ2hCLFNBQUssZUFBZTtBQUNwQixTQUFLLFlBQVk7QUFBQSxFQUNyQjtBQUFBLEVBRUEsVUFBVTtBQUNOLFNBQUssZ0JBQWdCLFdBQVc7QUFDaEMsU0FBSyxpQkFBaUI7QUFFdEIsZUFBVyxVQUFVLEtBQUssU0FBUztBQUMvQixhQUFPLFVBQVU7QUFBQSxJQUNyQjtBQUNBLGVBQVcsRUFBRSxRQUFRLE9BQU8sUUFBUSxLQUFLLEtBQUssaUJBQWlCO0FBQzNELGFBQU8sb0JBQW9CLE9BQU8sT0FBTztBQUFBLElBQzdDO0FBQ0EsU0FBSyxrQkFBa0IsQ0FBQztBQUN4QixTQUFLLFVBQVUsQ0FBQztBQUVoQixRQUFJLEtBQUssZ0JBQWdCO0FBQ3JCLFdBQUssY0FBYyxvQkFBb0IsVUFBVSxLQUFLLGNBQWM7QUFDcEUsV0FBSyxpQkFBaUI7QUFBQSxJQUMxQjtBQUVBLFFBQUksS0FBSyxrQkFBa0IsS0FBSyxzQkFBc0I7QUFDbEQsV0FBSyxxQkFBcUIsb0JBQW9CLFNBQVMsS0FBSyxjQUFjO0FBQzFFLFdBQUssaUJBQWlCO0FBQUEsSUFDMUI7QUFFQSxRQUFJLEtBQUssaUJBQWlCLEtBQUssZUFBZTtBQUMxQyxXQUFLLGNBQWMsb0JBQW9CLFNBQVMsS0FBSyxhQUFhO0FBQ2xFLFdBQUssZ0JBQWdCO0FBQUEsSUFDekI7QUFFQSxRQUFJLEtBQUssbUJBQW1CLEtBQUssZUFBZTtBQUM1QyxXQUFLLGNBQWMsb0JBQW9CLFdBQVcsS0FBSyxlQUFlO0FBQ3RFLFdBQUssa0JBQWtCO0FBQUEsSUFDM0I7QUFFQSxRQUFJLEtBQUssb0JBQW9CLEtBQUssb0JBQW9CO0FBQ2xELFdBQUssbUJBQW1CLG9CQUFvQixXQUFXLEtBQUssZ0JBQWdCO0FBQzVFLFdBQUssbUJBQW1CO0FBQUEsSUFDNUI7QUFFQSxRQUFJLEtBQUssbUJBQW1CLEtBQUssb0JBQW9CO0FBQ2pELFdBQUssbUJBQW1CLG9CQUFvQixXQUFXLEtBQUssZUFBZTtBQUMzRSxXQUFLLGtCQUFrQjtBQUFBLElBQzNCO0FBRUEsUUFBSSxLQUFLLGtCQUFrQixLQUFLLG9CQUFvQjtBQUNoRCxXQUFLLG1CQUFtQixvQkFBb0IsU0FBUyxLQUFLLGNBQWM7QUFDeEUsV0FBSyxpQkFBaUI7QUFBQSxJQUMxQjtBQUVBLGlCQUFZLGlCQUFpQixPQUFPLElBQUk7QUFDeEMsUUFBSSxhQUFZLGlCQUFpQixTQUFTLEdBQUc7QUFDekMsZUFBUyxvQkFBb0IsZUFBZSxhQUFZLHlCQUF5QjtBQUFBLElBQ3JGO0FBRUEsU0FBSyxvQkFBb0Isb0JBQW9CLFNBQVMsS0FBSyxlQUFlO0FBRTFFLFVBQU0sS0FBSyxLQUFLLGNBQWMsT0FBTyxFQUFFLFFBQVEsWUFBWTtBQUUzRCxTQUFLLG9CQUFvQixPQUFPO0FBQ2hDLFNBQUssY0FBYyxNQUFNLFVBQVU7QUFFbkMsU0FBSyxxQkFBcUI7QUFDMUIsU0FBSyxnQkFBZ0I7QUFDckIsU0FBSyx1QkFBdUI7QUFDNUIsU0FBSyxxQkFBcUI7QUFDMUIsU0FBSyxxQkFBcUI7QUFDMUIsU0FBSyxpQkFBaUI7QUFDdEIsU0FBSyxPQUFPO0FBQ1osU0FBSyxlQUFlO0FBQUEsRUFDeEI7QUFBQSxFQUVBLGlCQUFpQjtBQUNiLFVBQU0sRUFBRSxvQkFBb0IsZUFBZSxvQkFBb0IsZUFBZSxPQUFPLElBQUk7QUFDekYsUUFBSSxFQUFFLDhCQUE4QixnQkFBaUI7QUFDckQsUUFBSSxFQUFFLHlCQUF5QixtQkFBb0I7QUFDbkQsUUFBSSxFQUFFLDhCQUE4QixnQkFBaUI7QUFFckQsVUFBTSxnQkFBZ0IsT0FBTyxpQkFBaUIsYUFBYTtBQUUzRCxRQUFJLGNBQWMsU0FBUyxjQUFjLFVBQVUsVUFBVSxjQUFjLFVBQVUsT0FBTztBQUN4Rix5QkFBbUIsTUFBTSxRQUFRLGNBQWM7QUFBQSxJQUNuRDtBQUVBLGtCQUFjLE1BQU0sT0FBTyxjQUFjO0FBQ3pDLFFBQUkscUJBQXFCLElBQUksR0FBRztBQUM1QixZQUFNLGNBQWMsbUJBQW1CLFNBQVMsQ0FBQztBQUNqRCxZQUFNLFNBQVMsY0FBYyxpQkFBaUIsZUFBZSxXQUFXLElBQUk7QUFDNUUsVUFBSSxPQUFRLG9CQUFtQixNQUFNLFNBQVM7QUFBQSxJQUNsRCxPQUFPO0FBQ0gseUJBQW1CLE1BQU0sWUFBWSxHQUFHLE9BQU8sZ0JBQWdCO0FBQUEsSUFDbkU7QUFBQSxFQUNKO0FBQUEsRUFFQSxrQkFBa0I7QUFDZCxRQUFJLEVBQUUsS0FBSyw4QkFBOEIsZ0JBQWlCO0FBRTFELFVBQU0sZ0JBQWdCLHFCQUFxQixJQUFJO0FBQy9DLFVBQU0sU0FBUyxnQkFBZ0IsT0FBTyxLQUFLO0FBRTNDLFVBQU0sU0FBUyxPQUFPLFdBQVcsOEJBQThCLEVBQUUsV0FDN0QsaUJBQWlCLEtBQUssYUFBYSxFQUFFLFlBQVksU0FBUyxNQUFNO0FBRXBFLFNBQUssbUJBQW1CLFVBQVUsT0FBTyxRQUFRLE1BQU07QUFDdkQsU0FBSyxtQkFBbUIsVUFBVSxPQUFPLFdBQVcsYUFBYTtBQUNqRSxTQUFLLG1CQUFtQixVQUFVLE9BQU8sWUFBWSxpQkFBaUIsSUFBSSxDQUFDO0FBQzNFLFNBQUssbUJBQW1CLFVBQVUsT0FBTyxRQUFRLE1BQU07QUFFdkQsUUFBSSxLQUFLLHlCQUF5QixtQkFBbUI7QUFDakQsV0FBSyxjQUFjLGFBQWEsaUJBQWlCLE9BQU8sTUFBTSxDQUFDO0FBQUEsSUFDbkU7QUFFQSxRQUFJLEtBQUssOEJBQThCLGdCQUFnQjtBQUNuRCxXQUFLLG1CQUFtQixhQUFhLHdCQUF3QixPQUFPLGlCQUFpQixJQUFJLENBQUMsQ0FBQztBQUMzRixXQUFLLG1CQUFtQixXQUFXLFNBQVMsSUFBSTtBQUFBLElBQ3BEO0FBRUEsU0FBSyxrQkFBa0I7QUFBQSxFQUMzQjtBQUFBLEVBRUEsc0JBQXNCO0FBQ2xCLFVBQU0sRUFBRSxvQkFBb0IsY0FBYyxJQUFJO0FBQzlDLFFBQUksRUFBRSw4QkFBOEIsZ0JBQWlCO0FBRXJELFVBQU0sS0FBSyxtQkFBbUIsUUFBUSxFQUFFLFFBQVEsUUFBTTtBQUNsRCxVQUFJLEVBQUUsY0FBYyxnQkFBaUI7QUFDckMsU0FBRyxVQUFVLE9BQU8sVUFBVTtBQUM5QixTQUFHLGFBQWEsaUJBQWlCLE9BQU87QUFBQSxJQUM1QyxDQUFDO0FBRUQsVUFBTSxLQUFLLGNBQWMsT0FBTyxFQUFFLFFBQVEsa0JBQWdCO0FBQ3RELFVBQUksQ0FBQyxhQUFhLFNBQVU7QUFDNUIsVUFBSSxvQkFBb0IsWUFBWSxFQUFHO0FBQ3ZDLFlBQU0sS0FBSyxzQkFBc0IsWUFBWTtBQUM3QyxVQUFJLFVBQVUsSUFBSSxVQUFVO0FBQzVCLFVBQUksYUFBYSxpQkFBaUIsTUFBTTtBQUFBLElBQzVDLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFFQSxzQkFBc0I7QUFDbEIsVUFBTSxFQUFFLG9CQUFvQixlQUFlLGVBQWUsbUJBQW1CLElBQUk7QUFDakYsUUFBSSxFQUFFLDhCQUE4QixnQkFBaUI7QUFFckQsdUJBQW1CLFVBQVUsT0FBTyxZQUFZLGNBQWMsUUFBUTtBQUV0RSxRQUFJLHlCQUF5QixtQkFBbUI7QUFDNUMsb0JBQWMsV0FBVyxjQUFjO0FBQ3ZDLG9CQUFjLGFBQWEsaUJBQWlCLE9BQU8sY0FBYyxRQUFRLENBQUM7QUFBQSxJQUM5RTtBQUVBLFFBQUksOEJBQThCLGtCQUFrQjtBQUNoRCx5QkFBbUIsV0FBVyxjQUFjO0FBQUEsSUFDaEQ7QUFFQSxVQUFNLEtBQUssY0FBYyxPQUFPLEVBQUUsUUFBUSxrQkFBZ0I7QUFDdEQsWUFBTSxLQUFLLHNCQUFzQixZQUFZO0FBQzdDLFVBQUksVUFBVSxPQUFPLFlBQVksYUFBYSxRQUFRO0FBQ3RELFVBQUksYUFBYSxpQkFBaUIsT0FBTyxhQUFhLFFBQVEsQ0FBQztBQUFBLElBQ25FLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFFQSxvQkFBb0I7QUFDaEIsVUFBTSxFQUFFLGVBQWUsY0FBYyxJQUFJO0FBQ3pDLFFBQUksRUFBRSx5QkFBeUIsbUJBQW9CO0FBRW5ELFVBQU0sVUFBVSxjQUFjLGNBQWMsNEJBQTRCO0FBQ3hFLFFBQUksRUFBRSxtQkFBbUIsaUJBQWtCO0FBRTNDLFVBQU0saUJBQ0YsY0FBYyxnQkFBZ0IsQ0FBQyxLQUMvQixjQUFjLFFBQVEsY0FBYyxhQUFhLEtBQ2pEO0FBRUosVUFBTSxRQUFTLG9CQUFvQixjQUFjLEtBQUssS0FBSyxPQUNyRCxLQUNBLGdCQUFnQixhQUFhLEtBQUssS0FBSztBQUU3QyxZQUFRLGNBQWM7QUFDdEIsa0JBQWMsUUFBUTtBQUN0QixrQkFBYyxhQUFhLGNBQWMsUUFBUSxhQUFhLEtBQUssS0FBSyxrQkFBa0I7QUFBQSxFQUM5RjtBQUFBLEVBRUEseUJBQXlCO0FBQ3JCLFVBQU0sRUFBRSxvQkFBb0IsYUFBYSxJQUFJO0FBQzdDLFFBQUksRUFBRSw4QkFBOEIsZ0JBQWlCO0FBRXJELFFBQUksQ0FBQyxjQUFjO0FBQ2YseUJBQW1CLGdCQUFnQix1QkFBdUI7QUFDMUQ7QUFBQSxJQUNKO0FBRUEsVUFBTSxLQUFLLHNCQUFzQixZQUFZO0FBQzdDLFFBQUksRUFBRSxjQUFjLGlCQUFpQjtBQUNqQyx5QkFBbUIsZ0JBQWdCLHVCQUF1QjtBQUMxRDtBQUFBLElBQ0o7QUFFQSx1QkFBbUIsYUFBYSx5QkFBeUIsR0FBRyxFQUFFO0FBQUEsRUFDbEU7QUFBQSxFQUVBLDBCQUEwQjtBQUN0QixVQUFNLEVBQUUsb0JBQW9CLGFBQWEsSUFBSTtBQUM3QyxRQUFJLEVBQUUsOEJBQThCLGdCQUFpQjtBQUVyRCxVQUFNLEtBQUssbUJBQW1CLFFBQVEsRUFBRSxRQUFRLFFBQU07QUFDbEQsVUFBSSxjQUFjLGVBQWdCLElBQUcsVUFBVSxPQUFPLFFBQVE7QUFBQSxJQUNsRSxDQUFDO0FBRUQsUUFBSSxjQUFjO0FBQ2QsNEJBQXNCLFlBQVksR0FBRyxVQUFVLElBQUksUUFBUTtBQUFBLElBQy9EO0FBQUEsRUFDSjtBQUFBLEVBRUEsVUFBVTtBQUNOLFNBQUssb0JBQW9CO0FBQ3pCLFNBQUssb0JBQW9CO0FBQ3pCLFNBQUssZ0JBQWdCO0FBQ3JCLFNBQUssZUFBZTtBQUNwQixlQUFXLFVBQVUsS0FBSyxTQUFTO0FBQy9CLGFBQU8sU0FBUztBQUFBLElBQ3BCO0FBQUEsRUFDSjtBQUFBLEVBRUEsV0FBVyxNQUFjO0FBQ3JCLFVBQU0sRUFBRSxlQUFlLElBQUk7QUFDM0IsUUFBSSxFQUFFLDBCQUEwQixnQkFBaUI7QUFDakQsbUJBQWUsY0FBYztBQUc3QixXQUFPLFdBQVcsTUFBTTtBQUNwQixVQUFJLEtBQUssbUJBQW1CLGdCQUFnQjtBQUN4Qyx1QkFBZSxjQUFjO0FBQUEsTUFDakM7QUFBQSxJQUNKLEdBQUcsQ0FBQztBQUFBLEVBQ1I7QUFBQSxFQUVBLGVBQWU7QUFDWCxRQUFJLEVBQUUsS0FBSywwQkFBMEIsZ0JBQWlCO0FBQ3RELFNBQUssZUFBZSxjQUFjO0FBQUEsRUFDdEM7QUFBQSxFQUVBLGVBQWU7QUFDWCxRQUFJLEtBQUssY0FBYyxTQUFVO0FBQ2pDLFFBQUkscUJBQXFCLElBQUksRUFBRztBQUVoQyxTQUFLLE9BQU87QUFDWixTQUFLLGdCQUFnQjtBQUNyQixlQUFXLFVBQVUsS0FBSyxTQUFTO0FBQy9CLGFBQU8sU0FBUztBQUFBLElBQ3BCO0FBQUEsRUFDSjtBQUFBLEVBRUEsZ0JBQWdCO0FBQ1osUUFBSSxxQkFBcUIsSUFBSSxFQUFHO0FBQ2hDLFFBQUksQ0FBQyxLQUFLLEtBQU07QUFFaEIsU0FBSyxPQUFPO0FBQ1osZUFBVyxVQUFVLEtBQUssU0FBUztBQUMvQixhQUFPLFVBQVU7QUFBQSxJQUNyQjtBQUNBLFNBQUssS0FBSyxjQUFjLFNBQVMsR0FBRyxVQUFVLE9BQU8sUUFBUTtBQUM3RCxTQUFLLGdCQUFnQjtBQUFBLEVBQ3pCO0FBQUEsRUFFQSxpQkFBaUI7QUFDYixRQUFJLHFCQUFxQixJQUFJLEVBQUc7QUFDaEMsU0FBSyxPQUFPLEtBQUssY0FBYyxJQUFJLEtBQUssYUFBYTtBQUFBLEVBQ3pEO0FBQUEsRUFFQSwyQkFBMkI7QUFDdkIsU0FBSyxhQUFhO0FBRWxCLFVBQU0sRUFBRSxtQkFBbUIsSUFBSTtBQUMvQixRQUFJLEVBQUUsOEJBQThCLGdCQUFpQjtBQUVyRCx1QkFBbUIsV0FBVztBQUM5Qix1QkFBbUIsTUFBTTtBQUN6Qix5QkFBcUIsS0FBSyxZQUFZO0FBQUEsRUFDMUM7QUFBQSxFQUVBLDhCQUE4QjtBQUMxQixTQUFLLGNBQWM7QUFDbkIsU0FBSyxlQUFlLE1BQU07QUFBQSxFQUM5QjtBQUFBLEVBRUEsMkJBQTJCO0FBQ3ZCLFdBQU8sTUFBTSxLQUFLLEtBQUssY0FBYyxPQUFPLEVBQUUsT0FBTyxTQUFPO0FBQ3hELFVBQUksSUFBSSxTQUFVLFFBQU87QUFDekIsYUFBTyxzQkFBc0IsR0FBRyxhQUFhO0FBQUEsSUFDakQsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUVBLGdCQUFnQixjQUE2QyxTQUFTLE1BQU07QUFDeEUsU0FBSyxlQUFlO0FBQ3BCLFNBQUssdUJBQXVCO0FBQzVCLFNBQUssd0JBQXdCO0FBQzdCLFFBQUksT0FBUSxzQkFBcUIsWUFBWTtBQUFBLEVBQ2pEO0FBQUEsRUFFQSxpQkFBaUIsT0FBZTtBQUM1QixVQUFNLFVBQVUsS0FBSyx5QkFBeUI7QUFDOUMsUUFBSSxRQUFRLFdBQVcsRUFBRztBQUUxQixVQUFNLGVBQWUsS0FBSyxlQUFlLFFBQVEsUUFBUSxLQUFLLFlBQVksSUFBSTtBQUM5RSxVQUFNLFlBQVksaUJBQWlCLEtBQzVCLFNBQVMsSUFBSSxJQUFJLFFBQVEsU0FBUyxJQUNuQyxLQUFLLElBQUksR0FBRyxLQUFLLElBQUksUUFBUSxTQUFTLEdBQUcsZUFBZSxLQUFLLENBQUM7QUFFcEUsU0FBSyxnQkFBZ0IsUUFBUSxTQUFTLENBQUM7QUFBQSxFQUMzQztBQUFBLEVBRUEscUJBQXFCLFVBQTJCO0FBQzVDLFVBQU0sVUFBVSxLQUFLLHlCQUF5QjtBQUM5QyxRQUFJLFFBQVEsV0FBVyxFQUFHO0FBQzFCLFNBQUssZ0JBQWdCLGFBQWEsVUFBVSxRQUFRLENBQUMsSUFBSSxRQUFRLFFBQVEsU0FBUyxDQUFDLENBQUM7QUFBQSxFQUN4RjtBQUFBLEVBRUEsa0JBQWtCO0FBQ2QsVUFBTSxFQUFFLG1CQUFtQixJQUFJO0FBQy9CLFFBQUksRUFBRSw4QkFBOEIsZ0JBQWlCLFFBQU87QUFFNUQsVUFBTSxjQUFjLE1BQU0sS0FBSyxtQkFBbUIsaUJBQWlCLHNCQUFzQixDQUFDLEVBQ3JGLEtBQUssUUFBTSxjQUFjLGNBQWM7QUFDNUMsUUFBSSxFQUFFLHVCQUF1QixnQkFBaUIsUUFBTztBQUVyRCxVQUFNLGVBQWUsWUFBWSxnQkFBZ0I7QUFDakQsV0FBTyxLQUFLLElBQUksR0FBRyxLQUFLLE1BQU0sbUJBQW1CLGVBQWUsWUFBWSxDQUFDO0FBQUEsRUFDakY7QUFBQSxFQUVBLGlCQUFpQixXQUFtQjtBQUNoQyxTQUFLLGlCQUFpQixLQUFLLGdCQUFnQixJQUFJLFNBQVM7QUFBQSxFQUM1RDtBQUFBLEVBRUEsOEJBQThCO0FBQzFCLFVBQU0sRUFBRSxjQUFjLGNBQWMsSUFBSTtBQUN4QyxRQUFJLENBQUMsZ0JBQWdCLGFBQWEsU0FBVTtBQUU1QyxRQUFJLGNBQWMsVUFBVTtBQUN4QixtQkFBYSxXQUFXLENBQUMsYUFBYTtBQUFBLElBQzFDLE9BQU87QUFDSCxvQkFBYyxnQkFBZ0IsTUFBTSxLQUFLLGNBQWMsT0FBTyxFQUFFLFFBQVEsWUFBWTtBQUFBLElBQ3hGO0FBRUEsa0JBQWMsY0FBYyxJQUFJLE1BQU0sVUFBVSxFQUFFLFNBQVMsS0FBSyxDQUFDLENBQUM7QUFBQSxFQUN0RTtBQUFBLEVBRVEsY0FBYztBQUNsQixRQUFJLEVBQUUsS0FBSyx5QkFBeUIsbUJBQW9CO0FBQ3hELFFBQUksRUFBRSxLQUFLLDhCQUE4QixnQkFBaUI7QUFFMUQsVUFBTSxVQUF5QjtBQUFBLE1BQzNCLGVBQWUsS0FBSztBQUFBLE1BQ3BCLGVBQWUsS0FBSztBQUFBLE1BQ3BCLG9CQUFvQixLQUFLO0FBQUEsTUFDekIsb0JBQW9CLEtBQUs7QUFBQSxNQUN6QixZQUFZLENBQUMsU0FBUyxLQUFLLFdBQVcsSUFBSTtBQUFBLE1BQzFDLGNBQWMsTUFBTSxLQUFLLGFBQWE7QUFBQSxNQUN0QyxJQUFJLENBQUMsUUFBUSxPQUFPLFlBQVk7QUFDNUIsZUFBTyxpQkFBaUIsT0FBTyxPQUFPO0FBQ3RDLGFBQUssZ0JBQWdCLEtBQUssRUFBRSxRQUFRLE9BQU8sUUFBUSxDQUFDO0FBQUEsTUFDeEQ7QUFBQSxJQUNKO0FBRUEsZUFBVyxVQUFVLEtBQUssU0FBUztBQUMvQixhQUFPLEtBQUssT0FBTztBQUFBLElBQ3ZCO0FBQUEsRUFDSjtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBS1EsYUFBYTtBQUNqQixVQUFNLEVBQUUsb0JBQW9CLGVBQWUsc0JBQXNCLG9CQUFvQixlQUFlLG1CQUFtQixJQUFJO0FBRTNILFFBQUksRUFBRSw4QkFBOEIsZ0JBQWlCO0FBQ3JELFFBQUksRUFBRSxnQ0FBZ0MsZ0JBQWlCO0FBQ3ZELFFBQUksRUFBRSw4QkFBOEIsZ0JBQWlCO0FBQ3JELFFBQUksRUFBRSx5QkFBeUIsbUJBQW9CO0FBRW5ELFVBQU0saUJBQWdDLFdBQVM7QUFDM0MsWUFBTSxTQUFTLE1BQU07QUFDckIsVUFBSSxFQUFFLGtCQUFrQixTQUFVO0FBRWxDLFlBQU0sV0FBVyxPQUFPLFFBQVEsc0JBQXNCO0FBQ3RELFVBQUksRUFBRSxvQkFBb0IsZ0JBQWlCO0FBQzNDLFVBQUksQ0FBQyxxQkFBcUIsU0FBUyxRQUFRLEVBQUc7QUFDOUMsVUFBSSxTQUFTLFVBQVUsU0FBUyxVQUFVLEVBQUc7QUFFN0MsWUFBTSxlQUFlLHVCQUF1QixRQUFRO0FBQ3BELFVBQUksQ0FBQyxnQkFBZ0IsYUFBYSxTQUFVO0FBRTVDLFdBQUssZ0JBQWdCLGNBQWMsS0FBSztBQUV4QyxVQUFJLGNBQWMsVUFBVTtBQUN4QixxQkFBYSxXQUFXLENBQUMsYUFBYTtBQUFBLE1BQzFDLE9BQU87QUFDSCxzQkFBYyxnQkFBZ0IsTUFBTSxLQUFLLGNBQWMsT0FBTyxFQUFFLFFBQVEsWUFBWTtBQUFBLE1BQ3hGO0FBRUEsb0JBQWMsY0FBYyxJQUFJLE1BQU0sVUFBVSxFQUFFLFNBQVMsS0FBSyxDQUFDLENBQUM7QUFDbEUsV0FBSyxjQUFjO0FBQUEsSUFDdkI7QUFFQSxVQUFNLGlCQUFnQyxNQUFNLEtBQUssUUFBUTtBQUN6RCxVQUFNLGdCQUErQixNQUFNLEtBQUssZUFBZTtBQUUvRCxVQUFNLGtCQUFpQyxXQUFTO0FBQzVDLFVBQUksRUFBRSxpQkFBaUIsZUFBZ0I7QUFFdkMsY0FBUSxNQUFNLEtBQUs7QUFBQSxRQUNmLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLGVBQUsseUJBQXlCO0FBQzlCLGVBQUssaUJBQWlCLENBQUM7QUFDdkI7QUFBQSxRQUNKLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLGVBQUsseUJBQXlCO0FBQzlCLGVBQUssaUJBQWlCLEVBQUU7QUFDeEI7QUFBQSxRQUNKLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLGVBQUsseUJBQXlCO0FBQzlCLGVBQUsscUJBQXFCLE9BQU87QUFDakM7QUFBQSxRQUNKLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLGVBQUsseUJBQXlCO0FBQzlCLGVBQUsscUJBQXFCLEtBQUs7QUFDL0I7QUFBQSxRQUNKLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLGVBQUsseUJBQXlCO0FBQzlCLGVBQUssaUJBQWlCLENBQUM7QUFDdkI7QUFBQSxRQUNKLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLGVBQUsseUJBQXlCO0FBQzlCLGVBQUssaUJBQWlCLEVBQUU7QUFDeEI7QUFBQSxRQUNKLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLGVBQUssT0FBTyxLQUFLLDRCQUE0QixJQUFJLEtBQUsseUJBQXlCO0FBQy9FO0FBQUEsTUFDUjtBQUFBLElBQ0o7QUFFQSxVQUFNLG1CQUFrQyxXQUFTO0FBQzdDLFVBQUksRUFBRSxpQkFBaUIsZUFBZ0I7QUFFdkMsY0FBUSxNQUFNLEtBQUs7QUFBQSxRQUNmLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLGVBQUssaUJBQWlCLENBQUM7QUFDdkI7QUFBQSxRQUNKLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLGVBQUssaUJBQWlCLEVBQUU7QUFDeEI7QUFBQSxRQUNKLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLGVBQUsscUJBQXFCLE9BQU87QUFDakM7QUFBQSxRQUNKLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLGVBQUsscUJBQXFCLEtBQUs7QUFDL0I7QUFBQSxRQUNKLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLGVBQUssaUJBQWlCLENBQUM7QUFDdkI7QUFBQSxRQUNKLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLGVBQUssaUJBQWlCLEVBQUU7QUFDeEI7QUFBQSxRQUNKLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLGVBQUssNEJBQTRCO0FBQ2pDLGNBQUksQ0FBQyxjQUFjLFNBQVUsTUFBSyw0QkFBNEI7QUFDOUQ7QUFBQSxRQUNKLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLGVBQUssNEJBQTRCO0FBQ2pDO0FBQUEsTUFDUjtBQUFBLElBQ0o7QUFFQSxVQUFNLGtCQUFpQyxXQUFTO0FBQzVDLFVBQUksRUFBRSxpQkFBaUIsZUFBZ0I7QUFFdkMsY0FBUSxNQUFNLEtBQUs7QUFBQSxRQUNmLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLDZCQUFtQixNQUFNO0FBQ3pCLGVBQUssaUJBQWlCLENBQUM7QUFDdkI7QUFBQSxRQUNKLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLDZCQUFtQixNQUFNO0FBQ3pCLGVBQUssaUJBQWlCLEVBQUU7QUFDeEI7QUFBQSxRQUNKLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLDZCQUFtQixNQUFNO0FBQ3pCLGVBQUsscUJBQXFCLE9BQU87QUFDakM7QUFBQSxRQUNKLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLDZCQUFtQixNQUFNO0FBQ3pCLGVBQUsscUJBQXFCLEtBQUs7QUFDL0I7QUFBQSxRQUNKLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLDZCQUFtQixNQUFNO0FBQ3pCLGVBQUssaUJBQWlCLENBQUM7QUFDdkI7QUFBQSxRQUNKLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLDZCQUFtQixNQUFNO0FBQ3pCLGVBQUssaUJBQWlCLEVBQUU7QUFDeEI7QUFBQSxRQUNKLEtBQUs7QUFDRCxnQkFBTSxlQUFlO0FBQ3JCLGVBQUssNEJBQTRCO0FBQ2pDO0FBQUEsTUFDUjtBQUFBLElBQ0o7QUFFQSx5QkFBcUIsaUJBQWlCLFNBQVMsY0FBYztBQUM3RCxrQkFBYyxpQkFBaUIsVUFBVSxjQUFjO0FBQ3ZELGtCQUFjLGlCQUFpQixTQUFTLGFBQWE7QUFDckQsa0JBQWMsaUJBQWlCLFdBQVcsZUFBZTtBQUN6RCx1QkFBbUIsaUJBQWlCLFdBQVcsZ0JBQWdCO0FBRS9ELFVBQU0saUJBQWdDLE1BQU07QUFDeEMsVUFBSSxDQUFDLHFCQUFxQixJQUFJLEtBQUssS0FBSyxhQUFjO0FBQ3RELFlBQU0sV0FBVyxNQUFNLEtBQUssY0FBYyxPQUFPLEVBQUUsS0FBSyxPQUFLLEVBQUUsWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDbEcsWUFBTSxRQUFRLEtBQUsseUJBQXlCLEVBQUUsQ0FBQztBQUMvQyxZQUFNLFNBQVMsWUFBWTtBQUMzQixVQUFJLE9BQVEsTUFBSyxnQkFBZ0IsUUFBUSxJQUFJO0FBQUEsSUFDakQ7QUFDQSx1QkFBbUIsaUJBQWlCLFNBQVMsY0FBYztBQUUzRCxRQUFJLDhCQUE4QixrQkFBa0I7QUFDaEQseUJBQW1CLGlCQUFpQixXQUFXLGVBQWU7QUFDOUQsV0FBSyxrQkFBa0I7QUFBQSxJQUMzQjtBQUVBLFNBQUssaUJBQWlCO0FBQ3RCLFNBQUssaUJBQWlCO0FBQ3RCLFNBQUssZ0JBQWdCO0FBQ3JCLFNBQUssa0JBQWtCO0FBQ3ZCLFNBQUssbUJBQW1CO0FBQ3hCLFNBQUssaUJBQWlCO0FBRXRCLFNBQUssUUFBUTtBQUFBLEVBQ2pCO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLUSxpQkFBaUI7QUFDckIsVUFBTSxFQUFFLGVBQWUsbUJBQW1CLElBQUk7QUFDOUMsUUFBSSxFQUFFLDhCQUE4QixnQkFBaUI7QUFFckQsVUFBTSxXQUFXLElBQUksaUJBQWlCLGtCQUFnQjtBQUNsRCxVQUFJLGdCQUFnQjtBQUNwQixVQUFJLG9CQUFvQjtBQUV4QixpQkFBVyxZQUFZLGNBQWM7QUFDakMsWUFBSSxTQUFTLFNBQVMsYUFBYTtBQUMvQiwwQkFBZ0I7QUFDaEIsOEJBQW9CO0FBQUEsUUFDeEI7QUFDQSxZQUFJLFNBQVMsU0FBUyxjQUFjO0FBQ2hDLDhCQUFvQjtBQUFBLFFBQ3hCO0FBQUEsTUFDSjtBQUVBLFVBQUksZUFBZTtBQUNmLGNBQU0sS0FBSyxtQkFBbUIsUUFBUSxFQUFFLFFBQVEsV0FBUztBQUNyRCxjQUFJLEVBQUUsaUJBQWlCLGdCQUFpQjtBQUN4QyxnQkFBTSxlQUFlLHVCQUF1QixLQUFLO0FBQ2pELGNBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEtBQUssY0FBYyxPQUFPLEVBQUUsU0FBUyxZQUFZLEdBQUc7QUFDNUUsZ0JBQUksYUFBYyxjQUFhLFlBQVk7QUFDM0Msa0JBQU0sT0FBTztBQUFBLFVBQ2pCO0FBQUEsUUFDSixDQUFDO0FBRUQsY0FBTSxLQUFLLGNBQWMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxjQUFjLGdCQUFnQjtBQUNyRSxjQUFJLEtBQUssc0JBQXNCLFlBQVk7QUFFM0MsY0FBSSxFQUFFLGNBQWMsaUJBQWlCO0FBQ2pDLGlCQUFLLHlCQUF5QixNQUFNLGNBQWMsV0FBVztBQUM3RCx1QkFBVyxjQUFjLEVBQUU7QUFBQSxVQUMvQjtBQUVBLGFBQUcsS0FBSyxZQUFZLE1BQU0sV0FBVztBQUVyQyxnQkFBTSxpQkFBaUIsbUJBQW1CLFNBQVMsV0FBVztBQUM5RCxjQUFJLG1CQUFtQixJQUFJO0FBQ3ZCLDZCQUFpQixlQUFlLE9BQU8sRUFBRSxJQUFJLG1CQUFtQixZQUFZLEVBQUU7QUFBQSxVQUNsRjtBQUFBLFFBQ0osQ0FBQztBQUVELGNBQU0sS0FBSyxtQkFBbUIsUUFBUSxFQUFFLFFBQVEsV0FBUztBQUNyRCxjQUFJLGlCQUFpQixrQkFBa0IsQ0FBQyx1QkFBdUIsS0FBSyxHQUFHO0FBQ25FLGtCQUFNLE9BQU87QUFBQSxVQUNqQjtBQUFBLFFBQ0osQ0FBQztBQUFBLE1BQ0w7QUFFQSxVQUFJLG1CQUFtQjtBQUNuQixhQUFLLFFBQVE7QUFBQSxNQUNqQjtBQUFBLElBQ0osQ0FBQztBQUVELGFBQVMsUUFBUSxlQUFlO0FBQUEsTUFDNUIsV0FBVztBQUFBLE1BQ1gsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osaUJBQWlCLENBQUMsU0FBUyxTQUFTLFlBQVksWUFBWSxNQUFNO0FBQUEsSUFDdEUsQ0FBQztBQUVELFNBQUssaUJBQWlCO0FBQUEsRUFDMUI7QUFBQSxFQUVRLFNBQVM7QUFDYixVQUFNLEVBQUUsZUFBZSxvQkFBb0IsbUJBQW1CLElBQUk7QUFDbEUsUUFBSSxFQUFFLDhCQUE4QixnQkFBaUI7QUFFckQsa0JBQWMsTUFBTSxVQUFVO0FBQzlCLGtCQUFjLE1BQU0sa0JBQWtCO0FBQUEsRUFDMUM7QUF5Qko7QUFBQTtBQUFBO0FBQUE7QUFydUJNLGFBSWEsbUJBQW1CLG9CQUFJLElBQWlCO0FBSjNELElBQU0sY0FBTjtBQWd2Qk8sU0FBUyxZQUFZLE9BQWlCLFVBQVUsVUFBOEIsQ0FBQyxHQUFlO0FBQ2pHLFFBQU0sVUFBVSxRQUFRLFdBQVcsQ0FBQztBQUNwQyxxQkFBbUIsTUFBTSxPQUFPO0FBRWhDLE1BQUk7QUFFSixNQUFJLFFBQVEsU0FBUztBQUNqQixtQkFBZSxJQUFJLGlCQUFpQixrQkFBZ0I7QUFDaEQsaUJBQVcsWUFBWSxjQUFjO0FBQ2pDLFlBQUksU0FBUyxTQUFTLFlBQWE7QUFFbkMsaUJBQVMsV0FBVyxRQUFRLGVBQWE7QUFDckMsY0FBSSxFQUFFLHFCQUFxQixTQUFVO0FBRXJDLGNBQUkscUJBQXFCLG1CQUFtQjtBQUN4QywrQkFBbUIsV0FBVyxNQUFNLE9BQU87QUFDM0M7QUFBQSxVQUNKO0FBRUEsb0JBQVUsaUJBQW9DLFFBQVEsRUFBRSxRQUFRLFFBQU07QUFDbEUsK0JBQW1CLElBQUksTUFBTSxPQUFPO0FBQUEsVUFDeEMsQ0FBQztBQUFBLFFBQ0wsQ0FBQztBQUFBLE1BQ0w7QUFBQSxJQUNKLENBQUM7QUFFRCxpQkFBYSxRQUFRLE1BQU0sRUFBRSxXQUFXLE1BQU0sU0FBUyxLQUFLLENBQUM7QUFBQSxFQUNqRTtBQUVBLFNBQU8sTUFBTTtBQUNULGtCQUFjLFdBQVc7QUFFekIsNEJBQXdCLElBQUksRUFBRSxRQUFRLG1CQUFpQjtBQUNuRCxZQUFNLFdBQVcsVUFBVSxJQUFJLGFBQWE7QUFDNUMsVUFBSSxDQUFDLFNBQVU7QUFDZixlQUFTLFFBQVE7QUFDakIsZ0JBQVUsT0FBTyxhQUFhO0FBQUEsSUFDbEMsQ0FBQztBQUFBLEVBQ0w7QUFDSjtBQUVBLFNBQVMsZUFBZTtBQUNwQixNQUFJLFNBQVMsY0FBYyxtQ0FBbUMsRUFBRztBQUVqRSxRQUFNLGVBQWUsU0FBUyxjQUFjLE9BQU87QUFDbkQsZUFBYSxhQUFhLDRCQUE0QixNQUFNO0FBQzVELGVBQWEsY0FBYyxVQUFVO0FBQ3JDLFdBQVMsS0FBSyxZQUFZLFlBQVk7QUFDMUM7QUFFQSxTQUFTLHdCQUF3QixNQUFnQjtBQUM3QyxTQUFPLE1BQU0sS0FBSyxLQUFLLGlCQUFvQyxRQUFRLENBQUM7QUFDeEU7QUFFQSxTQUFTLG1CQUFtQixNQUFnQixTQUFtQjtBQUMzRCwwQkFBd0IsSUFBSSxFQUFFLFFBQVEsbUJBQWlCLG1CQUFtQixlQUFlLE1BQU0sT0FBTyxDQUFDO0FBQzNHO0FBRUEsU0FBUyxtQkFBbUIsZUFBa0MsTUFBZ0IsU0FBbUI7QUFDN0YsTUFBSSxVQUFVLElBQUksYUFBYSxFQUFHO0FBRWxDLFFBQU0sV0FBVyxJQUFJLFlBQVksZUFBZSxVQUFVLGFBQWEsR0FBRyxNQUFNLE9BQU87QUFDdkYsV0FBUyxNQUFNO0FBQ2YsWUFBVSxJQUFJLGVBQWUsUUFBUTtBQUN6QzsiLAogICJuYW1lcyI6IFtdCn0K