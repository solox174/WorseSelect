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
        --ws-optgroup-label-color: #6b7280;
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
        --ws-optgroup-label-color: var(--ws-dark-optgroup-label-color, #9ca3af);
        --ws-highlight-bg: var(--ws-dark-highlight-bg, #4a3c00);
        --ws-shadow: var(--ws-dark-shadow, 0 4px 12px rgba(0, 0, 0, 0.4));
    }

    .worse-select-container.listbox .worse-select-header {
        display: none;
    }

    .worse-select-container.disabled .worse-select-header {
        background-color: var(--ws-disabled-bg);
        color: var(--ws-disabled-text-color);
        cursor: not-allowed;
    }


    .worse-select-container.open .worse-select-header::after {
        transform: translateY(-50%) rotate(180deg);
    }

    .worse-select-container.dark .worse-select-header::after {
        --ws-caret-color: white;
    }

    .worse-select-container.dark.disabled .worse-select-header::after {
        --ws-caret-color: var(--ws-disabled-text-color);
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
        background-color: var(--ws-caret-color, #777777);
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='white' stroke-width='1.1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='white' stroke-width='1.1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }

    .worse-select-header:focus-visible {
        outline: 2px solid var(--ws-focus-outline) !important;
        outline-offset: 1px;
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

    .worse-select-search-input:focus-visible {
        outline: 2px solid var(--ws-focus-outline) !important;
        outline-offset: 1px;
    }

    .worse-select-container:not(.listbox) .worse-select-options-scroller {
        max-height: ${DEFAULT_CONFIG.dropdownHeightPx}px;
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

    .worse-select-options-scroller {
        overflow-y: auto;
    }

    .worse-select-options-scroller:focus-visible {
        outline: none !important;
    }

    .worse-select-optgroup-label {
        padding: 4px 8px 2px;
        font-size: 0.75em;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--ws-optgroup-label-color);
        cursor: default;
        user-select: none;
        pointer-events: none;
    }

    .worse-select-optgroup.disabled .worse-select-optgroup-label {
        opacity: 0.5;
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

    .worse-select-optgroup .worse-select-option {
        padding-left: 16px;
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
  const selectChildren = worseSelectInstance.selectElement.children;
  const worseSelectChildren = [];
  const optionIndexRef = { value: 0 };
  for (let i = 0; i < selectChildren.length; i++) {
    const selectChild = selectChildren[i];
    if (selectChild instanceof HTMLOptGroupElement) {
      worseSelectChildren.push(createWorseOptGroupElement(worseSelectInstance, selectChild, optionIndexRef));
    } else if (selectChild instanceof HTMLOptionElement) {
      worseSelectChildren.push(setupWorseOptionElement(worseSelectInstance, selectChild, optionIndexRef.value));
      optionIndexRef.value++;
    }
  }
  optionsListElement.append(...worseSelectChildren);
  return worseSelectElement;
}
function createWorseOptGroupElement(worseSelectInstance, optGroupElement, optionIndexRef) {
  const labelEl = document.createElement("div");
  labelEl.className = "worse-select-optgroup-label";
  labelEl.textContent = optGroupElement.label;
  const selectOptions = Array.from(optGroupElement.getElementsByTagName("option"));
  const worseOptionElements = selectOptions.map((selectOption) => {
    const el = setupWorseOptionElement(worseSelectInstance, selectOption, optionIndexRef.value);
    optionIndexRef.value++;
    if (optGroupElement.disabled) {
      el.classList.add("disabled");
      el.setAttribute("aria-disabled", "true");
    }
    return el;
  });
  const wrapper = document.createElement("div");
  wrapper.className = "worse-select-optgroup" + (optGroupElement.disabled ? " disabled" : "");
  wrapper.setAttribute("role", "group");
  wrapper.setAttribute("aria-label", optGroupElement.label);
  wrapper.append(labelEl, ...worseOptionElements);
  return wrapper;
}
function setupWorseOptionElement(worseSelectInstance, selectOption, index) {
  const worseOptionElement = createWorseOptionElement(
    worseSelectInstance,
    selectOption,
    index
  );
  linkOption(selectOption, worseOptionElement);
  return worseOptionElement;
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
      const isDisabled = selectOption.disabled || selectOption.parentElement instanceof HTMLOptGroupElement && selectOption.parentElement.disabled;
      el?.classList.toggle("disabled", isDisabled);
      el?.setAttribute("aria-disabled", String(isDisabled));
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3dvcnNlLXNlbGVjdC9pbnRlcm5hbC10eXBlcy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2Nzcy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2NvbmZpZy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L3NlbGVjdC1oZWxwZXJzLnRzIiwgIi4uL3NyYy93b3JzZS1zZWxlY3Qvb3B0aW9uLW1hcC50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2RvbS50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2ZlYXR1cmVzL3NlYXJjaC50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2NvcmUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTkZJRyA9IHtcbiAgICBzZWFyY2hhYmxlOiBmYWxzZSxcbiAgICBkcm9wZG93bkhlaWdodFB4OiA0MDAsXG4gICAgaGVpZ2h0OiAnMzJweCcsXG4gICAgd2lkdGg6ICcxMDAlJ1xufTtcblxuLy8gTWFwcyBlYWNoIGNvbmZpZyB2YWx1ZSB0byBpdHMgd2lkZW5lZCBwcmltaXRpdmUgdHlwZSAoZS5nLiB0cnVlIFx1MjE5MiBib29sZWFuKSBzbyB0aGF0XG4vLyBTZWxlY3RDb25maWcgYWNjZXB0cyBhbnkgdmFsaWQgdmFsdWUgb2YgdGhhdCB0eXBlLCBub3QganVzdCB0aGUgc3BlY2lmaWMgZGVmYXVsdCBsaXRlcmFsLlxuZXhwb3J0IHR5cGUgV2lkZW48VD4gPSBUIGV4dGVuZHMgYm9vbGVhbiA/IGJvb2xlYW4gOiBUIGV4dGVuZHMgc3RyaW5nID8gc3RyaW5nIDogVCBleHRlbmRzIG51bWJlciA/IG51bWJlciA6IFQ7XG5cbmV4cG9ydCB0eXBlIFNlbGVjdENvbmZpZyA9IHtcbiAgICBbSyBpbiBrZXlvZiB0eXBlb2YgREVGQVVMVF9DT05GSUddOiBXaWRlbjwodHlwZW9mIERFRkFVTFRfQ09ORklHKVtLXT5cbn07XG5cbmV4cG9ydCB0eXBlIENvbmZpZ0tleSA9IGtleW9mIFNlbGVjdENvbmZpZztcbmV4cG9ydCB0eXBlIFJvb3ROb2RlID0gUGFyZW50Tm9kZTtcblxuZXhwb3J0IHR5cGUgUGx1Z2luQ29udGV4dCA9IHtcbiAgICByZWFkb25seSBzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICByZWFkb25seSBoZWFkZXJFbGVtZW50OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICByZWFkb25seSBvcHRpb25zTGlzdEVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xuICAgIHJlYWRvbmx5IHNlYXJjaElucHV0RWxlbWVudD86IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgc2V0TWVzc2FnZSh0ZXh0OiBzdHJpbmcpOiB2b2lkO1xuICAgIGNsZWFyTWVzc2FnZSgpOiB2b2lkO1xuICAgIG9uKHRhcmdldDogRXZlbnRUYXJnZXQsIGV2ZW50OiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIpOiB2b2lkO1xufTtcblxuZXhwb3J0IHR5cGUgUGx1Z2luID0ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBpbml0KGNvbnRleHQ6IFBsdWdpbkNvbnRleHQpOiB2b2lkO1xuICAgIG9uU3luYz8oKTogdm9pZDtcbiAgICBvbk9wZW4/KCk6IHZvaWQ7XG4gICAgb25DbG9zZT8oKTogdm9pZDtcbiAgICBkZXN0cm95PygpOiB2b2lkO1xufTtcblxuZXhwb3J0IHR5cGUgV29yc2VTZWxlY3RPcHRpb25zID0ge1xuICAgIG9ic2VydmU/OiBib29sZWFuO1xuICAgIHBsdWdpbnM/OiBQbHVnaW5bXTtcbn07XG5cbi8vIE1pbmltYWwgaW50ZXJmYWNlIGV4cG9zZWQgdG8gZG9tLnRzIGFuZCBzZWxlY3QtaGVscGVycy50cy4gUmVzdHJpY3RzIHRob3NlIG1vZHVsZXMgdG8gdGhlXG4vLyBwcm9wZXJ0aWVzIHRoZXkgYWN0dWFsbHkgbmVlZCwga2VlcGluZyB0aGUgZnVsbCBXb3JzZVNlbGVjdCBjbGFzcyBpbnRlcm5hbCB0byBjb3JlLnRzLlxuZXhwb3J0IGludGVyZmFjZSBXb3JzZVNlbGVjdENvbnRleHQge1xuICAgIHNlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIGNvbmZpZzogU2VsZWN0Q29uZmlnO1xuICAgIGluc3RhbmNlSWQ6IHN0cmluZztcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQgeyBERUZBVUxUX0NPTkZJRyB9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ1NTKCkge1xuICAgIHJldHVybiAgLyogbGFuZ3VhZ2U9Q1NTICovIGBcbiAgICA6cm9vdCB7XG4gICAgICAgIC0td3MtYm9yZGVyLWNvbG9yOiAjNzY3Njc2O1xuICAgICAgICAtLXdzLWJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgLS13cy1iZzogI2ZmZjtcbiAgICAgICAgLS13cy10ZXh0LWNvbG9yOiBpbmhlcml0O1xuICAgICAgICAtLXdzLWRpc2FibGVkLWJnOiAjZjBmMGYwO1xuICAgICAgICAtLXdzLWRpc2FibGVkLXRleHQtY29sb3I6ICM2ZDZkNmQ7XG4gICAgICAgIC0td3MtaG92ZXItYmc6ICNmMWYxZjE7XG4gICAgICAgIC0td3MtYWN0aXZlLWJnOiAjZWVmNGZmO1xuICAgICAgICAtLXdzLWFjdGl2ZS1vdXRsaW5lOiAjMjU2M2ViO1xuICAgICAgICAtLXdzLXNlbGVjdGVkLWJnOiAjZDJlM2ZjO1xuICAgICAgICAtLXdzLXNlbGVjdGVkLXRleHQtY29sb3I6ICMxNzRlYTY7XG4gICAgICAgIC0td3MtZm9jdXMtb3V0bGluZTogIzI1NjNlYjtcbiAgICAgICAgLS13cy1zZWFyY2gtYm9yZGVyLWNvbG9yOiAjYjdiN2I3O1xuICAgICAgICAtLXdzLWRpdmlkZXItY29sb3I6ICNkMGQwZDA7XG4gICAgICAgIC0td3Mtb3B0Z3JvdXAtbGFiZWwtY29sb3I6ICM2YjcyODA7XG4gICAgICAgIC0td3MtaGlnaGxpZ2h0LWJnOiAjZmZmM2EzO1xuICAgICAgICAtLXdzLXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTYpO1xuICAgICAgICAtLXdzLWhlaWdodDogJHtERUZBVUxUX0NPTkZJRy5oZWlnaHR9O1xuICAgICAgICAtLXdzLW1vdGlvbi1kdXJhdGlvbjogMjAwbXM7XG4gICAgICAgIC0td3MtbW90aW9uLWVhc2U6IGN1YmljLWJlemllcigwLjE2LCAxLCAwLjMsIDEpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIG1pbi13aWR0aDogMDtcbiAgICAgICAgZm9udDogaW5oZXJpdDtcbiAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXRleHQtY29sb3IpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyOm5vdCgubGlzdGJveCkge1xuICAgICAgICBoZWlnaHQ6IHZhcigtLXdzLWhlaWdodCk7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIubGlzdGJveCB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLmRhcmsge1xuICAgICAgICBjb2xvci1zY2hlbWU6IGRhcms7XG4gICAgICAgIC0td3MtYm9yZGVyLWNvbG9yOiB2YXIoLS13cy1kYXJrLWJvcmRlci1jb2xvciwgIzU1NSk7XG4gICAgICAgIC0td3MtYmc6IHZhcigtLXdzLWRhcmstYmcsICMxZTFlMWUpO1xuICAgICAgICAtLXdzLXRleHQtY29sb3I6IHZhcigtLXdzLWRhcmstdGV4dC1jb2xvciwgI2U4ZWFlZCk7XG4gICAgICAgIC0td3MtZGlzYWJsZWQtYmc6IHZhcigtLXdzLWRhcmstZGlzYWJsZWQtYmcsICMyYTJhMmEpO1xuICAgICAgICAtLXdzLWRpc2FibGVkLXRleHQtY29sb3I6IHZhcigtLXdzLWRhcmstZGlzYWJsZWQtdGV4dC1jb2xvciwgIzc3Nyk7XG4gICAgICAgIC0td3MtaG92ZXItYmc6IHZhcigtLXdzLWRhcmstaG92ZXItYmcsICMzYTNhM2EpO1xuICAgICAgICAtLXdzLWFjdGl2ZS1iZzogdmFyKC0td3MtZGFyay1hY3RpdmUtYmcsICMxYTNhNWMpO1xuICAgICAgICAtLXdzLWFjdGl2ZS1vdXRsaW5lOiB2YXIoLS13cy1kYXJrLWFjdGl2ZS1vdXRsaW5lLCAjNjBhNWZhKTtcbiAgICAgICAgLS13cy1zZWxlY3RlZC1iZzogdmFyKC0td3MtZGFyay1zZWxlY3RlZC1iZywgIzFlM2E1Zik7XG4gICAgICAgIC0td3Mtc2VsZWN0ZWQtdGV4dC1jb2xvcjogdmFyKC0td3MtZGFyay1zZWxlY3RlZC10ZXh0LWNvbG9yLCAjOTNjNWZkKTtcbiAgICAgICAgLS13cy1mb2N1cy1vdXRsaW5lOiB2YXIoLS13cy1kYXJrLWZvY3VzLW91dGxpbmUsICM2MGE1ZmEpO1xuICAgICAgICAtLXdzLXNlYXJjaC1ib3JkZXItY29sb3I6IHZhcigtLXdzLWRhcmstc2VhcmNoLWJvcmRlci1jb2xvciwgIzU1NSk7XG4gICAgICAgIC0td3MtZGl2aWRlci1jb2xvcjogdmFyKC0td3MtZGFyay1kaXZpZGVyLWNvbG9yLCAjM2EzYTNhKTtcbiAgICAgICAgLS13cy1vcHRncm91cC1sYWJlbC1jb2xvcjogdmFyKC0td3MtZGFyay1vcHRncm91cC1sYWJlbC1jb2xvciwgIzljYTNhZik7XG4gICAgICAgIC0td3MtaGlnaGxpZ2h0LWJnOiB2YXIoLS13cy1kYXJrLWhpZ2hsaWdodC1iZywgIzRhM2MwMCk7XG4gICAgICAgIC0td3Mtc2hhZG93OiB2YXIoLS13cy1kYXJrLXNoYWRvdywgMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuNCkpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLmxpc3Rib3ggLndvcnNlLXNlbGVjdC1oZWFkZXIge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLmRpc2FibGVkIC53b3JzZS1zZWxlY3QtaGVhZGVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td3MtZGlzYWJsZWQtYmcpO1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtZGlzYWJsZWQtdGV4dC1jb2xvcik7XG4gICAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gICAgfVxuXG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5vcGVuIC53b3JzZS1zZWxlY3QtaGVhZGVyOjphZnRlciB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKSByb3RhdGUoMTgwZGVnKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5kYXJrIC53b3JzZS1zZWxlY3QtaGVhZGVyOjphZnRlciB7XG4gICAgICAgIC0td3MtY2FyZXQtY29sb3I6IHdoaXRlO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLmRhcmsuZGlzYWJsZWQgLndvcnNlLXNlbGVjdC1oZWFkZXI6OmFmdGVyIHtcbiAgICAgICAgLS13cy1jYXJldC1jb2xvcjogdmFyKC0td3MtZGlzYWJsZWQtdGV4dC1jb2xvcik7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIub3BlbiAud29yc2Utc2VsZWN0LW9wdGlvbnMge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IGF1dG87XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICAgICAgdHJhbnNpdGlvbjpcbiAgICAgICAgICAgIGRpc3BsYXkgdmFyKC0td3MtbW90aW9uLWR1cmF0aW9uKSBhbGxvdy1kaXNjcmV0ZSxcbiAgICAgICAgICAgIG9wYWNpdHkgdmFyKC0td3MtbW90aW9uLWR1cmF0aW9uKSB2YXIoLS13cy1tb3Rpb24tZWFzZSksXG4gICAgICAgICAgICB0cmFuc2Zvcm0gdmFyKC0td3MtbW90aW9uLWR1cmF0aW9uKSB2YXIoLS13cy1tb3Rpb24tZWFzZSk7XG4gICAgfVxuXG4gICAgQHN0YXJ0aW5nLXN0eWxlIHtcbiAgICAgICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIub3BlbiAud29yc2Utc2VsZWN0LW9wdGlvbnMge1xuICAgICAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNnB4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLmxpc3Rib3ggLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHJpZ2h0OiBhdXRvO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IGF1dG87XG4gICAgICAgIHRyYW5zZm9ybTogbm9uZTtcbiAgICAgICAgdHJhbnNpdGlvbjogbm9uZTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWhlYWRlciB7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIHdpZHRoOiAke0RFRkFVTFRfQ09ORklHLndpZHRofTtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS13cy1oZWlnaHQpO1xuICAgICAgICBwYWRkaW5nOiAwIDI4cHggMCA4cHg7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXdzLWJvcmRlci1jb2xvcik7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXdzLWJvcmRlci1yYWRpdXMpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13cy1iZyk7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy10ZXh0LWNvbG9yKTtcbiAgICAgICAgZm9udDogaW5oZXJpdDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtaGVhZGVyOjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIHJpZ2h0OiA4cHg7XG4gICAgICAgIHdpZHRoOiAxMHB4O1xuICAgICAgICBoZWlnaHQ6IDEwcHg7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSkgcm90YXRlKDBkZWcpO1xuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XG4gICAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS13cy1tb3Rpb24tZHVyYXRpb24pIHZhcigtLXdzLW1vdGlvbi1lYXNlKTtcbiAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IDEwcHggMTBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td3MtY2FyZXQtY29sb3IsICM3Nzc3NzcpO1xuICAgICAgICAtd2Via2l0LW1hc2staW1hZ2U6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTInIGhlaWdodD0nMTInIHZpZXdCb3g9JzAgMCAxMiAxMicgZmlsbD0nbm9uZSclM0UlM0NwYXRoIGQ9J00zIDQuNUw2IDcuNUw5IDQuNScgc3Ryb2tlPSd3aGl0ZScgc3Ryb2tlLXdpZHRoPScxLjEnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcvJTNFJTNDL3N2ZyUzRVwiKTtcbiAgICAgICAgbWFzay1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMicgaGVpZ2h0PScxMicgdmlld0JveD0nMCAwIDEyIDEyJyBmaWxsPSdub25lJyUzRSUzQ3BhdGggZD0nTTMgNC41TDYgNy41TDkgNC41JyBzdHJva2U9J3doaXRlJyBzdHJva2Utd2lkdGg9JzEuMScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJy8lM0UlM0Mvc3ZnJTNFXCIpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtaGVhZGVyOmZvY3VzLXZpc2libGUge1xuICAgICAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0td3MtZm9jdXMtb3V0bGluZSkgIWltcG9ydGFudDtcbiAgICAgICAgb3V0bGluZS1vZmZzZXQ6IDFweDtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LXNlYXJjaCB7XG4gICAgICAgIHBhZGRpbmc6IDRweDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLXdzLWRpdmlkZXItY29sb3IpO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAycHg7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1zZWFyY2gtaW5wdXQge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAzMnB4O1xuICAgICAgICBwYWRkaW5nOiAwIDhweDtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0td3Mtc2VhcmNoLWJvcmRlci1jb2xvcik7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXdzLWJvcmRlci1yYWRpdXMpO1xuICAgICAgICBmb250OiBpbmhlcml0O1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtdGV4dC1jb2xvcik7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWJnKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LXNlYXJjaC1pbnB1dDpmb2N1cy12aXNpYmxlIHtcbiAgICAgICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXdzLWZvY3VzLW91dGxpbmUpICFpbXBvcnRhbnQ7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAxcHg7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXI6bm90KC5saXN0Ym94KSAud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXIge1xuICAgICAgICBtYXgtaGVpZ2h0OiAke0RFRkFVTFRfQ09ORklHLmRyb3Bkb3duSGVpZ2h0UHh9cHg7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IGNhbGMoMTAwJSArIDJweCk7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICB6LWluZGV4OiAxMDAwO1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02cHgpO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS13cy1ib3JkZXItY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3MtYmcpO1xuICAgICAgICBib3gtc2hhZG93OiB2YXIoLS13cy1zaGFkb3cpO1xuICAgICAgICBwYWRkaW5nOiAycHg7XG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IHRvcCBjZW50ZXI7XG4gICAgICAgIHRyYW5zaXRpb246XG4gICAgICAgICAgICAgICAgZGlzcGxheSB2YXIoLS13cy1tb3Rpb24tZHVyYXRpb24pIGFsbG93LWRpc2NyZXRlLFxuICAgICAgICAgICAgICAgIG9wYWNpdHkgdmFyKC0td3MtbW90aW9uLWR1cmF0aW9uKSB2YXIoLS13cy1tb3Rpb24tZWFzZSksXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtIHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgdmFyKC0td3MtbW90aW9uLWVhc2UpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9ucy1zY3JvbGxlciB7XG4gICAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb25zLXNjcm9sbGVyOmZvY3VzLXZpc2libGUge1xuICAgICAgICBvdXRsaW5lOiBub25lICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRncm91cC1sYWJlbCB7XG4gICAgICAgIHBhZGRpbmc6IDRweCA4cHggMnB4O1xuICAgICAgICBmb250LXNpemU6IDAuNzVlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLW9wdGdyb3VwLWxhYmVsLWNvbG9yKTtcbiAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRncm91cC5kaXNhYmxlZCAud29yc2Utc2VsZWN0LW9wdGdyb3VwLWxhYmVsIHtcbiAgICAgICAgb3BhY2l0eTogMC41O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uIHtcbiAgICAgICAgcGFkZGluZzogNHB4IDhweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0td3MtYm9yZGVyLXJhZGl1cyk7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy10ZXh0LWNvbG9yKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGdyb3VwIC53b3JzZS1zZWxlY3Qtb3B0aW9uIHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAxNnB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3MtaG92ZXItYmcpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLmFjdGl2ZSB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWFjdGl2ZS1iZyk7XG4gICAgICAgIG91dGxpbmU6IDFweCBzb2xpZCB2YXIoLS13cy1hY3RpdmUtb3V0bGluZSk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAtMXB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLnNlbGVjdGVkIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3Mtc2VsZWN0ZWQtYmcpO1xuICAgICAgICBjb2xvcjogdmFyKC0td3Mtc2VsZWN0ZWQtdGV4dC1jb2xvcik7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb24uc2VsZWN0ZWQuYWN0aXZlIHtcbiAgICAgICAgb3V0bGluZTogMXB4IHNvbGlkIHZhcigtLXdzLWFjdGl2ZS1vdXRsaW5lKTtcbiAgICAgICAgb3V0bGluZS1vZmZzZXQ6IC0xcHg7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb24uZGlzYWJsZWQge1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtZGlzYWJsZWQtdGV4dC1jb2xvcik7XG4gICAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWRpc2FibGVkLWJnKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbi5oaWRkZW4ge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICAgIC5tYXRjaGVzIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3MtaGlnaGxpZ2h0LWJnKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LXZpc3VhbGx5LWhpZGRlbiB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDFweDtcbiAgICAgICAgaGVpZ2h0OiAxcHg7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIG1hcmdpbjogLTFweDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgY2xpcDogcmVjdCgwLCAwLCAwLCAwKTtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgYm9yZGVyOiAwO1xuICAgIH1cblxuICAgIEBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gICAgICAgIC53b3JzZS1zZWxlY3QtaGVhZGVyOjphZnRlcixcbiAgICAgICAgLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IG5vbmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYDtcbn0iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHsgQ29uZmlnS2V5LCBERUZBVUxUX0NPTkZJRywgU2VsZWN0Q29uZmlnIH0gZnJvbSAnLi9pbnRlcm5hbC10eXBlcyc7XG5cbmNvbnN0IGNvbmZpZ0tleXMgPSBPYmplY3Qua2V5cyhERUZBVUxUX0NPTkZJRykgYXMgQ29uZmlnS2V5W107XG5cbmZ1bmN0aW9uIHRvS2ViYWJDYXNlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvW0EtWl0vZywgY2hhcmFjdGVyID0+IGAtJHtjaGFyYWN0ZXIudG9Mb3dlckNhc2UoKX1gKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VDb25maWdWYWx1ZTxLIGV4dGVuZHMgQ29uZmlnS2V5PihrZXk6IEssIGF0dHI6IHN0cmluZyk6IFNlbGVjdENvbmZpZ1tLXSB7XG4gICAgY29uc3QgZGVmYXVsdFZhbHVlID0gREVGQVVMVF9DT05GSUdba2V5XTtcblxuICAgIGlmICh0eXBlb2YgZGVmYXVsdFZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgcmV0dXJuIChhdHRyID09PSAndHJ1ZScpIGFzIFNlbGVjdENvbmZpZ1tLXTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRlZmF1bHRWYWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcihhdHRyKSBhcyBTZWxlY3RDb25maWdbS107XG4gICAgfVxuXG4gICAgcmV0dXJuIGF0dHIgYXMgU2VsZWN0Q29uZmlnW0tdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29uZmlnKHNlbGVjdEVsZW1lbnQ6IEVsZW1lbnQpOiBTZWxlY3RDb25maWcge1xuICAgIGNvbnN0IGNvbmZpZzogU2VsZWN0Q29uZmlnID0geyAuLi5ERUZBVUxUX0NPTkZJRyB9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25maWdLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGNvbmZpZ0tleXNbaV07XG4gICAgICAgIGNvbnN0IGRhdGFBdHRyaWJ1dGVOYW1lID0gYGRhdGEtJHt0b0tlYmFiQ2FzZShrZXkpfWA7XG4gICAgICAgIGNvbnN0IGF0dHIgPSBzZWxlY3RFbGVtZW50LmdldEF0dHJpYnV0ZShkYXRhQXR0cmlidXRlTmFtZSk7XG5cbiAgICAgICAgaWYgKGF0dHIgPT09IG51bGwpIGNvbnRpbnVlO1xuXG4gICAgICAgIChjb25maWcgYXMgUmVjb3JkPENvbmZpZ0tleSwgc3RyaW5nIHwgYm9vbGVhbiB8IG51bWJlcj4pW2tleV0gPSBwYXJzZUNvbmZpZ1ZhbHVlKGtleSwgYXR0cik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmZpZztcbn0iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHsgV29yc2VTZWxlY3RDb250ZXh0IH0gZnJvbSAnLi9pbnRlcm5hbC10eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRVc2VMaXN0Ym94TW9kZSh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQpIHtcbiAgICByZXR1cm4gd29yc2VTZWxlY3RJbnN0YW5jZS5zZWxlY3RFbGVtZW50LnNpemUgPiAxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNdWx0aXBsZVNlbGVjdCh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQpIHtcbiAgICByZXR1cm4gd29yc2VTZWxlY3RJbnN0YW5jZS5zZWxlY3RFbGVtZW50Lm11bHRpcGxlO1xufVxuXG4vLyBNYXRjaGVzIHRoZSBjb252ZW50aW9uYWwgSFRNTCBwbGFjZWhvbGRlciBwYXR0ZXJuOiA8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQ+TGFiZWw8L29wdGlvbj4uXG4vLyBPcHRpb25zIHRoYXQgYXJlIG5vdCBkaXNhYmxlZCBvciBoYXZlIGEgbm9uLWVtcHR5IHZhbHVlIGFyZSB0cmVhdGVkIGFzIHNlbGVjdGFibGUuXG5leHBvcnQgZnVuY3Rpb24gaXNQbGFjZWhvbGRlck9wdGlvbihzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50IHwgbnVsbCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzZWxlY3RPcHRpb24gIT09IG51bGwgJiYgc2VsZWN0T3B0aW9uLnZhbHVlID09PSAnJyAmJiBzZWxlY3RPcHRpb24uZGlzYWJsZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMaXN0Qm94SGVpZ2h0KHNlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50LCB3b3JzZU9wdGlvbkVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKHNlbGVjdEVsZW1lbnQuc2l6ZSA8PSAxKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IG9uZVJvd0hlaWdodCA9IHdvcnNlT3B0aW9uRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgY29uc3QgdG90YWxIZWlnaHQgPSBvbmVSb3dIZWlnaHQgKiBzZWxlY3RFbGVtZW50LnNpemU7XG5cbiAgICBjb25zdCBzZWxlY3RQYXJlbnRIZWlnaHQgPSBzZWxlY3RFbGVtZW50LnBhcmVudEVsZW1lbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCA/PyAxMDAwMDtcbiAgICByZXR1cm4gTWF0aC5taW4odG90YWxIZWlnaHQsIHNlbGVjdFBhcmVudEhlaWdodCkgKyAncHgnO1xufSIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG4vLyBUd28gV2Vha01hcHMgbWFpbnRhaW4gYSBiaWRpcmVjdGlvbmFsIGxpbmsgYmV0d2VlbiBuYXRpdmUgPG9wdGlvbj4gZWxlbWVudHMgYW5kIHRoZWlyXG4vLyByZW5kZXJlZCB3aWRnZXQgZGl2cy4gV2Vha01hcCBrZXlzIGFsbG93IEdDIHRvIHJlY2xhaW0gZWxlbWVudHMgcmVtb3ZlZCBmcm9tIHRoZSBET01cbi8vIHdpdGhvdXQgcmVxdWlyaW5nIGV4cGxpY2l0IGNsZWFudXAgb24gZXZlcnkgcmVtb3ZhbCBwYXRoLlxuY29uc3Qgb3B0aW9uVG9EaXYgPSBuZXcgV2Vha01hcDxIVE1MT3B0aW9uRWxlbWVudCwgSFRNTERpdkVsZW1lbnQ+KCk7XG5jb25zdCBkaXZUb09wdGlvbiA9IG5ldyBXZWFrTWFwPEhUTUxEaXZFbGVtZW50LCBIVE1MT3B0aW9uRWxlbWVudD4oKTtcblxuXG5leHBvcnQgZnVuY3Rpb24gbGlua09wdGlvbihzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50LCB3b3JzZU9wdGlvbkVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KSB7XG4gICAgb3B0aW9uVG9EaXYuc2V0KHNlbGVjdE9wdGlvbiwgd29yc2VPcHRpb25FbGVtZW50KTtcbiAgICBkaXZUb09wdGlvbi5zZXQod29yc2VPcHRpb25FbGVtZW50LCBzZWxlY3RPcHRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5saW5rT3B0aW9uKHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQpIHtcbiAgICBjb25zdCB3b3JzZU9wdGlvbkVsZW1lbnQgPSBvcHRpb25Ub0Rpdi5nZXQoc2VsZWN0T3B0aW9uKTtcbiAgICBpZiAoIXdvcnNlT3B0aW9uRWxlbWVudCkgcmV0dXJuO1xuXG4gICAgb3B0aW9uVG9EaXYuZGVsZXRlKHNlbGVjdE9wdGlvbik7XG4gICAgZGl2VG9PcHRpb24uZGVsZXRlKHdvcnNlT3B0aW9uRWxlbWVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCkge1xuICAgIHJldHVybiBvcHRpb25Ub0Rpdi5nZXQoc2VsZWN0T3B0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlbGVjdE9wdGlvbkVsZW1lbnQod29yc2VPcHRpb25FbGVtZW50OiBIVE1MRGl2RWxlbWVudCkge1xuICAgIHJldHVybiBkaXZUb09wdGlvbi5nZXQod29yc2VPcHRpb25FbGVtZW50KTtcbn0iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHsgREVGQVVMVF9DT05GSUcsIFdvcnNlU2VsZWN0Q29udGV4dCB9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnO1xuaW1wb3J0IHsgaXNNdWx0aXBsZVNlbGVjdCwgc2hvdWxkVXNlTGlzdGJveE1vZGUgfSBmcm9tICcuL3NlbGVjdC1oZWxwZXJzJztcbmltcG9ydCB7IGdldFdvcnNlT3B0aW9uRWxlbWVudCwgbGlua09wdGlvbiB9IGZyb20gJy4vb3B0aW9uLW1hcCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGxPcHRpb25JbnRvVmlldyhzZWxlY3RPcHRpb24/OiBIVE1MT3B0aW9uRWxlbWVudCkge1xuICAgIGlmICghc2VsZWN0T3B0aW9uKSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uKTtcbiAgICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgIGVsLnNjcm9sbEludG9WaWV3KHsgYmxvY2s6ICduZWFyZXN0JyB9KTtcbn1cblxuXG5mdW5jdGlvbiBidWlsZFN0eWxlQXR0cmlidXRlKHN0eWxlUGFydHM6IHN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIHN0eWxlUGFydHMubGVuZ3RoID4gMCA/IGAgc3R5bGU9XCIke3N0eWxlUGFydHMuam9pbignICcpfVwiYCA6ICcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRXb3JzZVNlbGVjdEhlYWRlclN0eWxlQXR0cmlidXRlKHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCkge1xuICAgIGNvbnN0IGhlYWRlclN0eWxlUGFydHM6IHN0cmluZ1tdID0gW107XG5cbiAgICBpZiAod29yc2VTZWxlY3RJbnN0YW5jZS5jb25maWcud2lkdGggIT09IERFRkFVTFRfQ09ORklHLndpZHRoKSB7XG4gICAgICAgIGhlYWRlclN0eWxlUGFydHMucHVzaChgd2lkdGg6ICR7d29yc2VTZWxlY3RJbnN0YW5jZS5jb25maWcud2lkdGh9O2ApO1xuICAgIH1cblxuICAgIGlmICh3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy5oZWlnaHQgIT09IERFRkFVTFRfQ09ORklHLmhlaWdodCkge1xuICAgICAgICBoZWFkZXJTdHlsZVBhcnRzLnB1c2goYGhlaWdodDogJHt3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy5oZWlnaHR9O2ApO1xuICAgIH1cblxuICAgIHJldHVybiBidWlsZFN0eWxlQXR0cmlidXRlKGhlYWRlclN0eWxlUGFydHMpO1xufVxuXG5cbmZ1bmN0aW9uIGVzY2FwZUh0bWwodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB2YWx1ZVxuICAgICAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAgICAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAgICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxuICAgICAgICAucmVwbGFjZSgvJy9nLCAnJiMzOTsnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE9wdGlvbklkKHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCwgb3B0aW9uSW5kZXg6IG51bWJlcikge1xuICAgIHJldHVybiBgJHt3b3JzZVNlbGVjdEluc3RhbmNlLmluc3RhbmNlSWR9LW9wdGlvbi0ke29wdGlvbkluZGV4fWA7XG59XG5cbmZ1bmN0aW9uIGdldFdvcnNlT3B0aW9uQ2xhc3NlcyhzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50KSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IFsnd29yc2Utc2VsZWN0LW9wdGlvbiddO1xuXG4gICAgaWYgKHNlbGVjdE9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgICBjbGFzc2VzLnB1c2goJ2Rpc2FibGVkJyk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdE9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICBjbGFzc2VzLnB1c2goJ3NlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29yc2VPcHRpb25IdG1sKFxuICAgIHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCxcbiAgICBzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50LFxuICAgIG9wdGlvbkluZGV4OiBudW1iZXIsXG4pIHtcbiAgICBjb25zdCB3b3JzZU9wdGlvbkNsYXNzZXMgPSBnZXRXb3JzZU9wdGlvbkNsYXNzZXMoc2VsZWN0T3B0aW9uKTtcbiAgICBjb25zdCBvcHRpb25UZXh0ID0gc2VsZWN0T3B0aW9uLnRleHRDb250ZW50ID8/ICcnO1xuXG4gICAgcmV0dXJuIGBcbiAgICA8ZGl2IGlkPVwiJHtnZXRPcHRpb25JZCh3b3JzZVNlbGVjdEluc3RhbmNlLCBvcHRpb25JbmRleCl9XCJcbiAgICAgICAgIGNsYXNzPVwiJHt3b3JzZU9wdGlvbkNsYXNzZXN9XCJcbiAgICAgICAgIGRhdGEtdmFsdWU9XCIke2VzY2FwZUh0bWwoc2VsZWN0T3B0aW9uLnZhbHVlKX1cIlxuICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICBhcmlhLXNlbGVjdGVkPVwiJHtzZWxlY3RPcHRpb24uc2VsZWN0ZWQgPyAndHJ1ZScgOiAnZmFsc2UnfVwiXG4gICAgICAgICBhcmlhLWRpc2FibGVkPVwiJHtzZWxlY3RPcHRpb24uZGlzYWJsZWQgPyAndHJ1ZScgOiAnZmFsc2UnfVwiPlxuICAgICAgJHtlc2NhcGVIdG1sKG9wdGlvblRleHQpfVxuICAgIDwvZGl2PlxuICAgIGA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JzZU9wdGlvbkVsZW1lbnQoXG4gICAgd29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0LFxuICAgIHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQsXG4gICAgb3B0aW9uSW5kZXg6IG51bWJlcixcbikge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVSYW5nZSgpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChcbiAgICAgICAgY3JlYXRlV29yc2VPcHRpb25IdG1sKHdvcnNlU2VsZWN0SW5zdGFuY2UsIHNlbGVjdE9wdGlvbiwgb3B0aW9uSW5kZXgpXG4gICAgKS5maXJzdEVsZW1lbnRDaGlsZCBhcyBIVE1MRGl2RWxlbWVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlYXJjaEh0bWwod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgaWYgKCF3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy5zZWFyY2hhYmxlKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICByZXR1cm4gYFxuICAgIDxkaXYgY2xhc3M9XCJ3b3JzZS1zZWxlY3Qtc2VhcmNoXCI+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgIGNsYXNzPVwid29yc2Utc2VsZWN0LXNlYXJjaC1pbnB1dFwiXG4gICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggbGlzdFwiXG4gICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiU2VhcmNoIG9wdGlvbnNcIiAvPlxuICAgIDwvZGl2PlxuICAgIGA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNZXNzYWdlSHRtbCgpIHtcbiAgICByZXR1cm4gYFxuICAgIDxkaXYgY2xhc3M9XCJ3b3JzZS1zZWxlY3QtbWVzc2FnZSB3b3JzZS1zZWxlY3QtdmlzdWFsbHktaGlkZGVuXCJcbiAgICAgICAgIHJvbGU9XCJzdGF0dXNcIlxuICAgICAgICAgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICAgICAgIGFyaWEtYXRvbWljPVwidHJ1ZVwiPjwvZGl2PlxuICAgIGA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JzZVNlbGVjdCh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQpIHtcbiAgICBjb25zdCBoZWFkZXJTdHlsZUF0dHJpYnV0ZSA9IGJ1aWxkV29yc2VTZWxlY3RIZWFkZXJTdHlsZUF0dHJpYnV0ZSh3b3JzZVNlbGVjdEluc3RhbmNlKTtcbiAgICBjb25zdCBjb250YWluZXJDbGFzc2VzID0gWyd3b3JzZS1zZWxlY3QtY29udGFpbmVyJ107XG5cbiAgICBpZiAoc2hvdWxkVXNlTGlzdGJveE1vZGUod29yc2VTZWxlY3RJbnN0YW5jZSkpIHtcbiAgICAgICAgY29udGFpbmVyQ2xhc3Nlcy5wdXNoKCdsaXN0Ym94Jyk7XG4gICAgfVxuXG4gICAgaWYgKGlzTXVsdGlwbGVTZWxlY3Qod29yc2VTZWxlY3RJbnN0YW5jZSkpIHtcbiAgICAgICAgY29udGFpbmVyQ2xhc3Nlcy5wdXNoKCdtdWx0aXBsZScpO1xuICAgIH1cblxuICAgIGNvbnN0IGh0bWxTdHJpbmcgPSBgXG4gICAgPGRpdiBjbGFzcz1cIiR7Y29udGFpbmVyQ2xhc3Nlcy5qb2luKCcgJyl9XCI+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzcz1cIndvcnNlLXNlbGVjdC1oZWFkZXJcIlxuICAgICAgICBhcmlhLWhhc3BvcHVwPVwibGlzdGJveFwiXG4gICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIndvcnNlLXNlbGVjdC1oZWFkZXItbGFiZWxcIj48L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ3b3JzZS1zZWxlY3Qtb3B0aW9uc1wiPlxuICAgICAgICAke2NyZWF0ZVNlYXJjaEh0bWwod29yc2VTZWxlY3RJbnN0YW5jZSl9XG4gICAgICAgICR7Y3JlYXRlTWVzc2FnZUh0bWwoKX1cbiAgICAgICAgPGRpdiBjbGFzcz1cIndvcnNlLXNlbGVjdC1vcHRpb25zLXNjcm9sbGVyXCIke2hlYWRlclN0eWxlQXR0cmlidXRlfT48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICBjb25zdCB3b3JzZVNlbGVjdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChcbiAgICAgICAgaHRtbFN0cmluZ1xuICAgICkuZmlyc3RFbGVtZW50Q2hpbGQgYXMgSFRNTERpdkVsZW1lbnQ7XG5cbiAgICBjb25zdCBvcHRpb25zTGlzdEVsZW1lbnQgPSB3b3JzZVNlbGVjdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1vcHRpb25zLXNjcm9sbGVyJykgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgb3B0aW9uc0xpc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdsaXN0Ym94Jyk7XG4gICAgb3B0aW9uc0xpc3RFbGVtZW50LnRhYkluZGV4ID0gc2hvdWxkVXNlTGlzdGJveE1vZGUod29yc2VTZWxlY3RJbnN0YW5jZSkgPyAwIDogLTE7XG5cbiAgICBpZiAoaXNNdWx0aXBsZVNlbGVjdCh3b3JzZVNlbGVjdEluc3RhbmNlKSkge1xuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLW11bHRpc2VsZWN0YWJsZScsICd0cnVlJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VsZWN0Q2hpbGRyZW4gPSB3b3JzZVNlbGVjdEluc3RhbmNlLnNlbGVjdEVsZW1lbnQuY2hpbGRyZW47XG4gICAgY29uc3Qgd29yc2VTZWxlY3RDaGlsZHJlbjogSFRNTERpdkVsZW1lbnRbXSA9IFtdO1xuICAgIGNvbnN0IG9wdGlvbkluZGV4UmVmID0geyB2YWx1ZTogMCB9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3RDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzZWxlY3RDaGlsZCA9IHNlbGVjdENoaWxkcmVuW2ldO1xuXG4gICAgICAgIGlmIChzZWxlY3RDaGlsZCBpbnN0YW5jZW9mIEhUTUxPcHRHcm91cEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHdvcnNlU2VsZWN0Q2hpbGRyZW4ucHVzaChjcmVhdGVXb3JzZU9wdEdyb3VwRWxlbWVudCh3b3JzZVNlbGVjdEluc3RhbmNlLCBzZWxlY3RDaGlsZCwgb3B0aW9uSW5kZXhSZWYpKTtcbiAgICAgICAgfSBlbHNlIGlmIChzZWxlY3RDaGlsZCBpbnN0YW5jZW9mIEhUTUxPcHRpb25FbGVtZW50KSB7XG4gICAgICAgICAgICB3b3JzZVNlbGVjdENoaWxkcmVuLnB1c2goc2V0dXBXb3JzZU9wdGlvbkVsZW1lbnQod29yc2VTZWxlY3RJbnN0YW5jZSwgc2VsZWN0Q2hpbGQsIG9wdGlvbkluZGV4UmVmLnZhbHVlKSk7XG4gICAgICAgICAgICBvcHRpb25JbmRleFJlZi52YWx1ZSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9wdGlvbnNMaXN0RWxlbWVudC5hcHBlbmQoLi4ud29yc2VTZWxlY3RDaGlsZHJlbik7XG5cbiAgICByZXR1cm4gd29yc2VTZWxlY3RFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVXb3JzZU9wdEdyb3VwRWxlbWVudChcbiAgICB3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQsXG4gICAgb3B0R3JvdXBFbGVtZW50OiBIVE1MT3B0R3JvdXBFbGVtZW50LFxuICAgIG9wdGlvbkluZGV4UmVmOiB7IHZhbHVlOiBudW1iZXIgfSxcbikge1xuICAgIGNvbnN0IGxhYmVsRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsYWJlbEVsLmNsYXNzTmFtZSA9ICd3b3JzZS1zZWxlY3Qtb3B0Z3JvdXAtbGFiZWwnO1xuICAgIGxhYmVsRWwudGV4dENvbnRlbnQgPSBvcHRHcm91cEVsZW1lbnQubGFiZWw7XG5cbiAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gQXJyYXkuZnJvbShvcHRHcm91cEVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ29wdGlvbicpKSBhcyBIVE1MT3B0aW9uRWxlbWVudFtdO1xuICAgIGNvbnN0IHdvcnNlT3B0aW9uRWxlbWVudHMgPSBzZWxlY3RPcHRpb25zLm1hcCgoc2VsZWN0T3B0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gc2V0dXBXb3JzZU9wdGlvbkVsZW1lbnQod29yc2VTZWxlY3RJbnN0YW5jZSwgc2VsZWN0T3B0aW9uLCBvcHRpb25JbmRleFJlZi52YWx1ZSk7XG4gICAgICAgIG9wdGlvbkluZGV4UmVmLnZhbHVlKys7XG4gICAgICAgIGlmIChvcHRHcm91cEVsZW1lbnQuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9KTtcblxuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB3cmFwcGVyLmNsYXNzTmFtZSA9ICd3b3JzZS1zZWxlY3Qtb3B0Z3JvdXAnICsgKG9wdEdyb3VwRWxlbWVudC5kaXNhYmxlZCA/ICcgZGlzYWJsZWQnIDogJycpO1xuICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2dyb3VwJyk7XG4gICAgd3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBvcHRHcm91cEVsZW1lbnQubGFiZWwpO1xuICAgIHdyYXBwZXIuYXBwZW5kKGxhYmVsRWwsIC4uLndvcnNlT3B0aW9uRWxlbWVudHMpO1xuICAgIHJldHVybiB3cmFwcGVyO1xufVxuXG5mdW5jdGlvbiBzZXR1cFdvcnNlT3B0aW9uRWxlbWVudCh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQsIHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQsIGluZGV4OiBudW1iZXIpIHtcbiAgICBjb25zdCB3b3JzZU9wdGlvbkVsZW1lbnQ9IGNyZWF0ZVdvcnNlT3B0aW9uRWxlbWVudChcbiAgICAgICAgd29yc2VTZWxlY3RJbnN0YW5jZSxcbiAgICAgICAgc2VsZWN0T3B0aW9uLFxuICAgICAgICBpbmRleFxuICAgICk7XG4gICAgbGlua09wdGlvbihzZWxlY3RPcHRpb24sIHdvcnNlT3B0aW9uRWxlbWVudCk7XG5cbiAgICByZXR1cm4gd29yc2VPcHRpb25FbGVtZW50O1xufSIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQgdHlwZSB7IFBsdWdpbiwgUGx1Z2luQ29udGV4dCB9IGZyb20gJy4uL2ludGVybmFsLXR5cGVzJztcbmltcG9ydCB7IGdldFdvcnNlT3B0aW9uRWxlbWVudCB9IGZyb20gJy4uL29wdGlvbi1tYXAnO1xuXG5mdW5jdGlvbiBhcHBseUhpZ2hsaWdodChjb250ZXh0OiBQbHVnaW5Db250ZXh0LCBzZWFyY2hUZXJtOiBzdHJpbmcpIHtcbiAgICBjb25zdCB0ZXJtID0gc2VhcmNoVGVybS50cmltKCkudG9Mb3dlckNhc2UoKTtcblxuICAgIEFycmF5LmZyb20oY29udGV4dC5vcHRpb25zTGlzdEVsZW1lbnQuY2hpbGRyZW4pLmZvckVhY2god29yc2VPcHRpb24gPT4ge1xuICAgICAgICBpZiAoISh3b3JzZU9wdGlvbiBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gdGVybSAhPT0gJycgJiYgd29yc2VPcHRpb24udGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh0ZXJtKTtcbiAgICAgICAgd29yc2VPcHRpb24uY2xhc3NMaXN0LnRvZ2dsZSgnbWF0Y2hlcycsIG1hdGNoZXMpO1xuICAgIH0pO1xuXG4gICAgaWYgKCF0ZXJtKSB7XG4gICAgICAgIGNvbnRleHQuY2xlYXJNZXNzYWdlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtYXRjaENvdW50ID0gY29udGV4dC5vcHRpb25zTGlzdEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcnNlLXNlbGVjdC1vcHRpb24ubWF0Y2hlcycpLmxlbmd0aDtcbiAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICAgbWF0Y2hDb3VudCA9PT0gMCA/ICdObyByZXN1bHRzIGZvdW5kJyA6XG4gICAgICAgIG1hdGNoQ291bnQgPT09IDEgPyAnMSByZXN1bHQgYXZhaWxhYmxlJyA6XG4gICAgICAgIGAke21hdGNoQ291bnR9IHJlc3VsdHMgYXZhaWxhYmxlYDtcblxuICAgIGNvbnRleHQuc2V0TWVzc2FnZShtZXNzYWdlKTtcblxuICAgIGNvbnN0IGZpcnN0TWF0Y2ggPSBjb250ZXh0Lm9wdGlvbnNMaXN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LW9wdGlvbi5tYXRjaGVzJyk7XG4gICAgaWYgKGZpcnN0TWF0Y2ggaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkge1xuICAgICAgICBmaXJzdE1hdGNoLnNjcm9sbEludG9WaWV3KHsgYmxvY2s6ICduZWFyZXN0JyB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCdWlsdGluU2VhcmNoUGx1Z2luKCk6IFBsdWdpbiB7XG4gICAgbGV0IHNlYXJjaFRlcm0gPSAnJztcbiAgICBsZXQgcGx1Z2luQ29udGV4dDogUGx1Z2luQ29udGV4dCB8IG51bGwgPSBudWxsO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogJ3NlYXJjaCcsXG5cbiAgICAgICAgaW5pdChjb250ZXh0OiBQbHVnaW5Db250ZXh0KSB7XG4gICAgICAgICAgICBwbHVnaW5Db250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgICAgIGNvbnN0IHsgc2VhcmNoSW5wdXRFbGVtZW50IH0gPSBjb250ZXh0O1xuICAgICAgICAgICAgaWYgKCFzZWFyY2hJbnB1dEVsZW1lbnQpIHJldHVybjtcblxuICAgICAgICAgICAgY29udGV4dC5vbihzZWFyY2hJbnB1dEVsZW1lbnQsICdpbnB1dCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHNlYXJjaFRlcm0gPSB0YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgYXBwbHlIaWdobGlnaHQoY29udGV4dCwgc2VhcmNoVGVybSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBvblN5bmMoKSB7XG4gICAgICAgICAgICBpZiAoIXBsdWdpbkNvbnRleHQpIHJldHVybjtcbiAgICAgICAgICAgIGFwcGx5SGlnaGxpZ2h0KHBsdWdpbkNvbnRleHQsIHNlYXJjaFRlcm0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uQ2xvc2UoKSB7XG4gICAgICAgICAgICBpZiAoIXBsdWdpbkNvbnRleHQpIHJldHVybjtcbiAgICAgICAgICAgIHNlYXJjaFRlcm0gPSAnJztcbiAgICAgICAgICAgIGNvbnN0IHsgc2VhcmNoSW5wdXRFbGVtZW50IH0gPSBwbHVnaW5Db250ZXh0O1xuICAgICAgICAgICAgaWYgKHNlYXJjaElucHV0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBzZWFyY2hJbnB1dEVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFwcGx5SGlnaGxpZ2h0KHBsdWdpbkNvbnRleHQsICcnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkZXN0cm95KCkge1xuICAgICAgICAgICAgcGx1Z2luQ29udGV4dCA9IG51bGw7XG4gICAgICAgICAgICBzZWFyY2hUZXJtID0gJyc7XG4gICAgICAgIH0sXG4gICAgfTtcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQgdHlwZSB7V29yc2VTZWxlY3RDb250ZXh0fSBmcm9tICcuL2ludGVybmFsLXR5cGVzJztcbi8qKlxuICogUHJvZ3Jlc3NpdmUtZW5oYW5jZW1lbnQgdXRpbGl0aWVzIGZvciBuYXRpdmUge0BsaW5rIEhUTUxTZWxlY3RFbGVtZW50fSBjb250cm9scy5cbiAqXG4gKiBLZWVwcyB0aGUgbmF0aXZlIGA8c2VsZWN0PmAgYXMgc291cmNlIG9mIHRydXRoIGZvciB2YWx1ZSwgZGlzYWJsZWQgc3RhdGUsIGBzaXplYCwgYW5kXG4gKiBgbXVsdGlwbGVgLCB3aGlsZSBtaXJyb3JpbmcgdGhhdCBzdGF0ZSBpbnRvIGEgY3VzdG9tIERPTSBzdHJ1Y3R1cmUgdGhhdCBpcyBlYXNpZXIgdG8gc3R5bGUuXG4gKlxuICogV2lkZ2V0LXNwZWNpZmljIGJlaGF2aW9yIHVzZXMgYGRhdGEtKmAgYXR0cmlidXRlcyBzdWNoIGFzIGBkYXRhLXNlYXJjaGFibGVgIGFuZFxuICogYGRhdGEtZHJvcGRvd24taGVpZ2h0LXB4YCwga2VlcGluZyB0aGUgcHVibGljIEFQSSBhbGlnbmVkIHdpdGggc3RhbmRhcmQgSFRNTC5cbiAqL1xuaW1wb3J0IHsgREVGQVVMVF9DT05GSUcsIFBsdWdpbiwgUGx1Z2luQ29udGV4dCwgUm9vdE5vZGUsIFNlbGVjdENvbmZpZywgV29yc2VTZWxlY3RPcHRpb25zIH0gZnJvbSAnLi9pbnRlcm5hbC10eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVDU1MgfSBmcm9tICcuL2Nzcyc7XG5pbXBvcnQgeyBnZXRDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBjcmVhdGVXb3JzZU9wdGlvbkVsZW1lbnQsIGNyZWF0ZVdvcnNlU2VsZWN0LCBnZXRPcHRpb25JZCwgc2Nyb2xsT3B0aW9uSW50b1ZpZXcgfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgeyBnZXRTZWxlY3RPcHRpb25FbGVtZW50LCBnZXRXb3JzZU9wdGlvbkVsZW1lbnQsIGxpbmtPcHRpb24sIHVubGlua09wdGlvbiB9IGZyb20gJy4vb3B0aW9uLW1hcCc7XG5pbXBvcnQgeyBnZXRMaXN0Qm94SGVpZ2h0LCBpc011bHRpcGxlU2VsZWN0LCBpc1BsYWNlaG9sZGVyT3B0aW9uLCBzaG91bGRVc2VMaXN0Ym94TW9kZSB9IGZyb20gJy4vc2VsZWN0LWhlbHBlcnMnO1xuaW1wb3J0IHsgY3JlYXRlQnVpbHRpblNlYXJjaFBsdWdpbiB9IGZyb20gJy4vZmVhdHVyZXMvc2VhcmNoJztcblxuY29uc3QgaW5zdGFuY2VzID0gbmV3IFdlYWtNYXA8SFRNTFNlbGVjdEVsZW1lbnQsIFdvcnNlU2VsZWN0PigpO1xubGV0IG5leHRJbnN0YW5jZUlkID0gMDtcblxudHlwZSBQbHVnaW5MaXN0ZW5lciA9IHsgdGFyZ2V0OiBFdmVudFRhcmdldDsgZXZlbnQ6IHN0cmluZzsgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciB9O1xuXG5jbGFzcyBXb3JzZVNlbGVjdCBpbXBsZW1lbnRzIFdvcnNlU2VsZWN0Q29udGV4dCB7XG4gICAgLy8gVHJhY2tzIGFsbCBtb3VudGVkIGluc3RhbmNlcyBzbyBhIHNpbmdsZSBkb2N1bWVudC1sZXZlbCBwb2ludGVyZG93biBsaXN0ZW5lciBjYW4gY2xvc2UgYW55XG4gICAgLy8gb3BlbiBkcm9wZG93biB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvdXRzaWRlLCBpbnN0ZWFkIG9mIHJlZ2lzdGVyaW5nIG9uZSBsaXN0ZW5lciBwZXIgaW5zdGFuY2UuXG4gICAgLy8gTm90ZTogYHByaXZhdGVgIGlzIGEgVHlwZVNjcmlwdC1vbmx5IGNvbnN0cmFpbnQgYW5kIGlzIG5vdCBlbmZvcmNlZCBpbiB0aGUgY29tcGlsZWQgb3V0cHV0LlxuICAgIHByaXZhdGUgc3RhdGljIG1vdW50ZWRJbnN0YW5jZXMgPSBuZXcgU2V0PFdvcnNlU2VsZWN0PigpO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaGFuZGxlRG9jdW1lbnRQb2ludGVyRG93bihldmVudDogRXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBOb2RlKSkgcmV0dXJuO1xuICAgICAgICBmb3IgKGNvbnN0IGluc3RhbmNlIG9mIFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMpIHtcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS53b3JzZVNlbGVjdEVsZW1lbnQgJiYgIWluc3RhbmNlLndvcnNlU2VsZWN0RWxlbWVudC5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY2xvc2VEcm9wZG93bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0eXBlQWhlYWRUaW1lcklkPzogbnVtYmVyO1xuICAgIHByaXZhdGUgdHlwZUFoZWFkVGV4dCA9ICcnO1xuICAgIHByaXZhdGUgdHlwZUFoZWFkVGltZW91dCA9IDEwMDA7XG4gICAgc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgY29uZmlnOiBTZWxlY3RDb25maWc7XG4gICAgcm9vdDogUm9vdE5vZGU7XG4gICAgaW5zdGFuY2VJZDogc3RyaW5nO1xuXG4gICAgd29yc2VTZWxlY3RFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgaGVhZGVyRWxlbWVudD86IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIGRyb3Bkb3duUGFuZWxFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgb3B0aW9uc0xpc3RFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgc2VhcmNoSW5wdXRFbGVtZW50PzogSFRNTElucHV0RWxlbWVudDtcbiAgICBtZXNzYWdlRWxlbWVudD86IEhUTUxEaXZFbGVtZW50O1xuICAgIG9wdGlvbk9ic2VydmVyPzogTXV0YXRpb25PYnNlcnZlcjtcblxuICAgIG9uU2VsZWN0Q2hhbmdlPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvbk9wdGlvbnNDbGljaz86IEV2ZW50TGlzdGVuZXI7XG4gICAgb25IZWFkZXJDbGljaz86IEV2ZW50TGlzdGVuZXI7XG4gICAgb25IZWFkZXJLZXlEb3duPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvbk9wdGlvbnNLZXlEb3duPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvblNlYXJjaEtleURvd24/OiBFdmVudExpc3RlbmVyO1xuICAgIG9uTGlzdGJveEZvY3VzPzogRXZlbnRMaXN0ZW5lcjtcblxuICAgIG9wZW4gPSBmYWxzZTtcbiAgICBhY3RpdmVPcHRpb24/OiBIVE1MT3B0aW9uRWxlbWVudDtcblxuICAgIHByaXZhdGUgcGx1Z2luczogUGx1Z2luW10gPSBbXTtcbiAgICBwcml2YXRlIHBsdWdpbkxpc3RlbmVyczogUGx1Z2luTGlzdGVuZXJbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3Ioc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQsIGNvbmZpZzogUGFydGlhbDxTZWxlY3RDb25maWc+ID0ge30sIHJvb3Q6IFJvb3ROb2RlID0gZG9jdW1lbnQsIHBsdWdpbnM6IFBsdWdpbltdID0gW10pIHtcbiAgICAgICAgdGhpcy5zZWxlY3RFbGVtZW50ID0gc2VsZWN0RWxlbWVudDtcbiAgICAgICAgdGhpcy5jb25maWcgPSB7IC4uLkRFRkFVTFRfQ09ORklHLCAuLi5jb25maWcgfTtcbiAgICAgICAgdGhpcy5yb290ID0gcm9vdDtcbiAgICAgICAgdGhpcy5pbnN0YW5jZUlkID0gYHdzLSR7KytuZXh0SW5zdGFuY2VJZH1gO1xuICAgICAgICB0aGlzLnBsdWdpbnMgPSBbLi4ucGx1Z2luc107XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnNlYXJjaGFibGUgJiYgIXBsdWdpbnMuc29tZShwID0+IHAubmFtZSA9PT0gJ3NlYXJjaCcpKSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbnMucHVzaChjcmVhdGVCdWlsdGluU2VhcmNoUGx1Z2luKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBtb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMud29yc2VTZWxlY3RFbGVtZW50KSByZXR1cm47XG5cbiAgICAgICAgZW5zdXJlU3R5bGVzKCk7XG5cbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQgPSBjcmVhdGVXb3JzZVNlbGVjdCh0aGlzKTtcbiAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50ID0gdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1oZWFkZXInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5kcm9wZG93blBhbmVsRWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3Qtb3B0aW9ucycpIGFzIEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3Qtb3B0aW9ucy1zY3JvbGxlcicpIGFzIEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnNlYXJjaElucHV0RWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3Qtc2VhcmNoLWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5tZXNzYWdlRWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3QtbWVzc2FnZScpIGFzIEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmIChXb3JzZVNlbGVjdC5tb3VudGVkSW5zdGFuY2VzLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgV29yc2VTZWxlY3QuaGFuZGxlRG9jdW1lbnRQb2ludGVyRG93bik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmhhbmRsZVR5cGVBaGVhZCk7XG4gICAgICAgIFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMuYWRkKHRoaXMpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICB0aGlzLm9ic2VydmVPcHRpb25zKCk7XG4gICAgICAgIHRoaXMuaW5pdFBsdWdpbnMoKTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLm9wdGlvbk9ic2VydmVyPy5kaXNjb25uZWN0KCk7XG4gICAgICAgIHRoaXMub3B0aW9uT2JzZXJ2ZXIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICBwbHVnaW4uZGVzdHJveT8uKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCB7IHRhcmdldCwgZXZlbnQsIGhhbmRsZXIgfSBvZiB0aGlzLnBsdWdpbkxpc3RlbmVycykge1xuICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGx1Z2luTGlzdGVuZXJzID0gW107XG4gICAgICAgIHRoaXMucGx1Z2lucyA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLm9uU2VsZWN0Q2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5vblNlbGVjdENoYW5nZSk7XG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0Q2hhbmdlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25PcHRpb25zQ2xpY2sgJiYgdGhpcy5kcm9wZG93blBhbmVsRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5kcm9wZG93blBhbmVsRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25PcHRpb25zQ2xpY2spO1xuICAgICAgICAgICAgdGhpcy5vbk9wdGlvbnNDbGljayA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uSGVhZGVyQ2xpY2sgJiYgdGhpcy5oZWFkZXJFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uSGVhZGVyQ2xpY2spO1xuICAgICAgICAgICAgdGhpcy5vbkhlYWRlckNsaWNrID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25IZWFkZXJLZXlEb3duICYmIHRoaXMuaGVhZGVyRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uSGVhZGVyS2V5RG93bik7XG4gICAgICAgICAgICB0aGlzLm9uSGVhZGVyS2V5RG93biA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uT3B0aW9uc0tleURvd24gJiYgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uT3B0aW9uc0tleURvd24pO1xuICAgICAgICAgICAgdGhpcy5vbk9wdGlvbnNLZXlEb3duID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25TZWFyY2hLZXlEb3duICYmIHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vblNlYXJjaEtleURvd24pO1xuICAgICAgICAgICAgdGhpcy5vblNlYXJjaEtleURvd24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vbkxpc3Rib3hGb2N1cyAmJiB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLm9uTGlzdGJveEZvY3VzKTtcbiAgICAgICAgICAgIHRoaXMub25MaXN0Ym94Rm9jdXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBXb3JzZVNlbGVjdC5tb3VudGVkSW5zdGFuY2VzLmRlbGV0ZSh0aGlzKTtcbiAgICAgICAgaWYgKFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBXb3JzZVNlbGVjdC5oYW5kbGVEb2N1bWVudFBvaW50ZXJEb3duKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50Py5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuaGFuZGxlVHlwZUFoZWFkKTtcblxuICAgICAgICBBcnJheS5mcm9tKHRoaXMuc2VsZWN0RWxlbWVudC5vcHRpb25zKS5mb3JFYWNoKHVubGlua09wdGlvbik7XG5cbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQ/LnJlbW92ZSgpO1xuICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuXG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZHJvcGRvd25QYW5lbEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnNlYXJjaElucHV0RWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5tZXNzYWdlRWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5vcGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWN0aXZlT3B0aW9uID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHN5bmNEaW1lbnNpb25zKCkge1xuICAgICAgICBjb25zdCB7IHdvcnNlU2VsZWN0RWxlbWVudCwgaGVhZGVyRWxlbWVudCwgb3B0aW9uc0xpc3RFbGVtZW50LCBzZWxlY3RFbGVtZW50LCBjb25maWcgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKHdvcnNlU2VsZWN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoIShoZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxlY3RFbGVtZW50KTtcblxuICAgICAgICBpZiAoY29tcHV0ZWRTdHlsZS53aWR0aCAmJiBjb21wdXRlZFN0eWxlLndpZHRoICE9PSAnYXV0bycgJiYgY29tcHV0ZWRTdHlsZS53aWR0aCAhPT0gJzBweCcpIHtcbiAgICAgICAgICAgIHdvcnNlU2VsZWN0RWxlbWVudC5zdHlsZS53aWR0aCA9IGNvbXB1dGVkU3R5bGUud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBoZWFkZXJFbGVtZW50LnN0eWxlLmZvbnQgPSBjb21wdXRlZFN0eWxlLmZvbnQ7XG4gICAgICAgIGlmIChzaG91bGRVc2VMaXN0Ym94TW9kZSh0aGlzKSkge1xuICAgICAgICAgICAgY29uc3QgZmlyc3RPcHRpb24gPSBvcHRpb25zTGlzdEVsZW1lbnQuY2hpbGRyZW5bMF0gYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBmaXJzdE9wdGlvbiA/IGdldExpc3RCb3hIZWlnaHQoc2VsZWN0RWxlbWVudCwgZmlyc3RPcHRpb24pIDogbnVsbDtcbiAgICAgICAgICAgIGlmIChoZWlnaHQpIG9wdGlvbnNMaXN0RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gYCR7Y29uZmlnLmRyb3Bkb3duSGVpZ2h0UHh9cHhgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlT3BlblN0YXRlKCkge1xuICAgICAgICBpZiAoISh0aGlzLndvcnNlU2VsZWN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGlzTGlzdGJveE1vZGUgPSBzaG91bGRVc2VMaXN0Ym94TW9kZSh0aGlzKTtcbiAgICAgICAgY29uc3QgaXNPcGVuID0gaXNMaXN0Ym94TW9kZSA/IHRydWUgOiB0aGlzLm9wZW47XG5cbiAgICAgICAgY29uc3QgaXNEYXJrID0gd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzICYmXG4gICAgICAgICAgICBnZXRDb21wdXRlZFN0eWxlKHRoaXMuc2VsZWN0RWxlbWVudCkuY29sb3JTY2hlbWUuaW5jbHVkZXMoJ2RhcmsnKTtcblxuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJywgaXNPcGVuKTtcbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbGlzdGJveCcsIGlzTGlzdGJveE1vZGUpO1xuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdtdWx0aXBsZScsIGlzTXVsdGlwbGVTZWxlY3QodGhpcykpO1xuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdkYXJrJywgaXNEYXJrKTtcblxuICAgICAgICBpZiAodGhpcy5oZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBTdHJpbmcoaXNPcGVuKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLW11bHRpc2VsZWN0YWJsZScsIFN0cmluZyhpc011bHRpcGxlU2VsZWN0KHRoaXMpKSk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudC50YWJJbmRleCA9IGlzT3BlbiA/IDAgOiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlSGVhZGVyU3RhdGUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTZWxlY3RlZFN0YXRlKCkge1xuICAgICAgICBjb25zdCB7IG9wdGlvbnNMaXN0RWxlbWVudCwgc2VsZWN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgQXJyYXkuZnJvbShvcHRpb25zTGlzdEVsZW1lbnQuY2hpbGRyZW4pLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQXJyYXkuZnJvbShzZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmZvckVhY2goc2VsZWN0T3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmICghc2VsZWN0T3B0aW9uLnNlbGVjdGVkKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoaXNQbGFjZWhvbGRlck9wdGlvbihzZWxlY3RPcHRpb24pKSByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBlbCA9IGdldFdvcnNlT3B0aW9uRWxlbWVudChzZWxlY3RPcHRpb24pO1xuICAgICAgICAgICAgZWw/LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICBlbD8uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlRGlzYWJsZWRTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyB3b3JzZVNlbGVjdEVsZW1lbnQsIHNlbGVjdEVsZW1lbnQsIGhlYWRlckVsZW1lbnQsIHNlYXJjaElucHV0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEod29yc2VTZWxlY3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgd29yc2VTZWxlY3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2Rpc2FibGVkJywgc2VsZWN0RWxlbWVudC5kaXNhYmxlZCk7XG5cbiAgICAgICAgaWYgKGhlYWRlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xuICAgICAgICAgICAgaGVhZGVyRWxlbWVudC5kaXNhYmxlZCA9IHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQ7XG4gICAgICAgICAgICBoZWFkZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcsIFN0cmluZyhzZWxlY3RFbGVtZW50LmRpc2FibGVkKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VhcmNoSW5wdXRFbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgc2VhcmNoSW5wdXRFbGVtZW50LmRpc2FibGVkID0gc2VsZWN0RWxlbWVudC5kaXNhYmxlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5mb3JFYWNoKHNlbGVjdE9wdGlvbiA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbCA9IGdldFdvcnNlT3B0aW9uRWxlbWVudChzZWxlY3RPcHRpb24pO1xuICAgICAgICAgICAgY29uc3QgaXNEaXNhYmxlZCA9IHNlbGVjdE9wdGlvbi5kaXNhYmxlZCB8fFxuICAgICAgICAgICAgICAgIChzZWxlY3RPcHRpb24ucGFyZW50RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxPcHRHcm91cEVsZW1lbnQgJiYgc2VsZWN0T3B0aW9uLnBhcmVudEVsZW1lbnQuZGlzYWJsZWQpO1xuICAgICAgICAgICAgZWw/LmNsYXNzTGlzdC50b2dnbGUoJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCk7XG4gICAgICAgICAgICBlbD8uc2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJywgU3RyaW5nKGlzRGlzYWJsZWQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlSGVhZGVyU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgaGVhZGVyRWxlbWVudCwgc2VsZWN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEoaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGxhYmVsRWwgPSBoZWFkZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3QtaGVhZGVyLWxhYmVsJyk7XG4gICAgICAgIGlmICghKGxhYmVsRWwgaW5zdGFuY2VvZiBIVE1MU3BhbkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPVxuICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5zZWxlY3RlZE9wdGlvbnNbMF0gPz9cbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQub3B0aW9uc1tzZWxlY3RFbGVtZW50LnNlbGVjdGVkSW5kZXhdID8/XG4gICAgICAgICAgICBudWxsO1xuXG4gICAgICAgIGNvbnN0IGxhYmVsID0gKGlzUGxhY2Vob2xkZXJPcHRpb24oc2VsZWN0ZWRPcHRpb24pICYmIHRoaXMub3BlbilcbiAgICAgICAgICAgID8gJydcbiAgICAgICAgICAgIDogc2VsZWN0ZWRPcHRpb24/LnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cbiAgICAgICAgbGFiZWxFbC50ZXh0Q29udGVudCA9IGxhYmVsO1xuICAgICAgICBoZWFkZXJFbGVtZW50LnRpdGxlID0gbGFiZWw7XG4gICAgICAgIGhlYWRlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgbGFiZWwgPyBgU2VsZWN0ZWQ6ICR7bGFiZWx9YCA6ICdTZWxlY3QgYW4gb3B0aW9uJyk7XG4gICAgfVxuXG4gICAgdXBkYXRlQWN0aXZlRGVzY2VuZGFudCgpIHtcbiAgICAgICAgY29uc3QgeyBvcHRpb25zTGlzdEVsZW1lbnQsIGFjdGl2ZU9wdGlvbiB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCFhY3RpdmVPcHRpb24pIHtcbiAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoYWN0aXZlT3B0aW9uKTtcbiAgICAgICAgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHtcbiAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgZWwuaWQpO1xuICAgIH1cblxuICAgIHVwZGF0ZUFjdGl2ZU9wdGlvblN0YXRlKCkge1xuICAgICAgICBjb25zdCB7IG9wdGlvbnNMaXN0RWxlbWVudCwgYWN0aXZlT3B0aW9uIH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBBcnJheS5mcm9tKG9wdGlvbnNMaXN0RWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBpZiAoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkgZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChhY3RpdmVPcHRpb24pIHtcbiAgICAgICAgICAgIGdldFdvcnNlT3B0aW9uRWxlbWVudChhY3RpdmVPcHRpb24pPy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN5bmNBbGwoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRTdGF0ZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVPcGVuU3RhdGUoKTtcbiAgICAgICAgdGhpcy5zeW5jRGltZW5zaW9ucygpO1xuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgICAgICAgIHBsdWdpbi5vblN5bmM/LigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0TWVzc2FnZSh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgeyBtZXNzYWdlRWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEobWVzc2FnZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgbWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgLy8gRGVmZXIgdGhlIHVwZGF0ZSBieSBvbmUgdGljayBzbyBzY3JlZW4gcmVhZGVycyBhbm5vdW5jZSBhIGNoYW5nZSBldmVuIHdoZW4gdGhlXG4gICAgICAgIC8vIG1lc3NhZ2UgdGV4dCBoYXBwZW5zIHRvIGJlIHRoZSBzYW1lIHN0cmluZyBhcyB0aGUgcHJldmlvdXMgYW5ub3VuY2VtZW50LlxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5tZXNzYWdlRWxlbWVudCA9PT0gbWVzc2FnZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIGNsZWFyTWVzc2FnZSgpIHtcbiAgICAgICAgaWYgKCEodGhpcy5tZXNzYWdlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICB0aGlzLm1lc3NhZ2VFbGVtZW50LnRleHRDb250ZW50ID0gJyc7XG4gICAgfVxuXG4gICAgb3BlbkRyb3Bkb3duKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RFbGVtZW50LmRpc2FibGVkKSByZXR1cm47XG4gICAgICAgIGlmIChzaG91bGRVc2VMaXN0Ym94TW9kZSh0aGlzKSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMub3BlbiA9IHRydWU7XG4gICAgICAgIHRoaXMudXBkYXRlT3BlblN0YXRlKCk7XG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgICAgICAgcGx1Z2luLm9uT3Blbj8uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZURyb3Bkb3duKCkge1xuICAgICAgICBpZiAoc2hvdWxkVXNlTGlzdGJveE1vZGUodGhpcykpIHJldHVybjtcbiAgICAgICAgaWYgKCF0aGlzLm9wZW4pIHJldHVybjtcblxuICAgICAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICBwbHVnaW4ub25DbG9zZT8uKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb290LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKT8uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIHRoaXMudXBkYXRlT3BlblN0YXRlKCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlRHJvcGRvd24oKSB7XG4gICAgICAgIGlmIChzaG91bGRVc2VMaXN0Ym94TW9kZSh0aGlzKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLm9wZW4gPyB0aGlzLmNsb3NlRHJvcGRvd24oKSA6IHRoaXMub3BlbkRyb3Bkb3duKCk7XG4gICAgfVxuXG4gICAgb3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCkge1xuICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bigpO1xuXG4gICAgICAgIGNvbnN0IHsgb3B0aW9uc0xpc3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQudGFiSW5kZXggPSAwO1xuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgc2Nyb2xsT3B0aW9uSW50b1ZpZXcodGhpcy5hY3RpdmVPcHRpb24pO1xuICAgIH1cblxuICAgIGNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpIHtcbiAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudD8uZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXRWaXNpYmxlRW5hYmxlZE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuc2VsZWN0RWxlbWVudC5vcHRpb25zKS5maWx0ZXIob3B0ID0+IHtcbiAgICAgICAgICAgIGlmIChvcHQuZGlzYWJsZWQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBnZXRXb3JzZU9wdGlvbkVsZW1lbnQob3B0KSBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVPcHRpb24oc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCB8IHVuZGVmaW5lZCwgc2Nyb2xsID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmFjdGl2ZU9wdGlvbiA9IHNlbGVjdE9wdGlvbjtcbiAgICAgICAgdGhpcy51cGRhdGVBY3RpdmVEZXNjZW5kYW50KCk7XG4gICAgICAgIHRoaXMudXBkYXRlQWN0aXZlT3B0aW9uU3RhdGUoKTtcbiAgICAgICAgaWYgKHNjcm9sbCkgc2Nyb2xsT3B0aW9uSW50b1ZpZXcoc2VsZWN0T3B0aW9uKTtcbiAgICB9XG5cbiAgICBtb3ZlQWN0aXZlT3B0aW9uKGRlbHRhOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2V0VmlzaWJsZUVuYWJsZWRPcHRpb25zKCk7XG4gICAgICAgIGlmIChvcHRpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHRoaXMuYWN0aXZlT3B0aW9uID8gb3B0aW9ucy5pbmRleE9mKHRoaXMuYWN0aXZlT3B0aW9uKSA6IC0xO1xuICAgICAgICBjb25zdCBuZXh0SW5kZXggPSBjdXJyZW50SW5kZXggPT09IC0xXG4gICAgICAgICAgICA/IChkZWx0YSA+PSAwID8gMCA6IG9wdGlvbnMubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgIDogTWF0aC5tYXgoMCwgTWF0aC5taW4ob3B0aW9ucy5sZW5ndGggLSAxLCBjdXJyZW50SW5kZXggKyBkZWx0YSkpO1xuXG4gICAgICAgIHRoaXMuc2V0QWN0aXZlT3B0aW9uKG9wdGlvbnNbbmV4dEluZGV4XSk7XG4gICAgfVxuXG4gICAgbW92ZUFjdGl2ZVRvQm91bmRhcnkoYm91bmRhcnk6ICdzdGFydCcgfCAnZW5kJykge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRWaXNpYmxlRW5hYmxlZE9wdGlvbnMoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlT3B0aW9uKGJvdW5kYXJ5ID09PSAnc3RhcnQnID8gb3B0aW9uc1swXSA6IG9wdGlvbnNbb3B0aW9ucy5sZW5ndGggLSAxXSk7XG4gICAgfVxuXG4gICAgZ2V0UGFnZUp1bXBTaXplKCkge1xuICAgICAgICBjb25zdCB7IG9wdGlvbnNMaXN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm4gMTA7XG5cbiAgICAgICAgY29uc3QgZmlyc3RPcHRpb24gPSBBcnJheS5mcm9tKG9wdGlvbnNMaXN0RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yc2Utc2VsZWN0LW9wdGlvbicpKVxuICAgICAgICAgICAgLmZpbmQoZWwgPT4gZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCk7XG4gICAgICAgIGlmICghKGZpcnN0T3B0aW9uIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm4gMTA7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uSGVpZ2h0ID0gZmlyc3RPcHRpb24ub2Zmc2V0SGVpZ2h0IHx8IDE7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgxLCBNYXRoLmZsb29yKG9wdGlvbnNMaXN0RWxlbWVudC5jbGllbnRIZWlnaHQgLyBvcHRpb25IZWlnaHQpKTtcbiAgICB9XG5cbiAgICBtb3ZlQWN0aXZlQnlQYWdlKGRpcmVjdGlvbjogMSB8IC0xKSB7XG4gICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbih0aGlzLmdldFBhZ2VKdW1wU2l6ZSgpICogZGlyZWN0aW9uKTtcbiAgICB9XG5cbiAgICBjb21taXRBY3RpdmVPcHRpb25TZWxlY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHsgYWN0aXZlT3B0aW9uLCBzZWxlY3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIWFjdGl2ZU9wdGlvbiB8fCBhY3RpdmVPcHRpb24uZGlzYWJsZWQpIHJldHVybjtcblxuICAgICAgICBpZiAoc2VsZWN0RWxlbWVudC5tdWx0aXBsZSkge1xuICAgICAgICAgICAgYWN0aXZlT3B0aW9uLnNlbGVjdGVkID0gIWFjdGl2ZU9wdGlvbi5zZWxlY3RlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5pbmRleE9mKGFjdGl2ZU9wdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxlY3RFbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFBsdWdpbnMoKSB7XG4gICAgICAgIGlmICghKHRoaXMuaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoISh0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGNvbnRleHQ6IFBsdWdpbkNvbnRleHQgPSB7XG4gICAgICAgICAgICBzZWxlY3RFbGVtZW50OiB0aGlzLnNlbGVjdEVsZW1lbnQsXG4gICAgICAgICAgICBoZWFkZXJFbGVtZW50OiB0aGlzLmhlYWRlckVsZW1lbnQsXG4gICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQ6IHRoaXMub3B0aW9uc0xpc3RFbGVtZW50LFxuICAgICAgICAgICAgc2VhcmNoSW5wdXRFbGVtZW50OiB0aGlzLnNlYXJjaElucHV0RWxlbWVudCxcbiAgICAgICAgICAgIHNldE1lc3NhZ2U6ICh0ZXh0KSA9PiB0aGlzLnNldE1lc3NhZ2UodGV4dCksXG4gICAgICAgICAgICBjbGVhck1lc3NhZ2U6ICgpID0+IHRoaXMuY2xlYXJNZXNzYWdlKCksXG4gICAgICAgICAgICBvbjogKHRhcmdldCwgZXZlbnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW5MaXN0ZW5lcnMucHVzaCh7IHRhcmdldCwgZXZlbnQsIGhhbmRsZXIgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgICAgICAgcGx1Z2luLmluaXQoY29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBLZXlib2FyZCBjb250cmFjdHMgZm9yIGhlYWRlciwgbGlzdCwgYW5kIHNlYXJjaCBhcmUga2VwdCB0b2dldGhlciBoZXJlIFx1MjAxNCBzcGxpdHRpbmcgdGhlbVxuICAgIC8vIHdvdWxkIHNjYXR0ZXIgcmVsYXRlZCBrZXkgaGFuZGxpbmcgYWNyb3NzIG11bHRpcGxlIG1ldGhvZHMuIElmIHRoaXMgZ3Jvd3Mgc2lnbmlmaWNhbnRseSxcbiAgICAvLyBjb25zaWRlciBicmVha2luZyBvdXQgcGVyLWNvbXBvbmVudCBoYW5kbGVycy5cbiAgICBwcml2YXRlIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IHsgd29yc2VTZWxlY3RFbGVtZW50LCBzZWxlY3RFbGVtZW50LCBkcm9wZG93blBhbmVsRWxlbWVudCwgb3B0aW9uc0xpc3RFbGVtZW50LCBoZWFkZXJFbGVtZW50LCBzZWFyY2hJbnB1dEVsZW1lbnQgfSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCEod29yc2VTZWxlY3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKGRyb3Bkb3duUGFuZWxFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoIShoZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgb25PcHRpb25zQ2xpY2s6IEV2ZW50TGlzdGVuZXIgPSBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBjb25zdCBvcHRpb25FbCA9IHRhcmdldC5jbG9zZXN0KCcud29yc2Utc2VsZWN0LW9wdGlvbicpO1xuICAgICAgICAgICAgaWYgKCEob3B0aW9uRWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgICAgIGlmICghZHJvcGRvd25QYW5lbEVsZW1lbnQuY29udGFpbnMob3B0aW9uRWwpKSByZXR1cm47XG4gICAgICAgICAgICBpZiAob3B0aW9uRWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbiA9IGdldFNlbGVjdE9wdGlvbkVsZW1lbnQob3B0aW9uRWwpO1xuICAgICAgICAgICAgaWYgKCFzZWxlY3RPcHRpb24gfHwgc2VsZWN0T3B0aW9uLmRpc2FibGVkKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlT3B0aW9uKHNlbGVjdE9wdGlvbiwgZmFsc2UpO1xuXG4gICAgICAgICAgICBpZiAoc2VsZWN0RWxlbWVudC5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbi5zZWxlY3RlZCA9ICFzZWxlY3RPcHRpb24uc2VsZWN0ZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5pbmRleE9mKHNlbGVjdE9wdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScsIHsgYnViYmxlczogdHJ1ZSB9KSk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvblNlbGVjdENoYW5nZTogRXZlbnRMaXN0ZW5lciA9ICgpID0+IHRoaXMuc3luY0FsbCgpO1xuICAgICAgICBjb25zdCBvbkhlYWRlckNsaWNrOiBFdmVudExpc3RlbmVyID0gKCkgPT4gdGhpcy50b2dnbGVEcm9wZG93bigpO1xuXG4gICAgICAgIGNvbnN0IG9uSGVhZGVyS2V5RG93bjogRXZlbnRMaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghKGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlVG9Cb3VuZGFyeSgnc3RhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlVG9Cb3VuZGFyeSgnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlVXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnICc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbiA/IHRoaXMuY2xvc2VEcm9wZG93bkFuZEZvY3VzSGVhZGVyKCkgOiB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvbk9wdGlvbnNLZXlEb3duOiBFdmVudExpc3RlbmVyID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdzdGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICcgJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21taXRBY3RpdmVPcHRpb25TZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxlY3RFbGVtZW50Lm11bHRpcGxlKSB0aGlzLmNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvblNlYXJjaEtleURvd246IEV2ZW50TGlzdGVuZXIgPSBldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoIShldmVudCBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZVRvQm91bmRhcnkoJ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlVXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duQW5kRm9jdXNIZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZHJvcGRvd25QYW5lbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbk9wdGlvbnNDbGljayk7XG4gICAgICAgIHNlbGVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25TZWxlY3RDaGFuZ2UpO1xuICAgICAgICBoZWFkZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25IZWFkZXJDbGljayk7XG4gICAgICAgIGhlYWRlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uSGVhZGVyS2V5RG93bik7XG4gICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25PcHRpb25zS2V5RG93bik7XG5cbiAgICAgICAgY29uc3Qgb25MaXN0Ym94Rm9jdXM6IEV2ZW50TGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXNob3VsZFVzZUxpc3Rib3hNb2RlKHRoaXMpIHx8IHRoaXMuYWN0aXZlT3B0aW9uKSByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5maW5kKG8gPT4gby5zZWxlY3RlZCAmJiAhaXNQbGFjZWhvbGRlck9wdGlvbihvKSk7XG4gICAgICAgICAgICBjb25zdCBmaXJzdCA9IHRoaXMuZ2V0VmlzaWJsZUVuYWJsZWRPcHRpb25zKClbMF07XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBzZWxlY3RlZCA/PyBmaXJzdDtcbiAgICAgICAgICAgIGlmICh0YXJnZXQpIHRoaXMuc2V0QWN0aXZlT3B0aW9uKHRhcmdldCwgdHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIG9uTGlzdGJveEZvY3VzKTtcblxuICAgICAgICBpZiAoc2VhcmNoSW5wdXRFbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgc2VhcmNoSW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvblNlYXJjaEtleURvd24pO1xuICAgICAgICAgICAgdGhpcy5vblNlYXJjaEtleURvd24gPSBvblNlYXJjaEtleURvd247XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uT3B0aW9uc0NsaWNrID0gb25PcHRpb25zQ2xpY2s7XG4gICAgICAgIHRoaXMub25TZWxlY3RDaGFuZ2UgPSBvblNlbGVjdENoYW5nZTtcbiAgICAgICAgdGhpcy5vbkhlYWRlckNsaWNrID0gb25IZWFkZXJDbGljaztcbiAgICAgICAgdGhpcy5vbkhlYWRlcktleURvd24gPSBvbkhlYWRlcktleURvd247XG4gICAgICAgIHRoaXMub25PcHRpb25zS2V5RG93biA9IG9uT3B0aW9uc0tleURvd247XG4gICAgICAgIHRoaXMub25MaXN0Ym94Rm9jdXMgPSBvbkxpc3Rib3hGb2N1cztcblxuICAgICAgICB0aGlzLnN5bmNBbGwoKTtcbiAgICB9XG5cbiAgICAvLyBET00gZGlmZmluZyBpcyBrZXB0IGlubGluZSBoZXJlIGJlY2F1c2UgdGhlIG11dGF0aW9uIGNhc2VzIGFyZSB0aWdodGx5IGNvdXBsZWQgdG8gZWFjaFxuICAgIC8vIG90aGVyIGFuZCB0aGUgc2Nyb2xsZXIncyBjaGlsZCBvcmRlci4gSWYgdGhpcyBncm93cyAoZS5nLiBvcHRpb24gZ3JvdXBzLCByZW9yZGVyaW5nXG4gICAgLy8gYW5pbWF0aW9ucyksIGV4dHJhY3QgaW50byBhIGRlZGljYXRlZCByZWNvbmNpbGVyLlxuICAgIHByaXZhdGUgb2JzZXJ2ZU9wdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IHsgc2VsZWN0RWxlbWVudCwgb3B0aW9uc0xpc3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9uTGlzdCA9PiB7XG4gICAgICAgICAgICBsZXQgc2hvdWxkUmVidWlsZCA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IHNob3VsZFVwZGF0ZVN0YXRlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25MaXN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT09ICdjaGlsZExpc3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFJlYnVpbGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzaG91bGRVcGRhdGVTdGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtdXRhdGlvbi50eXBlID09PSAnYXR0cmlidXRlcycpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkVXBkYXRlU3RhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNob3VsZFJlYnVpbGQpIHtcbiAgICAgICAgICAgICAgICBBcnJheS5mcm9tKG9wdGlvbnNMaXN0RWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKGNoaWxkIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmtlZE9wdGlvbiA9IGdldFNlbGVjdE9wdGlvbkVsZW1lbnQoY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWxpbmtlZE9wdGlvbiB8fCAhQXJyYXkuZnJvbShzZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmluY2x1ZGVzKGxpbmtlZE9wdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5rZWRPcHRpb24pIHVubGlua09wdGlvbihsaW5rZWRPcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5mb3JFYWNoKChzZWxlY3RPcHRpb24sIG9wdGlvbkluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlbCA9IGdldFdvcnNlT3B0aW9uRWxlbWVudChzZWxlY3RPcHRpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghKGVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbCA9IGNyZWF0ZVdvcnNlT3B0aW9uRWxlbWVudCh0aGlzLCBzZWxlY3RPcHRpb24sIG9wdGlvbkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtPcHRpb24oc2VsZWN0T3B0aW9uLCBlbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlbC5pZCA9IGdldE9wdGlvbklkKHRoaXMsIG9wdGlvbkluZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50QXRJbmRleCA9IG9wdGlvbnNMaXN0RWxlbWVudC5jaGlsZHJlbltvcHRpb25JbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50QXRJbmRleCAhPT0gZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRBdEluZGV4ID8gY3VycmVudEF0SW5kZXguYmVmb3JlKGVsKSA6IG9wdGlvbnNMaXN0RWxlbWVudC5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIEFycmF5LmZyb20ob3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQgJiYgIWdldFNlbGVjdE9wdGlvbkVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2hvdWxkVXBkYXRlU3RhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN5bmNBbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShzZWxlY3RFbGVtZW50LCB7XG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICBzdWJ0cmVlOiBmYWxzZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICAgICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFsnc3R5bGUnLCAnY2xhc3MnLCAnZGlzYWJsZWQnLCAnbXVsdGlwbGUnLCAnc2l6ZSddXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3B0aW9uT2JzZXJ2ZXIgPSBvYnNlcnZlcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBzZWxlY3RFbGVtZW50LCB3b3JzZVNlbGVjdEVsZW1lbnQsIG9wdGlvbnNMaXN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEod29yc2VTZWxlY3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgc2VsZWN0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBzZWxlY3RFbGVtZW50LmFmdGVyKHdvcnNlU2VsZWN0RWxlbWVudCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVUeXBlQWhlYWQgPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICBpZiAoZS5rZXkubGVuZ3RoICE9PSAxIHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50KSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgd29yc2VPcHRpb25zID0gdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQ/LmNoaWxkcmVuO1xuICAgICAgICB0aGlzLnR5cGVBaGVhZFRleHQgKz0gZS5rZXk7XG4gICAgICAgIGxldCB0eXBlQWhlYWRUZXh0ID0gdGhpcy50eXBlQWhlYWRUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKHdvcnNlT3B0aW9ucyAmJiB0eXBlQWhlYWRUZXh0KSB7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGluZ1dvcnNlT3B0aW9uID0gQXJyYXkuZnJvbSh3b3JzZU9wdGlvbnMpLmZpbmQod29yc2VPcHRpb24gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB3b3JzZU9wdGlvbi50ZXh0Q29udGVudC50cmltKCkudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKHR5cGVBaGVhZFRleHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudD8ucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpPy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIG1hdGNoaW5nV29yc2VPcHRpb24/LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hpbmdXb3JzZU9wdGlvbikgbWF0Y2hpbmdXb3JzZU9wdGlvbi5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudHlwZUFoZWFkVGltZXJJZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudHlwZUFoZWFkVGltZXJJZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50eXBlQWhlYWRUaW1lcklkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnR5cGVBaGVhZFRleHQgPSAnJztcbiAgICAgICAgfSwgdGhpcy50eXBlQWhlYWRUaW1lb3V0KTtcbiAgICB9XG59XG5cbi8qKlxuICogRW5oYW5jZXMgZXZlcnkgbmF0aXZlIGA8c2VsZWN0PmAgZWxlbWVudCBpbnNpZGUgdGhlIHByb3ZpZGVkIHJvb3QuXG4gKlxuICogVGhlIGZ1bmN0aW9uIGlzIHNhZmUgdG8gY2FsbCBtdWx0aXBsZSB0aW1lcy4gRWFjaCBgPHNlbGVjdD5gIGlzIG1vdW50ZWQgYXQgbW9zdCBvbmNlLlxuICogSWYgYG9wdGlvbnMub2JzZXJ2ZWAgaXMgdHJ1ZSwgbmV3bHkgYWRkZWQgc2VsZWN0cyB1bmRlciB0aGUgcm9vdCBhcmUgZW5oYW5jZWQgYXV0b21hdGljYWxseS5cbiAqXG4gKiBSZXR1cm5zIGEgY2xlYW51cCBmdW5jdGlvbiB0aGF0IGRpc2Nvbm5lY3RzIHRoZSByb290IG9ic2VydmVyIGFuZCBkZXN0cm95cyBtb3VudGVkIGluc3RhbmNlc1xuICogdW5kZXIgdGhlIHByb3ZpZGVkIHJvb3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3b3JzZVNlbGVjdChyb290OiBSb290Tm9kZSA9IGRvY3VtZW50LCBvcHRpb25zOiBXb3JzZVNlbGVjdE9wdGlvbnMgPSB7fSk6ICgpID0+IHZvaWQge1xuICAgIGNvbnN0IHBsdWdpbnMgPSBvcHRpb25zLnBsdWdpbnMgPz8gW107XG4gICAgbW91bnRTZWxlY3RzSW5Sb290KHJvb3QsIHBsdWdpbnMpO1xuXG4gICAgbGV0IHJvb3RPYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlciB8IHVuZGVmaW5lZDtcblxuICAgIGlmIChvcHRpb25zLm9ic2VydmUpIHtcbiAgICAgICAgcm9vdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25MaXN0ID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25MaXN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgIT09ICdjaGlsZExpc3QnKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIG11dGF0aW9uLmFkZGVkTm9kZXMuZm9yRWFjaChhZGRlZE5vZGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShhZGRlZE5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChhZGRlZE5vZGUgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW91bnRTZWxlY3RFbGVtZW50KGFkZGVkTm9kZSwgcm9vdCwgcGx1Z2lucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBhZGRlZE5vZGUucXVlcnlTZWxlY3RvckFsbDxIVE1MU2VsZWN0RWxlbWVudD4oJ3NlbGVjdCcpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW91bnRTZWxlY3RFbGVtZW50KGVsLCByb290LCBwbHVnaW5zKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvb3RPYnNlcnZlci5vYnNlcnZlKHJvb3QsIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHJvb3RPYnNlcnZlcj8uZGlzY29ubmVjdCgpO1xuXG4gICAgICAgIGdldFNlbGVjdEVsZW1lbnRzSW5Sb290KHJvb3QpLmZvckVhY2goc2VsZWN0RWxlbWVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IGluc3RhbmNlcy5nZXQoc2VsZWN0RWxlbWVudCk7XG4gICAgICAgICAgICBpZiAoIWluc3RhbmNlKSByZXR1cm47XG4gICAgICAgICAgICBpbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgICAgICAgICBpbnN0YW5jZXMuZGVsZXRlKHNlbGVjdEVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBlbnN1cmVTdHlsZXMoKSB7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXdvcnNlLXNlbGVjdC1zdHlsZXM9XCJ0cnVlXCJdJykpIHJldHVybjtcblxuICAgIGNvbnN0IHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS13b3JzZS1zZWxlY3Qtc3R5bGVzJywgJ3RydWUnKTtcbiAgICBzdHlsZUVsZW1lbnQudGV4dENvbnRlbnQgPSBjcmVhdGVDU1MoKTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGdldFNlbGVjdEVsZW1lbnRzSW5Sb290KHJvb3Q6IFJvb3ROb2RlKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20ocm9vdC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxTZWxlY3RFbGVtZW50Pignc2VsZWN0JykpO1xufVxuXG5mdW5jdGlvbiBtb3VudFNlbGVjdHNJblJvb3Qocm9vdDogUm9vdE5vZGUsIHBsdWdpbnM6IFBsdWdpbltdKSB7XG4gICAgZ2V0U2VsZWN0RWxlbWVudHNJblJvb3Qocm9vdCkuZm9yRWFjaChzZWxlY3RFbGVtZW50ID0+IG1vdW50U2VsZWN0RWxlbWVudChzZWxlY3RFbGVtZW50LCByb290LCBwbHVnaW5zKSk7XG59XG5cbmZ1bmN0aW9uIG1vdW50U2VsZWN0RWxlbWVudChzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudCwgcm9vdDogUm9vdE5vZGUsIHBsdWdpbnM6IFBsdWdpbltdKSB7XG4gICAgaWYgKGluc3RhbmNlcy5nZXQoc2VsZWN0RWxlbWVudCkpIHJldHVybjtcblxuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IFdvcnNlU2VsZWN0KHNlbGVjdEVsZW1lbnQsIGdldENvbmZpZyhzZWxlY3RFbGVtZW50KSwgcm9vdCwgcGx1Z2lucyk7XG4gICAgaW5zdGFuY2UubW91bnQoKTtcbiAgICBpbnN0YW5jZXMuc2V0KHNlbGVjdEVsZW1lbnQsIGluc3RhbmNlKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFHTyxJQUFNLGlCQUFpQjtBQUFBLEVBQzFCLFlBQVk7QUFBQSxFQUNaLGtCQUFrQjtBQUFBLEVBQ2xCLFFBQVE7QUFBQSxFQUNSLE9BQU87QUFDWDs7O0FDSE8sU0FBUyxZQUFZO0FBQ3hCO0FBQUE7QUFBQSxJQUEyQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQW1CUixlQUFlLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQWtHM0IsZUFBZSxLQUFLO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FB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