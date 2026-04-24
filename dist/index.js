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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3dvcnNlLXNlbGVjdC9pbnRlcm5hbC10eXBlcy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2Nzcy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2NvbmZpZy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L3NlbGVjdC1oZWxwZXJzLnRzIiwgIi4uL3NyYy93b3JzZS1zZWxlY3Qvb3B0aW9uLW1hcC50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2RvbS50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2ZlYXR1cmVzL3NlYXJjaC50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2NvcmUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTkZJRyA9IHtcbiAgICBzZWFyY2hhYmxlOiBmYWxzZSxcbiAgICBkcm9wZG93bkhlaWdodFB4OiA0MDAsXG4gICAgaGVpZ2h0OiAnMzJweCcsXG4gICAgd2lkdGg6ICcxMDAlJ1xufTtcblxuLy8gTWFwcyBlYWNoIGNvbmZpZyB2YWx1ZSB0byBpdHMgd2lkZW5lZCBwcmltaXRpdmUgdHlwZSAoZS5nLiB0cnVlIFx1MjE5MiBib29sZWFuKSBzbyB0aGF0XG4vLyBTZWxlY3RDb25maWcgYWNjZXB0cyBhbnkgdmFsaWQgdmFsdWUgb2YgdGhhdCB0eXBlLCBub3QganVzdCB0aGUgc3BlY2lmaWMgZGVmYXVsdCBsaXRlcmFsLlxuZXhwb3J0IHR5cGUgV2lkZW48VD4gPSBUIGV4dGVuZHMgYm9vbGVhbiA/IGJvb2xlYW4gOiBUIGV4dGVuZHMgc3RyaW5nID8gc3RyaW5nIDogVCBleHRlbmRzIG51bWJlciA/IG51bWJlciA6IFQ7XG5cbmV4cG9ydCB0eXBlIFNlbGVjdENvbmZpZyA9IHtcbiAgICBbSyBpbiBrZXlvZiB0eXBlb2YgREVGQVVMVF9DT05GSUddOiBXaWRlbjwodHlwZW9mIERFRkFVTFRfQ09ORklHKVtLXT5cbn07XG5cbmV4cG9ydCB0eXBlIENvbmZpZ0tleSA9IGtleW9mIFNlbGVjdENvbmZpZztcbmV4cG9ydCB0eXBlIFJvb3ROb2RlID0gUGFyZW50Tm9kZTtcblxuZXhwb3J0IHR5cGUgUGx1Z2luQ29udGV4dCA9IHtcbiAgICByZWFkb25seSBzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICByZWFkb25seSBoZWFkZXJFbGVtZW50OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICByZWFkb25seSBvcHRpb25zTGlzdEVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xuICAgIHJlYWRvbmx5IHNlYXJjaElucHV0RWxlbWVudD86IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgc2V0TWVzc2FnZSh0ZXh0OiBzdHJpbmcpOiB2b2lkO1xuICAgIGNsZWFyTWVzc2FnZSgpOiB2b2lkO1xuICAgIG9uKHRhcmdldDogRXZlbnRUYXJnZXQsIGV2ZW50OiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIpOiB2b2lkO1xufTtcblxuZXhwb3J0IHR5cGUgUGx1Z2luID0ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBpbml0KGNvbnRleHQ6IFBsdWdpbkNvbnRleHQpOiB2b2lkO1xuICAgIG9uU3luYz8oKTogdm9pZDtcbiAgICBvbk9wZW4/KCk6IHZvaWQ7XG4gICAgb25DbG9zZT8oKTogdm9pZDtcbiAgICBkZXN0cm95PygpOiB2b2lkO1xufTtcblxuZXhwb3J0IHR5cGUgV29yc2VTZWxlY3RPcHRpb25zID0ge1xuICAgIG9ic2VydmU/OiBib29sZWFuO1xuICAgIHBsdWdpbnM/OiBQbHVnaW5bXTtcbn07XG5cbi8vIE1pbmltYWwgaW50ZXJmYWNlIGV4cG9zZWQgdG8gZG9tLnRzIGFuZCBzZWxlY3QtaGVscGVycy50cy4gUmVzdHJpY3RzIHRob3NlIG1vZHVsZXMgdG8gdGhlXG4vLyBwcm9wZXJ0aWVzIHRoZXkgYWN0dWFsbHkgbmVlZCwga2VlcGluZyB0aGUgZnVsbCBXb3JzZVNlbGVjdCBjbGFzcyBpbnRlcm5hbCB0byBjb3JlLnRzLlxuZXhwb3J0IGludGVyZmFjZSBXb3JzZVNlbGVjdENvbnRleHQge1xuICAgIHNlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIGNvbmZpZzogU2VsZWN0Q29uZmlnO1xuICAgIGluc3RhbmNlSWQ6IHN0cmluZztcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQgeyBERUZBVUxUX0NPTkZJRyB9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ1NTKCkge1xuICAgIHJldHVybiAgLyogbGFuZ3VhZ2U9Q1NTICovIGBcbiAgICA6cm9vdCB7XG4gICAgICAgIC0td3MtYm9yZGVyLWNvbG9yOiAjNzY3Njc2O1xuICAgICAgICAtLXdzLWJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgLS13cy1iZzogI2ZmZjtcbiAgICAgICAgLS13cy10ZXh0LWNvbG9yOiBpbmhlcml0O1xuICAgICAgICAtLXdzLWRpc2FibGVkLWJnOiAjZjBmMGYwO1xuICAgICAgICAtLXdzLWRpc2FibGVkLXRleHQtY29sb3I6ICM2ZDZkNmQ7XG4gICAgICAgIC0td3MtaG92ZXItYmc6ICNmMWYxZjE7XG4gICAgICAgIC0td3MtYWN0aXZlLWJnOiAjZWVmNGZmO1xuICAgICAgICAtLXdzLWFjdGl2ZS1vdXRsaW5lOiAjMjU2M2ViO1xuICAgICAgICAtLXdzLXNlbGVjdGVkLWJnOiAjZDJlM2ZjO1xuICAgICAgICAtLXdzLXNlbGVjdGVkLXRleHQtY29sb3I6ICMxNzRlYTY7XG4gICAgICAgIC0td3MtZm9jdXMtb3V0bGluZTogIzI1NjNlYjtcbiAgICAgICAgLS13cy1zZWFyY2gtYm9yZGVyLWNvbG9yOiAjYjdiN2I3O1xuICAgICAgICAtLXdzLWRpdmlkZXItY29sb3I6ICNkMGQwZDA7XG4gICAgICAgIC0td3MtaGlnaGxpZ2h0LWJnOiAjZmZmM2EzO1xuICAgICAgICAtLXdzLXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTYpO1xuICAgICAgICAtLXdzLWhlaWdodDogJHtERUZBVUxUX0NPTkZJRy5oZWlnaHR9O1xuICAgICAgICAtLXdzLW1vdGlvbi1kdXJhdGlvbjogMjAwbXM7XG4gICAgICAgIC0td3MtbW90aW9uLWVhc2U6IGN1YmljLWJlemllcigwLjE2LCAxLCAwLjMsIDEpO1xuICAgIH1cbiAgICBcbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBtaW4td2lkdGg6IDA7XG4gICAgICAgIGZvbnQ6IGluaGVyaXQ7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy10ZXh0LWNvbG9yKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lcjpub3QoLmxpc3Rib3gpIHtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS13cy1oZWlnaHQpO1xuICAgIH1cbiAgICBcbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5saXN0Ym94IHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1oZWFkZXIge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB3aWR0aDogJHtERUZBVUxUX0NPTkZJRy53aWR0aH07XG4gICAgICAgIGhlaWdodDogdmFyKC0td3MtaGVpZ2h0KTtcbiAgICAgICAgcGFkZGluZzogMCAyOHB4IDAgOHB4O1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS13cy1ib3JkZXItY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td3MtYmcpO1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtdGV4dC1jb2xvcik7XG4gICAgICAgIGZvbnQ6IGluaGVyaXQ7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7XG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWhlYWRlcjo6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICByaWdodDogOHB4O1xuICAgICAgICB3aWR0aDogMTBweDtcbiAgICAgICAgaGVpZ2h0OiAxMHB4O1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpIHJvdGF0ZSgwZGVnKTtcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xuICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gdmFyKC0td3MtbW90aW9uLWR1cmF0aW9uKSB2YXIoLS13cy1tb3Rpb24tZWFzZSk7XG4gICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiAxMHB4IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTInIGhlaWdodD0nMTInIHZpZXdCb3g9JzAgMCAxMiAxMicgZmlsbD0nbm9uZSclM0UlM0NwYXRoIGQ9J00zIDQuNUw2IDcuNUw5IDQuNScgc3Ryb2tlPSclMjMzMzMzMzMnIHN0cm9rZS13aWR0aD0nMS4xJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLyUzRSUzQy9zdmclM0VcIik7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIub3BlbiAud29yc2Utc2VsZWN0LWhlYWRlcjo6YWZ0ZXIge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSkgcm90YXRlKDE4MGRlZyk7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIubGlzdGJveCAud29yc2Utc2VsZWN0LWhlYWRlciB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIuZGlzYWJsZWQgLndvcnNlLXNlbGVjdC1oZWFkZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13cy1kaXNhYmxlZC1iZyk7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy1kaXNhYmxlZC10ZXh0LWNvbG9yKTtcbiAgICAgICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXI6Zm9jdXMtdmlzaWJsZSB7XG4gICAgICAgIG91dGxpbmU6IG5vbmUgIWltcG9ydGFudDtcbiAgICB9XG4gICAgXG4gICAgLndvcnNlLXNlbGVjdC1oZWFkZXI6Zm9jdXMtdmlzaWJsZSxcbiAgICAud29yc2Utc2VsZWN0LXNlYXJjaC1pbnB1dDpmb2N1cy12aXNpYmxlIHtcbiAgICAgICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXdzLWZvY3VzLW91dGxpbmUpICFpbXBvcnRhbnQ7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAxcHg7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IGNhbGMoMTAwJSArIDJweCk7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICB6LWluZGV4OiAxMDAwO1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02cHgpO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS13cy1ib3JkZXItY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3MtYmcpO1xuICAgICAgICBib3gtc2hhZG93OiB2YXIoLS13cy1zaGFkb3cpO1xuICAgICAgICBwYWRkaW5nOiAycHg7XG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IHRvcCBjZW50ZXI7XG4gICAgICAgIHRyYW5zaXRpb246XG4gICAgICAgICAgICBkaXNwbGF5IHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgYWxsb3ctZGlzY3JldGUsXG4gICAgICAgICAgICBvcGFjaXR5IHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgdmFyKC0td3MtbW90aW9uLWVhc2UpLFxuICAgICAgICAgICAgdHJhbnNmb3JtIHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgdmFyKC0td3MtbW90aW9uLWVhc2UpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLm9wZW4gLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gICAgICAgIHRyYW5zaXRpb246XG4gICAgICAgICAgICBkaXNwbGF5IHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgYWxsb3ctZGlzY3JldGUsXG4gICAgICAgICAgICBvcGFjaXR5IHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgdmFyKC0td3MtbW90aW9uLWVhc2UpLFxuICAgICAgICAgICAgdHJhbnNmb3JtIHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgdmFyKC0td3MtbW90aW9uLWVhc2UpO1xuICAgIH1cblxuICAgIEBzdGFydGluZy1zdHlsZSB7XG4gICAgICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLm9wZW4gLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTZweCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5saXN0Ym94IC53b3JzZS1zZWxlY3Qtb3B0aW9ucyB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICByaWdodDogYXV0bztcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICAgICAgICB0cmFuc2Zvcm06IG5vbmU7XG4gICAgICAgIHRyYW5zaXRpb246IG5vbmU7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1zZWFyY2gge1xuICAgICAgICBwYWRkaW5nOiA0cHg7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS13cy1kaXZpZGVyLWNvbG9yKTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMnB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtc2VhcmNoLWlucHV0IHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMzJweDtcbiAgICAgICAgcGFkZGluZzogMCA4cHg7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXdzLXNlYXJjaC1ib3JkZXItY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgZm9udDogaW5oZXJpdDtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXRleHQtY29sb3IpO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1iZyk7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXI6bm90KC5saXN0Ym94KSAud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXIge1xuICAgICAgICBtYXgtaGVpZ2h0OiAke0RFRkFVTFRfQ09ORklHLmRyb3Bkb3duSGVpZ2h0UHh9cHg7XG4gICAgfVxuICAgIFxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9ucy1zY3JvbGxlciB7XG4gICAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb24ge1xuICAgICAgICBwYWRkaW5nOiA0cHggOHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXRleHQtY29sb3IpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3MtaG92ZXItYmcpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLmFjdGl2ZSB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWFjdGl2ZS1iZyk7XG4gICAgICAgIG91dGxpbmU6IDFweCBzb2xpZCB2YXIoLS13cy1hY3RpdmUtb3V0bGluZSk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAtMXB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLnNlbGVjdGVkIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3Mtc2VsZWN0ZWQtYmcpO1xuICAgICAgICBjb2xvcjogdmFyKC0td3Mtc2VsZWN0ZWQtdGV4dC1jb2xvcik7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb24uc2VsZWN0ZWQuYWN0aXZlIHtcbiAgICAgICAgb3V0bGluZTogMXB4IHNvbGlkIHZhcigtLXdzLWFjdGl2ZS1vdXRsaW5lKTtcbiAgICAgICAgb3V0bGluZS1vZmZzZXQ6IC0xcHg7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb24uZGlzYWJsZWQge1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtZGlzYWJsZWQtdGV4dC1jb2xvcik7XG4gICAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWRpc2FibGVkLWJnKTtcbiAgICB9XG5cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLmhpZGRlbiB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuXG4gICAgLm1hdGNoZXMge1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1oaWdobGlnaHQtYmcpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtdmlzdWFsbHktaGlkZGVuIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogMXB4O1xuICAgICAgICBoZWlnaHQ6IDFweDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgbWFyZ2luOiAtMXB4O1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBjbGlwOiByZWN0KDAsIDAsIDAsIDApO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBib3JkZXI6IDA7XG4gICAgfVxuXG4gICAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgICAgICAgLndvcnNlLXNlbGVjdC1oZWFkZXI6OmFmdGVyLFxuICAgICAgICAud29yc2Utc2VsZWN0LW9wdGlvbnMge1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogbm9uZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBgO1xufVxuIiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmltcG9ydCB7Q29uZmlnS2V5LCBERUZBVUxUX0NPTkZJRywgU2VsZWN0Q29uZmlnfSBmcm9tIFwiLi9pbnRlcm5hbC10eXBlc1wiO1xuXG5jb25zdCBjb25maWdLZXlzID0gT2JqZWN0LmtleXMoREVGQVVMVF9DT05GSUcpIGFzIENvbmZpZ0tleVtdO1xuXG5mdW5jdGlvbiB0b0tlYmFiQ2FzZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1tBLVpdL2csIGNoYXJhY3RlciA9PiBgLSR7Y2hhcmFjdGVyLnRvTG93ZXJDYXNlKCl9YCk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQ29uZmlnVmFsdWU8SyBleHRlbmRzIENvbmZpZ0tleT4oa2V5OiBLLCBhdHRyOiBzdHJpbmcpOiBTZWxlY3RDb25maWdbS10ge1xuICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IERFRkFVTFRfQ09ORklHW2tleV07XG5cbiAgICBpZiAodHlwZW9mIGRlZmF1bHRWYWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHJldHVybiAoYXR0ciA9PT0gJ3RydWUnKSBhcyBTZWxlY3RDb25maWdbS107XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkZWZhdWx0VmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIoYXR0cikgYXMgU2VsZWN0Q29uZmlnW0tdO1xuICAgIH1cblxuICAgIHJldHVybiBhdHRyIGFzIFNlbGVjdENvbmZpZ1tLXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbmZpZyhzZWxlY3RFbGVtZW50OiBFbGVtZW50KTogU2VsZWN0Q29uZmlnIHtcbiAgICBjb25zdCBjb25maWc6IFNlbGVjdENvbmZpZyA9IHsgLi4uREVGQVVMVF9DT05GSUcgfTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZmlnS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBrZXkgPSBjb25maWdLZXlzW2ldO1xuICAgICAgICBjb25zdCBkYXRhQXR0cmlidXRlTmFtZSA9IGBkYXRhLSR7dG9LZWJhYkNhc2Uoa2V5KX1gO1xuICAgICAgICBjb25zdCBhdHRyID0gc2VsZWN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoZGF0YUF0dHJpYnV0ZU5hbWUpO1xuXG4gICAgICAgIGlmIChhdHRyID09PSBudWxsKSBjb250aW51ZTtcblxuICAgICAgICAoY29uZmlnIGFzIFJlY29yZDxDb25maWdLZXksIHN0cmluZyB8IGJvb2xlYW4gfCBudW1iZXI+KVtrZXldID0gcGFyc2VDb25maWdWYWx1ZShrZXksIGF0dHIpO1xuICAgIH1cblxuICAgIHJldHVybiBjb25maWc7XG59IiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmltcG9ydCB7V29yc2VTZWxlY3RDb250ZXh0fSBmcm9tIFwiLi9pbnRlcm5hbC10eXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkVXNlTGlzdGJveE1vZGUod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgcmV0dXJuIHdvcnNlU2VsZWN0SW5zdGFuY2Uuc2VsZWN0RWxlbWVudC5zaXplID4gMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTXVsdGlwbGVTZWxlY3Qod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgcmV0dXJuIHdvcnNlU2VsZWN0SW5zdGFuY2Uuc2VsZWN0RWxlbWVudC5tdWx0aXBsZTtcbn1cblxuLy8gTWF0Y2hlcyB0aGUgY29udmVudGlvbmFsIEhUTUwgcGxhY2Vob2xkZXIgcGF0dGVybjogPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkPkxhYmVsPC9vcHRpb24+LlxuLy8gT3B0aW9ucyB0aGF0IGFyZSBub3QgZGlzYWJsZWQgb3IgaGF2ZSBhIG5vbi1lbXB0eSB2YWx1ZSBhcmUgdHJlYXRlZCBhcyBzZWxlY3RhYmxlLlxuZXhwb3J0IGZ1bmN0aW9uIGlzUGxhY2Vob2xkZXJPcHRpb24oc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCB8IG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gc2VsZWN0T3B0aW9uICE9PSBudWxsICYmIHNlbGVjdE9wdGlvbi52YWx1ZSA9PT0gJycgJiYgc2VsZWN0T3B0aW9uLmRpc2FibGVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGlzdEJveEhlaWdodChzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudCwgd29yc2VPcHRpb25FbGVtZW50OiBIVE1MRGl2RWxlbWVudCk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmIChzZWxlY3RFbGVtZW50LnNpemUgPD0gMSkgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBvbmVSb3dIZWlnaHQgPSB3b3JzZU9wdGlvbkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgIGNvbnN0IHRvdGFsSGVpZ2h0ID0gb25lUm93SGVpZ2h0ICogc2VsZWN0RWxlbWVudC5zaXplO1xuXG4gICAgY29uc3Qgc2VsZWN0UGFyZW50SGVpZ2h0ID0gc2VsZWN0RWxlbWVudC5wYXJlbnRFbGVtZW50Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgPz8gMTAwMDA7XG4gICAgcmV0dXJuIE1hdGgubWluKHRvdGFsSGVpZ2h0LCBzZWxlY3RQYXJlbnRIZWlnaHQpICsgJ3B4Jztcbn0iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuLy8gVHdvIFdlYWtNYXBzIG1haW50YWluIGEgYmlkaXJlY3Rpb25hbCBsaW5rIGJldHdlZW4gbmF0aXZlIDxvcHRpb24+IGVsZW1lbnRzIGFuZCB0aGVpclxuLy8gcmVuZGVyZWQgd2lkZ2V0IGRpdnMuIFdlYWtNYXAga2V5cyBhbGxvdyBHQyB0byByZWNsYWltIGVsZW1lbnRzIHJlbW92ZWQgZnJvbSB0aGUgRE9NXG4vLyB3aXRob3V0IHJlcXVpcmluZyBleHBsaWNpdCBjbGVhbnVwIG9uIGV2ZXJ5IHJlbW92YWwgcGF0aC5cbmNvbnN0IG9wdGlvblRvRGl2ID0gbmV3IFdlYWtNYXA8SFRNTE9wdGlvbkVsZW1lbnQsIEhUTUxEaXZFbGVtZW50PigpO1xuY29uc3QgZGl2VG9PcHRpb24gPSBuZXcgV2Vha01hcDxIVE1MRGl2RWxlbWVudCwgSFRNTE9wdGlvbkVsZW1lbnQ+KCk7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmtPcHRpb24oc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCwgd29yc2VPcHRpb25FbGVtZW50OiBIVE1MRGl2RWxlbWVudCkge1xuICAgIG9wdGlvblRvRGl2LnNldChzZWxlY3RPcHRpb24sIHdvcnNlT3B0aW9uRWxlbWVudCk7XG4gICAgZGl2VG9PcHRpb24uc2V0KHdvcnNlT3B0aW9uRWxlbWVudCwgc2VsZWN0T3B0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVubGlua09wdGlvbihzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50KSB7XG4gICAgY29uc3Qgd29yc2VPcHRpb25FbGVtZW50ID0gb3B0aW9uVG9EaXYuZ2V0KHNlbGVjdE9wdGlvbik7XG4gICAgaWYgKCF3b3JzZU9wdGlvbkVsZW1lbnQpIHJldHVybjtcblxuICAgIG9wdGlvblRvRGl2LmRlbGV0ZShzZWxlY3RPcHRpb24pO1xuICAgIGRpdlRvT3B0aW9uLmRlbGV0ZSh3b3JzZU9wdGlvbkVsZW1lbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V29yc2VPcHRpb25FbGVtZW50KHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQpIHtcbiAgICByZXR1cm4gb3B0aW9uVG9EaXYuZ2V0KHNlbGVjdE9wdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZWxlY3RPcHRpb25FbGVtZW50KHdvcnNlT3B0aW9uRWxlbWVudDogSFRNTERpdkVsZW1lbnQpIHtcbiAgICByZXR1cm4gZGl2VG9PcHRpb24uZ2V0KHdvcnNlT3B0aW9uRWxlbWVudCk7XG59IiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmltcG9ydCB7IERFRkFVTFRfQ09ORklHLCBXb3JzZVNlbGVjdENvbnRleHQgfSBmcm9tICcuL2ludGVybmFsLXR5cGVzJztcbmltcG9ydCB7IGlzTXVsdGlwbGVTZWxlY3QsIHNob3VsZFVzZUxpc3Rib3hNb2RlIH0gZnJvbSAnLi9zZWxlY3QtaGVscGVycyc7XG5pbXBvcnQgeyBnZXRXb3JzZU9wdGlvbkVsZW1lbnQsIGxpbmtPcHRpb24gfSBmcm9tICcuL29wdGlvbi1tYXAnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsT3B0aW9uSW50b1ZpZXcoc2VsZWN0T3B0aW9uPzogSFRNTE9wdGlvbkVsZW1lbnQpIHtcbiAgICBpZiAoIXNlbGVjdE9wdGlvbikgcmV0dXJuO1xuICAgIGNvbnN0IGVsID0gZ2V0V29yc2VPcHRpb25FbGVtZW50KHNlbGVjdE9wdGlvbik7XG4gICAgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICBlbC5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcgfSk7XG59XG5cblxuZnVuY3Rpb24gYnVpbGRTdHlsZUF0dHJpYnV0ZShzdHlsZVBhcnRzOiBzdHJpbmdbXSkge1xuICAgIHJldHVybiBzdHlsZVBhcnRzLmxlbmd0aCA+IDAgPyBgIHN0eWxlPVwiJHtzdHlsZVBhcnRzLmpvaW4oJyAnKX1cImAgOiAnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkV29yc2VTZWxlY3RIZWFkZXJTdHlsZUF0dHJpYnV0ZSh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQpIHtcbiAgICBjb25zdCBoZWFkZXJTdHlsZVBhcnRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgaWYgKHdvcnNlU2VsZWN0SW5zdGFuY2UuY29uZmlnLndpZHRoICE9PSBERUZBVUxUX0NPTkZJRy53aWR0aCkge1xuICAgICAgICBoZWFkZXJTdHlsZVBhcnRzLnB1c2goYHdpZHRoOiAke3dvcnNlU2VsZWN0SW5zdGFuY2UuY29uZmlnLndpZHRofTtgKTtcbiAgICB9XG5cbiAgICBpZiAod29yc2VTZWxlY3RJbnN0YW5jZS5jb25maWcuaGVpZ2h0ICE9PSBERUZBVUxUX0NPTkZJRy5oZWlnaHQpIHtcbiAgICAgICAgaGVhZGVyU3R5bGVQYXJ0cy5wdXNoKGBoZWlnaHQ6ICR7d29yc2VTZWxlY3RJbnN0YW5jZS5jb25maWcuaGVpZ2h0fTtgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVpbGRTdHlsZUF0dHJpYnV0ZShoZWFkZXJTdHlsZVBhcnRzKTtcbn1cblxuXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgLnJlcGxhY2UoLyYvZywgJyZhbXA7JylcbiAgICAgICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgICAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAgICAgLnJlcGxhY2UoLycvZywgJyYjMzk7Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRPcHRpb25JZCh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQsIG9wdGlvbkluZGV4OiBudW1iZXIpIHtcbiAgICByZXR1cm4gYCR7d29yc2VTZWxlY3RJbnN0YW5jZS5pbnN0YW5jZUlkfS1vcHRpb24tJHtvcHRpb25JbmRleH1gO1xufVxuXG5mdW5jdGlvbiBnZXRXb3JzZU9wdGlvbkNsYXNzZXMoc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBbJ3dvcnNlLXNlbGVjdC1vcHRpb24nXTtcblxuICAgIGlmIChzZWxlY3RPcHRpb24uZGlzYWJsZWQpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKCdkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RPcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKCdzZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcnNlT3B0aW9uSHRtbChcbiAgICB3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQsXG4gICAgc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCxcbiAgICBvcHRpb25JbmRleDogbnVtYmVyLFxuKSB7XG4gICAgY29uc3Qgd29yc2VPcHRpb25DbGFzc2VzID0gZ2V0V29yc2VPcHRpb25DbGFzc2VzKHNlbGVjdE9wdGlvbik7XG4gICAgY29uc3Qgb3B0aW9uVGV4dCA9IHNlbGVjdE9wdGlvbi50ZXh0Q29udGVudCA/PyAnJztcblxuICAgIHJldHVybiBgXG4gICAgPGRpdiBpZD1cIiR7Z2V0T3B0aW9uSWQod29yc2VTZWxlY3RJbnN0YW5jZSwgb3B0aW9uSW5kZXgpfVwiXG4gICAgICAgICBjbGFzcz1cIiR7d29yc2VPcHRpb25DbGFzc2VzfVwiXG4gICAgICAgICBkYXRhLXZhbHVlPVwiJHtlc2NhcGVIdG1sKHNlbGVjdE9wdGlvbi52YWx1ZSl9XCJcbiAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgYXJpYS1zZWxlY3RlZD1cIiR7c2VsZWN0T3B0aW9uLnNlbGVjdGVkID8gJ3RydWUnIDogJ2ZhbHNlJ31cIlxuICAgICAgICAgYXJpYS1kaXNhYmxlZD1cIiR7c2VsZWN0T3B0aW9uLmRpc2FibGVkID8gJ3RydWUnIDogJ2ZhbHNlJ31cIj5cbiAgICAgICR7ZXNjYXBlSHRtbChvcHRpb25UZXh0KX1cbiAgICA8L2Rpdj5cbiAgICBgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29yc2VPcHRpb25FbGVtZW50KFxuICAgIHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCxcbiAgICBzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50LFxuICAgIG9wdGlvbkluZGV4OiBudW1iZXIsXG4pIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoXG4gICAgICAgIGNyZWF0ZVdvcnNlT3B0aW9uSHRtbCh3b3JzZVNlbGVjdEluc3RhbmNlLCBzZWxlY3RPcHRpb24sIG9wdGlvbkluZGV4KVxuICAgICkuZmlyc3RFbGVtZW50Q2hpbGQgYXMgSFRNTERpdkVsZW1lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWFyY2hIdG1sKHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCkge1xuICAgIGlmICghd29yc2VTZWxlY3RJbnN0YW5jZS5jb25maWcuc2VhcmNoYWJsZSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGBcbiAgICA8ZGl2IGNsYXNzPVwid29yc2Utc2VsZWN0LXNlYXJjaFwiPlxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICBjbGFzcz1cIndvcnNlLXNlbGVjdC1zZWFyY2gtaW5wdXRcIlxuICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGxpc3RcIlxuICAgICAgICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gICAgICAgICAgICAgYXJpYS1sYWJlbD1cIlNlYXJjaCBvcHRpb25zXCIgLz5cbiAgICA8L2Rpdj5cbiAgICBgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWVzc2FnZUh0bWwoKSB7XG4gICAgcmV0dXJuIGBcbiAgICA8ZGl2IGNsYXNzPVwid29yc2Utc2VsZWN0LW1lc3NhZ2Ugd29yc2Utc2VsZWN0LXZpc3VhbGx5LWhpZGRlblwiXG4gICAgICAgICByb2xlPVwic3RhdHVzXCJcbiAgICAgICAgIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXG4gICAgICAgICBhcmlhLWF0b21pYz1cInRydWVcIj48L2Rpdj5cbiAgICBgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29yc2VTZWxlY3Qod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgY29uc3QgaGVhZGVyU3R5bGVBdHRyaWJ1dGUgPSBidWlsZFdvcnNlU2VsZWN0SGVhZGVyU3R5bGVBdHRyaWJ1dGUod29yc2VTZWxlY3RJbnN0YW5jZSk7XG4gICAgY29uc3QgY29udGFpbmVyQ2xhc3NlcyA9IFsnd29yc2Utc2VsZWN0LWNvbnRhaW5lciddO1xuXG4gICAgaWYgKHNob3VsZFVzZUxpc3Rib3hNb2RlKHdvcnNlU2VsZWN0SW5zdGFuY2UpKSB7XG4gICAgICAgIGNvbnRhaW5lckNsYXNzZXMucHVzaCgnbGlzdGJveCcpO1xuICAgIH1cblxuICAgIGlmIChpc011bHRpcGxlU2VsZWN0KHdvcnNlU2VsZWN0SW5zdGFuY2UpKSB7XG4gICAgICAgIGNvbnRhaW5lckNsYXNzZXMucHVzaCgnbXVsdGlwbGUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBodG1sU3RyaW5nID0gYFxuICAgIDxkaXYgY2xhc3M9XCIke2NvbnRhaW5lckNsYXNzZXMuam9pbignICcpfVwiPlxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3M9XCJ3b3JzZS1zZWxlY3QtaGVhZGVyXCJcbiAgICAgICAgYXJpYS1oYXNwb3B1cD1cImxpc3Rib3hcIlxuICAgICAgICBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ3b3JzZS1zZWxlY3QtaGVhZGVyLWxhYmVsXCI+PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8ZGl2IGNsYXNzPVwid29yc2Utc2VsZWN0LW9wdGlvbnNcIj5cbiAgICAgICAgJHtjcmVhdGVTZWFyY2hIdG1sKHdvcnNlU2VsZWN0SW5zdGFuY2UpfVxuICAgICAgICAke2NyZWF0ZU1lc3NhZ2VIdG1sKCl9XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3b3JzZS1zZWxlY3Qtb3B0aW9ucy1zY3JvbGxlclwiJHtoZWFkZXJTdHlsZUF0dHJpYnV0ZX0+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgY29uc3Qgd29yc2VTZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoXG4gICAgICAgIGh0bWxTdHJpbmdcbiAgICApLmZpcnN0RWxlbWVudENoaWxkIGFzIEhUTUxEaXZFbGVtZW50O1xuXG4gICAgY29uc3Qgb3B0aW9uc0xpc3RFbGVtZW50ID0gd29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3Qtb3B0aW9ucy1zY3JvbGxlcicpIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgIG9wdGlvbnNMaXN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbGlzdGJveCcpO1xuICAgIG9wdGlvbnNMaXN0RWxlbWVudC50YWJJbmRleCA9IHNob3VsZFVzZUxpc3Rib3hNb2RlKHdvcnNlU2VsZWN0SW5zdGFuY2UpID8gMCA6IC0xO1xuXG4gICAgaWYgKGlzTXVsdGlwbGVTZWxlY3Qod29yc2VTZWxlY3RJbnN0YW5jZSkpIHtcbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1tdWx0aXNlbGVjdGFibGUnLCAndHJ1ZScpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBBcnJheS5mcm9tKHdvcnNlU2VsZWN0SW5zdGFuY2Uuc2VsZWN0RWxlbWVudC5vcHRpb25zKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0T3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzZWxlY3RPcHRpb24gPSBzZWxlY3RPcHRpb25zW2ldO1xuICAgICAgICBjb25zdCB3b3JzZU9wdGlvbkVsZW1lbnQgPSBjcmVhdGVXb3JzZU9wdGlvbkVsZW1lbnQoXG4gICAgICAgICAgICB3b3JzZVNlbGVjdEluc3RhbmNlLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9uLFxuICAgICAgICAgICAgaVxuICAgICAgICApO1xuICAgICAgICBsaW5rT3B0aW9uKHNlbGVjdE9wdGlvbiwgd29yc2VPcHRpb25FbGVtZW50KTtcbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmFwcGVuZENoaWxkKHdvcnNlT3B0aW9uRWxlbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdvcnNlU2VsZWN0RWxlbWVudDtcbn0iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHR5cGUgeyBQbHVnaW4sIFBsdWdpbkNvbnRleHQgfSBmcm9tICcuLi9pbnRlcm5hbC10eXBlcyc7XG5pbXBvcnQgeyBnZXRXb3JzZU9wdGlvbkVsZW1lbnQgfSBmcm9tICcuLi9vcHRpb24tbWFwJztcblxuZnVuY3Rpb24gYXBwbHlIaWdobGlnaHQoY29udGV4dDogUGx1Z2luQ29udGV4dCwgc2VhcmNoVGVybTogc3RyaW5nKSB7XG4gICAgY29uc3QgdGVybSA9IHNlYXJjaFRlcm0udHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBBcnJheS5mcm9tKGNvbnRleHQub3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKHdvcnNlT3B0aW9uID0+IHtcbiAgICAgICAgaWYgKCEod29yc2VPcHRpb24gaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRlcm0gIT09ICcnICYmIHdvcnNlT3B0aW9uLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModGVybSk7XG4gICAgICAgIHdvcnNlT3B0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ21hdGNoZXMnLCBtYXRjaGVzKTtcbiAgICB9KTtcblxuICAgIGlmICghdGVybSkge1xuICAgICAgICBjb250ZXh0LmNsZWFyTWVzc2FnZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWF0Y2hDb3VudCA9IGNvbnRleHQub3B0aW9uc0xpc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JzZS1zZWxlY3Qtb3B0aW9uLm1hdGNoZXMnKS5sZW5ndGg7XG4gICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAgIG1hdGNoQ291bnQgPT09IDAgPyAnTm8gcmVzdWx0cyBmb3VuZCcgOlxuICAgICAgICBtYXRjaENvdW50ID09PSAxID8gJzEgcmVzdWx0IGF2YWlsYWJsZScgOlxuICAgICAgICBgJHttYXRjaENvdW50fSByZXN1bHRzIGF2YWlsYWJsZWA7XG5cbiAgICBjb250ZXh0LnNldE1lc3NhZ2UobWVzc2FnZSk7XG5cbiAgICBjb25zdCBmaXJzdE1hdGNoID0gY29udGV4dC5vcHRpb25zTGlzdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1vcHRpb24ubWF0Y2hlcycpO1xuICAgIGlmIChmaXJzdE1hdGNoIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpIHtcbiAgICAgICAgZmlyc3RNYXRjaC5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQnVpbHRpblNlYXJjaFBsdWdpbigpOiBQbHVnaW4ge1xuICAgIGxldCBzZWFyY2hUZXJtID0gJyc7XG4gICAgbGV0IHBsdWdpbkNvbnRleHQ6IFBsdWdpbkNvbnRleHQgfCBudWxsID0gbnVsbDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdzZWFyY2gnLFxuXG4gICAgICAgIGluaXQoY29udGV4dDogUGx1Z2luQ29udGV4dCkge1xuICAgICAgICAgICAgcGx1Z2luQ29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgICAgICBjb25zdCB7IHNlYXJjaElucHV0RWxlbWVudCB9ID0gY29udGV4dDtcbiAgICAgICAgICAgIGlmICghc2VhcmNoSW5wdXRFbGVtZW50KSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnRleHQub24oc2VhcmNoSW5wdXRFbGVtZW50LCAnaW5wdXQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgICAgICAgICBzZWFyY2hUZXJtID0gdGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGFwcGx5SGlnaGxpZ2h0KGNvbnRleHQsIHNlYXJjaFRlcm0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25TeW5jKCkge1xuICAgICAgICAgICAgaWYgKCFwbHVnaW5Db250ZXh0KSByZXR1cm47XG4gICAgICAgICAgICBhcHBseUhpZ2hsaWdodChwbHVnaW5Db250ZXh0LCBzZWFyY2hUZXJtKTtcbiAgICAgICAgfSxcblxuICAgICAgICBvbkNsb3NlKCkge1xuICAgICAgICAgICAgaWYgKCFwbHVnaW5Db250ZXh0KSByZXR1cm47XG4gICAgICAgICAgICBzZWFyY2hUZXJtID0gJyc7XG4gICAgICAgICAgICBjb25zdCB7IHNlYXJjaElucHV0RWxlbWVudCB9ID0gcGx1Z2luQ29udGV4dDtcbiAgICAgICAgICAgIGlmIChzZWFyY2hJbnB1dEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoSW5wdXRFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhcHBseUhpZ2hsaWdodChwbHVnaW5Db250ZXh0LCAnJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVzdHJveSgpIHtcbiAgICAgICAgICAgIHBsdWdpbkNvbnRleHQgPSBudWxsO1xuICAgICAgICAgICAgc2VhcmNoVGVybSA9ICcnO1xuICAgICAgICB9LFxuICAgIH07XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHR5cGUge1dvcnNlU2VsZWN0Q29udGV4dH0gZnJvbSAnLi9pbnRlcm5hbC10eXBlcyc7XG4vKipcbiAqIFByb2dyZXNzaXZlLWVuaGFuY2VtZW50IHV0aWxpdGllcyBmb3IgbmF0aXZlIHtAbGluayBIVE1MU2VsZWN0RWxlbWVudH0gY29udHJvbHMuXG4gKlxuICogS2VlcHMgdGhlIG5hdGl2ZSBgPHNlbGVjdD5gIGFzIHNvdXJjZSBvZiB0cnV0aCBmb3IgdmFsdWUsIGRpc2FibGVkIHN0YXRlLCBgc2l6ZWAsIGFuZFxuICogYG11bHRpcGxlYCwgd2hpbGUgbWlycm9yaW5nIHRoYXQgc3RhdGUgaW50byBhIGN1c3RvbSBET00gc3RydWN0dXJlIHRoYXQgaXMgZWFzaWVyIHRvIHN0eWxlLlxuICpcbiAqIFdpZGdldC1zcGVjaWZpYyBiZWhhdmlvciB1c2VzIGBkYXRhLSpgIGF0dHJpYnV0ZXMgc3VjaCBhcyBgZGF0YS1zZWFyY2hhYmxlYCBhbmRcbiAqIGBkYXRhLWRyb3Bkb3duLWhlaWdodC1weGAsIGtlZXBpbmcgdGhlIHB1YmxpYyBBUEkgYWxpZ25lZCB3aXRoIHN0YW5kYXJkIEhUTUwuXG4gKi9cbmltcG9ydCB7REVGQVVMVF9DT05GSUcsIFBsdWdpbiwgUGx1Z2luQ29udGV4dCwgUm9vdE5vZGUsIFNlbGVjdENvbmZpZywgV29yc2VTZWxlY3RPcHRpb25zfSBmcm9tICcuL2ludGVybmFsLXR5cGVzJztcbmltcG9ydCB7Y3JlYXRlQ1NTfSBmcm9tICcuL2Nzcyc7XG5pbXBvcnQge2dldENvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtjcmVhdGVXb3JzZU9wdGlvbkVsZW1lbnQsIGNyZWF0ZVdvcnNlU2VsZWN0LCBnZXRPcHRpb25JZCwgc2Nyb2xsT3B0aW9uSW50b1ZpZXd9IGZyb20gJy4vZG9tJztcbmltcG9ydCB7Z2V0U2VsZWN0T3B0aW9uRWxlbWVudCwgZ2V0V29yc2VPcHRpb25FbGVtZW50LCBsaW5rT3B0aW9uLCB1bmxpbmtPcHRpb259IGZyb20gJy4vb3B0aW9uLW1hcCc7XG5pbXBvcnQge2dldExpc3RCb3hIZWlnaHQsIGlzTXVsdGlwbGVTZWxlY3QsIGlzUGxhY2Vob2xkZXJPcHRpb24sIHNob3VsZFVzZUxpc3Rib3hNb2RlfSBmcm9tICcuL3NlbGVjdC1oZWxwZXJzJztcbmltcG9ydCB7Y3JlYXRlQnVpbHRpblNlYXJjaFBsdWdpbn0gZnJvbSAnLi9mZWF0dXJlcy9zZWFyY2gnO1xuXG5jb25zdCBpbnN0YW5jZXMgPSBuZXcgV2Vha01hcDxIVE1MU2VsZWN0RWxlbWVudCwgV29yc2VTZWxlY3Q+KCk7XG5sZXQgbmV4dEluc3RhbmNlSWQgPSAwO1xuXG50eXBlIFBsdWdpbkxpc3RlbmVyID0geyB0YXJnZXQ6IEV2ZW50VGFyZ2V0OyBldmVudDogc3RyaW5nOyBoYW5kbGVyOiBFdmVudExpc3RlbmVyIH07XG5cbmNsYXNzIFdvcnNlU2VsZWN0IGltcGxlbWVudHMgV29yc2VTZWxlY3RDb250ZXh0IHtcbiAgICAvLyBUcmFja3MgYWxsIG1vdW50ZWQgaW5zdGFuY2VzIHNvIGEgc2luZ2xlIGRvY3VtZW50LWxldmVsIHBvaW50ZXJkb3duIGxpc3RlbmVyIGNhbiBjbG9zZSBhbnlcbiAgICAvLyBvcGVuIGRyb3Bkb3duIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG91dHNpZGUsIGluc3RlYWQgb2YgcmVnaXN0ZXJpbmcgb25lIGxpc3RlbmVyIHBlciBpbnN0YW5jZS5cbiAgICAvLyBOb3RlOiBgcHJpdmF0ZWAgaXMgYSBUeXBlU2NyaXB0LW9ubHkgY29uc3RyYWludCBhbmQgaXMgbm90IGVuZm9yY2VkIGluIHRoZSBjb21waWxlZCBvdXRwdXQuXG4gICAgcHJpdmF0ZSBzdGF0aWMgbW91bnRlZEluc3RhbmNlcyA9IG5ldyBTZXQ8V29yc2VTZWxlY3Q+KCk7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBoYW5kbGVEb2N1bWVudFBvaW50ZXJEb3duKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIE5vZGUpKSByZXR1cm47XG4gICAgICAgIGZvciAoY29uc3QgaW5zdGFuY2Ugb2YgV29yc2VTZWxlY3QubW91bnRlZEluc3RhbmNlcykge1xuICAgICAgICAgICAgaWYgKGluc3RhbmNlLndvcnNlU2VsZWN0RWxlbWVudCAmJiAhaW5zdGFuY2Uud29yc2VTZWxlY3RFbGVtZW50LmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5jbG9zZURyb3Bkb3duKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHR5cGVBaGVhZFRpbWVySWQ/OiBudW1iZXI7XG4gICAgcHJpdmF0ZSB0eXBlQWhlYWRUZXh0ID0gJyc7XG4gICAgcHJpdmF0ZSB0eXBlQWhlYWRUaW1lb3V0ID0gMTAwMDtcbiAgICBzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICBjb25maWc6IFNlbGVjdENvbmZpZztcbiAgICByb290OiBSb290Tm9kZTtcbiAgICBpbnN0YW5jZUlkOiBzdHJpbmc7XG5cbiAgICB3b3JzZVNlbGVjdEVsZW1lbnQ/OiBIVE1MRGl2RWxlbWVudDtcbiAgICBoZWFkZXJFbGVtZW50PzogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgZHJvcGRvd25QYW5lbEVsZW1lbnQ/OiBIVE1MRGl2RWxlbWVudDtcbiAgICBvcHRpb25zTGlzdEVsZW1lbnQ/OiBIVE1MRGl2RWxlbWVudDtcbiAgICBzZWFyY2hJbnB1dEVsZW1lbnQ/OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIG1lc3NhZ2VFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgb3B0aW9uT2JzZXJ2ZXI/OiBNdXRhdGlvbk9ic2VydmVyO1xuXG4gICAgb25TZWxlY3RDaGFuZ2U/OiBFdmVudExpc3RlbmVyO1xuICAgIG9uT3B0aW9uc0NsaWNrPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvbkhlYWRlckNsaWNrPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvbkhlYWRlcktleURvd24/OiBFdmVudExpc3RlbmVyO1xuICAgIG9uT3B0aW9uc0tleURvd24/OiBFdmVudExpc3RlbmVyO1xuICAgIG9uU2VhcmNoS2V5RG93bj86IEV2ZW50TGlzdGVuZXI7XG5cbiAgICBvcGVuID0gZmFsc2U7XG4gICAgYWN0aXZlT3B0aW9uPzogSFRNTE9wdGlvbkVsZW1lbnQ7XG5cbiAgICBwcml2YXRlIHBsdWdpbnM6IFBsdWdpbltdID0gW107XG4gICAgcHJpdmF0ZSBwbHVnaW5MaXN0ZW5lcnM6IFBsdWdpbkxpc3RlbmVyW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50LCBjb25maWc6IFBhcnRpYWw8U2VsZWN0Q29uZmlnPiA9IHt9LCByb290OiBSb290Tm9kZSA9IGRvY3VtZW50LCBwbHVnaW5zOiBQbHVnaW5bXSA9IFtdKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0RWxlbWVudCA9IHNlbGVjdEVsZW1lbnQ7XG4gICAgICAgIHRoaXMuY29uZmlnID0geyAuLi5ERUZBVUxUX0NPTkZJRywgLi4uY29uZmlnIH07XG4gICAgICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgICAgIHRoaXMuaW5zdGFuY2VJZCA9IGB3cy0keysrbmV4dEluc3RhbmNlSWR9YDtcbiAgICAgICAgdGhpcy5wbHVnaW5zID0gWy4uLnBsdWdpbnNdO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5zZWFyY2hhYmxlICYmICFwbHVnaW5zLnNvbWUocCA9PiBwLm5hbWUgPT09ICdzZWFyY2gnKSkge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW5zLnB1c2goY3JlYXRlQnVpbHRpblNlYXJjaFBsdWdpbigpKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLndvcnNlU2VsZWN0RWxlbWVudCkgcmV0dXJuO1xuXG4gICAgICAgIGVuc3VyZVN0eWxlcygpO1xuXG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50ID0gY3JlYXRlV29yc2VTZWxlY3QodGhpcyk7XG4gICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3QtaGVhZGVyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZHJvcGRvd25QYW5lbEVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LW9wdGlvbnMnKSBhcyBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXInKSBhcyBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LXNlYXJjaC1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubWVzc2FnZUVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LW1lc3NhZ2UnKSBhcyBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoV29yc2VTZWxlY3QubW91bnRlZEluc3RhbmNlcy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIFdvcnNlU2VsZWN0LmhhbmRsZURvY3VtZW50UG9pbnRlckRvd24pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVUeXBlQWhlYWQpO1xuICAgICAgICBXb3JzZVNlbGVjdC5tb3VudGVkSW5zdGFuY2VzLmFkZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5vYnNlcnZlT3B0aW9ucygpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB0aGlzLmluaXRQbHVnaW5zKCk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5vcHRpb25PYnNlcnZlcj8uZGlzY29ubmVjdCgpO1xuICAgICAgICB0aGlzLm9wdGlvbk9ic2VydmVyID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgICAgICAgcGx1Z2luLmRlc3Ryb3k/LigpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgeyB0YXJnZXQsIGV2ZW50LCBoYW5kbGVyIH0gb2YgdGhpcy5wbHVnaW5MaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBsdWdpbkxpc3RlbmVycyA9IFtdO1xuICAgICAgICB0aGlzLnBsdWdpbnMgPSBbXTtcblxuICAgICAgICBpZiAodGhpcy5vblNlbGVjdENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMub25TZWxlY3RDaGFuZ2UpO1xuICAgICAgICAgICAgdGhpcy5vblNlbGVjdENoYW5nZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uT3B0aW9uc0NsaWNrICYmIHRoaXMuZHJvcGRvd25QYW5lbEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25QYW5lbEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uT3B0aW9uc0NsaWNrKTtcbiAgICAgICAgICAgIHRoaXMub25PcHRpb25zQ2xpY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vbkhlYWRlckNsaWNrICYmIHRoaXMuaGVhZGVyRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkhlYWRlckNsaWNrKTtcbiAgICAgICAgICAgIHRoaXMub25IZWFkZXJDbGljayA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uSGVhZGVyS2V5RG93biAmJiB0aGlzLmhlYWRlckVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbkhlYWRlcktleURvd24pO1xuICAgICAgICAgICAgdGhpcy5vbkhlYWRlcktleURvd24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vbk9wdGlvbnNLZXlEb3duICYmIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbk9wdGlvbnNLZXlEb3duKTtcbiAgICAgICAgICAgIHRoaXMub25PcHRpb25zS2V5RG93biA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uU2VhcmNoS2V5RG93biAmJiB0aGlzLnNlYXJjaElucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25TZWFyY2hLZXlEb3duKTtcbiAgICAgICAgICAgIHRoaXMub25TZWFyY2hLZXlEb3duID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgV29yc2VTZWxlY3QubW91bnRlZEluc3RhbmNlcy5kZWxldGUodGhpcyk7XG4gICAgICAgIGlmIChXb3JzZVNlbGVjdC5tb3VudGVkSW5zdGFuY2VzLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgV29yc2VTZWxlY3QuaGFuZGxlRG9jdW1lbnRQb2ludGVyRG93bik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudD8ucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmhhbmRsZVR5cGVBaGVhZCk7XG5cbiAgICAgICAgQXJyYXkuZnJvbSh0aGlzLnNlbGVjdEVsZW1lbnQub3B0aW9ucykuZm9yRWFjaCh1bmxpbmtPcHRpb24pO1xuXG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50Py5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcblxuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmRyb3Bkb3duUGFuZWxFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubWVzc2FnZUVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFjdGl2ZU9wdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBzeW5jRGltZW5zaW9ucygpIHtcbiAgICAgICAgY29uc3QgeyB3b3JzZVNlbGVjdEVsZW1lbnQsIGhlYWRlckVsZW1lbnQsIG9wdGlvbnNMaXN0RWxlbWVudCwgc2VsZWN0RWxlbWVudCwgY29uZmlnIH0gPSB0aGlzO1xuICAgICAgICBpZiAoISh3b3JzZVNlbGVjdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEoaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZWN0RWxlbWVudCk7XG5cbiAgICAgICAgaWYgKGNvbXB1dGVkU3R5bGUud2lkdGggJiYgY29tcHV0ZWRTdHlsZS53aWR0aCAhPT0gJ2F1dG8nICYmIGNvbXB1dGVkU3R5bGUud2lkdGggIT09ICcwcHgnKSB7XG4gICAgICAgICAgICB3b3JzZVNlbGVjdEVsZW1lbnQuc3R5bGUud2lkdGggPSBjb21wdXRlZFN0eWxlLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaGVhZGVyRWxlbWVudC5zdHlsZS5mb250ID0gY29tcHV0ZWRTdHlsZS5mb250O1xuICAgICAgICBpZiAoc2hvdWxkVXNlTGlzdGJveE1vZGUodGhpcykpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0T3B0aW9uID0gb3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuWzBdIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gZmlyc3RPcHRpb24gPyBnZXRMaXN0Qm94SGVpZ2h0KHNlbGVjdEVsZW1lbnQsIGZpcnN0T3B0aW9uKSA6IG51bGw7XG4gICAgICAgICAgICBpZiAoaGVpZ2h0KSBvcHRpb25zTGlzdEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IGAke2NvbmZpZy5kcm9wZG93bkhlaWdodFB4fXB4YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZU9wZW5TdGF0ZSgpIHtcbiAgICAgICAgaWYgKCEodGhpcy53b3JzZVNlbGVjdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBpc0xpc3Rib3hNb2RlID0gc2hvdWxkVXNlTGlzdGJveE1vZGUodGhpcyk7XG4gICAgICAgIGNvbnN0IGlzT3BlbiA9IGlzTGlzdGJveE1vZGUgPyB0cnVlIDogdGhpcy5vcGVuO1xuXG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nLCBpc09wZW4pO1xuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdsaXN0Ym94JywgaXNMaXN0Ym94TW9kZSk7XG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ211bHRpcGxlJywgaXNNdWx0aXBsZVNlbGVjdCh0aGlzKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgU3RyaW5nKGlzT3BlbikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1tdWx0aXNlbGVjdGFibGUnLCBTdHJpbmcoaXNNdWx0aXBsZVNlbGVjdCh0aGlzKSkpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQudGFiSW5kZXggPSBpc09wZW4gPyAwIDogLTE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlclN0YXRlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlU2VsZWN0ZWRTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBvcHRpb25zTGlzdEVsZW1lbnQsIHNlbGVjdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIEFycmF5LmZyb20ob3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGlmICghKGVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5mb3JFYWNoKHNlbGVjdE9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoIXNlbGVjdE9wdGlvbi5zZWxlY3RlZCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGlzUGxhY2Vob2xkZXJPcHRpb24oc2VsZWN0T3B0aW9uKSkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uKTtcbiAgICAgICAgICAgIGVsPy5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgZWw/LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZURpc2FibGVkU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgd29yc2VTZWxlY3RFbGVtZW50LCBzZWxlY3RFbGVtZW50LCBoZWFkZXJFbGVtZW50LCBzZWFyY2hJbnB1dEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKHdvcnNlU2VsZWN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIHdvcnNlU2VsZWN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdkaXNhYmxlZCcsIHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQpO1xuXG4gICAgICAgIGlmIChoZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgICAgICAgIGhlYWRlckVsZW1lbnQuZGlzYWJsZWQgPSBzZWxlY3RFbGVtZW50LmRpc2FibGVkO1xuICAgICAgICAgICAgaGVhZGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnLCBTdHJpbmcoc2VsZWN0RWxlbWVudC5kaXNhYmxlZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlYXJjaElucHV0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHNlYXJjaElucHV0RWxlbWVudC5kaXNhYmxlZCA9IHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuZm9yRWFjaChzZWxlY3RPcHRpb24gPT4ge1xuICAgICAgICAgICAgY29uc3QgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uKTtcbiAgICAgICAgICAgIGVsPy5jbGFzc0xpc3QudG9nZ2xlKCdkaXNhYmxlZCcsIHNlbGVjdE9wdGlvbi5kaXNhYmxlZCk7XG4gICAgICAgICAgICBlbD8uc2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJywgU3RyaW5nKHNlbGVjdE9wdGlvbi5kaXNhYmxlZCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVIZWFkZXJTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBoZWFkZXJFbGVtZW50LCBzZWxlY3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShoZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgbGFiZWxFbCA9IGhlYWRlckVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1oZWFkZXItbGFiZWwnKTtcbiAgICAgICAgaWYgKCEobGFiZWxFbCBpbnN0YW5jZW9mIEhUTUxTcGFuRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9XG4gICAgICAgICAgICBzZWxlY3RFbGVtZW50LnNlbGVjdGVkT3B0aW9uc1swXSA/P1xuICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5vcHRpb25zW3NlbGVjdEVsZW1lbnQuc2VsZWN0ZWRJbmRleF0gPz9cbiAgICAgICAgICAgIG51bGw7XG5cbiAgICAgICAgY29uc3QgbGFiZWwgPSAoaXNQbGFjZWhvbGRlck9wdGlvbihzZWxlY3RlZE9wdGlvbikgJiYgdGhpcy5vcGVuKVxuICAgICAgICAgICAgPyAnJ1xuICAgICAgICAgICAgOiBzZWxlY3RlZE9wdGlvbj8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblxuICAgICAgICBsYWJlbEVsLnRleHRDb250ZW50ID0gbGFiZWw7XG4gICAgICAgIGhlYWRlckVsZW1lbnQudGl0bGUgPSBsYWJlbDtcbiAgICAgICAgaGVhZGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBsYWJlbCA/IGBTZWxlY3RlZDogJHtsYWJlbH1gIDogJ1NlbGVjdCBhbiBvcHRpb24nKTtcbiAgICB9XG5cbiAgICB1cGRhdGVBY3RpdmVEZXNjZW5kYW50KCkge1xuICAgICAgICBjb25zdCB7IG9wdGlvbnNMaXN0RWxlbWVudCwgYWN0aXZlT3B0aW9uIH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBpZiAoIWFjdGl2ZU9wdGlvbikge1xuICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50Jyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlbCA9IGdldFdvcnNlT3B0aW9uRWxlbWVudChhY3RpdmVPcHRpb24pO1xuICAgICAgICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkge1xuICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50Jyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBlbC5pZCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQWN0aXZlT3B0aW9uU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgb3B0aW9uc0xpc3RFbGVtZW50LCBhY3RpdmVPcHRpb24gfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIEFycmF5LmZyb20ob3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGlmIChlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSBlbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGFjdGl2ZU9wdGlvbikge1xuICAgICAgICAgICAgZ2V0V29yc2VPcHRpb25FbGVtZW50KGFjdGl2ZU9wdGlvbik/LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3luY0FsbCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZFN0YXRlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZU9wZW5TdGF0ZSgpO1xuICAgICAgICB0aGlzLnN5bmNEaW1lbnNpb25zKCk7XG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgICAgICAgcGx1Z2luLm9uU3luYz8uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRNZXNzYWdlKHRleHQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCB7IG1lc3NhZ2VFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShtZXNzYWdlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBtZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICAvLyBEZWZlciB0aGUgdXBkYXRlIGJ5IG9uZSB0aWNrIHNvIHNjcmVlbiByZWFkZXJzIGFubm91bmNlIGEgY2hhbmdlIGV2ZW4gd2hlbiB0aGVcbiAgICAgICAgLy8gbWVzc2FnZSB0ZXh0IGhhcHBlbnMgdG8gYmUgdGhlIHNhbWUgc3RyaW5nIGFzIHRoZSBwcmV2aW91cyBhbm5vdW5jZW1lbnQuXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1lc3NhZ2VFbGVtZW50ID09PSBtZXNzYWdlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgY2xlYXJNZXNzYWdlKCkge1xuICAgICAgICBpZiAoISh0aGlzLm1lc3NhZ2VFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIHRoaXMubWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcbiAgICB9XG5cbiAgICBvcGVuRHJvcGRvd24oKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdEVsZW1lbnQuZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgaWYgKHNob3VsZFVzZUxpc3Rib3hNb2RlKHRoaXMpKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5vcGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVPcGVuU3RhdGUoKTtcbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICBwbHVnaW4ub25PcGVuPy4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3NlRHJvcGRvd24oKSB7XG4gICAgICAgIGlmIChzaG91bGRVc2VMaXN0Ym94TW9kZSh0aGlzKSkgcmV0dXJuO1xuICAgICAgICBpZiAoIXRoaXMub3BlbikgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgICAgICAgIHBsdWdpbi5vbkNsb3NlPy4oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJvb3QucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpPy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgdGhpcy51cGRhdGVPcGVuU3RhdGUoKTtcbiAgICB9XG5cbiAgICB0b2dnbGVEcm9wZG93bigpIHtcbiAgICAgICAgaWYgKHNob3VsZFVzZUxpc3Rib3hNb2RlKHRoaXMpKSByZXR1cm47XG4gICAgICAgIHRoaXMub3BlbiA/IHRoaXMuY2xvc2VEcm9wZG93bigpIDogdGhpcy5vcGVuRHJvcGRvd24oKTtcbiAgICB9XG5cbiAgICBvcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKSB7XG4gICAgICAgIHRoaXMub3BlbkRyb3Bkb3duKCk7XG5cbiAgICAgICAgY29uc3QgeyBvcHRpb25zTGlzdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC50YWJJbmRleCA9IDA7XG4gICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICBzY3JvbGxPcHRpb25JbnRvVmlldyh0aGlzLmFjdGl2ZU9wdGlvbik7XG4gICAgfVxuXG4gICAgY2xvc2VEcm9wZG93bkFuZEZvY3VzSGVhZGVyKCkge1xuICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50Py5mb2N1cygpO1xuICAgIH1cblxuICAgIGdldFZpc2libGVFbmFibGVkT3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5zZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmZpbHRlcihvcHQgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdC5kaXNhYmxlZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGdldFdvcnNlT3B0aW9uRWxlbWVudChvcHQpIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldEFjdGl2ZU9wdGlvbihzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50IHwgdW5kZWZpbmVkLCBzY3JvbGwgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlT3B0aW9uID0gc2VsZWN0T3B0aW9uO1xuICAgICAgICB0aGlzLnVwZGF0ZUFjdGl2ZURlc2NlbmRhbnQoKTtcbiAgICAgICAgdGhpcy51cGRhdGVBY3RpdmVPcHRpb25TdGF0ZSgpO1xuICAgICAgICBpZiAoc2Nyb2xsKSBzY3JvbGxPcHRpb25JbnRvVmlldyhzZWxlY3RPcHRpb24pO1xuICAgIH1cblxuICAgIG1vdmVBY3RpdmVPcHRpb24oZGVsdGE6IG51bWJlcikge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRWaXNpYmxlRW5hYmxlZE9wdGlvbnMoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5hY3RpdmVPcHRpb24gPyBvcHRpb25zLmluZGV4T2YodGhpcy5hY3RpdmVPcHRpb24pIDogLTE7XG4gICAgICAgIGNvbnN0IG5leHRJbmRleCA9IGN1cnJlbnRJbmRleCA9PT0gLTFcbiAgICAgICAgICAgID8gKGRlbHRhID49IDAgPyAwIDogb3B0aW9ucy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgOiBNYXRoLm1heCgwLCBNYXRoLm1pbihvcHRpb25zLmxlbmd0aCAtIDEsIGN1cnJlbnRJbmRleCArIGRlbHRhKSk7XG5cbiAgICAgICAgdGhpcy5zZXRBY3RpdmVPcHRpb24ob3B0aW9uc1tuZXh0SW5kZXhdKTtcbiAgICB9XG5cbiAgICBtb3ZlQWN0aXZlVG9Cb3VuZGFyeShib3VuZGFyeTogJ3N0YXJ0JyB8ICdlbmQnKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldFZpc2libGVFbmFibGVkT3B0aW9ucygpO1xuICAgICAgICBpZiAob3B0aW9ucy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVPcHRpb24oYm91bmRhcnkgPT09ICdzdGFydCcgPyBvcHRpb25zWzBdIDogb3B0aW9uc1tvcHRpb25zLmxlbmd0aCAtIDFdKTtcbiAgICB9XG5cbiAgICBnZXRQYWdlSnVtcFNpemUoKSB7XG4gICAgICAgIGNvbnN0IHsgb3B0aW9uc0xpc3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybiAxMDtcblxuICAgICAgICBjb25zdCBmaXJzdE9wdGlvbiA9IEFycmF5LmZyb20ob3B0aW9uc0xpc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JzZS1zZWxlY3Qtb3B0aW9uJykpXG4gICAgICAgICAgICAuZmluZChlbCA9PiBlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KTtcbiAgICAgICAgaWYgKCEoZmlyc3RPcHRpb24gaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybiAxMDtcblxuICAgICAgICBjb25zdCBvcHRpb25IZWlnaHQgPSBmaXJzdE9wdGlvbi5vZmZzZXRIZWlnaHQgfHwgMTtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDEsIE1hdGguZmxvb3Iob3B0aW9uc0xpc3RFbGVtZW50LmNsaWVudEhlaWdodCAvIG9wdGlvbkhlaWdodCkpO1xuICAgIH1cblxuICAgIG1vdmVBY3RpdmVCeVBhZ2UoZGlyZWN0aW9uOiAxIHwgLTEpIHtcbiAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKHRoaXMuZ2V0UGFnZUp1bXBTaXplKCkgKiBkaXJlY3Rpb24pO1xuICAgIH1cblxuICAgIGNvbW1pdEFjdGl2ZU9wdGlvblNlbGVjdGlvbigpIHtcbiAgICAgICAgY29uc3QgeyBhY3RpdmVPcHRpb24sIHNlbGVjdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghYWN0aXZlT3B0aW9uIHx8IGFjdGl2ZU9wdGlvbi5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChzZWxlY3RFbGVtZW50Lm11bHRpcGxlKSB7XG4gICAgICAgICAgICBhY3RpdmVPcHRpb24uc2VsZWN0ZWQgPSAhYWN0aXZlT3B0aW9uLnNlbGVjdGVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5zZWxlY3RlZEluZGV4ID0gQXJyYXkuZnJvbShzZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmluZGV4T2YoYWN0aXZlT3B0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGVjdEVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScsIHsgYnViYmxlczogdHJ1ZSB9KSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0UGx1Z2lucygpIHtcbiAgICAgICAgaWYgKCEodGhpcy5oZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKHRoaXMub3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY29udGV4dDogUGx1Z2luQ29udGV4dCA9IHtcbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQ6IHRoaXMuc2VsZWN0RWxlbWVudCxcbiAgICAgICAgICAgIGhlYWRlckVsZW1lbnQ6IHRoaXMuaGVhZGVyRWxlbWVudCxcbiAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudDogdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQsXG4gICAgICAgICAgICBzZWFyY2hJbnB1dEVsZW1lbnQ6IHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50LFxuICAgICAgICAgICAgc2V0TWVzc2FnZTogKHRleHQpID0+IHRoaXMuc2V0TWVzc2FnZSh0ZXh0KSxcbiAgICAgICAgICAgIGNsZWFyTWVzc2FnZTogKCkgPT4gdGhpcy5jbGVhck1lc3NhZ2UoKSxcbiAgICAgICAgICAgIG9uOiAodGFyZ2V0LCBldmVudCwgaGFuZGxlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbkxpc3RlbmVycy5wdXNoKHsgdGFyZ2V0LCBldmVudCwgaGFuZGxlciB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICBwbHVnaW4uaW5pdChjb250ZXh0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEtleWJvYXJkIGNvbnRyYWN0cyBmb3IgaGVhZGVyLCBsaXN0LCBhbmQgc2VhcmNoIGFyZSBrZXB0IHRvZ2V0aGVyIGhlcmUgXHUyMDE0IHNwbGl0dGluZyB0aGVtXG4gICAgLy8gd291bGQgc2NhdHRlciByZWxhdGVkIGtleSBoYW5kbGluZyBhY3Jvc3MgbXVsdGlwbGUgbWV0aG9kcy4gSWYgdGhpcyBncm93cyBzaWduaWZpY2FudGx5LFxuICAgIC8vIGNvbnNpZGVyIGJyZWFraW5nIG91dCBwZXItY29tcG9uZW50IGhhbmRsZXJzLlxuICAgIHByaXZhdGUgYmluZEV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgeyB3b3JzZVNlbGVjdEVsZW1lbnQsIHNlbGVjdEVsZW1lbnQsIGRyb3Bkb3duUGFuZWxFbGVtZW50LCBvcHRpb25zTGlzdEVsZW1lbnQsIGhlYWRlckVsZW1lbnQsIHNlYXJjaElucHV0RWxlbWVudCB9ID0gdGhpcztcblxuICAgICAgICBpZiAoISh3b3JzZVNlbGVjdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEoZHJvcGRvd25QYW5lbEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKGhlYWRlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBvbk9wdGlvbnNDbGljazogRXZlbnRMaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkVsID0gdGFyZ2V0LmNsb3Nlc3QoJy53b3JzZS1zZWxlY3Qtb3B0aW9uJyk7XG4gICAgICAgICAgICBpZiAoIShvcHRpb25FbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKCFkcm9wZG93blBhbmVsRWxlbWVudC5jb250YWlucyhvcHRpb25FbCkpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChvcHRpb25FbC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9uID0gZ2V0U2VsZWN0T3B0aW9uRWxlbWVudChvcHRpb25FbCk7XG4gICAgICAgICAgICBpZiAoIXNlbGVjdE9wdGlvbiB8fCBzZWxlY3RPcHRpb24uZGlzYWJsZWQpIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVPcHRpb24oc2VsZWN0T3B0aW9uLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RFbGVtZW50Lm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uLnNlbGVjdGVkID0gIXNlbGVjdE9wdGlvbi5zZWxlY3RlZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5zZWxlY3RlZEluZGV4ID0gQXJyYXkuZnJvbShzZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmluZGV4T2Yoc2VsZWN0T3B0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywgeyBidWJibGVzOiB0cnVlIH0pKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9uU2VsZWN0Q2hhbmdlOiBFdmVudExpc3RlbmVyID0gKCkgPT4gdGhpcy5zeW5jQWxsKCk7XG4gICAgICAgIGNvbnN0IG9uSGVhZGVyQ2xpY2s6IEV2ZW50TGlzdGVuZXIgPSAoKSA9PiB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG5cbiAgICAgICAgY29uc3Qgb25IZWFkZXJLZXlEb3duOiBFdmVudExpc3RlbmVyID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdzdGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICcgJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuID8gdGhpcy5jbG9zZURyb3Bkb3duQW5kRm9jdXNIZWFkZXIoKSA6IHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9uT3B0aW9uc0tleURvd246IEV2ZW50TGlzdGVuZXIgPSBldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoIShldmVudCBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZVRvQm91bmRhcnkoJ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZVRvQm91bmRhcnkoJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlRG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZVVwJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJyAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1pdEFjdGl2ZU9wdGlvblNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdEVsZW1lbnQubXVsdGlwbGUpIHRoaXMuY2xvc2VEcm9wZG93bkFuZEZvY3VzSGVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bkFuZEZvY3VzSGVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9uU2VhcmNoS2V5RG93bjogRXZlbnRMaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghKGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlVG9Cb3VuZGFyeSgnc3RhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZVRvQm91bmRhcnkoJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlRG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBkcm9wZG93blBhbmVsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uT3B0aW9uc0NsaWNrKTtcbiAgICAgICAgc2VsZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvblNlbGVjdENoYW5nZSk7XG4gICAgICAgIGhlYWRlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkhlYWRlckNsaWNrKTtcbiAgICAgICAgaGVhZGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25IZWFkZXJLZXlEb3duKTtcbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbk9wdGlvbnNLZXlEb3duKTtcblxuICAgICAgICBpZiAoc2VhcmNoSW5wdXRFbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgc2VhcmNoSW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvblNlYXJjaEtleURvd24pO1xuICAgICAgICAgICAgdGhpcy5vblNlYXJjaEtleURvd24gPSBvblNlYXJjaEtleURvd247XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uT3B0aW9uc0NsaWNrID0gb25PcHRpb25zQ2xpY2s7XG4gICAgICAgIHRoaXMub25TZWxlY3RDaGFuZ2UgPSBvblNlbGVjdENoYW5nZTtcbiAgICAgICAgdGhpcy5vbkhlYWRlckNsaWNrID0gb25IZWFkZXJDbGljaztcbiAgICAgICAgdGhpcy5vbkhlYWRlcktleURvd24gPSBvbkhlYWRlcktleURvd247XG4gICAgICAgIHRoaXMub25PcHRpb25zS2V5RG93biA9IG9uT3B0aW9uc0tleURvd247XG5cbiAgICAgICAgdGhpcy5zeW5jQWxsKCk7XG4gICAgfVxuXG4gICAgLy8gRE9NIGRpZmZpbmcgaXMga2VwdCBpbmxpbmUgaGVyZSBiZWNhdXNlIHRoZSBtdXRhdGlvbiBjYXNlcyBhcmUgdGlnaHRseSBjb3VwbGVkIHRvIGVhY2hcbiAgICAvLyBvdGhlciBhbmQgdGhlIHNjcm9sbGVyJ3MgY2hpbGQgb3JkZXIuIElmIHRoaXMgZ3Jvd3MgKGUuZy4gb3B0aW9uIGdyb3VwcywgcmVvcmRlcmluZ1xuICAgIC8vIGFuaW1hdGlvbnMpLCBleHRyYWN0IGludG8gYSBkZWRpY2F0ZWQgcmVjb25jaWxlci5cbiAgICBwcml2YXRlIG9ic2VydmVPcHRpb25zKCkge1xuICAgICAgICBjb25zdCB7IHNlbGVjdEVsZW1lbnQsIG9wdGlvbnNMaXN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbkxpc3QgPT4ge1xuICAgICAgICAgICAgbGV0IHNob3VsZFJlYnVpbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBzaG91bGRVcGRhdGVTdGF0ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9uTGlzdCkge1xuICAgICAgICAgICAgICAgIGlmIChtdXRhdGlvbi50eXBlID09PSAnY2hpbGRMaXN0Jykge1xuICAgICAgICAgICAgICAgICAgICBzaG91bGRSZWJ1aWxkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkVXBkYXRlU3RhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2F0dHJpYnV0ZXMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZVN0YXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRSZWJ1aWxkKSB7XG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShvcHRpb25zTGlzdEVsZW1lbnQuY2hpbGRyZW4pLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5rZWRPcHRpb24gPSBnZXRTZWxlY3RPcHRpb25FbGVtZW50KGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFsaW5rZWRPcHRpb24gfHwgIUFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5pbmNsdWRlcyhsaW5rZWRPcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlua2VkT3B0aW9uKSB1bmxpbmtPcHRpb24obGlua2VkT3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuZm9yRWFjaCgoc2VsZWN0T3B0aW9uLCBvcHRpb25JbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwgPSBjcmVhdGVXb3JzZU9wdGlvbkVsZW1lbnQodGhpcywgc2VsZWN0T3B0aW9uLCBvcHRpb25JbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rT3B0aW9uKHNlbGVjdE9wdGlvbiwgZWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZWwuaWQgPSBnZXRPcHRpb25JZCh0aGlzLCBvcHRpb25JbmRleCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEF0SW5kZXggPSBvcHRpb25zTGlzdEVsZW1lbnQuY2hpbGRyZW5bb3B0aW9uSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudEF0SW5kZXggIT09IGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50QXRJbmRleCA/IGN1cnJlbnRBdEluZGV4LmJlZm9yZShlbCkgOiBvcHRpb25zTGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBBcnJheS5mcm9tKG9wdGlvbnNMaXN0RWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50ICYmICFnZXRTZWxlY3RPcHRpb25FbGVtZW50KGNoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNob3VsZFVwZGF0ZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jQWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoc2VsZWN0RWxlbWVudCwge1xuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgc3VidHJlZTogZmFsc2UsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbJ3N0eWxlJywgJ2NsYXNzJywgJ2Rpc2FibGVkJywgJ211bHRpcGxlJywgJ3NpemUnXVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm9wdGlvbk9ic2VydmVyID0gb2JzZXJ2ZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgc2VsZWN0RWxlbWVudCwgd29yc2VTZWxlY3RFbGVtZW50LCBvcHRpb25zTGlzdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKHdvcnNlU2VsZWN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIHNlbGVjdEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgc2VsZWN0RWxlbWVudC5hZnRlcih3b3JzZVNlbGVjdEVsZW1lbnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlVHlwZUFoZWFkID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGUua2V5Lmxlbmd0aCAhPT0gMSB8fCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0aGlzLnNlYXJjaElucHV0RWxlbWVudCkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHdvcnNlT3B0aW9ucyA9IHRoaXMub3B0aW9uc0xpc3RFbGVtZW50Py5jaGlsZHJlbjtcbiAgICAgICAgdGhpcy50eXBlQWhlYWRUZXh0ICs9IGUua2V5O1xuICAgICAgICBsZXQgdHlwZUFoZWFkVGV4dCA9IHRoaXMudHlwZUFoZWFkVGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmICh3b3JzZU9wdGlvbnMgJiYgdHlwZUFoZWFkVGV4dCkge1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hpbmdXb3JzZU9wdGlvbiA9IEFycmF5LmZyb20od29yc2VPcHRpb25zKS5maW5kKHdvcnNlT3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd29yc2VPcHRpb24udGV4dENvbnRlbnQudHJpbSgpLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCh0eXBlQWhlYWRUZXh0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQ/LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKT8uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICBtYXRjaGluZ1dvcnNlT3B0aW9uPy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgaWYgKG1hdGNoaW5nV29yc2VPcHRpb24pIG1hdGNoaW5nV29yc2VPcHRpb24uc2Nyb2xsSW50b1ZpZXcoeyBibG9jazogJ25lYXJlc3QnIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnR5cGVBaGVhZFRpbWVySWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnR5cGVBaGVhZFRpbWVySWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHlwZUFoZWFkVGltZXJJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50eXBlQWhlYWRUZXh0ID0gJyc7XG4gICAgICAgIH0sIHRoaXMudHlwZUFoZWFkVGltZW91dCk7XG4gICAgfVxufVxuXG4vKipcbiAqIEVuaGFuY2VzIGV2ZXJ5IG5hdGl2ZSBgPHNlbGVjdD5gIGVsZW1lbnQgaW5zaWRlIHRoZSBwcm92aWRlZCByb290LlxuICpcbiAqIFRoZSBmdW5jdGlvbiBpcyBzYWZlIHRvIGNhbGwgbXVsdGlwbGUgdGltZXMuIEVhY2ggYDxzZWxlY3Q+YCBpcyBtb3VudGVkIGF0IG1vc3Qgb25jZS5cbiAqIElmIGBvcHRpb25zLm9ic2VydmVgIGlzIHRydWUsIG5ld2x5IGFkZGVkIHNlbGVjdHMgdW5kZXIgdGhlIHJvb3QgYXJlIGVuaGFuY2VkIGF1dG9tYXRpY2FsbHkuXG4gKlxuICogUmV0dXJucyBhIGNsZWFudXAgZnVuY3Rpb24gdGhhdCBkaXNjb25uZWN0cyB0aGUgcm9vdCBvYnNlcnZlciBhbmQgZGVzdHJveXMgbW91bnRlZCBpbnN0YW5jZXNcbiAqIHVuZGVyIHRoZSBwcm92aWRlZCByb290LlxuICovXG5leHBvcnQgZnVuY3Rpb24gd29yc2VTZWxlY3Qocm9vdDogUm9vdE5vZGUgPSBkb2N1bWVudCwgb3B0aW9uczogV29yc2VTZWxlY3RPcHRpb25zID0ge30pOiAoKSA9PiB2b2lkIHtcbiAgICBjb25zdCBwbHVnaW5zID0gb3B0aW9ucy5wbHVnaW5zID8/IFtdO1xuICAgIG1vdW50U2VsZWN0c0luUm9vdChyb290LCBwbHVnaW5zKTtcblxuICAgIGxldCByb290T2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBpZiAob3B0aW9ucy5vYnNlcnZlKSB7XG4gICAgICAgIHJvb3RPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9uTGlzdCA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9uTGlzdCkge1xuICAgICAgICAgICAgICAgIGlmIChtdXRhdGlvbi50eXBlICE9PSAnY2hpbGRMaXN0JykgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2goYWRkZWROb2RlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoYWRkZWROb2RlIGluc3RhbmNlb2YgRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYWRkZWROb2RlIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdW50U2VsZWN0RWxlbWVudChhZGRlZE5vZGUsIHJvb3QsIHBsdWdpbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYWRkZWROb2RlLnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTFNlbGVjdEVsZW1lbnQ+KCdzZWxlY3QnKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdW50U2VsZWN0RWxlbWVudChlbCwgcm9vdCwgcGx1Z2lucyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByb290T2JzZXJ2ZXIub2JzZXJ2ZShyb290LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICByb290T2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcblxuICAgICAgICBnZXRTZWxlY3RFbGVtZW50c0luUm9vdChyb290KS5mb3JFYWNoKHNlbGVjdEVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBpbnN0YW5jZXMuZ2V0KHNlbGVjdEVsZW1lbnQpO1xuICAgICAgICAgICAgaWYgKCFpbnN0YW5jZSkgcmV0dXJuO1xuICAgICAgICAgICAgaW5zdGFuY2UuZGVzdHJveSgpO1xuICAgICAgICAgICAgaW5zdGFuY2VzLmRlbGV0ZShzZWxlY3RFbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZW5zdXJlU3R5bGVzKCkge1xuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS13b3JzZS1zZWxlY3Qtc3R5bGVzPVwidHJ1ZVwiXScpKSByZXR1cm47XG5cbiAgICBjb25zdCBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtd29yc2Utc2VsZWN0LXN0eWxlcycsICd0cnVlJyk7XG4gICAgc3R5bGVFbGVtZW50LnRleHRDb250ZW50ID0gY3JlYXRlQ1NTKCk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBnZXRTZWxlY3RFbGVtZW50c0luUm9vdChyb290OiBSb290Tm9kZSkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHJvb3QucXVlcnlTZWxlY3RvckFsbDxIVE1MU2VsZWN0RWxlbWVudD4oJ3NlbGVjdCcpKTtcbn1cblxuZnVuY3Rpb24gbW91bnRTZWxlY3RzSW5Sb290KHJvb3Q6IFJvb3ROb2RlLCBwbHVnaW5zOiBQbHVnaW5bXSkge1xuICAgIGdldFNlbGVjdEVsZW1lbnRzSW5Sb290KHJvb3QpLmZvckVhY2goc2VsZWN0RWxlbWVudCA9PiBtb3VudFNlbGVjdEVsZW1lbnQoc2VsZWN0RWxlbWVudCwgcm9vdCwgcGx1Z2lucykpO1xufVxuXG5mdW5jdGlvbiBtb3VudFNlbGVjdEVsZW1lbnQoc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQsIHJvb3Q6IFJvb3ROb2RlLCBwbHVnaW5zOiBQbHVnaW5bXSkge1xuICAgIGlmIChpbnN0YW5jZXMuZ2V0KHNlbGVjdEVsZW1lbnQpKSByZXR1cm47XG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBXb3JzZVNlbGVjdChzZWxlY3RFbGVtZW50LCBnZXRDb25maWcoc2VsZWN0RWxlbWVudCksIHJvb3QsIHBsdWdpbnMpO1xuICAgIGluc3RhbmNlLm1vdW50KCk7XG4gICAgaW5zdGFuY2VzLnNldChzZWxlY3RFbGVtZW50LCBpbnN0YW5jZSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBR08sSUFBTSxpQkFBaUI7QUFBQSxFQUMxQixZQUFZO0FBQUEsRUFDWixrQkFBa0I7QUFBQSxFQUNsQixRQUFRO0FBQUEsRUFDUixPQUFPO0FBQ1g7OztBQ0hPLFNBQVMsWUFBWTtBQUN4QjtBQUFBO0FBQUEsSUFBMkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBa0JSLGVBQWUsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkF3QjNCLGVBQWUsS0FBSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBbUlmLGVBQWUsZ0JBQWdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXVFckQ7OztBQ3JQQSxJQUFNLGFBQWEsT0FBTyxLQUFLLGNBQWM7QUFFN0MsU0FBUyxZQUFZLE9BQWU7QUFDaEMsU0FBTyxNQUFNLFFBQVEsVUFBVSxlQUFhLElBQUksVUFBVSxZQUFZLENBQUMsRUFBRTtBQUM3RTtBQUVBLFNBQVMsaUJBQXNDLEtBQVEsTUFBK0I7QUFDbEYsUUFBTSxlQUFlLGVBQWUsR0FBRztBQUV2QyxNQUFJLE9BQU8saUJBQWlCLFdBQVc7QUFDbkMsV0FBUSxTQUFTO0FBQUEsRUFDckI7QUFFQSxNQUFJLE9BQU8saUJBQWlCLFVBQVU7QUFDbEMsV0FBTyxPQUFPLElBQUk7QUFBQSxFQUN0QjtBQUVBLFNBQU87QUFDWDtBQUVPLFNBQVMsVUFBVSxlQUFzQztBQUM1RCxRQUFNLFNBQXVCLEVBQUUsR0FBRyxlQUFlO0FBRWpELFdBQVMsSUFBSSxHQUFHLElBQUksV0FBVyxRQUFRLEtBQUs7QUFDeEMsVUFBTSxNQUFNLFdBQVcsQ0FBQztBQUN4QixVQUFNLG9CQUFvQixRQUFRLFlBQVksR0FBRyxDQUFDO0FBQ2xELFVBQU0sT0FBTyxjQUFjLGFBQWEsaUJBQWlCO0FBRXpELFFBQUksU0FBUyxLQUFNO0FBRW5CLElBQUMsT0FBd0QsR0FBRyxJQUFJLGlCQUFpQixLQUFLLElBQUk7QUFBQSxFQUM5RjtBQUVBLFNBQU87QUFDWDs7O0FDbENPLFNBQVMscUJBQXFCLHFCQUF5QztBQUMxRSxTQUFPLG9CQUFvQixjQUFjLE9BQU87QUFDcEQ7QUFFTyxTQUFTLGlCQUFpQixxQkFBeUM7QUFDdEUsU0FBTyxvQkFBb0IsY0FBYztBQUM3QztBQUlPLFNBQVMsb0JBQW9CLGNBQWlEO0FBQ2pGLFNBQU8saUJBQWlCLFFBQVEsYUFBYSxVQUFVLE1BQU0sYUFBYTtBQUM5RTtBQUVPLFNBQVMsaUJBQWlCLGVBQWtDLG9CQUFtRDtBQUNsSCxNQUFJLGNBQWMsUUFBUSxFQUFHLFFBQU87QUFFcEMsUUFBTSxlQUFlLG1CQUFtQixzQkFBc0IsRUFBRTtBQUNoRSxRQUFNLGNBQWMsZUFBZSxjQUFjO0FBRWpELFFBQU0scUJBQXFCLGNBQWMsZUFBZSxzQkFBc0IsRUFBRSxVQUFVO0FBQzFGLFNBQU8sS0FBSyxJQUFJLGFBQWEsa0JBQWtCLElBQUk7QUFDdkQ7OztBQ3JCQSxJQUFNLGNBQWMsb0JBQUksUUFBMkM7QUFDbkUsSUFBTSxjQUFjLG9CQUFJLFFBQTJDO0FBRzVELFNBQVMsV0FBVyxjQUFpQyxvQkFBb0M7QUFDNUYsY0FBWSxJQUFJLGNBQWMsa0JBQWtCO0FBQ2hELGNBQVksSUFBSSxvQkFBb0IsWUFBWTtBQUNwRDtBQUVPLFNBQVMsYUFBYSxjQUFpQztBQUMxRCxRQUFNLHFCQUFxQixZQUFZLElBQUksWUFBWTtBQUN2RCxNQUFJLENBQUMsbUJBQW9CO0FBRXpCLGNBQVksT0FBTyxZQUFZO0FBQy9CLGNBQVksT0FBTyxrQkFBa0I7QUFDekM7QUFFTyxTQUFTLHNCQUFzQixjQUFpQztBQUNuRSxTQUFPLFlBQVksSUFBSSxZQUFZO0FBQ3ZDO0FBRU8sU0FBUyx1QkFBdUIsb0JBQW9DO0FBQ3ZFLFNBQU8sWUFBWSxJQUFJLGtCQUFrQjtBQUM3Qzs7O0FDdEJPLFNBQVMscUJBQXFCLGNBQWtDO0FBQ25FLE1BQUksQ0FBQyxhQUFjO0FBQ25CLFFBQU0sS0FBSyxzQkFBc0IsWUFBWTtBQUM3QyxNQUFJLEVBQUUsY0FBYyxnQkFBaUI7QUFDckMsS0FBRyxlQUFlLEVBQUUsT0FBTyxVQUFVLENBQUM7QUFDMUM7QUFHQSxTQUFTLG9CQUFvQixZQUFzQjtBQUMvQyxTQUFPLFdBQVcsU0FBUyxJQUFJLFdBQVcsV0FBVyxLQUFLLEdBQUcsQ0FBQyxNQUFNO0FBQ3hFO0FBRU8sU0FBUyxxQ0FBcUMscUJBQXlDO0FBQzFGLFFBQU0sbUJBQTZCLENBQUM7QUFFcEMsTUFBSSxvQkFBb0IsT0FBTyxVQUFVLGVBQWUsT0FBTztBQUMzRCxxQkFBaUIsS0FBSyxVQUFVLG9CQUFvQixPQUFPLEtBQUssR0FBRztBQUFBLEVBQ3ZFO0FBRUEsTUFBSSxvQkFBb0IsT0FBTyxXQUFXLGVBQWUsUUFBUTtBQUM3RCxxQkFBaUIsS0FBSyxXQUFXLG9CQUFvQixPQUFPLE1BQU0sR0FBRztBQUFBLEVBQ3pFO0FBRUEsU0FBTyxvQkFBb0IsZ0JBQWdCO0FBQy9DO0FBR0EsU0FBUyxXQUFXLE9BQWU7QUFDL0IsU0FBTyxNQUNGLFFBQVEsTUFBTSxPQUFPLEVBQ3JCLFFBQVEsTUFBTSxNQUFNLEVBQ3BCLFFBQVEsTUFBTSxNQUFNLEVBQ3BCLFFBQVEsTUFBTSxRQUFRLEVBQ3RCLFFBQVEsTUFBTSxPQUFPO0FBQzlCO0FBRU8sU0FBUyxZQUFZLHFCQUF5QyxhQUFxQjtBQUN0RixTQUFPLEdBQUcsb0JBQW9CLFVBQVUsV0FBVyxXQUFXO0FBQ2xFO0FBRUEsU0FBUyxzQkFBc0IsY0FBaUM7QUFDNUQsUUFBTSxVQUFVLENBQUMscUJBQXFCO0FBRXRDLE1BQUksYUFBYSxVQUFVO0FBQ3ZCLFlBQVEsS0FBSyxVQUFVO0FBQUEsRUFDM0I7QUFFQSxNQUFJLGFBQWEsVUFBVTtBQUN2QixZQUFRLEtBQUssVUFBVTtBQUFBLEVBQzNCO0FBRUEsU0FBTyxRQUFRLEtBQUssR0FBRztBQUMzQjtBQUVPLFNBQVMsc0JBQ1oscUJBQ0EsY0FDQSxhQUNGO0FBQ0UsUUFBTSxxQkFBcUIsc0JBQXNCLFlBQVk7QUFDN0QsUUFBTSxhQUFhLGFBQWEsZUFBZTtBQUUvQyxTQUFPO0FBQUEsZUFDSSxZQUFZLHFCQUFxQixXQUFXLENBQUM7QUFBQSxrQkFDMUMsa0JBQWtCO0FBQUEsdUJBQ2IsV0FBVyxhQUFhLEtBQUssQ0FBQztBQUFBO0FBQUEsMEJBRTNCLGFBQWEsV0FBVyxTQUFTLE9BQU87QUFBQSwwQkFDeEMsYUFBYSxXQUFXLFNBQVMsT0FBTztBQUFBLFFBQzFELFdBQVcsVUFBVSxDQUFDO0FBQUE7QUFBQTtBQUc5QjtBQUVPLFNBQVMseUJBQ1oscUJBQ0EsY0FDQSxhQUNGO0FBQ0UsU0FBTyxTQUFTLFlBQVksRUFBRTtBQUFBLElBQzFCLHNCQUFzQixxQkFBcUIsY0FBYyxXQUFXO0FBQUEsRUFDeEUsRUFBRTtBQUNOO0FBRU8sU0FBUyxpQkFBaUIscUJBQXlDO0FBQ3RFLE1BQUksQ0FBQyxvQkFBb0IsT0FBTyxZQUFZO0FBQ3hDLFdBQU87QUFBQSxFQUNYO0FBRUEsU0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTWDtBQUVPLFNBQVMsb0JBQW9CO0FBQ2hDLFNBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTVg7QUFFTyxTQUFTLGtCQUFrQixxQkFBeUM7QUFDdkUsUUFBTSx1QkFBdUIscUNBQXFDLG1CQUFtQjtBQUNyRixRQUFNLG1CQUFtQixDQUFDLHdCQUF3QjtBQUVsRCxNQUFJLHFCQUFxQixtQkFBbUIsR0FBRztBQUMzQyxxQkFBaUIsS0FBSyxTQUFTO0FBQUEsRUFDbkM7QUFFQSxNQUFJLGlCQUFpQixtQkFBbUIsR0FBRztBQUN2QyxxQkFBaUIsS0FBSyxVQUFVO0FBQUEsRUFDcEM7QUFFQSxRQUFNLGFBQWE7QUFBQSxrQkFDTCxpQkFBaUIsS0FBSyxHQUFHLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFTbEMsaUJBQWlCLG1CQUFtQixDQUFDO0FBQUEsVUFDckMsa0JBQWtCLENBQUM7QUFBQSxvREFDdUIsb0JBQW9CO0FBQUE7QUFBQTtBQUFBO0FBS3BFLFFBQU0scUJBQXFCLFNBQVMsWUFBWSxFQUFFO0FBQUEsSUFDOUM7QUFBQSxFQUNKLEVBQUU7QUFFRixRQUFNLHFCQUFxQixtQkFBbUIsY0FBYyxnQ0FBZ0M7QUFDNUYscUJBQW1CLGFBQWEsUUFBUSxTQUFTO0FBQ2pELHFCQUFtQixXQUFXLHFCQUFxQixtQkFBbUIsSUFBSSxJQUFJO0FBRTlFLE1BQUksaUJBQWlCLG1CQUFtQixHQUFHO0FBQ3ZDLHVCQUFtQixhQUFhLHdCQUF3QixNQUFNO0FBQUEsRUFDbEU7QUFFQSxRQUFNLGdCQUFnQixNQUFNLEtBQUssb0JBQW9CLGNBQWMsT0FBTztBQUUxRSxXQUFTLElBQUksR0FBRyxJQUFJLGNBQWMsUUFBUSxLQUFLO0FBQzNDLFVBQU0sZUFBZSxjQUFjLENBQUM7QUFDcEMsVUFBTSxxQkFBcUI7QUFBQSxNQUN2QjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDSjtBQUNBLGVBQVcsY0FBYyxrQkFBa0I7QUFDM0MsdUJBQW1CLFlBQVksa0JBQWtCO0FBQUEsRUFDckQ7QUFFQSxTQUFPO0FBQ1g7OztBQ3JLQSxTQUFTLGVBQWUsU0FBd0IsWUFBb0I7QUFDaEUsUUFBTSxPQUFPLFdBQVcsS0FBSyxFQUFFLFlBQVk7QUFFM0MsUUFBTSxLQUFLLFFBQVEsbUJBQW1CLFFBQVEsRUFBRSxRQUFRLGlCQUFlO0FBQ25FLFFBQUksRUFBRSx1QkFBdUIsZ0JBQWlCO0FBQzlDLFVBQU0sVUFBVSxTQUFTLE1BQU0sWUFBWSxZQUFZLFlBQVksRUFBRSxTQUFTLElBQUk7QUFDbEYsZ0JBQVksVUFBVSxPQUFPLFdBQVcsT0FBTztBQUFBLEVBQ25ELENBQUM7QUFFRCxNQUFJLENBQUMsTUFBTTtBQUNQLFlBQVEsYUFBYTtBQUNyQjtBQUFBLEVBQ0o7QUFFQSxRQUFNLGFBQWEsUUFBUSxtQkFBbUIsaUJBQWlCLDhCQUE4QixFQUFFO0FBQy9GLFFBQU0sVUFDRixlQUFlLElBQUkscUJBQ25CLGVBQWUsSUFBSSx1QkFDbkIsR0FBRyxVQUFVO0FBRWpCLFVBQVEsV0FBVyxPQUFPO0FBRTFCLFFBQU0sYUFBYSxRQUFRLG1CQUFtQixjQUFjLDhCQUE4QjtBQUMxRixNQUFJLHNCQUFzQixnQkFBZ0I7QUFDdEMsZUFBVyxlQUFlLEVBQUUsT0FBTyxVQUFVLENBQUM7QUFBQSxFQUNsRDtBQUNKO0FBRU8sU0FBUyw0QkFBb0M7QUFDaEQsTUFBSSxhQUFhO0FBQ2pCLE1BQUksZ0JBQXNDO0FBRTFDLFNBQU87QUFBQSxJQUNILE1BQU07QUFBQSxJQUVOLEtBQUssU0FBd0I7QUFDekIsc0JBQWdCO0FBQ2hCLFlBQU0sRUFBRSxtQkFBbUIsSUFBSTtBQUMvQixVQUFJLENBQUMsbUJBQW9CO0FBRXpCLGNBQVEsR0FBRyxvQkFBb0IsU0FBUyxDQUFDLFVBQVU7QUFDL0MsY0FBTSxTQUFTLE1BQU07QUFDckIsWUFBSSxFQUFFLGtCQUFrQixrQkFBbUI7QUFDM0MscUJBQWEsT0FBTztBQUNwQix1QkFBZSxTQUFTLFVBQVU7QUFBQSxNQUN0QyxDQUFDO0FBQUEsSUFDTDtBQUFBLElBRUEsU0FBUztBQUNMLFVBQUksQ0FBQyxjQUFlO0FBQ3BCLHFCQUFlLGVBQWUsVUFBVTtBQUFBLElBQzVDO0FBQUEsSUFFQSxVQUFVO0FBQ04sVUFBSSxDQUFDLGNBQWU7QUFDcEIsbUJBQWE7QUFDYixZQUFNLEVBQUUsbUJBQW1CLElBQUk7QUFDL0IsVUFBSSw4QkFBOEIsa0JBQWtCO0FBQ2hELDJCQUFtQixRQUFRO0FBQUEsTUFDL0I7QUFDQSxxQkFBZSxlQUFlLEVBQUU7QUFBQSxJQUNwQztBQUFBLElBRUEsVUFBVTtBQUNOLHNCQUFnQjtBQUNoQixtQkFBYTtBQUFBLElBQ2pCO0FBQUEsRUFDSjtBQUNKOzs7QUNyREEsSUFBTSxZQUFZLG9CQUFJLFFBQXdDO0FBQzlELElBQUksaUJBQWlCO0FBSXJCLElBQU0sZUFBTixNQUFNLGFBQTBDO0FBQUEsRUE2QzVDLFlBQVksZUFBa0MsU0FBZ0MsQ0FBQyxHQUFHLE9BQWlCLFVBQVUsVUFBb0IsQ0FBQyxHQUFHO0FBNUJySSxTQUFRLGdCQUFnQjtBQUN4QixTQUFRLG1CQUFtQjtBQXFCM0IsZ0JBQU87QUFHUCxTQUFRLFVBQW9CLENBQUM7QUFDN0IsU0FBUSxrQkFBb0MsQ0FBQztBQStvQjdDLFNBQVEsa0JBQWtCLENBQUMsTUFBcUI7QUFDNUMsVUFBSSxFQUFFLElBQUksV0FBVyxLQUFLLFNBQVMsa0JBQWtCLEtBQUssbUJBQW9CO0FBRTlFLFlBQU0sZUFBZSxLQUFLLG9CQUFvQjtBQUM5QyxXQUFLLGlCQUFpQixFQUFFO0FBQ3hCLFVBQUksZ0JBQWdCLEtBQUssY0FBYyxZQUFZO0FBRW5ELFVBQUksZ0JBQWdCLGVBQWU7QUFDL0IsY0FBTSxzQkFBc0IsTUFBTSxLQUFLLFlBQVksRUFBRSxLQUFLLGlCQUFlO0FBQ3JFLGlCQUFPLFlBQVksWUFBWSxLQUFLLEVBQUUsWUFBWSxFQUFFLFdBQVcsYUFBYTtBQUFBLFFBQ2hGLENBQUM7QUFDRCxhQUFLLG9CQUFvQixjQUFjLFNBQVMsR0FBRyxVQUFVLE9BQU8sUUFBUTtBQUM1RSw2QkFBcUIsVUFBVSxJQUFJLFFBQVE7QUFFM0MsWUFBSSxvQkFBcUIscUJBQW9CLGVBQWUsRUFBRSxPQUFPLFVBQVUsQ0FBQztBQUFBLE1BQ3BGO0FBQ0EsVUFBSSxLQUFLLGtCQUFrQjtBQUN2QixxQkFBYSxLQUFLLGdCQUFnQjtBQUFBLE1BQ3RDO0FBQ0EsV0FBSyxtQkFBbUIsV0FBVyxNQUFNO0FBQ3JDLGFBQUssZ0JBQWdCO0FBQUEsTUFDekIsR0FBRyxLQUFLLGdCQUFnQjtBQUFBLElBQzVCO0FBbHFCSSxTQUFLLGdCQUFnQjtBQUNyQixTQUFLLFNBQVMsRUFBRSxHQUFHLGdCQUFnQixHQUFHLE9BQU87QUFDN0MsU0FBSyxPQUFPO0FBQ1osU0FBSyxhQUFhLE1BQU0sRUFBRSxjQUFjO0FBQ3hDLFNBQUssVUFBVSxDQUFDLEdBQUcsT0FBTztBQUUxQixRQUFJLEtBQUssT0FBTyxjQUFjLENBQUMsUUFBUSxLQUFLLE9BQUssRUFBRSxTQUFTLFFBQVEsR0FBRztBQUNuRSxXQUFLLFFBQVEsS0FBSywwQkFBMEIsQ0FBQztBQUFBLElBQ2pEO0FBQUEsRUFDSjtBQUFBLEVBakRBLE9BQWUsMEJBQTBCLE9BQWM7QUFDbkQsVUFBTSxTQUFTLE1BQU07QUFDckIsUUFBSSxFQUFFLGtCQUFrQixNQUFPO0FBQy9CLGVBQVcsWUFBWSxhQUFZLGtCQUFrQjtBQUNqRCxVQUFJLFNBQVMsc0JBQXNCLENBQUMsU0FBUyxtQkFBbUIsU0FBUyxNQUFNLEdBQUc7QUFDOUUsaUJBQVMsY0FBYztBQUFBLE1BQzNCO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQTRDQSxRQUFRO0FBQ0osUUFBSSxLQUFLLG1CQUFvQjtBQUU3QixpQkFBYTtBQUViLFNBQUsscUJBQXFCLGtCQUFrQixJQUFJO0FBQ2hELFNBQUssZ0JBQWdCLEtBQUssbUJBQW1CLGNBQWMsc0JBQXNCO0FBQ2pGLFNBQUssdUJBQXVCLEtBQUssbUJBQW1CLGNBQWMsdUJBQXVCO0FBQ3pGLFNBQUsscUJBQXFCLEtBQUssbUJBQW1CLGNBQWMsZ0NBQWdDO0FBQ2hHLFNBQUsscUJBQXFCLEtBQUssbUJBQW1CLGNBQWMsNEJBQTRCO0FBQzVGLFNBQUssaUJBQWlCLEtBQUssbUJBQW1CLGNBQWMsdUJBQXVCO0FBRW5GLFFBQUksYUFBWSxpQkFBaUIsU0FBUyxHQUFHO0FBQ3pDLGVBQVMsaUJBQWlCLGVBQWUsYUFBWSx5QkFBeUI7QUFBQSxJQUNsRjtBQUNBLFNBQUssbUJBQW1CLGlCQUFpQixTQUFTLEtBQUssZUFBZTtBQUN0RSxpQkFBWSxpQkFBaUIsSUFBSSxJQUFJO0FBRXJDLFNBQUssV0FBVztBQUNoQixTQUFLLGVBQWU7QUFDcEIsU0FBSyxPQUFPO0FBQ1osU0FBSyxZQUFZO0FBQUEsRUFDckI7QUFBQSxFQUVBLFVBQVU7QUFDTixTQUFLLGdCQUFnQixXQUFXO0FBQ2hDLFNBQUssaUJBQWlCO0FBRXRCLGVBQVcsVUFBVSxLQUFLLFNBQVM7QUFDL0IsYUFBTyxVQUFVO0FBQUEsSUFDckI7QUFDQSxlQUFXLEVBQUUsUUFBUSxPQUFPLFFBQVEsS0FBSyxLQUFLLGlCQUFpQjtBQUMzRCxhQUFPLG9CQUFvQixPQUFPLE9BQU87QUFBQSxJQUM3QztBQUNBLFNBQUssa0JBQWtCLENBQUM7QUFDeEIsU0FBSyxVQUFVLENBQUM7QUFFaEIsUUFBSSxLQUFLLGdCQUFnQjtBQUNyQixXQUFLLGNBQWMsb0JBQW9CLFVBQVUsS0FBSyxjQUFjO0FBQ3BFLFdBQUssaUJBQWlCO0FBQUEsSUFDMUI7QUFFQSxRQUFJLEtBQUssa0JBQWtCLEtBQUssc0JBQXNCO0FBQ2xELFdBQUsscUJBQXFCLG9CQUFvQixTQUFTLEtBQUssY0FBYztBQUMxRSxXQUFLLGlCQUFpQjtBQUFBLElBQzFCO0FBRUEsUUFBSSxLQUFLLGlCQUFpQixLQUFLLGVBQWU7QUFDMUMsV0FBSyxjQUFjLG9CQUFvQixTQUFTLEtBQUssYUFBYTtBQUNsRSxXQUFLLGdCQUFnQjtBQUFBLElBQ3pCO0FBRUEsUUFBSSxLQUFLLG1CQUFtQixLQUFLLGVBQWU7QUFDNUMsV0FBSyxjQUFjLG9CQUFvQixXQUFXLEtBQUssZUFBZTtBQUN0RSxXQUFLLGtCQUFrQjtBQUFBLElBQzNCO0FBRUEsUUFBSSxLQUFLLG9CQUFvQixLQUFLLG9CQUFvQjtBQUNsRCxXQUFLLG1CQUFtQixvQkFBb0IsV0FBVyxLQUFLLGdCQUFnQjtBQUM1RSxXQUFLLG1CQUFtQjtBQUFBLElBQzVCO0FBRUEsUUFBSSxLQUFLLG1CQUFtQixLQUFLLG9CQUFvQjtBQUNqRCxXQUFLLG1CQUFtQixvQkFBb0IsV0FBVyxLQUFLLGVBQWU7QUFDM0UsV0FBSyxrQkFBa0I7QUFBQSxJQUMzQjtBQUVBLGlCQUFZLGlCQUFpQixPQUFPLElBQUk7QUFDeEMsUUFBSSxhQUFZLGlCQUFpQixTQUFTLEdBQUc7QUFDekMsZUFBUyxvQkFBb0IsZUFBZSxhQUFZLHlCQUF5QjtBQUFBLElBQ3JGO0FBRUEsU0FBSyxvQkFBb0Isb0JBQW9CLFNBQVMsS0FBSyxlQUFlO0FBRTFFLFVBQU0sS0FBSyxLQUFLLGNBQWMsT0FBTyxFQUFFLFFBQVEsWUFBWTtBQUUzRCxTQUFLLG9CQUFvQixPQUFPO0FBQ2hDLFNBQUssY0FBYyxNQUFNLFVBQVU7QUFFbkMsU0FBSyxxQkFBcUI7QUFDMUIsU0FBSyxnQkFBZ0I7QUFDckIsU0FBSyx1QkFBdUI7QUFDNUIsU0FBSyxxQkFBcUI7QUFDMUIsU0FBSyxxQkFBcUI7QUFDMUIsU0FBSyxpQkFBaUI7QUFDdEIsU0FBSyxPQUFPO0FBQ1osU0FBSyxlQUFlO0FBQUEsRUFDeEI7QUFBQSxFQUVBLGlCQUFpQjtBQUNiLFVBQU0sRUFBRSxvQkFBb0IsZUFBZSxvQkFBb0IsZUFBZSxPQUFPLElBQUk7QUFDekYsUUFBSSxFQUFFLDhCQUE4QixnQkFBaUI7QUFDckQsUUFBSSxFQUFFLHlCQUF5QixtQkFBb0I7QUFDbkQsUUFBSSxFQUFFLDhCQUE4QixnQkFBaUI7QUFFckQsVUFBTSxnQkFBZ0IsT0FBTyxpQkFBaUIsYUFBYTtBQUUzRCxRQUFJLGNBQWMsU0FBUyxjQUFjLFVBQVUsVUFBVSxjQUFjLFVBQVUsT0FBTztBQUN4Rix5QkFBbUIsTUFBTSxRQUFRLGNBQWM7QUFBQSxJQUNuRDtBQUVBLGtCQUFjLE1BQU0sT0FBTyxjQUFjO0FBQ3pDLFFBQUkscUJBQXFCLElBQUksR0FBRztBQUM1QixZQUFNLGNBQWMsbUJBQW1CLFNBQVMsQ0FBQztBQUNqRCxZQUFNLFNBQVMsY0FBYyxpQkFBaUIsZUFBZSxXQUFXLElBQUk7QUFDNUUsVUFBSSxPQUFRLG9CQUFtQixNQUFNLFNBQVM7QUFBQSxJQUNsRCxPQUFPO0FBQ0gseUJBQW1CLE1BQU0sWUFBWSxHQUFHLE9BQU8sZ0JBQWdCO0FBQUEsSUFDbkU7QUFBQSxFQUNKO0FBQUEsRUFFQSxrQkFBa0I7QUFDZCxRQUFJLEVBQUUsS0FBSyw4QkFBOEIsZ0JBQWlCO0FBRTFELFVBQU0sZ0JBQWdCLHFCQUFxQixJQUFJO0FBQy9DLFVBQU0sU0FBUyxnQkFBZ0IsT0FBTyxLQUFLO0FBRTNDLFNBQUssbUJBQW1CLFVBQVUsT0FBTyxRQUFRLE1BQU07QUFDdkQsU0FBSyxtQkFBbUIsVUFBVSxPQUFPLFdBQVcsYUFBYTtBQUNqRSxTQUFLLG1CQUFtQixVQUFVLE9BQU8sWUFBWSxpQkFBaUIsSUFBSSxDQUFDO0FBRTNFLFFBQUksS0FBSyx5QkFBeUIsbUJBQW1CO0FBQ2pELFdBQUssY0FBYyxhQUFhLGlCQUFpQixPQUFPLE1BQU0sQ0FBQztBQUFBLElBQ25FO0FBRUEsUUFBSSxLQUFLLDhCQUE4QixnQkFBZ0I7QUFDbkQsV0FBSyxtQkFBbUIsYUFBYSx3QkFBd0IsT0FBTyxpQkFBaUIsSUFBSSxDQUFDLENBQUM7QUFDM0YsV0FBSyxtQkFBbUIsV0FBVyxTQUFTLElBQUk7QUFBQSxJQUNwRDtBQUVBLFNBQUssa0JBQWtCO0FBQUEsRUFDM0I7QUFBQSxFQUVBLHNCQUFzQjtBQUNsQixVQUFNLEVBQUUsb0JBQW9CLGNBQWMsSUFBSTtBQUM5QyxRQUFJLEVBQUUsOEJBQThCLGdCQUFpQjtBQUVyRCxVQUFNLEtBQUssbUJBQW1CLFFBQVEsRUFBRSxRQUFRLFFBQU07QUFDbEQsVUFBSSxFQUFFLGNBQWMsZ0JBQWlCO0FBQ3JDLFNBQUcsVUFBVSxPQUFPLFVBQVU7QUFDOUIsU0FBRyxhQUFhLGlCQUFpQixPQUFPO0FBQUEsSUFDNUMsQ0FBQztBQUVELFVBQU0sS0FBSyxjQUFjLE9BQU8sRUFBRSxRQUFRLGtCQUFnQjtBQUN0RCxVQUFJLENBQUMsYUFBYSxTQUFVO0FBQzVCLFVBQUksb0JBQW9CLFlBQVksRUFBRztBQUN2QyxZQUFNLEtBQUssc0JBQXNCLFlBQVk7QUFDN0MsVUFBSSxVQUFVLElBQUksVUFBVTtBQUM1QixVQUFJLGFBQWEsaUJBQWlCLE1BQU07QUFBQSxJQUM1QyxDQUFDO0FBQUEsRUFDTDtBQUFBLEVBRUEsc0JBQXNCO0FBQ2xCLFVBQU0sRUFBRSxvQkFBb0IsZUFBZSxlQUFlLG1CQUFtQixJQUFJO0FBQ2pGLFFBQUksRUFBRSw4QkFBOEIsZ0JBQWlCO0FBRXJELHVCQUFtQixVQUFVLE9BQU8sWUFBWSxjQUFjLFFBQVE7QUFFdEUsUUFBSSx5QkFBeUIsbUJBQW1CO0FBQzVDLG9CQUFjLFdBQVcsY0FBYztBQUN2QyxvQkFBYyxhQUFhLGlCQUFpQixPQUFPLGNBQWMsUUFBUSxDQUFDO0FBQUEsSUFDOUU7QUFFQSxRQUFJLDhCQUE4QixrQkFBa0I7QUFDaEQseUJBQW1CLFdBQVcsY0FBYztBQUFBLElBQ2hEO0FBRUEsVUFBTSxLQUFLLGNBQWMsT0FBTyxFQUFFLFFBQVEsa0JBQWdCO0FBQ3RELFlBQU0sS0FBSyxzQkFBc0IsWUFBWTtBQUM3QyxVQUFJLFVBQVUsT0FBTyxZQUFZLGFBQWEsUUFBUTtBQUN0RCxVQUFJLGFBQWEsaUJBQWlCLE9BQU8sYUFBYSxRQUFRLENBQUM7QUFBQSxJQUNuRSxDQUFDO0FBQUEsRUFDTDtBQUFBLEVBRUEsb0JBQW9CO0FBQ2hCLFVBQU0sRUFBRSxlQUFlLGNBQWMsSUFBSTtBQUN6QyxRQUFJLEVBQUUseUJBQXlCLG1CQUFvQjtBQUVuRCxVQUFNLFVBQVUsY0FBYyxjQUFjLDRCQUE0QjtBQUN4RSxRQUFJLEVBQUUsbUJBQW1CLGlCQUFrQjtBQUUzQyxVQUFNLGlCQUNGLGNBQWMsZ0JBQWdCLENBQUMsS0FDL0IsY0FBYyxRQUFRLGNBQWMsYUFBYSxLQUNqRDtBQUVKLFVBQU0sUUFBUyxvQkFBb0IsY0FBYyxLQUFLLEtBQUssT0FDckQsS0FDQSxnQkFBZ0IsYUFBYSxLQUFLLEtBQUs7QUFFN0MsWUFBUSxjQUFjO0FBQ3RCLGtCQUFjLFFBQVE7QUFDdEIsa0JBQWMsYUFBYSxjQUFjLFFBQVEsYUFBYSxLQUFLLEtBQUssa0JBQWtCO0FBQUEsRUFDOUY7QUFBQSxFQUVBLHlCQUF5QjtBQUNyQixVQUFNLEVBQUUsb0JBQW9CLGFBQWEsSUFBSTtBQUM3QyxRQUFJLEVBQUUsOEJBQThCLGdCQUFpQjtBQUVyRCxRQUFJLENBQUMsY0FBYztBQUNmLHlCQUFtQixnQkFBZ0IsdUJBQXVCO0FBQzFEO0FBQUEsSUFDSjtBQUVBLFVBQU0sS0FBSyxzQkFBc0IsWUFBWTtBQUM3QyxRQUFJLEVBQUUsY0FBYyxpQkFBaUI7QUFDakMseUJBQW1CLGdCQUFnQix1QkFBdUI7QUFDMUQ7QUFBQSxJQUNKO0FBRUEsdUJBQW1CLGFBQWEseUJBQXlCLEdBQUcsRUFBRTtBQUFBLEVBQ2xFO0FBQUEsRUFFQSwwQkFBMEI7QUFDdEIsVUFBTSxFQUFFLG9CQUFvQixhQUFhLElBQUk7QUFDN0MsUUFBSSxFQUFFLDhCQUE4QixnQkFBaUI7QUFFckQsVUFBTSxLQUFLLG1CQUFtQixRQUFRLEVBQUUsUUFBUSxRQUFNO0FBQ2xELFVBQUksY0FBYyxlQUFnQixJQUFHLFVBQVUsT0FBTyxRQUFRO0FBQUEsSUFDbEUsQ0FBQztBQUVELFFBQUksY0FBYztBQUNkLDRCQUFzQixZQUFZLEdBQUcsVUFBVSxJQUFJLFFBQVE7QUFBQSxJQUMvRDtBQUFBLEVBQ0o7QUFBQSxFQUVBLFVBQVU7QUFDTixTQUFLLG9CQUFvQjtBQUN6QixTQUFLLG9CQUFvQjtBQUN6QixTQUFLLGdCQUFnQjtBQUNyQixTQUFLLGVBQWU7QUFDcEIsZUFBVyxVQUFVLEtBQUssU0FBUztBQUMvQixhQUFPLFNBQVM7QUFBQSxJQUNwQjtBQUFBLEVBQ0o7QUFBQSxFQUVBLFdBQVcsTUFBYztBQUNyQixVQUFNLEVBQUUsZUFBZSxJQUFJO0FBQzNCLFFBQUksRUFBRSwwQkFBMEIsZ0JBQWlCO0FBQ2pELG1CQUFlLGNBQWM7QUFHN0IsV0FBTyxXQUFXLE1BQU07QUFDcEIsVUFBSSxLQUFLLG1CQUFtQixnQkFBZ0I7QUFDeEMsdUJBQWUsY0FBYztBQUFBLE1BQ2pDO0FBQUEsSUFDSixHQUFHLENBQUM7QUFBQSxFQUNSO0FBQUEsRUFFQSxlQUFlO0FBQ1gsUUFBSSxFQUFFLEtBQUssMEJBQTBCLGdCQUFpQjtBQUN0RCxTQUFLLGVBQWUsY0FBYztBQUFBLEVBQ3RDO0FBQUEsRUFFQSxlQUFlO0FBQ1gsUUFBSSxLQUFLLGNBQWMsU0FBVTtBQUNqQyxRQUFJLHFCQUFxQixJQUFJLEVBQUc7QUFFaEMsU0FBSyxPQUFPO0FBQ1osU0FBSyxnQkFBZ0I7QUFDckIsZUFBVyxVQUFVLEtBQUssU0FBUztBQUMvQixhQUFPLFNBQVM7QUFBQSxJQUNwQjtBQUFBLEVBQ0o7QUFBQSxFQUVBLGdCQUFnQjtBQUNaLFFBQUkscUJBQXFCLElBQUksRUFBRztBQUNoQyxRQUFJLENBQUMsS0FBSyxLQUFNO0FBRWhCLFNBQUssT0FBTztBQUNaLGVBQVcsVUFBVSxLQUFLLFNBQVM7QUFDL0IsYUFBTyxVQUFVO0FBQUEsSUFDckI7QUFDQSxTQUFLLEtBQUssY0FBYyxTQUFTLEdBQUcsVUFBVSxPQUFPLFFBQVE7QUFDN0QsU0FBSyxnQkFBZ0I7QUFBQSxFQUN6QjtBQUFBLEVBRUEsaUJBQWlCO0FBQ2IsUUFBSSxxQkFBcUIsSUFBSSxFQUFHO0FBQ2hDLFNBQUssT0FBTyxLQUFLLGNBQWMsSUFBSSxLQUFLLGFBQWE7QUFBQSxFQUN6RDtBQUFBLEVBRUEsMkJBQTJCO0FBQ3ZCLFNBQUssYUFBYTtBQUVsQixVQUFNLEVBQUUsbUJBQW1CLElBQUk7QUFDL0IsUUFBSSxFQUFFLDhCQUE4QixnQkFBaUI7QUFFckQsdUJBQW1CLFdBQVc7QUFDOUIsdUJBQW1CLE1BQU07QUFDekIseUJBQXFCLEtBQUssWUFBWTtBQUFBLEVBQzFDO0FBQUEsRUFFQSw4QkFBOEI7QUFDMUIsU0FBSyxjQUFjO0FBQ25CLFNBQUssZUFBZSxNQUFNO0FBQUEsRUFDOUI7QUFBQSxFQUVBLDJCQUEyQjtBQUN2QixXQUFPLE1BQU0sS0FBSyxLQUFLLGNBQWMsT0FBTyxFQUFFLE9BQU8sU0FBTztBQUN4RCxVQUFJLElBQUksU0FBVSxRQUFPO0FBQ3pCLGFBQU8sc0JBQXNCLEdBQUcsYUFBYTtBQUFBLElBQ2pELENBQUM7QUFBQSxFQUNMO0FBQUEsRUFFQSxnQkFBZ0IsY0FBNkMsU0FBUyxNQUFNO0FBQ3hFLFNBQUssZUFBZTtBQUNwQixTQUFLLHVCQUF1QjtBQUM1QixTQUFLLHdCQUF3QjtBQUM3QixRQUFJLE9BQVEsc0JBQXFCLFlBQVk7QUFBQSxFQUNqRDtBQUFBLEVBRUEsaUJBQWlCLE9BQWU7QUFDNUIsVUFBTSxVQUFVLEtBQUsseUJBQXlCO0FBQzlDLFFBQUksUUFBUSxXQUFXLEVBQUc7QUFFMUIsVUFBTSxlQUFlLEtBQUssZUFBZSxRQUFRLFFBQVEsS0FBSyxZQUFZLElBQUk7QUFDOUUsVUFBTSxZQUFZLGlCQUFpQixLQUM1QixTQUFTLElBQUksSUFBSSxRQUFRLFNBQVMsSUFDbkMsS0FBSyxJQUFJLEdBQUcsS0FBSyxJQUFJLFFBQVEsU0FBUyxHQUFHLGVBQWUsS0FBSyxDQUFDO0FBRXBFLFNBQUssZ0JBQWdCLFFBQVEsU0FBUyxDQUFDO0FBQUEsRUFDM0M7QUFBQSxFQUVBLHFCQUFxQixVQUEyQjtBQUM1QyxVQUFNLFVBQVUsS0FBSyx5QkFBeUI7QUFDOUMsUUFBSSxRQUFRLFdBQVcsRUFBRztBQUMxQixTQUFLLGdCQUFnQixhQUFhLFVBQVUsUUFBUSxDQUFDLElBQUksUUFBUSxRQUFRLFNBQVMsQ0FBQyxDQUFDO0FBQUEsRUFDeEY7QUFBQSxFQUVBLGtCQUFrQjtBQUNkLFVBQU0sRUFBRSxtQkFBbUIsSUFBSTtBQUMvQixRQUFJLEVBQUUsOEJBQThCLGdCQUFpQixRQUFPO0FBRTVELFVBQU0sY0FBYyxNQUFNLEtBQUssbUJBQW1CLGlCQUFpQixzQkFBc0IsQ0FBQyxFQUNyRixLQUFLLFFBQU0sY0FBYyxjQUFjO0FBQzVDLFFBQUksRUFBRSx1QkFBdUIsZ0JBQWlCLFFBQU87QUFFckQsVUFBTSxlQUFlLFlBQVksZ0JBQWdCO0FBQ2pELFdBQU8sS0FBSyxJQUFJLEdBQUcsS0FBSyxNQUFNLG1CQUFtQixlQUFlLFlBQVksQ0FBQztBQUFBLEVBQ2pGO0FBQUEsRUFFQSxpQkFBaUIsV0FBbUI7QUFDaEMsU0FBSyxpQkFBaUIsS0FBSyxnQkFBZ0IsSUFBSSxTQUFTO0FBQUEsRUFDNUQ7QUFBQSxFQUVBLDhCQUE4QjtBQUMxQixVQUFNLEVBQUUsY0FBYyxjQUFjLElBQUk7QUFDeEMsUUFBSSxDQUFDLGdCQUFnQixhQUFhLFNBQVU7QUFFNUMsUUFBSSxjQUFjLFVBQVU7QUFDeEIsbUJBQWEsV0FBVyxDQUFDLGFBQWE7QUFBQSxJQUMxQyxPQUFPO0FBQ0gsb0JBQWMsZ0JBQWdCLE1BQU0sS0FBSyxjQUFjLE9BQU8sRUFBRSxRQUFRLFlBQVk7QUFBQSxJQUN4RjtBQUVBLGtCQUFjLGNBQWMsSUFBSSxNQUFNLFVBQVUsRUFBRSxTQUFTLEtBQUssQ0FBQyxDQUFDO0FBQUEsRUFDdEU7QUFBQSxFQUVRLGNBQWM7QUFDbEIsUUFBSSxFQUFFLEtBQUsseUJBQXlCLG1CQUFvQjtBQUN4RCxRQUFJLEVBQUUsS0FBSyw4QkFBOEIsZ0JBQWlCO0FBRTFELFVBQU0sVUFBeUI7QUFBQSxNQUMzQixlQUFlLEtBQUs7QUFBQSxNQUNwQixlQUFlLEtBQUs7QUFBQSxNQUNwQixvQkFBb0IsS0FBSztBQUFBLE1BQ3pCLG9CQUFvQixLQUFLO0FBQUEsTUFDekIsWUFBWSxDQUFDLFNBQVMsS0FBSyxXQUFXLElBQUk7QUFBQSxNQUMxQyxjQUFjLE1BQU0sS0FBSyxhQUFhO0FBQUEsTUFDdEMsSUFBSSxDQUFDLFFBQVEsT0FBTyxZQUFZO0FBQzVCLGVBQU8saUJBQWlCLE9BQU8sT0FBTztBQUN0QyxhQUFLLGdCQUFnQixLQUFLLEVBQUUsUUFBUSxPQUFPLFFBQVEsQ0FBQztBQUFBLE1BQ3hEO0FBQUEsSUFDSjtBQUVBLGVBQVcsVUFBVSxLQUFLLFNBQVM7QUFDL0IsYUFBTyxLQUFLLE9BQU87QUFBQSxJQUN2QjtBQUFBLEVBQ0o7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtRLGFBQWE7QUFDakIsVUFBTSxFQUFFLG9CQUFvQixlQUFlLHNCQUFzQixvQkFBb0IsZUFBZSxtQkFBbUIsSUFBSTtBQUUzSCxRQUFJLEVBQUUsOEJBQThCLGdCQUFpQjtBQUNyRCxRQUFJLEVBQUUsZ0NBQWdDLGdCQUFpQjtBQUN2RCxRQUFJLEVBQUUsOEJBQThCLGdCQUFpQjtBQUNyRCxRQUFJLEVBQUUseUJBQXlCLG1CQUFvQjtBQUVuRCxVQUFNLGlCQUFnQyxXQUFTO0FBQzNDLFlBQU0sU0FBUyxNQUFNO0FBQ3JCLFVBQUksRUFBRSxrQkFBa0IsU0FBVTtBQUVsQyxZQUFNLFdBQVcsT0FBTyxRQUFRLHNCQUFzQjtBQUN0RCxVQUFJLEVBQUUsb0JBQW9CLGdCQUFpQjtBQUMzQyxVQUFJLENBQUMscUJBQXFCLFNBQVMsUUFBUSxFQUFHO0FBQzlDLFVBQUksU0FBUyxVQUFVLFNBQVMsVUFBVSxFQUFHO0FBRTdDLFlBQU0sZUFBZSx1QkFBdUIsUUFBUTtBQUNwRCxVQUFJLENBQUMsZ0JBQWdCLGFBQWEsU0FBVTtBQUU1QyxXQUFLLGdCQUFnQixjQUFjLEtBQUs7QUFFeEMsVUFBSSxjQUFjLFVBQVU7QUFDeEIscUJBQWEsV0FBVyxDQUFDLGFBQWE7QUFBQSxNQUMxQyxPQUFPO0FBQ0gsc0JBQWMsZ0JBQWdCLE1BQU0sS0FBSyxjQUFjLE9BQU8sRUFBRSxRQUFRLFlBQVk7QUFBQSxNQUN4RjtBQUVBLG9CQUFjLGNBQWMsSUFBSSxNQUFNLFVBQVUsRUFBRSxTQUFTLEtBQUssQ0FBQyxDQUFDO0FBQ2xFLFdBQUssY0FBYztBQUFBLElBQ3ZCO0FBRUEsVUFBTSxpQkFBZ0MsTUFBTSxLQUFLLFFBQVE7QUFDekQsVUFBTSxnQkFBK0IsTUFBTSxLQUFLLGVBQWU7QUFFL0QsVUFBTSxrQkFBaUMsV0FBUztBQUM1QyxVQUFJLEVBQUUsaUJBQWlCLGVBQWdCO0FBRXZDLGNBQVEsTUFBTSxLQUFLO0FBQUEsUUFDZixLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQixlQUFLLHlCQUF5QjtBQUM5QixlQUFLLGlCQUFpQixDQUFDO0FBQ3ZCO0FBQUEsUUFDSixLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQixlQUFLLHlCQUF5QjtBQUM5QixlQUFLLGlCQUFpQixFQUFFO0FBQ3hCO0FBQUEsUUFDSixLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQixlQUFLLHlCQUF5QjtBQUM5QixlQUFLLHFCQUFxQixPQUFPO0FBQ2pDO0FBQUEsUUFDSixLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQixlQUFLLHlCQUF5QjtBQUM5QixlQUFLLHFCQUFxQixLQUFLO0FBQy9CO0FBQUEsUUFDSixLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQixlQUFLLHlCQUF5QjtBQUM5QixlQUFLLGlCQUFpQixDQUFDO0FBQ3ZCO0FBQUEsUUFDSixLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQixlQUFLLHlCQUF5QjtBQUM5QixlQUFLLGlCQUFpQixFQUFFO0FBQ3hCO0FBQUEsUUFDSixLQUFLO0FBQUEsUUFDTCxLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQixlQUFLLE9BQU8sS0FBSyw0QkFBNEIsSUFBSSxLQUFLLHlCQUF5QjtBQUMvRTtBQUFBLE1BQ1I7QUFBQSxJQUNKO0FBRUEsVUFBTSxtQkFBa0MsV0FBUztBQUM3QyxVQUFJLEVBQUUsaUJBQWlCLGVBQWdCO0FBRXZDLGNBQVEsTUFBTSxLQUFLO0FBQUEsUUFDZixLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQixlQUFLLGlCQUFpQixDQUFDO0FBQ3ZCO0FBQUEsUUFDSixLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQixlQUFLLGlCQUFpQixFQUFFO0FBQ3hCO0FBQUEsUUFDSixLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQixlQUFLLHFCQUFxQixPQUFPO0FBQ2pDO0FBQUEsUUFDSixLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQixlQUFLLHFCQUFxQixLQUFLO0FBQy9CO0FBQUEsUUFDSixLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQixlQUFLLGlCQUFpQixDQUFDO0FBQ3ZCO0FBQUEsUUFDSixLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQixlQUFLLGlCQUFpQixFQUFFO0FBQ3hCO0FBQUEsUUFDSixLQUFLO0FBQUEsUUFDTCxLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQixlQUFLLDRCQUE0QjtBQUNqQyxjQUFJLENBQUMsY0FBYyxTQUFVLE1BQUssNEJBQTRCO0FBQzlEO0FBQUEsUUFDSixLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQixlQUFLLDRCQUE0QjtBQUNqQztBQUFBLE1BQ1I7QUFBQSxJQUNKO0FBRUEsVUFBTSxrQkFBaUMsV0FBUztBQUM1QyxVQUFJLEVBQUUsaUJBQWlCLGVBQWdCO0FBRXZDLGNBQVEsTUFBTSxLQUFLO0FBQUEsUUFDZixLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQiw2QkFBbUIsTUFBTTtBQUN6QixlQUFLLGlCQUFpQixDQUFDO0FBQ3ZCO0FBQUEsUUFDSixLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQiw2QkFBbUIsTUFBTTtBQUN6QixlQUFLLGlCQUFpQixFQUFFO0FBQ3hCO0FBQUEsUUFDSixLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQiw2QkFBbUIsTUFBTTtBQUN6QixlQUFLLHFCQUFxQixPQUFPO0FBQ2pDO0FBQUEsUUFDSixLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQiw2QkFBbUIsTUFBTTtBQUN6QixlQUFLLHFCQUFxQixLQUFLO0FBQy9CO0FBQUEsUUFDSixLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQiw2QkFBbUIsTUFBTTtBQUN6QixlQUFLLGlCQUFpQixDQUFDO0FBQ3ZCO0FBQUEsUUFDSixLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQiw2QkFBbUIsTUFBTTtBQUN6QixlQUFLLGlCQUFpQixFQUFFO0FBQ3hCO0FBQUEsUUFDSixLQUFLO0FBQ0QsZ0JBQU0sZUFBZTtBQUNyQixlQUFLLDRCQUE0QjtBQUNqQztBQUFBLE1BQ1I7QUFBQSxJQUNKO0FBRUEseUJBQXFCLGlCQUFpQixTQUFTLGNBQWM7QUFDN0Qsa0JBQWMsaUJBQWlCLFVBQVUsY0FBYztBQUN2RCxrQkFBYyxpQkFBaUIsU0FBUyxhQUFhO0FBQ3JELGtCQUFjLGlCQUFpQixXQUFXLGVBQWU7QUFDekQsdUJBQW1CLGlCQUFpQixXQUFXLGdCQUFnQjtBQUUvRCxRQUFJLDhCQUE4QixrQkFBa0I7QUFDaEQseUJBQW1CLGlCQUFpQixXQUFXLGVBQWU7QUFDOUQsV0FBSyxrQkFBa0I7QUFBQSxJQUMzQjtBQUVBLFNBQUssaUJBQWlCO0FBQ3RCLFNBQUssaUJBQWlCO0FBQ3RCLFNBQUssZ0JBQWdCO0FBQ3JCLFNBQUssa0JBQWtCO0FBQ3ZCLFNBQUssbUJBQW1CO0FBRXhCLFNBQUssUUFBUTtBQUFBLEVBQ2pCO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLUSxpQkFBaUI7QUFDckIsVUFBTSxFQUFFLGVBQWUsbUJBQW1CLElBQUk7QUFDOUMsUUFBSSxFQUFFLDhCQUE4QixnQkFBaUI7QUFFckQsVUFBTSxXQUFXLElBQUksaUJBQWlCLGtCQUFnQjtBQUNsRCxVQUFJLGdCQUFnQjtBQUNwQixVQUFJLG9CQUFvQjtBQUV4QixpQkFBVyxZQUFZLGNBQWM7QUFDakMsWUFBSSxTQUFTLFNBQVMsYUFBYTtBQUMvQiwwQkFBZ0I7QUFDaEIsOEJBQW9CO0FBQUEsUUFDeEI7QUFDQSxZQUFJLFNBQVMsU0FBUyxjQUFjO0FBQ2hDLDhCQUFvQjtBQUFBLFFBQ3hCO0FBQUEsTUFDSjtBQUVBLFVBQUksZUFBZTtBQUNmLGNBQU0sS0FBSyxtQkFBbUIsUUFBUSxFQUFFLFFBQVEsV0FBUztBQUNyRCxjQUFJLEVBQUUsaUJBQWlCLGdCQUFpQjtBQUN4QyxnQkFBTSxlQUFlLHVCQUF1QixLQUFLO0FBQ2pELGNBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEtBQUssY0FBYyxPQUFPLEVBQUUsU0FBUyxZQUFZLEdBQUc7QUFDNUUsZ0JBQUksYUFBYyxjQUFhLFlBQVk7QUFDM0Msa0JBQU0sT0FBTztBQUFBLFVBQ2pCO0FBQUEsUUFDSixDQUFDO0FBRUQsY0FBTSxLQUFLLGNBQWMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxjQUFjLGdCQUFnQjtBQUNyRSxjQUFJLEtBQUssc0JBQXNCLFlBQVk7QUFFM0MsY0FBSSxFQUFFLGNBQWMsaUJBQWlCO0FBQ2pDLGlCQUFLLHlCQUF5QixNQUFNLGNBQWMsV0FBVztBQUM3RCx1QkFBVyxjQUFjLEVBQUU7QUFBQSxVQUMvQjtBQUVBLGFBQUcsS0FBSyxZQUFZLE1BQU0sV0FBVztBQUVyQyxnQkFBTSxpQkFBaUIsbUJBQW1CLFNBQVMsV0FBVztBQUM5RCxjQUFJLG1CQUFtQixJQUFJO0FBQ3ZCLDZCQUFpQixlQUFlLE9BQU8sRUFBRSxJQUFJLG1CQUFtQixZQUFZLEVBQUU7QUFBQSxVQUNsRjtBQUFBLFFBQ0osQ0FBQztBQUVELGNBQU0sS0FBSyxtQkFBbUIsUUFBUSxFQUFFLFFBQVEsV0FBUztBQUNyRCxjQUFJLGlCQUFpQixrQkFBa0IsQ0FBQyx1QkFBdUIsS0FBSyxHQUFHO0FBQ25FLGtCQUFNLE9BQU87QUFBQSxVQUNqQjtBQUFBLFFBQ0osQ0FBQztBQUFBLE1BQ0w7QUFFQSxVQUFJLG1CQUFtQjtBQUNuQixhQUFLLFFBQVE7QUFBQSxNQUNqQjtBQUFBLElBQ0osQ0FBQztBQUVELGFBQVMsUUFBUSxlQUFlO0FBQUEsTUFDNUIsV0FBVztBQUFBLE1BQ1gsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osaUJBQWlCLENBQUMsU0FBUyxTQUFTLFlBQVksWUFBWSxNQUFNO0FBQUEsSUFDdEUsQ0FBQztBQUVELFNBQUssaUJBQWlCO0FBQUEsRUFDMUI7QUFBQSxFQUVRLFNBQVM7QUFDYixVQUFNLEVBQUUsZUFBZSxvQkFBb0IsbUJBQW1CLElBQUk7QUFDbEUsUUFBSSxFQUFFLDhCQUE4QixnQkFBaUI7QUFFckQsa0JBQWMsTUFBTSxVQUFVO0FBQzlCLGtCQUFjLE1BQU0sa0JBQWtCO0FBQUEsRUFDMUM7QUF5Qko7QUFBQTtBQUFBO0FBQUE7QUFqdEJNLGFBSWEsbUJBQW1CLG9CQUFJLElBQWlCO0FBSjNELElBQU0sY0FBTjtBQTR0Qk8sU0FBUyxZQUFZLE9BQWlCLFVBQVUsVUFBOEIsQ0FBQyxHQUFlO0FBQ2pHLFFBQU0sVUFBVSxRQUFRLFdBQVcsQ0FBQztBQUNwQyxxQkFBbUIsTUFBTSxPQUFPO0FBRWhDLE1BQUk7QUFFSixNQUFJLFFBQVEsU0FBUztBQUNqQixtQkFBZSxJQUFJLGlCQUFpQixrQkFBZ0I7QUFDaEQsaUJBQVcsWUFBWSxjQUFjO0FBQ2pDLFlBQUksU0FBUyxTQUFTLFlBQWE7QUFFbkMsaUJBQVMsV0FBVyxRQUFRLGVBQWE7QUFDckMsY0FBSSxFQUFFLHFCQUFxQixTQUFVO0FBRXJDLGNBQUkscUJBQXFCLG1CQUFtQjtBQUN4QywrQkFBbUIsV0FBVyxNQUFNLE9BQU87QUFDM0M7QUFBQSxVQUNKO0FBRUEsb0JBQVUsaUJBQW9DLFFBQVEsRUFBRSxRQUFRLFFBQU07QUFDbEUsK0JBQW1CLElBQUksTUFBTSxPQUFPO0FBQUEsVUFDeEMsQ0FBQztBQUFBLFFBQ0wsQ0FBQztBQUFBLE1BQ0w7QUFBQSxJQUNKLENBQUM7QUFFRCxpQkFBYSxRQUFRLE1BQU0sRUFBRSxXQUFXLE1BQU0sU0FBUyxLQUFLLENBQUM7QUFBQSxFQUNqRTtBQUVBLFNBQU8sTUFBTTtBQUNULGtCQUFjLFdBQVc7QUFFekIsNEJBQXdCLElBQUksRUFBRSxRQUFRLG1CQUFpQjtBQUNuRCxZQUFNLFdBQVcsVUFBVSxJQUFJLGFBQWE7QUFDNUMsVUFBSSxDQUFDLFNBQVU7QUFDZixlQUFTLFFBQVE7QUFDakIsZ0JBQVUsT0FBTyxhQUFhO0FBQUEsSUFDbEMsQ0FBQztBQUFBLEVBQ0w7QUFDSjtBQUVBLFNBQVMsZUFBZTtBQUNwQixNQUFJLFNBQVMsY0FBYyxtQ0FBbUMsRUFBRztBQUVqRSxRQUFNLGVBQWUsU0FBUyxjQUFjLE9BQU87QUFDbkQsZUFBYSxhQUFhLDRCQUE0QixNQUFNO0FBQzVELGVBQWEsY0FBYyxVQUFVO0FBQ3JDLFdBQVMsS0FBSyxZQUFZLFlBQVk7QUFDMUM7QUFFQSxTQUFTLHdCQUF3QixNQUFnQjtBQUM3QyxTQUFPLE1BQU0sS0FBSyxLQUFLLGlCQUFvQyxRQUFRLENBQUM7QUFDeEU7QUFFQSxTQUFTLG1CQUFtQixNQUFnQixTQUFtQjtBQUMzRCwwQkFBd0IsSUFBSSxFQUFFLFFBQVEsbUJBQWlCLG1CQUFtQixlQUFlLE1BQU0sT0FBTyxDQUFDO0FBQzNHO0FBRUEsU0FBUyxtQkFBbUIsZUFBa0MsTUFBZ0IsU0FBbUI7QUFDN0YsTUFBSSxVQUFVLElBQUksYUFBYSxFQUFHO0FBRWxDLFFBQU0sV0FBVyxJQUFJLFlBQVksZUFBZSxVQUFVLGFBQWEsR0FBRyxNQUFNLE9BQU87QUFDdkYsV0FBUyxNQUFNO0FBQ2YsWUFBVSxJQUFJLGVBQWUsUUFBUTtBQUN6QzsiLAogICJuYW1lcyI6IFtdCn0K