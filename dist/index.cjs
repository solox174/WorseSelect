"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  worseSelect: () => worseSelect
});
module.exports = __toCommonJS(index_exports);

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
        --ws-motion-duration: 160ms;
        --ws-motion-ease: cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .worse-select-container {
        position: relative;
        display: inline-block;
        min-width: 0;
        height: var(--ws-height);
        font: inherit;
        vertical-align: middle;
        color: var(--ws-text-color);
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
        transform-origin: top center;
        border: 1px solid var(--ws-border-color);
        border-radius: var(--ws-border-radius);
        background: var(--ws-bg);
        box-shadow: var(--ws-shadow);
        padding: 2px;
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

    .worse-select-options-scroller {
        max-height: ${DEFAULT_CONFIG.dropdownHeightPx}px;
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
    this.bindEvents();
    this.observeOptions();
    this.render();
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
    optionsListElement.style.maxHeight = `${config.dropdownHeightPx}px`;
  }
  updateOpenState() {
    if (!(this.worseSelectElement instanceof HTMLDivElement)) return;
    const isListboxMode = shouldUseListboxMode(this);
    const isOpen = isListboxMode ? true : this.open;
    this.worseSelectElement.classList.toggle("open", isOpen);
    this.worseSelectElement.classList.toggle("listbox", isListboxMode);
    this.worseSelectElement.classList.toggle("multiple", isMultipleSelect(this));
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
    if (searchInputElement instanceof HTMLInputElement) {
      searchInputElement.addEventListener("keydown", onSearchKeyDown);
      this.onSearchKeyDown = onSearchKeyDown;
    }
    this.onOptionsClick = onOptionsClick;
    this.onSelectChange = onSelectChange;
    this.onHeaderClick = onHeaderClick;
    this.onHeaderKeyDown = onHeaderKeyDown;
    this.onOptionsKeyDown = onOptionsKeyDown;
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
    const { selectElement, worseSelectElement } = this;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  worseSelect
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy93b3JzZS1zZWxlY3QvaW50ZXJuYWwtdHlwZXMudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9jc3MudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9jb25maWcudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9zZWxlY3QtaGVscGVycy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L29wdGlvbi1tYXAudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9kb20udHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9mZWF0dXJlcy9zZWFyY2gudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9jb3JlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgeyB3b3JzZVNlbGVjdCB9IGZyb20gXCIuL3dvcnNlLXNlbGVjdC9jb3JlXCI7XG5leHBvcnQgdHlwZSB7IFBsdWdpbiwgUGx1Z2luQ29udGV4dCB9IGZyb20gXCIuL3dvcnNlLXNlbGVjdC9pbnRlcm5hbC10eXBlc1wiOyIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9DT05GSUcgPSB7XG4gICAgc2VhcmNoYWJsZTogZmFsc2UsXG4gICAgZHJvcGRvd25IZWlnaHRQeDogNDAwLFxuICAgIGhlaWdodDogJzMycHgnLFxuICAgIHdpZHRoOiAnMTAwJSdcbn07XG5cbi8vIE1hcHMgZWFjaCBjb25maWcgdmFsdWUgdG8gaXRzIHdpZGVuZWQgcHJpbWl0aXZlIHR5cGUgKGUuZy4gdHJ1ZSBcdTIxOTIgYm9vbGVhbikgc28gdGhhdFxuLy8gU2VsZWN0Q29uZmlnIGFjY2VwdHMgYW55IHZhbGlkIHZhbHVlIG9mIHRoYXQgdHlwZSwgbm90IGp1c3QgdGhlIHNwZWNpZmljIGRlZmF1bHQgbGl0ZXJhbC5cbmV4cG9ydCB0eXBlIFdpZGVuPFQ+ID0gVCBleHRlbmRzIGJvb2xlYW4gPyBib29sZWFuIDogVCBleHRlbmRzIHN0cmluZyA/IHN0cmluZyA6IFQgZXh0ZW5kcyBudW1iZXIgPyBudW1iZXIgOiBUO1xuXG5leHBvcnQgdHlwZSBTZWxlY3RDb25maWcgPSB7XG4gICAgW0sgaW4ga2V5b2YgdHlwZW9mIERFRkFVTFRfQ09ORklHXTogV2lkZW48KHR5cGVvZiBERUZBVUxUX0NPTkZJRylbS10+XG59O1xuXG5leHBvcnQgdHlwZSBDb25maWdLZXkgPSBrZXlvZiBTZWxlY3RDb25maWc7XG5leHBvcnQgdHlwZSBSb290Tm9kZSA9IFBhcmVudE5vZGU7XG5cbmV4cG9ydCB0eXBlIFBsdWdpbkNvbnRleHQgPSB7XG4gICAgcmVhZG9ubHkgc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgcmVhZG9ubHkgaGVhZGVyRWxlbWVudDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgcmVhZG9ubHkgb3B0aW9uc0xpc3RFbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcbiAgICByZWFkb25seSBzZWFyY2hJbnB1dEVsZW1lbnQ/OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHNldE1lc3NhZ2UodGV4dDogc3RyaW5nKTogdm9pZDtcbiAgICBjbGVhck1lc3NhZ2UoKTogdm9pZDtcbiAgICBvbih0YXJnZXQ6IEV2ZW50VGFyZ2V0LCBldmVudDogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyKTogdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIFBsdWdpbiA9IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgaW5pdChjb250ZXh0OiBQbHVnaW5Db250ZXh0KTogdm9pZDtcbiAgICBvblN5bmM/KCk6IHZvaWQ7XG4gICAgb25PcGVuPygpOiB2b2lkO1xuICAgIG9uQ2xvc2U/KCk6IHZvaWQ7XG4gICAgZGVzdHJveT8oKTogdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIFdvcnNlU2VsZWN0T3B0aW9ucyA9IHtcbiAgICBvYnNlcnZlPzogYm9vbGVhbjtcbiAgICBwbHVnaW5zPzogUGx1Z2luW107XG59O1xuXG4vLyBNaW5pbWFsIGludGVyZmFjZSBleHBvc2VkIHRvIGRvbS50cyBhbmQgc2VsZWN0LWhlbHBlcnMudHMuIFJlc3RyaWN0cyB0aG9zZSBtb2R1bGVzIHRvIHRoZVxuLy8gcHJvcGVydGllcyB0aGV5IGFjdHVhbGx5IG5lZWQsIGtlZXBpbmcgdGhlIGZ1bGwgV29yc2VTZWxlY3QgY2xhc3MgaW50ZXJuYWwgdG8gY29yZS50cy5cbmV4cG9ydCBpbnRlcmZhY2UgV29yc2VTZWxlY3RDb250ZXh0IHtcbiAgICBzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICBjb25maWc6IFNlbGVjdENvbmZpZztcbiAgICBpbnN0YW5jZUlkOiBzdHJpbmc7XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHsgREVGQVVMVF9DT05GSUcgfSBmcm9tICcuL2ludGVybmFsLXR5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNTUygpIHtcbiAgICByZXR1cm4gIC8qIGxhbmd1YWdlPUNTUyAqLyBgXG4gICAgOnJvb3Qge1xuICAgICAgICAtLXdzLWJvcmRlci1jb2xvcjogIzc2NzY3NjtcbiAgICAgICAgLS13cy1ib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgIC0td3MtYmc6ICNmZmY7XG4gICAgICAgIC0td3MtdGV4dC1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgLS13cy1kaXNhYmxlZC1iZzogI2YwZjBmMDtcbiAgICAgICAgLS13cy1kaXNhYmxlZC10ZXh0LWNvbG9yOiAjNmQ2ZDZkO1xuICAgICAgICAtLXdzLWhvdmVyLWJnOiAjZjFmMWYxO1xuICAgICAgICAtLXdzLWFjdGl2ZS1iZzogI2VlZjRmZjtcbiAgICAgICAgLS13cy1hY3RpdmUtb3V0bGluZTogIzI1NjNlYjtcbiAgICAgICAgLS13cy1zZWxlY3RlZC1iZzogI2QyZTNmYztcbiAgICAgICAgLS13cy1zZWxlY3RlZC10ZXh0LWNvbG9yOiAjMTc0ZWE2O1xuICAgICAgICAtLXdzLWZvY3VzLW91dGxpbmU6ICMyNTYzZWI7XG4gICAgICAgIC0td3Mtc2VhcmNoLWJvcmRlci1jb2xvcjogI2I3YjdiNztcbiAgICAgICAgLS13cy1kaXZpZGVyLWNvbG9yOiAjZDBkMGQwO1xuICAgICAgICAtLXdzLWhpZ2hsaWdodC1iZzogI2ZmZjNhMztcbiAgICAgICAgLS13cy1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE2KTtcbiAgICAgICAgLS13cy1oZWlnaHQ6ICR7REVGQVVMVF9DT05GSUcuaGVpZ2h0fTtcbiAgICAgICAgLS13cy1tb3Rpb24tZHVyYXRpb246IDE2MG1zO1xuICAgICAgICAtLXdzLW1vdGlvbi1lYXNlOiBjdWJpYy1iZXppZXIoMC4xNiwgMSwgMC4zLCAxKTtcbiAgICB9XG4gICAgXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgbWluLXdpZHRoOiAwO1xuICAgICAgICBoZWlnaHQ6IHZhcigtLXdzLWhlaWdodCk7XG4gICAgICAgIGZvbnQ6IGluaGVyaXQ7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy10ZXh0LWNvbG9yKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5saXN0Ym94IHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1oZWFkZXIge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB3aWR0aDogJHtERUZBVUxUX0NPTkZJRy53aWR0aH07XG4gICAgICAgIGhlaWdodDogdmFyKC0td3MtaGVpZ2h0KTtcbiAgICAgICAgcGFkZGluZzogMCAyOHB4IDAgOHB4O1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS13cy1ib3JkZXItY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td3MtYmcpO1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtdGV4dC1jb2xvcik7XG4gICAgICAgIGZvbnQ6IGluaGVyaXQ7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7XG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWhlYWRlcjo6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICByaWdodDogOHB4O1xuICAgICAgICB3aWR0aDogMTBweDtcbiAgICAgICAgaGVpZ2h0OiAxMHB4O1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpIHJvdGF0ZSgwZGVnKTtcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xuICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gdmFyKC0td3MtbW90aW9uLWR1cmF0aW9uKSB2YXIoLS13cy1tb3Rpb24tZWFzZSk7XG4gICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiAxMHB4IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTInIGhlaWdodD0nMTInIHZpZXdCb3g9JzAgMCAxMiAxMicgZmlsbD0nbm9uZSclM0UlM0NwYXRoIGQ9J00zIDQuNUw2IDcuNUw5IDQuNScgc3Ryb2tlPSclMjMzMzMzMzMnIHN0cm9rZS13aWR0aD0nMS4xJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLyUzRSUzQy9zdmclM0VcIik7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIub3BlbiAud29yc2Utc2VsZWN0LWhlYWRlcjo6YWZ0ZXIge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSkgcm90YXRlKDE4MGRlZyk7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIubGlzdGJveCAud29yc2Utc2VsZWN0LWhlYWRlciB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIuZGlzYWJsZWQgLndvcnNlLXNlbGVjdC1oZWFkZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13cy1kaXNhYmxlZC1iZyk7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy1kaXNhYmxlZC10ZXh0LWNvbG9yKTtcbiAgICAgICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXI6Zm9jdXMtdmlzaWJsZSB7XG4gICAgICAgIG91dGxpbmU6IG5vbmUgIWltcG9ydGFudDtcbiAgICB9XG4gICAgXG4gICAgLndvcnNlLXNlbGVjdC1oZWFkZXI6Zm9jdXMtdmlzaWJsZSxcbiAgICAud29yc2Utc2VsZWN0LXNlYXJjaC1pbnB1dDpmb2N1cy12aXNpYmxlIHtcbiAgICAgICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXdzLWZvY3VzLW91dGxpbmUpICFpbXBvcnRhbnQ7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAxcHg7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IGNhbGMoMTAwJSArIDJweCk7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICB6LWluZGV4OiAxMDAwO1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02cHgpO1xuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiB0b3AgY2VudGVyO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS13cy1ib3JkZXItY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3MtYmcpO1xuICAgICAgICBib3gtc2hhZG93OiB2YXIoLS13cy1zaGFkb3cpO1xuICAgICAgICBwYWRkaW5nOiAycHg7XG4gICAgICAgIHRyYW5zaXRpb246XG4gICAgICAgICAgICBkaXNwbGF5IHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgYWxsb3ctZGlzY3JldGUsXG4gICAgICAgICAgICBvcGFjaXR5IHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgdmFyKC0td3MtbW90aW9uLWVhc2UpLFxuICAgICAgICAgICAgdHJhbnNmb3JtIHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgdmFyKC0td3MtbW90aW9uLWVhc2UpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLm9wZW4gLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gICAgICAgIHRyYW5zaXRpb246XG4gICAgICAgICAgICBkaXNwbGF5IHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgYWxsb3ctZGlzY3JldGUsXG4gICAgICAgICAgICBvcGFjaXR5IHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgdmFyKC0td3MtbW90aW9uLWVhc2UpLFxuICAgICAgICAgICAgdHJhbnNmb3JtIHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgdmFyKC0td3MtbW90aW9uLWVhc2UpO1xuICAgIH1cblxuICAgIEBzdGFydGluZy1zdHlsZSB7XG4gICAgICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLm9wZW4gLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTZweCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5saXN0Ym94IC53b3JzZS1zZWxlY3Qtb3B0aW9ucyB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICByaWdodDogYXV0bztcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICAgICAgICB0cmFuc2Zvcm06IG5vbmU7XG4gICAgICAgIHRyYW5zaXRpb246IG5vbmU7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1zZWFyY2gge1xuICAgICAgICBwYWRkaW5nOiA0cHg7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS13cy1kaXZpZGVyLWNvbG9yKTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMnB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtc2VhcmNoLWlucHV0IHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMzJweDtcbiAgICAgICAgcGFkZGluZzogMCA4cHg7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXdzLXNlYXJjaC1ib3JkZXItY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgZm9udDogaW5oZXJpdDtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXRleHQtY29sb3IpO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1iZyk7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb25zLXNjcm9sbGVyIHtcbiAgICAgICAgbWF4LWhlaWdodDogJHtERUZBVUxUX0NPTkZJRy5kcm9wZG93bkhlaWdodFB4fXB4O1xuICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uIHtcbiAgICAgICAgcGFkZGluZzogNHB4IDhweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0td3MtYm9yZGVyLXJhZGl1cyk7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy10ZXh0LWNvbG9yKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWhvdmVyLWJnKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbi5hY3RpdmUge1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1hY3RpdmUtYmcpO1xuICAgICAgICBvdXRsaW5lOiAxcHggc29saWQgdmFyKC0td3MtYWN0aXZlLW91dGxpbmUpO1xuICAgICAgICBvdXRsaW5lLW9mZnNldDogLTFweDtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbi5zZWxlY3RlZCB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLXNlbGVjdGVkLWJnKTtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXNlbGVjdGVkLXRleHQtY29sb3IpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLnNlbGVjdGVkLmFjdGl2ZSB7XG4gICAgICAgIG91dGxpbmU6IDFweCBzb2xpZCB2YXIoLS13cy1hY3RpdmUtb3V0bGluZSk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAtMXB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLmRpc2FibGVkIHtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLWRpc2FibGVkLXRleHQtY29sb3IpO1xuICAgICAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1kaXNhYmxlZC1iZyk7XG4gICAgfVxuXG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbi5oaWRkZW4ge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICAgIC5tYXRjaGVzIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3MtaGlnaGxpZ2h0LWJnKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LXZpc3VhbGx5LWhpZGRlbiB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDFweDtcbiAgICAgICAgaGVpZ2h0OiAxcHg7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIG1hcmdpbjogLTFweDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgY2xpcDogcmVjdCgwLCAwLCAwLCAwKTtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgYm9yZGVyOiAwO1xuICAgIH1cblxuICAgIEBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gICAgICAgIC53b3JzZS1zZWxlY3QtaGVhZGVyOjphZnRlcixcbiAgICAgICAgLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IG5vbmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYDtcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQge0NvbmZpZ0tleSwgREVGQVVMVF9DT05GSUcsIFNlbGVjdENvbmZpZ30gZnJvbSBcIi4vaW50ZXJuYWwtdHlwZXNcIjtcblxuY29uc3QgY29uZmlnS2V5cyA9IE9iamVjdC5rZXlzKERFRkFVTFRfQ09ORklHKSBhcyBDb25maWdLZXlbXTtcblxuZnVuY3Rpb24gdG9LZWJhYkNhc2UodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9bQS1aXS9nLCBjaGFyYWN0ZXIgPT4gYC0ke2NoYXJhY3Rlci50b0xvd2VyQ2FzZSgpfWApO1xufVxuXG5mdW5jdGlvbiBwYXJzZUNvbmZpZ1ZhbHVlPEsgZXh0ZW5kcyBDb25maWdLZXk+KGtleTogSywgYXR0cjogc3RyaW5nKTogU2VsZWN0Q29uZmlnW0tdIHtcbiAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSBERUZBVUxUX0NPTkZJR1trZXldO1xuXG4gICAgaWYgKHR5cGVvZiBkZWZhdWx0VmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICByZXR1cm4gKGF0dHIgPT09ICd0cnVlJykgYXMgU2VsZWN0Q29uZmlnW0tdO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGVmYXVsdFZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gTnVtYmVyKGF0dHIpIGFzIFNlbGVjdENvbmZpZ1tLXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXR0ciBhcyBTZWxlY3RDb25maWdbS107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb25maWcoc2VsZWN0RWxlbWVudDogRWxlbWVudCk6IFNlbGVjdENvbmZpZyB7XG4gICAgY29uc3QgY29uZmlnOiBTZWxlY3RDb25maWcgPSB7IC4uLkRFRkFVTFRfQ09ORklHIH07XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZ0tleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qga2V5ID0gY29uZmlnS2V5c1tpXTtcbiAgICAgICAgY29uc3QgZGF0YUF0dHJpYnV0ZU5hbWUgPSBgZGF0YS0ke3RvS2ViYWJDYXNlKGtleSl9YDtcbiAgICAgICAgY29uc3QgYXR0ciA9IHNlbGVjdEVsZW1lbnQuZ2V0QXR0cmlidXRlKGRhdGFBdHRyaWJ1dGVOYW1lKTtcblxuICAgICAgICBpZiAoYXR0ciA9PT0gbnVsbCkgY29udGludWU7XG5cbiAgICAgICAgKGNvbmZpZyBhcyBSZWNvcmQ8Q29uZmlnS2V5LCBzdHJpbmcgfCBib29sZWFuIHwgbnVtYmVyPilba2V5XSA9IHBhcnNlQ29uZmlnVmFsdWUoa2V5LCBhdHRyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uZmlnO1xufSIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQge1dvcnNlU2VsZWN0Q29udGV4dH0gZnJvbSBcIi4vaW50ZXJuYWwtdHlwZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZFVzZUxpc3Rib3hNb2RlKHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCkge1xuICAgIHJldHVybiB3b3JzZVNlbGVjdEluc3RhbmNlLnNlbGVjdEVsZW1lbnQuc2l6ZSA+IDE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc011bHRpcGxlU2VsZWN0KHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCkge1xuICAgIHJldHVybiB3b3JzZVNlbGVjdEluc3RhbmNlLnNlbGVjdEVsZW1lbnQubXVsdGlwbGU7XG59XG5cbi8vIE1hdGNoZXMgdGhlIGNvbnZlbnRpb25hbCBIVE1MIHBsYWNlaG9sZGVyIHBhdHRlcm46IDxvcHRpb24gdmFsdWU9XCJcIiBkaXNhYmxlZD5MYWJlbDwvb3B0aW9uPi5cbi8vIE9wdGlvbnMgdGhhdCBhcmUgbm90IGRpc2FibGVkIG9yIGhhdmUgYSBub24tZW1wdHkgdmFsdWUgYXJlIHRyZWF0ZWQgYXMgc2VsZWN0YWJsZS5cbmV4cG9ydCBmdW5jdGlvbiBpc1BsYWNlaG9sZGVyT3B0aW9uKHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQgfCBudWxsKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHNlbGVjdE9wdGlvbiAhPT0gbnVsbCAmJiBzZWxlY3RPcHRpb24udmFsdWUgPT09ICcnICYmIHNlbGVjdE9wdGlvbi5kaXNhYmxlZDtcbn0iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuLy8gVHdvIFdlYWtNYXBzIG1haW50YWluIGEgYmlkaXJlY3Rpb25hbCBsaW5rIGJldHdlZW4gbmF0aXZlIDxvcHRpb24+IGVsZW1lbnRzIGFuZCB0aGVpclxuLy8gcmVuZGVyZWQgd2lkZ2V0IGRpdnMuIFdlYWtNYXAga2V5cyBhbGxvdyBHQyB0byByZWNsYWltIGVsZW1lbnRzIHJlbW92ZWQgZnJvbSB0aGUgRE9NXG4vLyB3aXRob3V0IHJlcXVpcmluZyBleHBsaWNpdCBjbGVhbnVwIG9uIGV2ZXJ5IHJlbW92YWwgcGF0aC5cbmNvbnN0IG9wdGlvblRvRGl2ID0gbmV3IFdlYWtNYXA8SFRNTE9wdGlvbkVsZW1lbnQsIEhUTUxEaXZFbGVtZW50PigpO1xuY29uc3QgZGl2VG9PcHRpb24gPSBuZXcgV2Vha01hcDxIVE1MRGl2RWxlbWVudCwgSFRNTE9wdGlvbkVsZW1lbnQ+KCk7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmtPcHRpb24oc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCwgd29yc2VPcHRpb25FbGVtZW50OiBIVE1MRGl2RWxlbWVudCkge1xuICAgIG9wdGlvblRvRGl2LnNldChzZWxlY3RPcHRpb24sIHdvcnNlT3B0aW9uRWxlbWVudCk7XG4gICAgZGl2VG9PcHRpb24uc2V0KHdvcnNlT3B0aW9uRWxlbWVudCwgc2VsZWN0T3B0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVubGlua09wdGlvbihzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50KSB7XG4gICAgY29uc3Qgd29yc2VPcHRpb25FbGVtZW50ID0gb3B0aW9uVG9EaXYuZ2V0KHNlbGVjdE9wdGlvbik7XG4gICAgaWYgKCF3b3JzZU9wdGlvbkVsZW1lbnQpIHJldHVybjtcblxuICAgIG9wdGlvblRvRGl2LmRlbGV0ZShzZWxlY3RPcHRpb24pO1xuICAgIGRpdlRvT3B0aW9uLmRlbGV0ZSh3b3JzZU9wdGlvbkVsZW1lbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V29yc2VPcHRpb25FbGVtZW50KHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQpIHtcbiAgICByZXR1cm4gb3B0aW9uVG9EaXYuZ2V0KHNlbGVjdE9wdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZWxlY3RPcHRpb25FbGVtZW50KHdvcnNlT3B0aW9uRWxlbWVudDogSFRNTERpdkVsZW1lbnQpIHtcbiAgICByZXR1cm4gZGl2VG9PcHRpb24uZ2V0KHdvcnNlT3B0aW9uRWxlbWVudCk7XG59IiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmltcG9ydCB7IERFRkFVTFRfQ09ORklHLCBXb3JzZVNlbGVjdENvbnRleHQgfSBmcm9tICcuL2ludGVybmFsLXR5cGVzJztcbmltcG9ydCB7IGlzTXVsdGlwbGVTZWxlY3QsIHNob3VsZFVzZUxpc3Rib3hNb2RlIH0gZnJvbSAnLi9zZWxlY3QtaGVscGVycyc7XG5pbXBvcnQgeyBnZXRXb3JzZU9wdGlvbkVsZW1lbnQsIGxpbmtPcHRpb24gfSBmcm9tICcuL29wdGlvbi1tYXAnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsT3B0aW9uSW50b1ZpZXcoc2VsZWN0T3B0aW9uPzogSFRNTE9wdGlvbkVsZW1lbnQpIHtcbiAgICBpZiAoIXNlbGVjdE9wdGlvbikgcmV0dXJuO1xuICAgIGNvbnN0IGVsID0gZ2V0V29yc2VPcHRpb25FbGVtZW50KHNlbGVjdE9wdGlvbik7XG4gICAgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICBlbC5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcgfSk7XG59XG5cblxuZnVuY3Rpb24gYnVpbGRTdHlsZUF0dHJpYnV0ZShzdHlsZVBhcnRzOiBzdHJpbmdbXSkge1xuICAgIHJldHVybiBzdHlsZVBhcnRzLmxlbmd0aCA+IDAgPyBgIHN0eWxlPVwiJHtzdHlsZVBhcnRzLmpvaW4oJyAnKX1cImAgOiAnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkV29yc2VTZWxlY3RIZWFkZXJTdHlsZUF0dHJpYnV0ZSh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQpIHtcbiAgICBjb25zdCBoZWFkZXJTdHlsZVBhcnRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgaWYgKHdvcnNlU2VsZWN0SW5zdGFuY2UuY29uZmlnLndpZHRoICE9PSBERUZBVUxUX0NPTkZJRy53aWR0aCkge1xuICAgICAgICBoZWFkZXJTdHlsZVBhcnRzLnB1c2goYHdpZHRoOiAke3dvcnNlU2VsZWN0SW5zdGFuY2UuY29uZmlnLndpZHRofTtgKTtcbiAgICB9XG5cbiAgICBpZiAod29yc2VTZWxlY3RJbnN0YW5jZS5jb25maWcuaGVpZ2h0ICE9PSBERUZBVUxUX0NPTkZJRy5oZWlnaHQpIHtcbiAgICAgICAgaGVhZGVyU3R5bGVQYXJ0cy5wdXNoKGBoZWlnaHQ6ICR7d29yc2VTZWxlY3RJbnN0YW5jZS5jb25maWcuaGVpZ2h0fTtgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVpbGRTdHlsZUF0dHJpYnV0ZShoZWFkZXJTdHlsZVBhcnRzKTtcbn1cblxuXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgLnJlcGxhY2UoLyYvZywgJyZhbXA7JylcbiAgICAgICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgICAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAgICAgLnJlcGxhY2UoLycvZywgJyYjMzk7Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRPcHRpb25JZCh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQsIG9wdGlvbkluZGV4OiBudW1iZXIpIHtcbiAgICByZXR1cm4gYCR7d29yc2VTZWxlY3RJbnN0YW5jZS5pbnN0YW5jZUlkfS1vcHRpb24tJHtvcHRpb25JbmRleH1gO1xufVxuXG5mdW5jdGlvbiBnZXRXb3JzZU9wdGlvbkNsYXNzZXMoc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBbJ3dvcnNlLXNlbGVjdC1vcHRpb24nXTtcblxuICAgIGlmIChzZWxlY3RPcHRpb24uZGlzYWJsZWQpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKCdkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RPcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKCdzZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcnNlT3B0aW9uSHRtbChcbiAgICB3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQsXG4gICAgc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCxcbiAgICBvcHRpb25JbmRleDogbnVtYmVyLFxuKSB7XG4gICAgY29uc3Qgd29yc2VPcHRpb25DbGFzc2VzID0gZ2V0V29yc2VPcHRpb25DbGFzc2VzKHNlbGVjdE9wdGlvbik7XG4gICAgY29uc3Qgb3B0aW9uVGV4dCA9IHNlbGVjdE9wdGlvbi50ZXh0Q29udGVudCA/PyAnJztcblxuICAgIHJldHVybiBgXG4gICAgPGRpdiBpZD1cIiR7Z2V0T3B0aW9uSWQod29yc2VTZWxlY3RJbnN0YW5jZSwgb3B0aW9uSW5kZXgpfVwiXG4gICAgICAgICBjbGFzcz1cIiR7d29yc2VPcHRpb25DbGFzc2VzfVwiXG4gICAgICAgICBkYXRhLXZhbHVlPVwiJHtlc2NhcGVIdG1sKHNlbGVjdE9wdGlvbi52YWx1ZSl9XCJcbiAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgYXJpYS1zZWxlY3RlZD1cIiR7c2VsZWN0T3B0aW9uLnNlbGVjdGVkID8gJ3RydWUnIDogJ2ZhbHNlJ31cIlxuICAgICAgICAgYXJpYS1kaXNhYmxlZD1cIiR7c2VsZWN0T3B0aW9uLmRpc2FibGVkID8gJ3RydWUnIDogJ2ZhbHNlJ31cIj5cbiAgICAgICR7ZXNjYXBlSHRtbChvcHRpb25UZXh0KX1cbiAgICA8L2Rpdj5cbiAgICBgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29yc2VPcHRpb25FbGVtZW50KFxuICAgIHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCxcbiAgICBzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50LFxuICAgIG9wdGlvbkluZGV4OiBudW1iZXIsXG4pIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoXG4gICAgICAgIGNyZWF0ZVdvcnNlT3B0aW9uSHRtbCh3b3JzZVNlbGVjdEluc3RhbmNlLCBzZWxlY3RPcHRpb24sIG9wdGlvbkluZGV4KVxuICAgICkuZmlyc3RFbGVtZW50Q2hpbGQgYXMgSFRNTERpdkVsZW1lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWFyY2hIdG1sKHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCkge1xuICAgIGlmICghd29yc2VTZWxlY3RJbnN0YW5jZS5jb25maWcuc2VhcmNoYWJsZSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGBcbiAgICA8ZGl2IGNsYXNzPVwid29yc2Utc2VsZWN0LXNlYXJjaFwiPlxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICBjbGFzcz1cIndvcnNlLXNlbGVjdC1zZWFyY2gtaW5wdXRcIlxuICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGxpc3RcIlxuICAgICAgICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gICAgICAgICAgICAgYXJpYS1sYWJlbD1cIlNlYXJjaCBvcHRpb25zXCIgLz5cbiAgICA8L2Rpdj5cbiAgICBgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWVzc2FnZUh0bWwoKSB7XG4gICAgcmV0dXJuIGBcbiAgICA8ZGl2IGNsYXNzPVwid29yc2Utc2VsZWN0LW1lc3NhZ2Ugd29yc2Utc2VsZWN0LXZpc3VhbGx5LWhpZGRlblwiXG4gICAgICAgICByb2xlPVwic3RhdHVzXCJcbiAgICAgICAgIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXG4gICAgICAgICBhcmlhLWF0b21pYz1cInRydWVcIj48L2Rpdj5cbiAgICBgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29yc2VTZWxlY3Qod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgY29uc3QgaGVhZGVyU3R5bGVBdHRyaWJ1dGUgPSBidWlsZFdvcnNlU2VsZWN0SGVhZGVyU3R5bGVBdHRyaWJ1dGUod29yc2VTZWxlY3RJbnN0YW5jZSk7XG4gICAgY29uc3QgY29udGFpbmVyQ2xhc3NlcyA9IFsnd29yc2Utc2VsZWN0LWNvbnRhaW5lciddO1xuXG4gICAgaWYgKHNob3VsZFVzZUxpc3Rib3hNb2RlKHdvcnNlU2VsZWN0SW5zdGFuY2UpKSB7XG4gICAgICAgIGNvbnRhaW5lckNsYXNzZXMucHVzaCgnbGlzdGJveCcpO1xuICAgIH1cblxuICAgIGlmIChpc011bHRpcGxlU2VsZWN0KHdvcnNlU2VsZWN0SW5zdGFuY2UpKSB7XG4gICAgICAgIGNvbnRhaW5lckNsYXNzZXMucHVzaCgnbXVsdGlwbGUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBodG1sU3RyaW5nID0gYFxuICAgIDxkaXYgY2xhc3M9XCIke2NvbnRhaW5lckNsYXNzZXMuam9pbignICcpfVwiPlxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3M9XCJ3b3JzZS1zZWxlY3QtaGVhZGVyXCJcbiAgICAgICAgYXJpYS1oYXNwb3B1cD1cImxpc3Rib3hcIlxuICAgICAgICBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ3b3JzZS1zZWxlY3QtaGVhZGVyLWxhYmVsXCI+PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8ZGl2IGNsYXNzPVwid29yc2Utc2VsZWN0LW9wdGlvbnNcIj5cbiAgICAgICAgJHtjcmVhdGVTZWFyY2hIdG1sKHdvcnNlU2VsZWN0SW5zdGFuY2UpfVxuICAgICAgICAke2NyZWF0ZU1lc3NhZ2VIdG1sKCl9XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3b3JzZS1zZWxlY3Qtb3B0aW9ucy1zY3JvbGxlclwiJHtoZWFkZXJTdHlsZUF0dHJpYnV0ZX0+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgY29uc3Qgd29yc2VTZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoXG4gICAgICAgIGh0bWxTdHJpbmdcbiAgICApLmZpcnN0RWxlbWVudENoaWxkIGFzIEhUTUxEaXZFbGVtZW50O1xuXG4gICAgY29uc3Qgb3B0aW9uc0xpc3RFbGVtZW50ID0gd29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3Qtb3B0aW9ucy1zY3JvbGxlcicpIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgIG9wdGlvbnNMaXN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbGlzdGJveCcpO1xuICAgIG9wdGlvbnNMaXN0RWxlbWVudC50YWJJbmRleCA9IHNob3VsZFVzZUxpc3Rib3hNb2RlKHdvcnNlU2VsZWN0SW5zdGFuY2UpID8gMCA6IC0xO1xuXG4gICAgaWYgKGlzTXVsdGlwbGVTZWxlY3Qod29yc2VTZWxlY3RJbnN0YW5jZSkpIHtcbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1tdWx0aXNlbGVjdGFibGUnLCAndHJ1ZScpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBBcnJheS5mcm9tKHdvcnNlU2VsZWN0SW5zdGFuY2Uuc2VsZWN0RWxlbWVudC5vcHRpb25zKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0T3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzZWxlY3RPcHRpb24gPSBzZWxlY3RPcHRpb25zW2ldO1xuICAgICAgICBjb25zdCB3b3JzZU9wdGlvbkVsZW1lbnQgPSBjcmVhdGVXb3JzZU9wdGlvbkVsZW1lbnQoXG4gICAgICAgICAgICB3b3JzZVNlbGVjdEluc3RhbmNlLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9uLFxuICAgICAgICAgICAgaVxuICAgICAgICApO1xuICAgICAgICBsaW5rT3B0aW9uKHNlbGVjdE9wdGlvbiwgd29yc2VPcHRpb25FbGVtZW50KTtcbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmFwcGVuZENoaWxkKHdvcnNlT3B0aW9uRWxlbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdvcnNlU2VsZWN0RWxlbWVudDtcbn0iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHR5cGUgeyBQbHVnaW4sIFBsdWdpbkNvbnRleHQgfSBmcm9tICcuLi9pbnRlcm5hbC10eXBlcyc7XG5pbXBvcnQgeyBnZXRXb3JzZU9wdGlvbkVsZW1lbnQgfSBmcm9tICcuLi9vcHRpb24tbWFwJztcblxuZnVuY3Rpb24gYXBwbHlIaWdobGlnaHQoY29udGV4dDogUGx1Z2luQ29udGV4dCwgc2VhcmNoVGVybTogc3RyaW5nKSB7XG4gICAgY29uc3QgdGVybSA9IHNlYXJjaFRlcm0udHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBBcnJheS5mcm9tKGNvbnRleHQub3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKHdvcnNlT3B0aW9uID0+IHtcbiAgICAgICAgaWYgKCEod29yc2VPcHRpb24gaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRlcm0gIT09ICcnICYmIHdvcnNlT3B0aW9uLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModGVybSk7XG4gICAgICAgIHdvcnNlT3B0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ21hdGNoZXMnLCBtYXRjaGVzKTtcbiAgICB9KTtcblxuICAgIGlmICghdGVybSkge1xuICAgICAgICBjb250ZXh0LmNsZWFyTWVzc2FnZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWF0Y2hDb3VudCA9IGNvbnRleHQub3B0aW9uc0xpc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JzZS1zZWxlY3Qtb3B0aW9uLm1hdGNoZXMnKS5sZW5ndGg7XG4gICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAgIG1hdGNoQ291bnQgPT09IDAgPyAnTm8gcmVzdWx0cyBmb3VuZCcgOlxuICAgICAgICBtYXRjaENvdW50ID09PSAxID8gJzEgcmVzdWx0IGF2YWlsYWJsZScgOlxuICAgICAgICBgJHttYXRjaENvdW50fSByZXN1bHRzIGF2YWlsYWJsZWA7XG5cbiAgICBjb250ZXh0LnNldE1lc3NhZ2UobWVzc2FnZSk7XG5cbiAgICBjb25zdCBmaXJzdE1hdGNoID0gY29udGV4dC5vcHRpb25zTGlzdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1vcHRpb24ubWF0Y2hlcycpO1xuICAgIGlmIChmaXJzdE1hdGNoIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpIHtcbiAgICAgICAgZmlyc3RNYXRjaC5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQnVpbHRpblNlYXJjaFBsdWdpbigpOiBQbHVnaW4ge1xuICAgIGxldCBzZWFyY2hUZXJtID0gJyc7XG4gICAgbGV0IHBsdWdpbkNvbnRleHQ6IFBsdWdpbkNvbnRleHQgfCBudWxsID0gbnVsbDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdzZWFyY2gnLFxuXG4gICAgICAgIGluaXQoY29udGV4dDogUGx1Z2luQ29udGV4dCkge1xuICAgICAgICAgICAgcGx1Z2luQ29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgICAgICBjb25zdCB7IHNlYXJjaElucHV0RWxlbWVudCB9ID0gY29udGV4dDtcbiAgICAgICAgICAgIGlmICghc2VhcmNoSW5wdXRFbGVtZW50KSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnRleHQub24oc2VhcmNoSW5wdXRFbGVtZW50LCAnaW5wdXQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgICAgICAgICBzZWFyY2hUZXJtID0gdGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGFwcGx5SGlnaGxpZ2h0KGNvbnRleHQsIHNlYXJjaFRlcm0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25TeW5jKCkge1xuICAgICAgICAgICAgaWYgKCFwbHVnaW5Db250ZXh0KSByZXR1cm47XG4gICAgICAgICAgICBhcHBseUhpZ2hsaWdodChwbHVnaW5Db250ZXh0LCBzZWFyY2hUZXJtKTtcbiAgICAgICAgfSxcblxuICAgICAgICBvbkNsb3NlKCkge1xuICAgICAgICAgICAgaWYgKCFwbHVnaW5Db250ZXh0KSByZXR1cm47XG4gICAgICAgICAgICBzZWFyY2hUZXJtID0gJyc7XG4gICAgICAgICAgICBjb25zdCB7IHNlYXJjaElucHV0RWxlbWVudCB9ID0gcGx1Z2luQ29udGV4dDtcbiAgICAgICAgICAgIGlmIChzZWFyY2hJbnB1dEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoSW5wdXRFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhcHBseUhpZ2hsaWdodChwbHVnaW5Db250ZXh0LCAnJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVzdHJveSgpIHtcbiAgICAgICAgICAgIHBsdWdpbkNvbnRleHQgPSBudWxsO1xuICAgICAgICAgICAgc2VhcmNoVGVybSA9ICcnO1xuICAgICAgICB9LFxuICAgIH07XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuLyoqXG4gKiBQcm9ncmVzc2l2ZS1lbmhhbmNlbWVudCB1dGlsaXRpZXMgZm9yIG5hdGl2ZSB7QGxpbmsgSFRNTFNlbGVjdEVsZW1lbnR9IGNvbnRyb2xzLlxuICpcbiAqIEtlZXBzIHRoZSBuYXRpdmUgYDxzZWxlY3Q+YCBhcyBzb3VyY2Ugb2YgdHJ1dGggZm9yIHZhbHVlLCBkaXNhYmxlZCBzdGF0ZSwgYHNpemVgLCBhbmRcbiAqIGBtdWx0aXBsZWAsIHdoaWxlIG1pcnJvcmluZyB0aGF0IHN0YXRlIGludG8gYSBjdXN0b20gRE9NIHN0cnVjdHVyZSB0aGF0IGlzIGVhc2llciB0byBzdHlsZS5cbiAqXG4gKiBXaWRnZXQtc3BlY2lmaWMgYmVoYXZpb3IgdXNlcyBgZGF0YS0qYCBhdHRyaWJ1dGVzIHN1Y2ggYXMgYGRhdGEtc2VhcmNoYWJsZWAgYW5kXG4gKiBgZGF0YS1kcm9wZG93bi1oZWlnaHQtcHhgLCBrZWVwaW5nIHRoZSBwdWJsaWMgQVBJIGFsaWduZWQgd2l0aCBzdGFuZGFyZCBIVE1MLlxuICovXG5pbXBvcnQgeyBERUZBVUxUX0NPTkZJRywgU2VsZWN0Q29uZmlnLCBSb290Tm9kZSwgV29yc2VTZWxlY3RPcHRpb25zLCBQbHVnaW4sIFBsdWdpbkNvbnRleHQgfSBmcm9tICcuL2ludGVybmFsLXR5cGVzJztcbmltcG9ydCB0eXBlIHsgV29yc2VTZWxlY3RDb250ZXh0IH0gZnJvbSAnLi9pbnRlcm5hbC10eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVDU1MgfSBmcm9tICcuL2Nzcyc7XG5pbXBvcnQgeyBnZXRDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBjcmVhdGVXb3JzZU9wdGlvbkVsZW1lbnQsIGNyZWF0ZVdvcnNlU2VsZWN0LCBnZXRPcHRpb25JZCwgc2Nyb2xsT3B0aW9uSW50b1ZpZXcgfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgeyBnZXRTZWxlY3RPcHRpb25FbGVtZW50LCBnZXRXb3JzZU9wdGlvbkVsZW1lbnQsIGxpbmtPcHRpb24sIHVubGlua09wdGlvbiB9IGZyb20gJy4vb3B0aW9uLW1hcCc7XG5pbXBvcnQgeyBpc1BsYWNlaG9sZGVyT3B0aW9uLCBzaG91bGRVc2VMaXN0Ym94TW9kZSwgaXNNdWx0aXBsZVNlbGVjdCB9IGZyb20gJy4vc2VsZWN0LWhlbHBlcnMnO1xuaW1wb3J0IHsgY3JlYXRlQnVpbHRpblNlYXJjaFBsdWdpbiB9IGZyb20gJy4vZmVhdHVyZXMvc2VhcmNoJztcblxuY29uc3QgaW5zdGFuY2VzID0gbmV3IFdlYWtNYXA8SFRNTFNlbGVjdEVsZW1lbnQsIFdvcnNlU2VsZWN0PigpO1xubGV0IG5leHRJbnN0YW5jZUlkID0gMDtcblxudHlwZSBQbHVnaW5MaXN0ZW5lciA9IHsgdGFyZ2V0OiBFdmVudFRhcmdldDsgZXZlbnQ6IHN0cmluZzsgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciB9O1xuXG5jbGFzcyBXb3JzZVNlbGVjdCBpbXBsZW1lbnRzIFdvcnNlU2VsZWN0Q29udGV4dCB7XG4gICAgLy8gVHJhY2tzIGFsbCBtb3VudGVkIGluc3RhbmNlcyBzbyBhIHNpbmdsZSBkb2N1bWVudC1sZXZlbCBwb2ludGVyZG93biBsaXN0ZW5lciBjYW4gY2xvc2UgYW55XG4gICAgLy8gb3BlbiBkcm9wZG93biB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvdXRzaWRlLCBpbnN0ZWFkIG9mIHJlZ2lzdGVyaW5nIG9uZSBsaXN0ZW5lciBwZXIgaW5zdGFuY2UuXG4gICAgLy8gTm90ZTogYHByaXZhdGVgIGlzIGEgVHlwZVNjcmlwdC1vbmx5IGNvbnN0cmFpbnQgYW5kIGlzIG5vdCBlbmZvcmNlZCBpbiB0aGUgY29tcGlsZWQgb3V0cHV0LlxuICAgIHByaXZhdGUgc3RhdGljIG1vdW50ZWRJbnN0YW5jZXMgPSBuZXcgU2V0PFdvcnNlU2VsZWN0PigpO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaGFuZGxlRG9jdW1lbnRQb2ludGVyRG93bihldmVudDogRXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBOb2RlKSkgcmV0dXJuO1xuICAgICAgICBmb3IgKGNvbnN0IGluc3RhbmNlIG9mIFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMpIHtcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS53b3JzZVNlbGVjdEVsZW1lbnQgJiYgIWluc3RhbmNlLndvcnNlU2VsZWN0RWxlbWVudC5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY2xvc2VEcm9wZG93bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0eXBlQWhlYWRUaW1lcklkPzogbnVtYmVyO1xuICAgIHByaXZhdGUgdHlwZUFoZWFkVGV4dCA9ICcnO1xuICAgIHByaXZhdGUgdHlwZUFoZWFkVGltZW91dCA9IDEwMDA7XG4gICAgc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgY29uZmlnOiBTZWxlY3RDb25maWc7XG4gICAgcm9vdDogUm9vdE5vZGU7XG4gICAgaW5zdGFuY2VJZDogc3RyaW5nO1xuXG4gICAgd29yc2VTZWxlY3RFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgaGVhZGVyRWxlbWVudD86IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIGRyb3Bkb3duUGFuZWxFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgb3B0aW9uc0xpc3RFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgc2VhcmNoSW5wdXRFbGVtZW50PzogSFRNTElucHV0RWxlbWVudDtcbiAgICBtZXNzYWdlRWxlbWVudD86IEhUTUxEaXZFbGVtZW50O1xuICAgIG9wdGlvbk9ic2VydmVyPzogTXV0YXRpb25PYnNlcnZlcjtcblxuICAgIG9uU2VsZWN0Q2hhbmdlPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvbk9wdGlvbnNDbGljaz86IEV2ZW50TGlzdGVuZXI7XG4gICAgb25IZWFkZXJDbGljaz86IEV2ZW50TGlzdGVuZXI7XG4gICAgb25IZWFkZXJLZXlEb3duPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvbk9wdGlvbnNLZXlEb3duPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvblNlYXJjaEtleURvd24/OiBFdmVudExpc3RlbmVyO1xuXG4gICAgb3BlbiA9IGZhbHNlO1xuICAgIGFjdGl2ZU9wdGlvbj86IEhUTUxPcHRpb25FbGVtZW50O1xuXG4gICAgcHJpdmF0ZSBwbHVnaW5zOiBQbHVnaW5bXSA9IFtdO1xuICAgIHByaXZhdGUgcGx1Z2luTGlzdGVuZXJzOiBQbHVnaW5MaXN0ZW5lcltdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudCwgY29uZmlnOiBQYXJ0aWFsPFNlbGVjdENvbmZpZz4gPSB7fSwgcm9vdDogUm9vdE5vZGUgPSBkb2N1bWVudCwgcGx1Z2luczogUGx1Z2luW10gPSBbXSkge1xuICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQgPSBzZWxlY3RFbGVtZW50O1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHsgLi4uREVGQVVMVF9DT05GSUcsIC4uLmNvbmZpZyB9O1xuICAgICAgICB0aGlzLnJvb3QgPSByb290O1xuICAgICAgICB0aGlzLmluc3RhbmNlSWQgPSBgd3MtJHsrK25leHRJbnN0YW5jZUlkfWA7XG4gICAgICAgIHRoaXMucGx1Z2lucyA9IFsuLi5wbHVnaW5zXTtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcuc2VhcmNoYWJsZSAmJiAhcGx1Z2lucy5zb21lKHAgPT4gcC5uYW1lID09PSAnc2VhcmNoJykpIHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2lucy5wdXNoKGNyZWF0ZUJ1aWx0aW5TZWFyY2hQbHVnaW4oKSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIG1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy53b3JzZVNlbGVjdEVsZW1lbnQpIHJldHVybjtcblxuICAgICAgICBlbnN1cmVTdHlsZXMoKTtcblxuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudCA9IGNyZWF0ZVdvcnNlU2VsZWN0KHRoaXMpO1xuICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LWhlYWRlcicpIGFzIEhUTUxCdXR0b25FbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmRyb3Bkb3duUGFuZWxFbGVtZW50ID0gdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1vcHRpb25zJykgYXMgSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50ID0gdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1vcHRpb25zLXNjcm9sbGVyJykgYXMgSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50ID0gdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1zZWFyY2gtaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm1lc3NhZ2VFbGVtZW50ID0gdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1tZXNzYWdlJykgYXMgSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBXb3JzZVNlbGVjdC5oYW5kbGVEb2N1bWVudFBvaW50ZXJEb3duKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuaGFuZGxlVHlwZUFoZWFkKTtcbiAgICAgICAgV29yc2VTZWxlY3QubW91bnRlZEluc3RhbmNlcy5hZGQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZU9wdGlvbnMoKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgdGhpcy5pbml0UGx1Z2lucygpO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMub3B0aW9uT2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgdGhpcy5vcHRpb25PYnNlcnZlciA9IHVuZGVmaW5lZDtcblxuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgICAgICAgIHBsdWdpbi5kZXN0cm95Py4oKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHsgdGFyZ2V0LCBldmVudCwgaGFuZGxlciB9IG9mIHRoaXMucGx1Z2luTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wbHVnaW5MaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgdGhpcy5wbHVnaW5zID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMub25TZWxlY3RDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLm9uU2VsZWN0Q2hhbmdlKTtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3RDaGFuZ2UgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vbk9wdGlvbnNDbGljayAmJiB0aGlzLmRyb3Bkb3duUGFuZWxFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duUGFuZWxFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbk9wdGlvbnNDbGljayk7XG4gICAgICAgICAgICB0aGlzLm9uT3B0aW9uc0NsaWNrID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25IZWFkZXJDbGljayAmJiB0aGlzLmhlYWRlckVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25IZWFkZXJDbGljayk7XG4gICAgICAgICAgICB0aGlzLm9uSGVhZGVyQ2xpY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vbkhlYWRlcktleURvd24gJiYgdGhpcy5oZWFkZXJFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25IZWFkZXJLZXlEb3duKTtcbiAgICAgICAgICAgIHRoaXMub25IZWFkZXJLZXlEb3duID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25PcHRpb25zS2V5RG93biAmJiB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25PcHRpb25zS2V5RG93bik7XG4gICAgICAgICAgICB0aGlzLm9uT3B0aW9uc0tleURvd24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vblNlYXJjaEtleURvd24gJiYgdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uU2VhcmNoS2V5RG93bik7XG4gICAgICAgICAgICB0aGlzLm9uU2VhcmNoS2V5RG93biA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMuZGVsZXRlKHRoaXMpO1xuICAgICAgICBpZiAoV29yc2VTZWxlY3QubW91bnRlZEluc3RhbmNlcy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIFdvcnNlU2VsZWN0LmhhbmRsZURvY3VtZW50UG9pbnRlckRvd24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVUeXBlQWhlYWQpO1xuXG4gICAgICAgIEFycmF5LmZyb20odGhpcy5zZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmZvckVhY2godW5saW5rT3B0aW9uKTtcblxuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudD8ucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG5cbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5kcm9wZG93blBhbmVsRWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm1lc3NhZ2VFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hY3RpdmVPcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgc3luY0RpbWVuc2lvbnMoKSB7XG4gICAgICAgIGNvbnN0IHsgd29yc2VTZWxlY3RFbGVtZW50LCBoZWFkZXJFbGVtZW50LCBvcHRpb25zTGlzdEVsZW1lbnQsIHNlbGVjdEVsZW1lbnQsIGNvbmZpZyB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEod29yc2VTZWxlY3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKGhlYWRlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGVjdEVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChjb21wdXRlZFN0eWxlLndpZHRoICYmIGNvbXB1dGVkU3R5bGUud2lkdGggIT09ICdhdXRvJyAmJiBjb21wdXRlZFN0eWxlLndpZHRoICE9PSAnMHB4Jykge1xuICAgICAgICAgICAgd29yc2VTZWxlY3RFbGVtZW50LnN0eWxlLndpZHRoID0gY29tcHV0ZWRTdHlsZS53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGhlYWRlckVsZW1lbnQuc3R5bGUuZm9udCA9IGNvbXB1dGVkU3R5bGUuZm9udDtcbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IGAke2NvbmZpZy5kcm9wZG93bkhlaWdodFB4fXB4YDtcbiAgICB9XG5cbiAgICB1cGRhdGVPcGVuU3RhdGUoKSB7XG4gICAgICAgIGlmICghKHRoaXMud29yc2VTZWxlY3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgaXNMaXN0Ym94TW9kZSA9IHNob3VsZFVzZUxpc3Rib3hNb2RlKHRoaXMpO1xuICAgICAgICBjb25zdCBpc09wZW4gPSBpc0xpc3Rib3hNb2RlID8gdHJ1ZSA6IHRoaXMub3BlbjtcblxuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJywgaXNPcGVuKTtcbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbGlzdGJveCcsIGlzTGlzdGJveE1vZGUpO1xuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdtdWx0aXBsZScsIGlzTXVsdGlwbGVTZWxlY3QodGhpcykpO1xuXG4gICAgICAgIGlmICh0aGlzLmhlYWRlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIFN0cmluZyhpc09wZW4pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJywgU3RyaW5nKGlzTXVsdGlwbGVTZWxlY3QodGhpcykpKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50LnRhYkluZGV4ID0gaXNPcGVuID8gMCA6IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVIZWFkZXJTdGF0ZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVNlbGVjdGVkU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgb3B0aW9uc0xpc3RFbGVtZW50LCBzZWxlY3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBBcnJheS5mcm9tKG9wdGlvbnNMaXN0RWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuZm9yRWFjaChzZWxlY3RPcHRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKCFzZWxlY3RPcHRpb24uc2VsZWN0ZWQpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChpc1BsYWNlaG9sZGVyT3B0aW9uKHNlbGVjdE9wdGlvbikpIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IGVsID0gZ2V0V29yc2VPcHRpb25FbGVtZW50KHNlbGVjdE9wdGlvbik7XG4gICAgICAgICAgICBlbD8uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIGVsPy5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVEaXNhYmxlZFN0YXRlKCkge1xuICAgICAgICBjb25zdCB7IHdvcnNlU2VsZWN0RWxlbWVudCwgc2VsZWN0RWxlbWVudCwgaGVhZGVyRWxlbWVudCwgc2VhcmNoSW5wdXRFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoISh3b3JzZVNlbGVjdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICB3b3JzZVNlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnZGlzYWJsZWQnLCBzZWxlY3RFbGVtZW50LmRpc2FibGVkKTtcblxuICAgICAgICBpZiAoaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XG4gICAgICAgICAgICBoZWFkZXJFbGVtZW50LmRpc2FibGVkID0gc2VsZWN0RWxlbWVudC5kaXNhYmxlZDtcbiAgICAgICAgICAgIGhlYWRlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJywgU3RyaW5nKHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWFyY2hJbnB1dEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICBzZWFyY2hJbnB1dEVsZW1lbnQuZGlzYWJsZWQgPSBzZWxlY3RFbGVtZW50LmRpc2FibGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgQXJyYXkuZnJvbShzZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmZvckVhY2goc2VsZWN0T3B0aW9uID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsID0gZ2V0V29yc2VPcHRpb25FbGVtZW50KHNlbGVjdE9wdGlvbik7XG4gICAgICAgICAgICBlbD8uY2xhc3NMaXN0LnRvZ2dsZSgnZGlzYWJsZWQnLCBzZWxlY3RPcHRpb24uZGlzYWJsZWQpO1xuICAgICAgICAgICAgZWw/LnNldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcsIFN0cmluZyhzZWxlY3RPcHRpb24uZGlzYWJsZWQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlSGVhZGVyU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgaGVhZGVyRWxlbWVudCwgc2VsZWN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEoaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGxhYmVsRWwgPSBoZWFkZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3QtaGVhZGVyLWxhYmVsJyk7XG4gICAgICAgIGlmICghKGxhYmVsRWwgaW5zdGFuY2VvZiBIVE1MU3BhbkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPVxuICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5zZWxlY3RlZE9wdGlvbnNbMF0gPz9cbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQub3B0aW9uc1tzZWxlY3RFbGVtZW50LnNlbGVjdGVkSW5kZXhdID8/XG4gICAgICAgICAgICBudWxsO1xuXG4gICAgICAgIGNvbnN0IGxhYmVsID0gKGlzUGxhY2Vob2xkZXJPcHRpb24oc2VsZWN0ZWRPcHRpb24pICYmIHRoaXMub3BlbilcbiAgICAgICAgICAgID8gJydcbiAgICAgICAgICAgIDogc2VsZWN0ZWRPcHRpb24/LnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cbiAgICAgICAgbGFiZWxFbC50ZXh0Q29udGVudCA9IGxhYmVsO1xuICAgICAgICBoZWFkZXJFbGVtZW50LnRpdGxlID0gbGFiZWw7XG4gICAgICAgIGhlYWRlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgbGFiZWwgPyBgU2VsZWN0ZWQ6ICR7bGFiZWx9YCA6ICdTZWxlY3QgYW4gb3B0aW9uJyk7XG4gICAgfVxuXG4gICAgdXBkYXRlQWN0aXZlRGVzY2VuZGFudCgpIHtcbiAgICAgICAgY29uc3QgeyBvcHRpb25zTGlzdEVsZW1lbnQsIGFjdGl2ZU9wdGlvbiB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCFhY3RpdmVPcHRpb24pIHtcbiAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoYWN0aXZlT3B0aW9uKTtcbiAgICAgICAgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHtcbiAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgZWwuaWQpO1xuICAgIH1cblxuICAgIHVwZGF0ZUFjdGl2ZU9wdGlvblN0YXRlKCkge1xuICAgICAgICBjb25zdCB7IG9wdGlvbnNMaXN0RWxlbWVudCwgYWN0aXZlT3B0aW9uIH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBBcnJheS5mcm9tKG9wdGlvbnNMaXN0RWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBpZiAoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkgZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChhY3RpdmVPcHRpb24pIHtcbiAgICAgICAgICAgIGdldFdvcnNlT3B0aW9uRWxlbWVudChhY3RpdmVPcHRpb24pPy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN5bmNBbGwoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRTdGF0ZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVPcGVuU3RhdGUoKTtcbiAgICAgICAgdGhpcy5zeW5jRGltZW5zaW9ucygpO1xuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgICAgICAgIHBsdWdpbi5vblN5bmM/LigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0TWVzc2FnZSh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgeyBtZXNzYWdlRWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEobWVzc2FnZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgbWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgLy8gRGVmZXIgdGhlIHVwZGF0ZSBieSBvbmUgdGljayBzbyBzY3JlZW4gcmVhZGVycyBhbm5vdW5jZSBhIGNoYW5nZSBldmVuIHdoZW4gdGhlXG4gICAgICAgIC8vIG1lc3NhZ2UgdGV4dCBoYXBwZW5zIHRvIGJlIHRoZSBzYW1lIHN0cmluZyBhcyB0aGUgcHJldmlvdXMgYW5ub3VuY2VtZW50LlxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5tZXNzYWdlRWxlbWVudCA9PT0gbWVzc2FnZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIGNsZWFyTWVzc2FnZSgpIHtcbiAgICAgICAgaWYgKCEodGhpcy5tZXNzYWdlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICB0aGlzLm1lc3NhZ2VFbGVtZW50LnRleHRDb250ZW50ID0gJyc7XG4gICAgfVxuXG4gICAgb3BlbkRyb3Bkb3duKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RFbGVtZW50LmRpc2FibGVkKSByZXR1cm47XG4gICAgICAgIGlmIChzaG91bGRVc2VMaXN0Ym94TW9kZSh0aGlzKSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMub3BlbiA9IHRydWU7XG4gICAgICAgIHRoaXMudXBkYXRlT3BlblN0YXRlKCk7XG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgICAgICAgcGx1Z2luLm9uT3Blbj8uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZURyb3Bkb3duKCkge1xuICAgICAgICBpZiAoc2hvdWxkVXNlTGlzdGJveE1vZGUodGhpcykpIHJldHVybjtcbiAgICAgICAgaWYgKCF0aGlzLm9wZW4pIHJldHVybjtcblxuICAgICAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICBwbHVnaW4ub25DbG9zZT8uKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb290LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKT8uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIHRoaXMudXBkYXRlT3BlblN0YXRlKCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlRHJvcGRvd24oKSB7XG4gICAgICAgIGlmIChzaG91bGRVc2VMaXN0Ym94TW9kZSh0aGlzKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLm9wZW4gPyB0aGlzLmNsb3NlRHJvcGRvd24oKSA6IHRoaXMub3BlbkRyb3Bkb3duKCk7XG4gICAgfVxuXG4gICAgb3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCkge1xuICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bigpO1xuXG4gICAgICAgIGNvbnN0IHsgb3B0aW9uc0xpc3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQudGFiSW5kZXggPSAwO1xuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgc2Nyb2xsT3B0aW9uSW50b1ZpZXcodGhpcy5hY3RpdmVPcHRpb24pO1xuICAgIH1cblxuICAgIGNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpIHtcbiAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudD8uZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXRWaXNpYmxlRW5hYmxlZE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuc2VsZWN0RWxlbWVudC5vcHRpb25zKS5maWx0ZXIob3B0ID0+IHtcbiAgICAgICAgICAgIGlmIChvcHQuZGlzYWJsZWQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBnZXRXb3JzZU9wdGlvbkVsZW1lbnQob3B0KSBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVPcHRpb24oc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCB8IHVuZGVmaW5lZCwgc2Nyb2xsID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmFjdGl2ZU9wdGlvbiA9IHNlbGVjdE9wdGlvbjtcbiAgICAgICAgdGhpcy51cGRhdGVBY3RpdmVEZXNjZW5kYW50KCk7XG4gICAgICAgIHRoaXMudXBkYXRlQWN0aXZlT3B0aW9uU3RhdGUoKTtcbiAgICAgICAgaWYgKHNjcm9sbCkgc2Nyb2xsT3B0aW9uSW50b1ZpZXcoc2VsZWN0T3B0aW9uKTtcbiAgICB9XG5cbiAgICBtb3ZlQWN0aXZlT3B0aW9uKGRlbHRhOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2V0VmlzaWJsZUVuYWJsZWRPcHRpb25zKCk7XG4gICAgICAgIGlmIChvcHRpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHRoaXMuYWN0aXZlT3B0aW9uID8gb3B0aW9ucy5pbmRleE9mKHRoaXMuYWN0aXZlT3B0aW9uKSA6IC0xO1xuICAgICAgICBjb25zdCBuZXh0SW5kZXggPSBjdXJyZW50SW5kZXggPT09IC0xXG4gICAgICAgICAgICA/IChkZWx0YSA+PSAwID8gMCA6IG9wdGlvbnMubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgIDogTWF0aC5tYXgoMCwgTWF0aC5taW4ob3B0aW9ucy5sZW5ndGggLSAxLCBjdXJyZW50SW5kZXggKyBkZWx0YSkpO1xuXG4gICAgICAgIHRoaXMuc2V0QWN0aXZlT3B0aW9uKG9wdGlvbnNbbmV4dEluZGV4XSk7XG4gICAgfVxuXG4gICAgbW92ZUFjdGl2ZVRvQm91bmRhcnkoYm91bmRhcnk6ICdzdGFydCcgfCAnZW5kJykge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRWaXNpYmxlRW5hYmxlZE9wdGlvbnMoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlT3B0aW9uKGJvdW5kYXJ5ID09PSAnc3RhcnQnID8gb3B0aW9uc1swXSA6IG9wdGlvbnNbb3B0aW9ucy5sZW5ndGggLSAxXSk7XG4gICAgfVxuXG4gICAgZ2V0UGFnZUp1bXBTaXplKCkge1xuICAgICAgICBjb25zdCB7IG9wdGlvbnNMaXN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm4gMTA7XG5cbiAgICAgICAgY29uc3QgZmlyc3RPcHRpb24gPSBBcnJheS5mcm9tKG9wdGlvbnNMaXN0RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yc2Utc2VsZWN0LW9wdGlvbicpKVxuICAgICAgICAgICAgLmZpbmQoZWwgPT4gZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCk7XG4gICAgICAgIGlmICghKGZpcnN0T3B0aW9uIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm4gMTA7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uSGVpZ2h0ID0gZmlyc3RPcHRpb24ub2Zmc2V0SGVpZ2h0IHx8IDE7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgxLCBNYXRoLmZsb29yKG9wdGlvbnNMaXN0RWxlbWVudC5jbGllbnRIZWlnaHQgLyBvcHRpb25IZWlnaHQpKTtcbiAgICB9XG5cbiAgICBtb3ZlQWN0aXZlQnlQYWdlKGRpcmVjdGlvbjogMSB8IC0xKSB7XG4gICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbih0aGlzLmdldFBhZ2VKdW1wU2l6ZSgpICogZGlyZWN0aW9uKTtcbiAgICB9XG5cbiAgICBjb21taXRBY3RpdmVPcHRpb25TZWxlY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHsgYWN0aXZlT3B0aW9uLCBzZWxlY3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIWFjdGl2ZU9wdGlvbiB8fCBhY3RpdmVPcHRpb24uZGlzYWJsZWQpIHJldHVybjtcblxuICAgICAgICBpZiAoc2VsZWN0RWxlbWVudC5tdWx0aXBsZSkge1xuICAgICAgICAgICAgYWN0aXZlT3B0aW9uLnNlbGVjdGVkID0gIWFjdGl2ZU9wdGlvbi5zZWxlY3RlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5pbmRleE9mKGFjdGl2ZU9wdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxlY3RFbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFBsdWdpbnMoKSB7XG4gICAgICAgIGlmICghKHRoaXMuaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoISh0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGNvbnRleHQ6IFBsdWdpbkNvbnRleHQgPSB7XG4gICAgICAgICAgICBzZWxlY3RFbGVtZW50OiB0aGlzLnNlbGVjdEVsZW1lbnQsXG4gICAgICAgICAgICBoZWFkZXJFbGVtZW50OiB0aGlzLmhlYWRlckVsZW1lbnQsXG4gICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQ6IHRoaXMub3B0aW9uc0xpc3RFbGVtZW50LFxuICAgICAgICAgICAgc2VhcmNoSW5wdXRFbGVtZW50OiB0aGlzLnNlYXJjaElucHV0RWxlbWVudCxcbiAgICAgICAgICAgIHNldE1lc3NhZ2U6ICh0ZXh0KSA9PiB0aGlzLnNldE1lc3NhZ2UodGV4dCksXG4gICAgICAgICAgICBjbGVhck1lc3NhZ2U6ICgpID0+IHRoaXMuY2xlYXJNZXNzYWdlKCksXG4gICAgICAgICAgICBvbjogKHRhcmdldCwgZXZlbnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW5MaXN0ZW5lcnMucHVzaCh7IHRhcmdldCwgZXZlbnQsIGhhbmRsZXIgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgICAgICAgcGx1Z2luLmluaXQoY29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBLZXlib2FyZCBjb250cmFjdHMgZm9yIGhlYWRlciwgbGlzdCwgYW5kIHNlYXJjaCBhcmUga2VwdCB0b2dldGhlciBoZXJlIFx1MjAxNCBzcGxpdHRpbmcgdGhlbVxuICAgIC8vIHdvdWxkIHNjYXR0ZXIgcmVsYXRlZCBrZXkgaGFuZGxpbmcgYWNyb3NzIG11bHRpcGxlIG1ldGhvZHMuIElmIHRoaXMgZ3Jvd3Mgc2lnbmlmaWNhbnRseSxcbiAgICAvLyBjb25zaWRlciBicmVha2luZyBvdXQgcGVyLWNvbXBvbmVudCBoYW5kbGVycy5cbiAgICBwcml2YXRlIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IHsgd29yc2VTZWxlY3RFbGVtZW50LCBzZWxlY3RFbGVtZW50LCBkcm9wZG93blBhbmVsRWxlbWVudCwgb3B0aW9uc0xpc3RFbGVtZW50LCBoZWFkZXJFbGVtZW50LCBzZWFyY2hJbnB1dEVsZW1lbnQgfSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCEod29yc2VTZWxlY3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKGRyb3Bkb3duUGFuZWxFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoIShoZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgb25PcHRpb25zQ2xpY2s6IEV2ZW50TGlzdGVuZXIgPSBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBjb25zdCBvcHRpb25FbCA9IHRhcmdldC5jbG9zZXN0KCcud29yc2Utc2VsZWN0LW9wdGlvbicpO1xuICAgICAgICAgICAgaWYgKCEob3B0aW9uRWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgICAgIGlmICghZHJvcGRvd25QYW5lbEVsZW1lbnQuY29udGFpbnMob3B0aW9uRWwpKSByZXR1cm47XG4gICAgICAgICAgICBpZiAob3B0aW9uRWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbiA9IGdldFNlbGVjdE9wdGlvbkVsZW1lbnQob3B0aW9uRWwpO1xuICAgICAgICAgICAgaWYgKCFzZWxlY3RPcHRpb24gfHwgc2VsZWN0T3B0aW9uLmRpc2FibGVkKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlT3B0aW9uKHNlbGVjdE9wdGlvbiwgZmFsc2UpO1xuXG4gICAgICAgICAgICBpZiAoc2VsZWN0RWxlbWVudC5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbi5zZWxlY3RlZCA9ICFzZWxlY3RPcHRpb24uc2VsZWN0ZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5pbmRleE9mKHNlbGVjdE9wdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScsIHsgYnViYmxlczogdHJ1ZSB9KSk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvblNlbGVjdENoYW5nZTogRXZlbnRMaXN0ZW5lciA9ICgpID0+IHRoaXMuc3luY0FsbCgpO1xuICAgICAgICBjb25zdCBvbkhlYWRlckNsaWNrOiBFdmVudExpc3RlbmVyID0gKCkgPT4gdGhpcy50b2dnbGVEcm9wZG93bigpO1xuXG4gICAgICAgIGNvbnN0IG9uSGVhZGVyS2V5RG93bjogRXZlbnRMaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghKGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlVG9Cb3VuZGFyeSgnc3RhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlVG9Cb3VuZGFyeSgnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlVXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnICc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbiA/IHRoaXMuY2xvc2VEcm9wZG93bkFuZEZvY3VzSGVhZGVyKCkgOiB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvbk9wdGlvbnNLZXlEb3duOiBFdmVudExpc3RlbmVyID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdzdGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICcgJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21taXRBY3RpdmVPcHRpb25TZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxlY3RFbGVtZW50Lm11bHRpcGxlKSB0aGlzLmNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvblNlYXJjaEtleURvd246IEV2ZW50TGlzdGVuZXIgPSBldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoIShldmVudCBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZVRvQm91bmRhcnkoJ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlVXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duQW5kRm9jdXNIZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZHJvcGRvd25QYW5lbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbk9wdGlvbnNDbGljayk7XG4gICAgICAgIHNlbGVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25TZWxlY3RDaGFuZ2UpO1xuICAgICAgICBoZWFkZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25IZWFkZXJDbGljayk7XG4gICAgICAgIGhlYWRlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uSGVhZGVyS2V5RG93bik7XG4gICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25PcHRpb25zS2V5RG93bik7XG5cbiAgICAgICAgaWYgKHNlYXJjaElucHV0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHNlYXJjaElucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25TZWFyY2hLZXlEb3duKTtcbiAgICAgICAgICAgIHRoaXMub25TZWFyY2hLZXlEb3duID0gb25TZWFyY2hLZXlEb3duO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbk9wdGlvbnNDbGljayA9IG9uT3B0aW9uc0NsaWNrO1xuICAgICAgICB0aGlzLm9uU2VsZWN0Q2hhbmdlID0gb25TZWxlY3RDaGFuZ2U7XG4gICAgICAgIHRoaXMub25IZWFkZXJDbGljayA9IG9uSGVhZGVyQ2xpY2s7XG4gICAgICAgIHRoaXMub25IZWFkZXJLZXlEb3duID0gb25IZWFkZXJLZXlEb3duO1xuICAgICAgICB0aGlzLm9uT3B0aW9uc0tleURvd24gPSBvbk9wdGlvbnNLZXlEb3duO1xuXG4gICAgICAgIHRoaXMuc3luY0FsbCgpO1xuICAgIH1cblxuICAgIC8vIERPTSBkaWZmaW5nIGlzIGtlcHQgaW5saW5lIGhlcmUgYmVjYXVzZSB0aGUgbXV0YXRpb24gY2FzZXMgYXJlIHRpZ2h0bHkgY291cGxlZCB0byBlYWNoXG4gICAgLy8gb3RoZXIgYW5kIHRoZSBzY3JvbGxlcidzIGNoaWxkIG9yZGVyLiBJZiB0aGlzIGdyb3dzIChlLmcuIG9wdGlvbiBncm91cHMsIHJlb3JkZXJpbmdcbiAgICAvLyBhbmltYXRpb25zKSwgZXh0cmFjdCBpbnRvIGEgZGVkaWNhdGVkIHJlY29uY2lsZXIuXG4gICAgcHJpdmF0ZSBvYnNlcnZlT3B0aW9ucygpIHtcbiAgICAgICAgY29uc3QgeyBzZWxlY3RFbGVtZW50LCBvcHRpb25zTGlzdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25MaXN0ID0+IHtcbiAgICAgICAgICAgIGxldCBzaG91bGRSZWJ1aWxkID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgc2hvdWxkVXBkYXRlU3RhdGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkUmVidWlsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZVN0YXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT09ICdhdHRyaWJ1dGVzJykge1xuICAgICAgICAgICAgICAgICAgICBzaG91bGRVcGRhdGVTdGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2hvdWxkUmVidWlsZCkge1xuICAgICAgICAgICAgICAgIEFycmF5LmZyb20ob3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoY2hpbGQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGlua2VkT3B0aW9uID0gZ2V0U2VsZWN0T3B0aW9uRWxlbWVudChjaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbGlua2VkT3B0aW9uIHx8ICFBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuaW5jbHVkZXMobGlua2VkT3B0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmtlZE9wdGlvbikgdW5saW5rT3B0aW9uKGxpbmtlZE9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShzZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmZvckVhY2goKHNlbGVjdE9wdGlvbiwgb3B0aW9uSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsID0gZ2V0V29yc2VPcHRpb25FbGVtZW50KHNlbGVjdE9wdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsID0gY3JlYXRlV29yc2VPcHRpb25FbGVtZW50KHRoaXMsIHNlbGVjdE9wdGlvbiwgb3B0aW9uSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlua09wdGlvbihzZWxlY3RPcHRpb24sIGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGVsLmlkID0gZ2V0T3B0aW9uSWQodGhpcywgb3B0aW9uSW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRBdEluZGV4ID0gb3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuW29wdGlvbkluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRBdEluZGV4ICE9PSBlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEF0SW5kZXggPyBjdXJyZW50QXRJbmRleC5iZWZvcmUoZWwpIDogb3B0aW9uc0xpc3RFbGVtZW50LmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShvcHRpb25zTGlzdEVsZW1lbnQuY2hpbGRyZW4pLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCAmJiAhZ2V0U2VsZWN0T3B0aW9uRWxlbWVudChjaGlsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRVcGRhdGVTdGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3luY0FsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHNlbGVjdEVsZW1lbnQsIHtcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIHN1YnRyZWU6IGZhbHNlLFxuICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydzdHlsZScsICdjbGFzcycsICdkaXNhYmxlZCcsICdtdWx0aXBsZScsICdzaXplJ11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25PYnNlcnZlciA9IG9ic2VydmVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHNlbGVjdEVsZW1lbnQsIHdvcnNlU2VsZWN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEod29yc2VTZWxlY3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgc2VsZWN0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBzZWxlY3RFbGVtZW50LmFmdGVyKHdvcnNlU2VsZWN0RWxlbWVudCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVUeXBlQWhlYWQgPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICBpZiAoZS5rZXkubGVuZ3RoICE9PSAxIHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50KSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgd29yc2VPcHRpb25zID0gdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQ/LmNoaWxkcmVuO1xuICAgICAgICB0aGlzLnR5cGVBaGVhZFRleHQgKz0gZS5rZXk7XG4gICAgICAgIGxldCB0eXBlQWhlYWRUZXh0ID0gdGhpcy50eXBlQWhlYWRUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKHdvcnNlT3B0aW9ucyAmJiB0eXBlQWhlYWRUZXh0KSB7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGluZ1dvcnNlT3B0aW9uID0gQXJyYXkuZnJvbSh3b3JzZU9wdGlvbnMpLmZpbmQod29yc2VPcHRpb24gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB3b3JzZU9wdGlvbi50ZXh0Q29udGVudC50cmltKCkudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKHR5cGVBaGVhZFRleHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudD8ucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpPy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIG1hdGNoaW5nV29yc2VPcHRpb24/LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hpbmdXb3JzZU9wdGlvbikgbWF0Y2hpbmdXb3JzZU9wdGlvbi5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudHlwZUFoZWFkVGltZXJJZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudHlwZUFoZWFkVGltZXJJZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50eXBlQWhlYWRUaW1lcklkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnR5cGVBaGVhZFRleHQgPSAnJztcbiAgICAgICAgfSwgdGhpcy50eXBlQWhlYWRUaW1lb3V0KTtcbiAgICB9XG59XG5cbi8qKlxuICogRW5oYW5jZXMgZXZlcnkgbmF0aXZlIGA8c2VsZWN0PmAgZWxlbWVudCBpbnNpZGUgdGhlIHByb3ZpZGVkIHJvb3QuXG4gKlxuICogVGhlIGZ1bmN0aW9uIGlzIHNhZmUgdG8gY2FsbCBtdWx0aXBsZSB0aW1lcy4gRWFjaCBgPHNlbGVjdD5gIGlzIG1vdW50ZWQgYXQgbW9zdCBvbmNlLlxuICogSWYgYG9wdGlvbnMub2JzZXJ2ZWAgaXMgdHJ1ZSwgbmV3bHkgYWRkZWQgc2VsZWN0cyB1bmRlciB0aGUgcm9vdCBhcmUgZW5oYW5jZWQgYXV0b21hdGljYWxseS5cbiAqXG4gKiBSZXR1cm5zIGEgY2xlYW51cCBmdW5jdGlvbiB0aGF0IGRpc2Nvbm5lY3RzIHRoZSByb290IG9ic2VydmVyIGFuZCBkZXN0cm95cyBtb3VudGVkIGluc3RhbmNlc1xuICogdW5kZXIgdGhlIHByb3ZpZGVkIHJvb3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3b3JzZVNlbGVjdChyb290OiBSb290Tm9kZSA9IGRvY3VtZW50LCBvcHRpb25zOiBXb3JzZVNlbGVjdE9wdGlvbnMgPSB7fSk6ICgpID0+IHZvaWQge1xuICAgIGNvbnN0IHBsdWdpbnMgPSBvcHRpb25zLnBsdWdpbnMgPz8gW107XG4gICAgbW91bnRTZWxlY3RzSW5Sb290KHJvb3QsIHBsdWdpbnMpO1xuXG4gICAgbGV0IHJvb3RPYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlciB8IHVuZGVmaW5lZDtcblxuICAgIGlmIChvcHRpb25zLm9ic2VydmUpIHtcbiAgICAgICAgcm9vdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25MaXN0ID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25MaXN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgIT09ICdjaGlsZExpc3QnKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIG11dGF0aW9uLmFkZGVkTm9kZXMuZm9yRWFjaChhZGRlZE5vZGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShhZGRlZE5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChhZGRlZE5vZGUgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW91bnRTZWxlY3RFbGVtZW50KGFkZGVkTm9kZSwgcm9vdCwgcGx1Z2lucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBhZGRlZE5vZGUucXVlcnlTZWxlY3RvckFsbDxIVE1MU2VsZWN0RWxlbWVudD4oJ3NlbGVjdCcpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW91bnRTZWxlY3RFbGVtZW50KGVsLCByb290LCBwbHVnaW5zKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvb3RPYnNlcnZlci5vYnNlcnZlKHJvb3QsIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHJvb3RPYnNlcnZlcj8uZGlzY29ubmVjdCgpO1xuXG4gICAgICAgIGdldFNlbGVjdEVsZW1lbnRzSW5Sb290KHJvb3QpLmZvckVhY2goc2VsZWN0RWxlbWVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IGluc3RhbmNlcy5nZXQoc2VsZWN0RWxlbWVudCk7XG4gICAgICAgICAgICBpZiAoIWluc3RhbmNlKSByZXR1cm47XG4gICAgICAgICAgICBpbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgICAgICAgICBpbnN0YW5jZXMuZGVsZXRlKHNlbGVjdEVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBlbnN1cmVTdHlsZXMoKSB7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXdvcnNlLXNlbGVjdC1zdHlsZXM9XCJ0cnVlXCJdJykpIHJldHVybjtcblxuICAgIGNvbnN0IHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS13b3JzZS1zZWxlY3Qtc3R5bGVzJywgJ3RydWUnKTtcbiAgICBzdHlsZUVsZW1lbnQudGV4dENvbnRlbnQgPSBjcmVhdGVDU1MoKTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGdldFNlbGVjdEVsZW1lbnRzSW5Sb290KHJvb3Q6IFJvb3ROb2RlKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20ocm9vdC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxTZWxlY3RFbGVtZW50Pignc2VsZWN0JykpO1xufVxuXG5mdW5jdGlvbiBtb3VudFNlbGVjdHNJblJvb3Qocm9vdDogUm9vdE5vZGUsIHBsdWdpbnM6IFBsdWdpbltdKSB7XG4gICAgZ2V0U2VsZWN0RWxlbWVudHNJblJvb3Qocm9vdCkuZm9yRWFjaChzZWxlY3RFbGVtZW50ID0+IG1vdW50U2VsZWN0RWxlbWVudChzZWxlY3RFbGVtZW50LCByb290LCBwbHVnaW5zKSk7XG59XG5cbmZ1bmN0aW9uIG1vdW50U2VsZWN0RWxlbWVudChzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudCwgcm9vdDogUm9vdE5vZGUsIHBsdWdpbnM6IFBsdWdpbltdKSB7XG4gICAgaWYgKGluc3RhbmNlcy5nZXQoc2VsZWN0RWxlbWVudCkpIHJldHVybjtcblxuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IFdvcnNlU2VsZWN0KHNlbGVjdEVsZW1lbnQsIGdldENvbmZpZyhzZWxlY3RFbGVtZW50KSwgcm9vdCwgcGx1Z2lucyk7XG4gICAgaW5zdGFuY2UubW91bnQoKTtcbiAgICBpbnN0YW5jZXMuc2V0KHNlbGVjdEVsZW1lbnQsIGluc3RhbmNlKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDR08sSUFBTSxpQkFBaUI7QUFBQSxFQUMxQixZQUFZO0FBQUEsRUFDWixrQkFBa0I7QUFBQSxFQUNsQixRQUFRO0FBQUEsRUFDUixPQUFPO0FBQ1g7OztBQ0hPLFNBQVMsWUFBWTtBQUN4QjtBQUFBO0FBQUEsSUFBMkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBa0JSLGVBQWUsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFxQjNCLGVBQWUsS0FBSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtB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