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
    }
    
    .worse-select-container {
        position: relative;
        display: inline-block;
        min-width: 0;
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
        height: ${DEFAULT_CONFIG.height};
        padding: 0 28px 0 8px;
        border: 1px solid var(--ws-border-color);
        border-radius: var(--ws-border-radius);
        background-color: var(--ws-bg);
        background-repeat: no-repeat;
        background-position: right 8px center;
        background-size: 10px 10px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%23333333' stroke-width='1.1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
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

    .worse-select-container.listbox .worse-select-header {
        display: none;
    }

    .worse-select-container.open .worse-select-header {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 7.5L6 4.5L9 7.5' stroke='%23333333' stroke-width='1.1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
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
        border: 1px solid var(--ws-border-color);
        border-radius: var(--ws-border-radius);
        background: var(--ws-bg);
        box-shadow: var(--ws-shadow);
        padding: 2px;
    }

    .worse-select-container.open .worse-select-options {
        display: block;
    }

    .worse-select-container.listbox .worse-select-options {
        position: relative;
        top: 0;
        left: 0;
        right: auto;
        display: block;
        box-shadow: none;
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
function applyFilter(context, searchTerm) {
  const term = searchTerm.trim().toLowerCase();
  Array.from(context.selectElement.options).forEach((selectOption) => {
    const el = getWorseOptionElement(selectOption);
    if (!(el instanceof HTMLDivElement)) return;
    const matches = term !== "" && el.textContent.toLowerCase().includes(term);
    el.classList.toggle("matches", matches);
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
        applyFilter(context, searchTerm);
      });
    },
    onSync() {
      if (!pluginContext) return;
      applyFilter(pluginContext, searchTerm);
    },
    onClose() {
      if (!pluginContext) return;
      searchTerm = "";
      const { searchInputElement } = pluginContext;
      if (searchInputElement instanceof HTMLInputElement) {
        searchInputElement.value = "";
      }
      applyFilter(pluginContext, "");
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
    this.open = false;
    this.plugins = [];
    this.pluginListeners = [];
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
  // --- Lifecycle ---
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
  // --- State sync ---
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
  // --- Message ---
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
  // --- Open / close ---
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
  // --- Navigation ---
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
  // --- Internal wiring ---
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
export {
  worseSelect
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3dvcnNlLXNlbGVjdC9pbnRlcm5hbC10eXBlcy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2Nzcy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2NvbmZpZy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L3NlbGVjdC1oZWxwZXJzLnRzIiwgIi4uL3NyYy93b3JzZS1zZWxlY3Qvb3B0aW9uLW1hcC50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2RvbS50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2ZlYXR1cmVzL3NlYXJjaC50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2NvcmUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTkZJRyA9IHtcbiAgICBzZWFyY2hhYmxlOiBmYWxzZSxcbiAgICBkcm9wZG93bkhlaWdodFB4OiA0MDAsXG4gICAgaGVpZ2h0OiAnMzJweCcsXG4gICAgd2lkdGg6ICcxMDAlJ1xufTtcblxuLy8gTWFwcyBlYWNoIGNvbmZpZyB2YWx1ZSB0byBpdHMgd2lkZW5lZCBwcmltaXRpdmUgdHlwZSAoZS5nLiB0cnVlIFx1MjE5MiBib29sZWFuKSBzbyB0aGF0XG4vLyBTZWxlY3RDb25maWcgYWNjZXB0cyBhbnkgdmFsaWQgdmFsdWUgb2YgdGhhdCB0eXBlLCBub3QganVzdCB0aGUgc3BlY2lmaWMgZGVmYXVsdCBsaXRlcmFsLlxuZXhwb3J0IHR5cGUgV2lkZW48VD4gPSBUIGV4dGVuZHMgYm9vbGVhbiA/IGJvb2xlYW4gOiBUIGV4dGVuZHMgc3RyaW5nID8gc3RyaW5nIDogVCBleHRlbmRzIG51bWJlciA/IG51bWJlciA6IFQ7XG5cbmV4cG9ydCB0eXBlIFNlbGVjdENvbmZpZyA9IHtcbiAgICBbSyBpbiBrZXlvZiB0eXBlb2YgREVGQVVMVF9DT05GSUddOiBXaWRlbjwodHlwZW9mIERFRkFVTFRfQ09ORklHKVtLXT5cbn07XG5cbmV4cG9ydCB0eXBlIENvbmZpZ0tleSA9IGtleW9mIFNlbGVjdENvbmZpZztcbmV4cG9ydCB0eXBlIFJvb3ROb2RlID0gUGFyZW50Tm9kZTtcblxuZXhwb3J0IHR5cGUgUGx1Z2luQ29udGV4dCA9IHtcbiAgICByZWFkb25seSBzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICByZWFkb25seSBoZWFkZXJFbGVtZW50OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICByZWFkb25seSBvcHRpb25zTGlzdEVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xuICAgIHJlYWRvbmx5IHNlYXJjaElucHV0RWxlbWVudD86IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgc2V0TWVzc2FnZSh0ZXh0OiBzdHJpbmcpOiB2b2lkO1xuICAgIGNsZWFyTWVzc2FnZSgpOiB2b2lkO1xuICAgIG9uKHRhcmdldDogRXZlbnRUYXJnZXQsIGV2ZW50OiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIpOiB2b2lkO1xufTtcblxuZXhwb3J0IHR5cGUgUGx1Z2luID0ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBpbml0KGNvbnRleHQ6IFBsdWdpbkNvbnRleHQpOiB2b2lkO1xuICAgIG9uU3luYz8oKTogdm9pZDtcbiAgICBvbk9wZW4/KCk6IHZvaWQ7XG4gICAgb25DbG9zZT8oKTogdm9pZDtcbiAgICBkZXN0cm95PygpOiB2b2lkO1xufTtcblxuZXhwb3J0IHR5cGUgV29yc2VTZWxlY3RPcHRpb25zID0ge1xuICAgIG9ic2VydmU/OiBib29sZWFuO1xuICAgIHBsdWdpbnM/OiBQbHVnaW5bXTtcbn07XG5cbi8vIE1pbmltYWwgaW50ZXJmYWNlIGV4cG9zZWQgdG8gZG9tLnRzIGFuZCBzZWxlY3QtaGVscGVycy50cy4gUmVzdHJpY3RzIHRob3NlIG1vZHVsZXMgdG8gdGhlXG4vLyBwcm9wZXJ0aWVzIHRoZXkgYWN0dWFsbHkgbmVlZCwga2VlcGluZyB0aGUgZnVsbCBXb3JzZVNlbGVjdCBjbGFzcyBpbnRlcm5hbCB0byBjb3JlLnRzLlxuZXhwb3J0IGludGVyZmFjZSBXb3JzZVNlbGVjdENvbnRleHQge1xuICAgIHNlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIGNvbmZpZzogU2VsZWN0Q29uZmlnO1xuICAgIGluc3RhbmNlSWQ6IHN0cmluZztcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQgeyBERUZBVUxUX0NPTkZJRyB9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ1NTKCkge1xuICAgIHJldHVybiAgLyogbGFuZ3VhZ2U9Q1NTICovIGBcbiAgICA6cm9vdCB7XG4gICAgICAgIC0td3MtYm9yZGVyLWNvbG9yOiAjNzY3Njc2O1xuICAgICAgICAtLXdzLWJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgLS13cy1iZzogI2ZmZjtcbiAgICAgICAgLS13cy10ZXh0LWNvbG9yOiBpbmhlcml0O1xuICAgICAgICAtLXdzLWRpc2FibGVkLWJnOiAjZjBmMGYwO1xuICAgICAgICAtLXdzLWRpc2FibGVkLXRleHQtY29sb3I6ICM2ZDZkNmQ7XG4gICAgICAgIC0td3MtaG92ZXItYmc6ICNmMWYxZjE7XG4gICAgICAgIC0td3MtYWN0aXZlLWJnOiAjZWVmNGZmO1xuICAgICAgICAtLXdzLWFjdGl2ZS1vdXRsaW5lOiAjMjU2M2ViO1xuICAgICAgICAtLXdzLXNlbGVjdGVkLWJnOiAjZDJlM2ZjO1xuICAgICAgICAtLXdzLXNlbGVjdGVkLXRleHQtY29sb3I6ICMxNzRlYTY7XG4gICAgICAgIC0td3MtZm9jdXMtb3V0bGluZTogIzI1NjNlYjtcbiAgICAgICAgLS13cy1zZWFyY2gtYm9yZGVyLWNvbG9yOiAjYjdiN2I3O1xuICAgICAgICAtLXdzLWRpdmlkZXItY29sb3I6ICNkMGQwZDA7XG4gICAgICAgIC0td3MtaGlnaGxpZ2h0LWJnOiAjZmZmM2EzO1xuICAgICAgICAtLXdzLXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTYpO1xuICAgIH1cbiAgICBcbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBtaW4td2lkdGg6IDA7XG4gICAgICAgIGZvbnQ6IGluaGVyaXQ7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy10ZXh0LWNvbG9yKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5saXN0Ym94IHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1oZWFkZXIge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB3aWR0aDogJHtERUZBVUxUX0NPTkZJRy53aWR0aH07XG4gICAgICAgIGhlaWdodDogJHtERUZBVUxUX0NPTkZJRy5oZWlnaHR9O1xuICAgICAgICBwYWRkaW5nOiAwIDI4cHggMCA4cHg7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXdzLWJvcmRlci1jb2xvcik7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXdzLWJvcmRlci1yYWRpdXMpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13cy1iZyk7XG4gICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IHJpZ2h0IDhweCBjZW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogMTBweCAxMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzEyJyBoZWlnaHQ9JzEyJyB2aWV3Qm94PScwIDAgMTIgMTInIGZpbGw9J25vbmUnJTNFJTNDcGF0aCBkPSdNMyA0LjVMNiA3LjVMOSA0LjUnIHN0cm9rZT0nJTIzMzMzMzMzJyBzdHJva2Utd2lkdGg9JzEuMScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJy8lM0UlM0Mvc3ZnJTNFXCIpO1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtdGV4dC1jb2xvcik7XG4gICAgICAgIGZvbnQ6IGluaGVyaXQ7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7XG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5saXN0Ym94IC53b3JzZS1zZWxlY3QtaGVhZGVyIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5vcGVuIC53b3JzZS1zZWxlY3QtaGVhZGVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMicgaGVpZ2h0PScxMicgdmlld0JveD0nMCAwIDEyIDEyJyBmaWxsPSdub25lJyUzRSUzQ3BhdGggZD0nTTMgNy41TDYgNC41TDkgNy41JyBzdHJva2U9JyUyMzMzMzMzMycgc3Ryb2tlLXdpZHRoPScxLjEnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcvJTNFJTNDL3N2ZyUzRVwiKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5kaXNhYmxlZCAud29yc2Utc2VsZWN0LWhlYWRlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdzLWRpc2FibGVkLWJnKTtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLWRpc2FibGVkLXRleHQtY29sb3IpO1xuICAgICAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9ucy1zY3JvbGxlcjpmb2N1cy12aXNpYmxlIHtcbiAgICAgICAgb3V0bGluZTogbm9uZSAhaW1wb3J0YW50O1xuICAgIH1cbiAgICBcbiAgICAud29yc2Utc2VsZWN0LWhlYWRlcjpmb2N1cy12aXNpYmxlLFxuICAgIC53b3JzZS1zZWxlY3Qtc2VhcmNoLWlucHV0OmZvY3VzLXZpc2libGUge1xuICAgICAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0td3MtZm9jdXMtb3V0bGluZSkgIWltcG9ydGFudDtcbiAgICAgICAgb3V0bGluZS1vZmZzZXQ6IDFweDtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbnMge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogY2FsYygxMDAlICsgMnB4KTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIHotaW5kZXg6IDEwMDA7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXdzLWJvcmRlci1jb2xvcik7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXdzLWJvcmRlci1yYWRpdXMpO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1iZyk7XG4gICAgICAgIGJveC1zaGFkb3c6IHZhcigtLXdzLXNoYWRvdyk7XG4gICAgICAgIHBhZGRpbmc6IDJweDtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5vcGVuIC53b3JzZS1zZWxlY3Qtb3B0aW9ucyB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLmxpc3Rib3ggLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHJpZ2h0OiBhdXRvO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LXNlYXJjaCB7XG4gICAgICAgIHBhZGRpbmc6IDRweDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLXdzLWRpdmlkZXItY29sb3IpO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAycHg7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1zZWFyY2gtaW5wdXQge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAzMnB4O1xuICAgICAgICBwYWRkaW5nOiAwIDhweDtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0td3Mtc2VhcmNoLWJvcmRlci1jb2xvcik7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXdzLWJvcmRlci1yYWRpdXMpO1xuICAgICAgICBmb250OiBpbmhlcml0O1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtdGV4dC1jb2xvcik7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWJnKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXIge1xuICAgICAgICBtYXgtaGVpZ2h0OiAke0RFRkFVTFRfQ09ORklHLmRyb3Bkb3duSGVpZ2h0UHh9cHg7XG4gICAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb24ge1xuICAgICAgICBwYWRkaW5nOiA0cHggOHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXRleHQtY29sb3IpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3MtaG92ZXItYmcpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLmFjdGl2ZSB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWFjdGl2ZS1iZyk7XG4gICAgICAgIG91dGxpbmU6IDFweCBzb2xpZCB2YXIoLS13cy1hY3RpdmUtb3V0bGluZSk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAtMXB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLnNlbGVjdGVkIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3Mtc2VsZWN0ZWQtYmcpO1xuICAgICAgICBjb2xvcjogdmFyKC0td3Mtc2VsZWN0ZWQtdGV4dC1jb2xvcik7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb24uc2VsZWN0ZWQuYWN0aXZlIHtcbiAgICAgICAgb3V0bGluZTogMXB4IHNvbGlkIHZhcigtLXdzLWFjdGl2ZS1vdXRsaW5lKTtcbiAgICAgICAgb3V0bGluZS1vZmZzZXQ6IC0xcHg7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb24uZGlzYWJsZWQge1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtZGlzYWJsZWQtdGV4dC1jb2xvcik7XG4gICAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWRpc2FibGVkLWJnKTtcbiAgICB9XG5cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLmhpZGRlbiB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuXG4gICAgLm1hdGNoZXMge1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1oaWdobGlnaHQtYmcpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtdmlzdWFsbHktaGlkZGVuIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogMXB4O1xuICAgICAgICBoZWlnaHQ6IDFweDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgbWFyZ2luOiAtMXB4O1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBjbGlwOiByZWN0KDAsIDAsIDAsIDApO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBib3JkZXI6IDA7XG4gICAgfVxuICAgIGA7XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHtDb25maWdLZXksIERFRkFVTFRfQ09ORklHLCBTZWxlY3RDb25maWd9IGZyb20gXCIuL2ludGVybmFsLXR5cGVzXCI7XG5cbmNvbnN0IGNvbmZpZ0tleXMgPSBPYmplY3Qua2V5cyhERUZBVUxUX0NPTkZJRykgYXMgQ29uZmlnS2V5W107XG5cbmZ1bmN0aW9uIHRvS2ViYWJDYXNlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvW0EtWl0vZywgY2hhcmFjdGVyID0+IGAtJHtjaGFyYWN0ZXIudG9Mb3dlckNhc2UoKX1gKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VDb25maWdWYWx1ZTxLIGV4dGVuZHMgQ29uZmlnS2V5PihrZXk6IEssIGF0dHI6IHN0cmluZyk6IFNlbGVjdENvbmZpZ1tLXSB7XG4gICAgY29uc3QgZGVmYXVsdFZhbHVlID0gREVGQVVMVF9DT05GSUdba2V5XTtcblxuICAgIGlmICh0eXBlb2YgZGVmYXVsdFZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgcmV0dXJuIChhdHRyID09PSAndHJ1ZScpIGFzIFNlbGVjdENvbmZpZ1tLXTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRlZmF1bHRWYWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcihhdHRyKSBhcyBTZWxlY3RDb25maWdbS107XG4gICAgfVxuXG4gICAgcmV0dXJuIGF0dHIgYXMgU2VsZWN0Q29uZmlnW0tdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29uZmlnKHNlbGVjdEVsZW1lbnQ6IEVsZW1lbnQpOiBTZWxlY3RDb25maWcge1xuICAgIGNvbnN0IGNvbmZpZzogU2VsZWN0Q29uZmlnID0geyAuLi5ERUZBVUxUX0NPTkZJRyB9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25maWdLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGNvbmZpZ0tleXNbaV07XG4gICAgICAgIGNvbnN0IGRhdGFBdHRyaWJ1dGVOYW1lID0gYGRhdGEtJHt0b0tlYmFiQ2FzZShrZXkpfWA7XG4gICAgICAgIGNvbnN0IGF0dHIgPSBzZWxlY3RFbGVtZW50LmdldEF0dHJpYnV0ZShkYXRhQXR0cmlidXRlTmFtZSk7XG5cbiAgICAgICAgaWYgKGF0dHIgPT09IG51bGwpIGNvbnRpbnVlO1xuXG4gICAgICAgIChjb25maWcgYXMgUmVjb3JkPENvbmZpZ0tleSwgc3RyaW5nIHwgYm9vbGVhbiB8IG51bWJlcj4pW2tleV0gPSBwYXJzZUNvbmZpZ1ZhbHVlKGtleSwgYXR0cik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmZpZztcbn0iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHtXb3JzZVNlbGVjdENvbnRleHR9IGZyb20gXCIuL2ludGVybmFsLXR5cGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRVc2VMaXN0Ym94TW9kZSh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQpIHtcbiAgICByZXR1cm4gd29yc2VTZWxlY3RJbnN0YW5jZS5zZWxlY3RFbGVtZW50LnNpemUgPiAxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNdWx0aXBsZVNlbGVjdCh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQpIHtcbiAgICByZXR1cm4gd29yc2VTZWxlY3RJbnN0YW5jZS5zZWxlY3RFbGVtZW50Lm11bHRpcGxlO1xufVxuXG4vLyBNYXRjaGVzIHRoZSBjb252ZW50aW9uYWwgSFRNTCBwbGFjZWhvbGRlciBwYXR0ZXJuOiA8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQ+TGFiZWw8L29wdGlvbj4uXG4vLyBPcHRpb25zIHRoYXQgYXJlIG5vdCBkaXNhYmxlZCBvciBoYXZlIGEgbm9uLWVtcHR5IHZhbHVlIGFyZSB0cmVhdGVkIGFzIHNlbGVjdGFibGUuXG5leHBvcnQgZnVuY3Rpb24gaXNQbGFjZWhvbGRlck9wdGlvbihzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50IHwgbnVsbCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzZWxlY3RPcHRpb24gIT09IG51bGwgJiYgc2VsZWN0T3B0aW9uLnZhbHVlID09PSAnJyAmJiBzZWxlY3RPcHRpb24uZGlzYWJsZWQ7XG59IiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbi8vIFR3byBXZWFrTWFwcyBtYWludGFpbiBhIGJpZGlyZWN0aW9uYWwgbGluayBiZXR3ZWVuIG5hdGl2ZSA8b3B0aW9uPiBlbGVtZW50cyBhbmQgdGhlaXJcbi8vIHJlbmRlcmVkIHdpZGdldCBkaXZzLiBXZWFrTWFwIGtleXMgYWxsb3cgR0MgdG8gcmVjbGFpbSBlbGVtZW50cyByZW1vdmVkIGZyb20gdGhlIERPTVxuLy8gd2l0aG91dCByZXF1aXJpbmcgZXhwbGljaXQgY2xlYW51cCBvbiBldmVyeSByZW1vdmFsIHBhdGguXG5jb25zdCBvcHRpb25Ub0RpdiA9IG5ldyBXZWFrTWFwPEhUTUxPcHRpb25FbGVtZW50LCBIVE1MRGl2RWxlbWVudD4oKTtcbmNvbnN0IGRpdlRvT3B0aW9uID0gbmV3IFdlYWtNYXA8SFRNTERpdkVsZW1lbnQsIEhUTUxPcHRpb25FbGVtZW50PigpO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5rT3B0aW9uKHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQsIHdvcnNlT3B0aW9uRWxlbWVudDogSFRNTERpdkVsZW1lbnQpIHtcbiAgICBvcHRpb25Ub0Rpdi5zZXQoc2VsZWN0T3B0aW9uLCB3b3JzZU9wdGlvbkVsZW1lbnQpO1xuICAgIGRpdlRvT3B0aW9uLnNldCh3b3JzZU9wdGlvbkVsZW1lbnQsIHNlbGVjdE9wdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmxpbmtPcHRpb24oc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCkge1xuICAgIGNvbnN0IHdvcnNlT3B0aW9uRWxlbWVudCA9IG9wdGlvblRvRGl2LmdldChzZWxlY3RPcHRpb24pO1xuICAgIGlmICghd29yc2VPcHRpb25FbGVtZW50KSByZXR1cm47XG5cbiAgICBvcHRpb25Ub0Rpdi5kZWxldGUoc2VsZWN0T3B0aW9uKTtcbiAgICBkaXZUb09wdGlvbi5kZWxldGUod29yc2VPcHRpb25FbGVtZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdvcnNlT3B0aW9uRWxlbWVudChzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50KSB7XG4gICAgcmV0dXJuIG9wdGlvblRvRGl2LmdldChzZWxlY3RPcHRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VsZWN0T3B0aW9uRWxlbWVudCh3b3JzZU9wdGlvbkVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KSB7XG4gICAgcmV0dXJuIGRpdlRvT3B0aW9uLmdldCh3b3JzZU9wdGlvbkVsZW1lbnQpO1xufSIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQgeyBERUZBVUxUX0NPTkZJRywgV29yc2VTZWxlY3RDb250ZXh0IH0gZnJvbSAnLi9pbnRlcm5hbC10eXBlcyc7XG5pbXBvcnQgeyBpc011bHRpcGxlU2VsZWN0LCBzaG91bGRVc2VMaXN0Ym94TW9kZSB9IGZyb20gJy4vc2VsZWN0LWhlbHBlcnMnO1xuaW1wb3J0IHsgZ2V0V29yc2VPcHRpb25FbGVtZW50LCBsaW5rT3B0aW9uIH0gZnJvbSAnLi9vcHRpb24tbWFwJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbE9wdGlvbkludG9WaWV3KHNlbGVjdE9wdGlvbj86IEhUTUxPcHRpb25FbGVtZW50KSB7XG4gICAgaWYgKCFzZWxlY3RPcHRpb24pIHJldHVybjtcbiAgICBjb25zdCBlbCA9IGdldFdvcnNlT3B0aW9uRWxlbWVudChzZWxlY3RPcHRpb24pO1xuICAgIGlmICghKGVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgZWwuc2Nyb2xsSW50b1ZpZXcoeyBibG9jazogJ25lYXJlc3QnIH0pO1xufVxuXG5cbmZ1bmN0aW9uIGJ1aWxkU3R5bGVBdHRyaWJ1dGUoc3R5bGVQYXJ0czogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gc3R5bGVQYXJ0cy5sZW5ndGggPiAwID8gYCBzdHlsZT1cIiR7c3R5bGVQYXJ0cy5qb2luKCcgJyl9XCJgIDogJyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFdvcnNlU2VsZWN0SGVhZGVyU3R5bGVBdHRyaWJ1dGUod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgY29uc3QgaGVhZGVyU3R5bGVQYXJ0czogc3RyaW5nW10gPSBbXTtcblxuICAgIGlmICh3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy53aWR0aCAhPT0gREVGQVVMVF9DT05GSUcud2lkdGgpIHtcbiAgICAgICAgaGVhZGVyU3R5bGVQYXJ0cy5wdXNoKGB3aWR0aDogJHt3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy53aWR0aH07YCk7XG4gICAgfVxuXG4gICAgaWYgKHdvcnNlU2VsZWN0SW5zdGFuY2UuY29uZmlnLmhlaWdodCAhPT0gREVGQVVMVF9DT05GSUcuaGVpZ2h0KSB7XG4gICAgICAgIGhlYWRlclN0eWxlUGFydHMucHVzaChgaGVpZ2h0OiAke3dvcnNlU2VsZWN0SW5zdGFuY2UuY29uZmlnLmhlaWdodH07YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1aWxkU3R5bGVBdHRyaWJ1dGUoaGVhZGVyU3R5bGVQYXJ0cyk7XG59XG5cblxuZnVuY3Rpb24gZXNjYXBlSHRtbCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIC5yZXBsYWNlKC8mL2csICcmYW1wOycpXG4gICAgICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAgICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgICAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgICAgIC5yZXBsYWNlKC8nL2csICcmIzM5OycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3B0aW9uSWQod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0LCBvcHRpb25JbmRleDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGAke3dvcnNlU2VsZWN0SW5zdGFuY2UuaW5zdGFuY2VJZH0tb3B0aW9uLSR7b3B0aW9uSW5kZXh9YDtcbn1cblxuZnVuY3Rpb24gZ2V0V29yc2VPcHRpb25DbGFzc2VzKHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQpIHtcbiAgICBjb25zdCBjbGFzc2VzID0gWyd3b3JzZS1zZWxlY3Qtb3B0aW9uJ107XG5cbiAgICBpZiAoc2VsZWN0T3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaCgnZGlzYWJsZWQnKTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0T3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaCgnc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JzZU9wdGlvbkh0bWwoXG4gICAgd29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0LFxuICAgIHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQsXG4gICAgb3B0aW9uSW5kZXg6IG51bWJlcixcbikge1xuICAgIGNvbnN0IHdvcnNlT3B0aW9uQ2xhc3NlcyA9IGdldFdvcnNlT3B0aW9uQ2xhc3NlcyhzZWxlY3RPcHRpb24pO1xuICAgIGNvbnN0IG9wdGlvblRleHQgPSBzZWxlY3RPcHRpb24udGV4dENvbnRlbnQgPz8gJyc7XG5cbiAgICByZXR1cm4gYFxuICAgIDxkaXYgaWQ9XCIke2dldE9wdGlvbklkKHdvcnNlU2VsZWN0SW5zdGFuY2UsIG9wdGlvbkluZGV4KX1cIlxuICAgICAgICAgY2xhc3M9XCIke3dvcnNlT3B0aW9uQ2xhc3Nlc31cIlxuICAgICAgICAgZGF0YS12YWx1ZT1cIiR7ZXNjYXBlSHRtbChzZWxlY3RPcHRpb24udmFsdWUpfVwiXG4gICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9XCIke3NlbGVjdE9wdGlvbi5zZWxlY3RlZCA/ICd0cnVlJyA6ICdmYWxzZSd9XCJcbiAgICAgICAgIGFyaWEtZGlzYWJsZWQ9XCIke3NlbGVjdE9wdGlvbi5kaXNhYmxlZCA/ICd0cnVlJyA6ICdmYWxzZSd9XCI+XG4gICAgICAke2VzY2FwZUh0bWwob3B0aW9uVGV4dCl9XG4gICAgPC9kaXY+XG4gICAgYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcnNlT3B0aW9uRWxlbWVudChcbiAgICB3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQsXG4gICAgc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCxcbiAgICBvcHRpb25JbmRleDogbnVtYmVyLFxuKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KFxuICAgICAgICBjcmVhdGVXb3JzZU9wdGlvbkh0bWwod29yc2VTZWxlY3RJbnN0YW5jZSwgc2VsZWN0T3B0aW9uLCBvcHRpb25JbmRleClcbiAgICApLmZpcnN0RWxlbWVudENoaWxkIGFzIEhUTUxEaXZFbGVtZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VhcmNoSHRtbCh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQpIHtcbiAgICBpZiAoIXdvcnNlU2VsZWN0SW5zdGFuY2UuY29uZmlnLnNlYXJjaGFibGUpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgPGRpdiBjbGFzcz1cIndvcnNlLXNlbGVjdC1zZWFyY2hcIj5cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgY2xhc3M9XCJ3b3JzZS1zZWxlY3Qtc2VhcmNoLWlucHV0XCJcbiAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBsaXN0XCJcbiAgICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJTZWFyY2ggb3B0aW9uc1wiIC8+XG4gICAgPC9kaXY+XG4gICAgYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1lc3NhZ2VIdG1sKCkge1xuICAgIHJldHVybiBgXG4gICAgPGRpdiBjbGFzcz1cIndvcnNlLXNlbGVjdC1tZXNzYWdlIHdvcnNlLXNlbGVjdC12aXN1YWxseS1oaWRkZW5cIlxuICAgICAgICAgcm9sZT1cInN0YXR1c1wiXG4gICAgICAgICBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICAgICAgICAgYXJpYS1hdG9taWM9XCJ0cnVlXCI+PC9kaXY+XG4gICAgYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcnNlU2VsZWN0KHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCkge1xuICAgIGNvbnN0IGhlYWRlclN0eWxlQXR0cmlidXRlID0gYnVpbGRXb3JzZVNlbGVjdEhlYWRlclN0eWxlQXR0cmlidXRlKHdvcnNlU2VsZWN0SW5zdGFuY2UpO1xuICAgIGNvbnN0IGNvbnRhaW5lckNsYXNzZXMgPSBbJ3dvcnNlLXNlbGVjdC1jb250YWluZXInXTtcblxuICAgIGlmIChzaG91bGRVc2VMaXN0Ym94TW9kZSh3b3JzZVNlbGVjdEluc3RhbmNlKSkge1xuICAgICAgICBjb250YWluZXJDbGFzc2VzLnB1c2goJ2xpc3Rib3gnKTtcbiAgICB9XG5cbiAgICBpZiAoaXNNdWx0aXBsZVNlbGVjdCh3b3JzZVNlbGVjdEluc3RhbmNlKSkge1xuICAgICAgICBjb250YWluZXJDbGFzc2VzLnB1c2goJ211bHRpcGxlJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaHRtbFN0cmluZyA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiJHtjb250YWluZXJDbGFzc2VzLmpvaW4oJyAnKX1cIj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzPVwid29yc2Utc2VsZWN0LWhlYWRlclwiXG4gICAgICAgIGFyaWEtaGFzcG9wdXA9XCJsaXN0Ym94XCJcbiAgICAgICAgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwid29yc2Utc2VsZWN0LWhlYWRlci1sYWJlbFwiPjwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGRpdiBjbGFzcz1cIndvcnNlLXNlbGVjdC1vcHRpb25zXCI+XG4gICAgICAgICR7Y3JlYXRlU2VhcmNoSHRtbCh3b3JzZVNlbGVjdEluc3RhbmNlKX1cbiAgICAgICAgJHtjcmVhdGVNZXNzYWdlSHRtbCgpfVxuICAgICAgICA8ZGl2IGNsYXNzPVwid29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXJcIiR7aGVhZGVyU3R5bGVBdHRyaWJ1dGV9PjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgYDtcblxuICAgIGNvbnN0IHdvcnNlU2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KFxuICAgICAgICBodG1sU3RyaW5nXG4gICAgKS5maXJzdEVsZW1lbnRDaGlsZCBhcyBIVE1MRGl2RWxlbWVudDtcblxuICAgIGNvbnN0IG9wdGlvbnNMaXN0RWxlbWVudCA9IHdvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXInKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICBvcHRpb25zTGlzdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2xpc3Rib3gnKTtcbiAgICBvcHRpb25zTGlzdEVsZW1lbnQudGFiSW5kZXggPSBzaG91bGRVc2VMaXN0Ym94TW9kZSh3b3JzZVNlbGVjdEluc3RhbmNlKSA/IDAgOiAtMTtcblxuICAgIGlmIChpc011bHRpcGxlU2VsZWN0KHdvcnNlU2VsZWN0SW5zdGFuY2UpKSB7XG4gICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJywgJ3RydWUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gQXJyYXkuZnJvbSh3b3JzZVNlbGVjdEluc3RhbmNlLnNlbGVjdEVsZW1lbnQub3B0aW9ucyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdE9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9uID0gc2VsZWN0T3B0aW9uc1tpXTtcbiAgICAgICAgY29uc3Qgd29yc2VPcHRpb25FbGVtZW50ID0gY3JlYXRlV29yc2VPcHRpb25FbGVtZW50KFxuICAgICAgICAgICAgd29yc2VTZWxlY3RJbnN0YW5jZSxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbixcbiAgICAgICAgICAgIGlcbiAgICAgICAgKTtcbiAgICAgICAgbGlua09wdGlvbihzZWxlY3RPcHRpb24sIHdvcnNlT3B0aW9uRWxlbWVudCk7XG4gICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5hcHBlbmRDaGlsZCh3b3JzZU9wdGlvbkVsZW1lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiB3b3JzZVNlbGVjdEVsZW1lbnQ7XG59IiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmltcG9ydCB0eXBlIHsgUGx1Z2luLCBQbHVnaW5Db250ZXh0IH0gZnJvbSAnLi4vaW50ZXJuYWwtdHlwZXMnO1xuaW1wb3J0IHsgZ2V0V29yc2VPcHRpb25FbGVtZW50IH0gZnJvbSAnLi4vb3B0aW9uLW1hcCc7XG5cbmZ1bmN0aW9uIGFwcGx5RmlsdGVyKGNvbnRleHQ6IFBsdWdpbkNvbnRleHQsIHNlYXJjaFRlcm06IHN0cmluZykge1xuICAgIGNvbnN0IHRlcm0gPSBzZWFyY2hUZXJtLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgQXJyYXkuZnJvbShjb250ZXh0LnNlbGVjdEVsZW1lbnQub3B0aW9ucykuZm9yRWFjaChzZWxlY3RPcHRpb24gPT4ge1xuICAgICAgICBjb25zdCBlbCA9IGdldFdvcnNlT3B0aW9uRWxlbWVudChzZWxlY3RPcHRpb24pO1xuICAgICAgICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gdGVybSAhPT0gJycgJiYgZWwudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh0ZXJtKTtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnRvZ2dsZSgnbWF0Y2hlcycsIG1hdGNoZXMpO1xuICAgIH0pO1xuXG4gICAgaWYgKCF0ZXJtKSB7XG4gICAgICAgIGNvbnRleHQuY2xlYXJNZXNzYWdlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtYXRjaENvdW50ID0gY29udGV4dC5vcHRpb25zTGlzdEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcnNlLXNlbGVjdC1vcHRpb24ubWF0Y2hlcycpLmxlbmd0aDtcbiAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICAgbWF0Y2hDb3VudCA9PT0gMCA/ICdObyByZXN1bHRzIGZvdW5kJyA6XG4gICAgICAgIG1hdGNoQ291bnQgPT09IDEgPyAnMSByZXN1bHQgYXZhaWxhYmxlJyA6XG4gICAgICAgIGAke21hdGNoQ291bnR9IHJlc3VsdHMgYXZhaWxhYmxlYDtcblxuICAgIGNvbnRleHQuc2V0TWVzc2FnZShtZXNzYWdlKTtcblxuICAgIGNvbnN0IGZpcnN0TWF0Y2ggPSBjb250ZXh0Lm9wdGlvbnNMaXN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LW9wdGlvbi5tYXRjaGVzJyk7XG4gICAgaWYgKGZpcnN0TWF0Y2ggaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkge1xuICAgICAgICBmaXJzdE1hdGNoLnNjcm9sbEludG9WaWV3KHsgYmxvY2s6ICduZWFyZXN0JyB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCdWlsdGluU2VhcmNoUGx1Z2luKCk6IFBsdWdpbiB7XG4gICAgbGV0IHNlYXJjaFRlcm0gPSAnJztcbiAgICBsZXQgcGx1Z2luQ29udGV4dDogUGx1Z2luQ29udGV4dCB8IG51bGwgPSBudWxsO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogJ3NlYXJjaCcsXG5cbiAgICAgICAgaW5pdChjb250ZXh0OiBQbHVnaW5Db250ZXh0KSB7XG4gICAgICAgICAgICBwbHVnaW5Db250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgICAgIGNvbnN0IHsgc2VhcmNoSW5wdXRFbGVtZW50IH0gPSBjb250ZXh0O1xuICAgICAgICAgICAgaWYgKCFzZWFyY2hJbnB1dEVsZW1lbnQpIHJldHVybjtcblxuICAgICAgICAgICAgY29udGV4dC5vbihzZWFyY2hJbnB1dEVsZW1lbnQsICdpbnB1dCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHNlYXJjaFRlcm0gPSB0YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgYXBwbHlGaWx0ZXIoY29udGV4dCwgc2VhcmNoVGVybSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBvblN5bmMoKSB7XG4gICAgICAgICAgICBpZiAoIXBsdWdpbkNvbnRleHQpIHJldHVybjtcbiAgICAgICAgICAgIGFwcGx5RmlsdGVyKHBsdWdpbkNvbnRleHQsIHNlYXJjaFRlcm0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uQ2xvc2UoKSB7XG4gICAgICAgICAgICBpZiAoIXBsdWdpbkNvbnRleHQpIHJldHVybjtcbiAgICAgICAgICAgIHNlYXJjaFRlcm0gPSAnJztcbiAgICAgICAgICAgIGNvbnN0IHsgc2VhcmNoSW5wdXRFbGVtZW50IH0gPSBwbHVnaW5Db250ZXh0O1xuICAgICAgICAgICAgaWYgKHNlYXJjaElucHV0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBzZWFyY2hJbnB1dEVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFwcGx5RmlsdGVyKHBsdWdpbkNvbnRleHQsICcnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkZXN0cm95KCkge1xuICAgICAgICAgICAgcGx1Z2luQ29udGV4dCA9IG51bGw7XG4gICAgICAgICAgICBzZWFyY2hUZXJtID0gJyc7XG4gICAgICAgIH0sXG4gICAgfTtcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG4vKipcbiAqIFByb2dyZXNzaXZlLWVuaGFuY2VtZW50IHV0aWxpdGllcyBmb3IgbmF0aXZlIHtAbGluayBIVE1MU2VsZWN0RWxlbWVudH0gY29udHJvbHMuXG4gKlxuICogS2VlcHMgdGhlIG5hdGl2ZSBgPHNlbGVjdD5gIGFzIHNvdXJjZSBvZiB0cnV0aCBmb3IgdmFsdWUsIGRpc2FibGVkIHN0YXRlLCBgc2l6ZWAsIGFuZFxuICogYG11bHRpcGxlYCwgd2hpbGUgbWlycm9yaW5nIHRoYXQgc3RhdGUgaW50byBhIGN1c3RvbSBET00gc3RydWN0dXJlIHRoYXQgaXMgZWFzaWVyIHRvIHN0eWxlLlxuICpcbiAqIFdpZGdldC1zcGVjaWZpYyBiZWhhdmlvciB1c2VzIGBkYXRhLSpgIGF0dHJpYnV0ZXMgc3VjaCBhcyBgZGF0YS1zZWFyY2hhYmxlYCBhbmRcbiAqIGBkYXRhLWRyb3Bkb3duLWhlaWdodC1weGAsIGtlZXBpbmcgdGhlIHB1YmxpYyBBUEkgYWxpZ25lZCB3aXRoIHN0YW5kYXJkIEhUTUwuXG4gKi9cbmltcG9ydCB7IERFRkFVTFRfQ09ORklHLCBTZWxlY3RDb25maWcsIFJvb3ROb2RlLCBXb3JzZVNlbGVjdE9wdGlvbnMsIFBsdWdpbiwgUGx1Z2luQ29udGV4dCB9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBXb3JzZVNlbGVjdENvbnRleHQgfSBmcm9tICcuL2ludGVybmFsLXR5cGVzJztcbmltcG9ydCB7IGNyZWF0ZUNTUyB9IGZyb20gJy4vY3NzJztcbmltcG9ydCB7IGdldENvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IGNyZWF0ZVdvcnNlT3B0aW9uRWxlbWVudCwgY3JlYXRlV29yc2VTZWxlY3QsIGdldE9wdGlvbklkLCBzY3JvbGxPcHRpb25JbnRvVmlldyB9IGZyb20gJy4vZG9tJztcbmltcG9ydCB7IGdldFNlbGVjdE9wdGlvbkVsZW1lbnQsIGdldFdvcnNlT3B0aW9uRWxlbWVudCwgbGlua09wdGlvbiwgdW5saW5rT3B0aW9uIH0gZnJvbSAnLi9vcHRpb24tbWFwJztcbmltcG9ydCB7IGlzUGxhY2Vob2xkZXJPcHRpb24sIHNob3VsZFVzZUxpc3Rib3hNb2RlLCBpc011bHRpcGxlU2VsZWN0IH0gZnJvbSAnLi9zZWxlY3QtaGVscGVycyc7XG5pbXBvcnQgeyBjcmVhdGVCdWlsdGluU2VhcmNoUGx1Z2luIH0gZnJvbSAnLi9mZWF0dXJlcy9zZWFyY2gnO1xuXG5jb25zdCBpbnN0YW5jZXMgPSBuZXcgV2Vha01hcDxIVE1MU2VsZWN0RWxlbWVudCwgV29yc2VTZWxlY3Q+KCk7XG5sZXQgbmV4dEluc3RhbmNlSWQgPSAwO1xuXG50eXBlIFBsdWdpbkxpc3RlbmVyID0geyB0YXJnZXQ6IEV2ZW50VGFyZ2V0OyBldmVudDogc3RyaW5nOyBoYW5kbGVyOiBFdmVudExpc3RlbmVyIH07XG5cbmNsYXNzIFdvcnNlU2VsZWN0IGltcGxlbWVudHMgV29yc2VTZWxlY3RDb250ZXh0IHtcbiAgICAvLyBUcmFja3MgYWxsIG1vdW50ZWQgaW5zdGFuY2VzIHNvIGEgc2luZ2xlIGRvY3VtZW50LWxldmVsIHBvaW50ZXJkb3duIGxpc3RlbmVyIGNhbiBjbG9zZSBhbnlcbiAgICAvLyBvcGVuIGRyb3Bkb3duIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG91dHNpZGUsIGluc3RlYWQgb2YgcmVnaXN0ZXJpbmcgb25lIGxpc3RlbmVyIHBlciBpbnN0YW5jZS5cbiAgICAvLyBOb3RlOiBgcHJpdmF0ZWAgaXMgYSBUeXBlU2NyaXB0LW9ubHkgY29uc3RyYWludCBhbmQgaXMgbm90IGVuZm9yY2VkIGluIHRoZSBjb21waWxlZCBvdXRwdXQuXG4gICAgcHJpdmF0ZSBzdGF0aWMgbW91bnRlZEluc3RhbmNlcyA9IG5ldyBTZXQ8V29yc2VTZWxlY3Q+KCk7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBoYW5kbGVEb2N1bWVudFBvaW50ZXJEb3duKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIE5vZGUpKSByZXR1cm47XG4gICAgICAgIGZvciAoY29uc3QgaW5zdGFuY2Ugb2YgV29yc2VTZWxlY3QubW91bnRlZEluc3RhbmNlcykge1xuICAgICAgICAgICAgaWYgKGluc3RhbmNlLndvcnNlU2VsZWN0RWxlbWVudCAmJiAhaW5zdGFuY2Uud29yc2VTZWxlY3RFbGVtZW50LmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5jbG9zZURyb3Bkb3duKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICBjb25maWc6IFNlbGVjdENvbmZpZztcbiAgICByb290OiBSb290Tm9kZTtcbiAgICBpbnN0YW5jZUlkOiBzdHJpbmc7XG5cbiAgICB3b3JzZVNlbGVjdEVsZW1lbnQ/OiBIVE1MRGl2RWxlbWVudDtcbiAgICBoZWFkZXJFbGVtZW50PzogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgZHJvcGRvd25QYW5lbEVsZW1lbnQ/OiBIVE1MRGl2RWxlbWVudDtcbiAgICBvcHRpb25zTGlzdEVsZW1lbnQ/OiBIVE1MRGl2RWxlbWVudDtcbiAgICBzZWFyY2hJbnB1dEVsZW1lbnQ/OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIG1lc3NhZ2VFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgb3B0aW9uT2JzZXJ2ZXI/OiBNdXRhdGlvbk9ic2VydmVyO1xuXG4gICAgb25TZWxlY3RDaGFuZ2U/OiBFdmVudExpc3RlbmVyO1xuICAgIG9uT3B0aW9uc0NsaWNrPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvbkhlYWRlckNsaWNrPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvbkhlYWRlcktleURvd24/OiBFdmVudExpc3RlbmVyO1xuICAgIG9uT3B0aW9uc0tleURvd24/OiBFdmVudExpc3RlbmVyO1xuICAgIG9uU2VhcmNoS2V5RG93bj86IEV2ZW50TGlzdGVuZXI7XG5cbiAgICBvcGVuID0gZmFsc2U7XG4gICAgYWN0aXZlT3B0aW9uPzogSFRNTE9wdGlvbkVsZW1lbnQ7XG5cbiAgICBwcml2YXRlIHBsdWdpbnM6IFBsdWdpbltdID0gW107XG4gICAgcHJpdmF0ZSBwbHVnaW5MaXN0ZW5lcnM6IFBsdWdpbkxpc3RlbmVyW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50LCBjb25maWc6IFBhcnRpYWw8U2VsZWN0Q29uZmlnPiA9IHt9LCByb290OiBSb290Tm9kZSA9IGRvY3VtZW50LCBwbHVnaW5zOiBQbHVnaW5bXSA9IFtdKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0RWxlbWVudCA9IHNlbGVjdEVsZW1lbnQ7XG4gICAgICAgIHRoaXMuY29uZmlnID0geyAuLi5ERUZBVUxUX0NPTkZJRywgLi4uY29uZmlnIH07XG4gICAgICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgICAgIHRoaXMuaW5zdGFuY2VJZCA9IGB3cy0keysrbmV4dEluc3RhbmNlSWR9YDtcbiAgICAgICAgdGhpcy5wbHVnaW5zID0gWy4uLnBsdWdpbnNdO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5zZWFyY2hhYmxlICYmICFwbHVnaW5zLnNvbWUocCA9PiBwLm5hbWUgPT09ICdzZWFyY2gnKSkge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW5zLnB1c2goY3JlYXRlQnVpbHRpblNlYXJjaFBsdWdpbigpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIC0tLSBMaWZlY3ljbGUgLS0tXG5cbiAgICBtb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMud29yc2VTZWxlY3RFbGVtZW50KSByZXR1cm47XG5cbiAgICAgICAgZW5zdXJlU3R5bGVzKCk7XG5cbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQgPSBjcmVhdGVXb3JzZVNlbGVjdCh0aGlzKTtcbiAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50ID0gdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1oZWFkZXInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5kcm9wZG93blBhbmVsRWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3Qtb3B0aW9ucycpIGFzIEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3Qtb3B0aW9ucy1zY3JvbGxlcicpIGFzIEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnNlYXJjaElucHV0RWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3Qtc2VhcmNoLWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5tZXNzYWdlRWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3QtbWVzc2FnZScpIGFzIEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmIChXb3JzZVNlbGVjdC5tb3VudGVkSW5zdGFuY2VzLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgV29yc2VTZWxlY3QuaGFuZGxlRG9jdW1lbnRQb2ludGVyRG93bik7XG4gICAgICAgIH1cbiAgICAgICAgV29yc2VTZWxlY3QubW91bnRlZEluc3RhbmNlcy5hZGQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZU9wdGlvbnMoKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgdGhpcy5pbml0UGx1Z2lucygpO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMub3B0aW9uT2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgdGhpcy5vcHRpb25PYnNlcnZlciA9IHVuZGVmaW5lZDtcblxuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgICAgICAgIHBsdWdpbi5kZXN0cm95Py4oKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHsgdGFyZ2V0LCBldmVudCwgaGFuZGxlciB9IG9mIHRoaXMucGx1Z2luTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wbHVnaW5MaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgdGhpcy5wbHVnaW5zID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMub25TZWxlY3RDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLm9uU2VsZWN0Q2hhbmdlKTtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3RDaGFuZ2UgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vbk9wdGlvbnNDbGljayAmJiB0aGlzLmRyb3Bkb3duUGFuZWxFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duUGFuZWxFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbk9wdGlvbnNDbGljayk7XG4gICAgICAgICAgICB0aGlzLm9uT3B0aW9uc0NsaWNrID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25IZWFkZXJDbGljayAmJiB0aGlzLmhlYWRlckVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25IZWFkZXJDbGljayk7XG4gICAgICAgICAgICB0aGlzLm9uSGVhZGVyQ2xpY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vbkhlYWRlcktleURvd24gJiYgdGhpcy5oZWFkZXJFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25IZWFkZXJLZXlEb3duKTtcbiAgICAgICAgICAgIHRoaXMub25IZWFkZXJLZXlEb3duID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25PcHRpb25zS2V5RG93biAmJiB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25PcHRpb25zS2V5RG93bik7XG4gICAgICAgICAgICB0aGlzLm9uT3B0aW9uc0tleURvd24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vblNlYXJjaEtleURvd24gJiYgdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uU2VhcmNoS2V5RG93bik7XG4gICAgICAgICAgICB0aGlzLm9uU2VhcmNoS2V5RG93biA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMuZGVsZXRlKHRoaXMpO1xuICAgICAgICBpZiAoV29yc2VTZWxlY3QubW91bnRlZEluc3RhbmNlcy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIFdvcnNlU2VsZWN0LmhhbmRsZURvY3VtZW50UG9pbnRlckRvd24pO1xuICAgICAgICB9XG5cbiAgICAgICAgQXJyYXkuZnJvbSh0aGlzLnNlbGVjdEVsZW1lbnQub3B0aW9ucykuZm9yRWFjaCh1bmxpbmtPcHRpb24pO1xuXG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50Py5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcblxuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmRyb3Bkb3duUGFuZWxFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubWVzc2FnZUVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFjdGl2ZU9wdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvLyAtLS0gU3RhdGUgc3luYyAtLS1cbiAgICBzeW5jRGltZW5zaW9ucygpIHtcbiAgICAgICAgY29uc3QgeyB3b3JzZVNlbGVjdEVsZW1lbnQsIGhlYWRlckVsZW1lbnQsIG9wdGlvbnNMaXN0RWxlbWVudCwgc2VsZWN0RWxlbWVudCwgY29uZmlnIH0gPSB0aGlzO1xuICAgICAgICBpZiAoISh3b3JzZVNlbGVjdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEoaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZWN0RWxlbWVudCk7XG5cbiAgICAgICAgaWYgKGNvbXB1dGVkU3R5bGUud2lkdGggJiYgY29tcHV0ZWRTdHlsZS53aWR0aCAhPT0gJ2F1dG8nICYmIGNvbXB1dGVkU3R5bGUud2lkdGggIT09ICcwcHgnKSB7XG4gICAgICAgICAgICB3b3JzZVNlbGVjdEVsZW1lbnQuc3R5bGUud2lkdGggPSBjb21wdXRlZFN0eWxlLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaGVhZGVyRWxlbWVudC5zdHlsZS5mb250ID0gY29tcHV0ZWRTdHlsZS5mb250O1xuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gYCR7Y29uZmlnLmRyb3Bkb3duSGVpZ2h0UHh9cHhgO1xuICAgIH1cblxuICAgIHVwZGF0ZU9wZW5TdGF0ZSgpIHtcbiAgICAgICAgaWYgKCEodGhpcy53b3JzZVNlbGVjdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBpc0xpc3Rib3hNb2RlID0gc2hvdWxkVXNlTGlzdGJveE1vZGUodGhpcyk7XG4gICAgICAgIGNvbnN0IGlzT3BlbiA9IGlzTGlzdGJveE1vZGUgPyB0cnVlIDogdGhpcy5vcGVuO1xuXG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nLCBpc09wZW4pO1xuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdsaXN0Ym94JywgaXNMaXN0Ym94TW9kZSk7XG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ211bHRpcGxlJywgaXNNdWx0aXBsZVNlbGVjdCh0aGlzKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgU3RyaW5nKGlzT3BlbikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1tdWx0aXNlbGVjdGFibGUnLCBTdHJpbmcoaXNNdWx0aXBsZVNlbGVjdCh0aGlzKSkpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQudGFiSW5kZXggPSBpc09wZW4gPyAwIDogLTE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlclN0YXRlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlU2VsZWN0ZWRTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBvcHRpb25zTGlzdEVsZW1lbnQsIHNlbGVjdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIEFycmF5LmZyb20ob3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGlmICghKGVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5mb3JFYWNoKHNlbGVjdE9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoIXNlbGVjdE9wdGlvbi5zZWxlY3RlZCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGlzUGxhY2Vob2xkZXJPcHRpb24oc2VsZWN0T3B0aW9uKSkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uKTtcbiAgICAgICAgICAgIGVsPy5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgZWw/LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZURpc2FibGVkU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgd29yc2VTZWxlY3RFbGVtZW50LCBzZWxlY3RFbGVtZW50LCBoZWFkZXJFbGVtZW50LCBzZWFyY2hJbnB1dEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKHdvcnNlU2VsZWN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIHdvcnNlU2VsZWN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdkaXNhYmxlZCcsIHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQpO1xuXG4gICAgICAgIGlmIChoZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgICAgICAgIGhlYWRlckVsZW1lbnQuZGlzYWJsZWQgPSBzZWxlY3RFbGVtZW50LmRpc2FibGVkO1xuICAgICAgICAgICAgaGVhZGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnLCBTdHJpbmcoc2VsZWN0RWxlbWVudC5kaXNhYmxlZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlYXJjaElucHV0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHNlYXJjaElucHV0RWxlbWVudC5kaXNhYmxlZCA9IHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuZm9yRWFjaChzZWxlY3RPcHRpb24gPT4ge1xuICAgICAgICAgICAgY29uc3QgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uKTtcbiAgICAgICAgICAgIGVsPy5jbGFzc0xpc3QudG9nZ2xlKCdkaXNhYmxlZCcsIHNlbGVjdE9wdGlvbi5kaXNhYmxlZCk7XG4gICAgICAgICAgICBlbD8uc2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJywgU3RyaW5nKHNlbGVjdE9wdGlvbi5kaXNhYmxlZCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVIZWFkZXJTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBoZWFkZXJFbGVtZW50LCBzZWxlY3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShoZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgbGFiZWxFbCA9IGhlYWRlckVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1oZWFkZXItbGFiZWwnKTtcbiAgICAgICAgaWYgKCEobGFiZWxFbCBpbnN0YW5jZW9mIEhUTUxTcGFuRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9XG4gICAgICAgICAgICBzZWxlY3RFbGVtZW50LnNlbGVjdGVkT3B0aW9uc1swXSA/P1xuICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5vcHRpb25zW3NlbGVjdEVsZW1lbnQuc2VsZWN0ZWRJbmRleF0gPz9cbiAgICAgICAgICAgIG51bGw7XG5cbiAgICAgICAgY29uc3QgbGFiZWwgPSAoaXNQbGFjZWhvbGRlck9wdGlvbihzZWxlY3RlZE9wdGlvbikgJiYgdGhpcy5vcGVuKVxuICAgICAgICAgICAgPyAnJ1xuICAgICAgICAgICAgOiBzZWxlY3RlZE9wdGlvbj8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblxuICAgICAgICBsYWJlbEVsLnRleHRDb250ZW50ID0gbGFiZWw7XG4gICAgICAgIGhlYWRlckVsZW1lbnQudGl0bGUgPSBsYWJlbDtcbiAgICAgICAgaGVhZGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBsYWJlbCA/IGBTZWxlY3RlZDogJHtsYWJlbH1gIDogJ1NlbGVjdCBhbiBvcHRpb24nKTtcbiAgICB9XG5cbiAgICB1cGRhdGVBY3RpdmVEZXNjZW5kYW50KCkge1xuICAgICAgICBjb25zdCB7IG9wdGlvbnNMaXN0RWxlbWVudCwgYWN0aXZlT3B0aW9uIH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBpZiAoIWFjdGl2ZU9wdGlvbikge1xuICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50Jyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlbCA9IGdldFdvcnNlT3B0aW9uRWxlbWVudChhY3RpdmVPcHRpb24pO1xuICAgICAgICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkge1xuICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50Jyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBlbC5pZCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQWN0aXZlT3B0aW9uU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgb3B0aW9uc0xpc3RFbGVtZW50LCBhY3RpdmVPcHRpb24gfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIEFycmF5LmZyb20ob3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGlmIChlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSBlbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGFjdGl2ZU9wdGlvbikge1xuICAgICAgICAgICAgZ2V0V29yc2VPcHRpb25FbGVtZW50KGFjdGl2ZU9wdGlvbik/LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3luY0FsbCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZFN0YXRlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZU9wZW5TdGF0ZSgpO1xuICAgICAgICB0aGlzLnN5bmNEaW1lbnNpb25zKCk7XG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgICAgICAgcGx1Z2luLm9uU3luYz8uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAtLS0gTWVzc2FnZSAtLS1cbiAgICBzZXRNZXNzYWdlKHRleHQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCB7IG1lc3NhZ2VFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShtZXNzYWdlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBtZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICAvLyBEZWZlciB0aGUgdXBkYXRlIGJ5IG9uZSB0aWNrIHNvIHNjcmVlbiByZWFkZXJzIGFubm91bmNlIGEgY2hhbmdlIGV2ZW4gd2hlbiB0aGVcbiAgICAgICAgLy8gbWVzc2FnZSB0ZXh0IGhhcHBlbnMgdG8gYmUgdGhlIHNhbWUgc3RyaW5nIGFzIHRoZSBwcmV2aW91cyBhbm5vdW5jZW1lbnQuXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1lc3NhZ2VFbGVtZW50ID09PSBtZXNzYWdlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgY2xlYXJNZXNzYWdlKCkge1xuICAgICAgICBpZiAoISh0aGlzLm1lc3NhZ2VFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIHRoaXMubWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcbiAgICB9XG5cbiAgICAvLyAtLS0gT3BlbiAvIGNsb3NlIC0tLVxuICAgIG9wZW5Ecm9wZG93bigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0RWxlbWVudC5kaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICBpZiAoc2hvdWxkVXNlTGlzdGJveE1vZGUodGhpcykpIHJldHVybjtcblxuICAgICAgICB0aGlzLm9wZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZU9wZW5TdGF0ZSgpO1xuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgICAgICAgIHBsdWdpbi5vbk9wZW4/LigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2VEcm9wZG93bigpIHtcbiAgICAgICAgaWYgKHNob3VsZFVzZUxpc3Rib3hNb2RlKHRoaXMpKSByZXR1cm47XG4gICAgICAgIGlmICghdGhpcy5vcGVuKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5vcGVuID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgICAgICAgcGx1Z2luLm9uQ2xvc2U/LigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlT3BlblN0YXRlKCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlRHJvcGRvd24oKSB7XG4gICAgICAgIGlmIChzaG91bGRVc2VMaXN0Ym94TW9kZSh0aGlzKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLm9wZW4gPyB0aGlzLmNsb3NlRHJvcGRvd24oKSA6IHRoaXMub3BlbkRyb3Bkb3duKCk7XG4gICAgfVxuXG4gICAgb3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCkge1xuICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bigpO1xuXG4gICAgICAgIGNvbnN0IHsgb3B0aW9uc0xpc3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQudGFiSW5kZXggPSAwO1xuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgc2Nyb2xsT3B0aW9uSW50b1ZpZXcodGhpcy5hY3RpdmVPcHRpb24pO1xuICAgIH1cblxuICAgIGNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpIHtcbiAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudD8uZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0gTmF2aWdhdGlvbiAtLS1cbiAgICBnZXRWaXNpYmxlRW5hYmxlZE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuc2VsZWN0RWxlbWVudC5vcHRpb25zKS5maWx0ZXIob3B0ID0+IHtcbiAgICAgICAgICAgIGlmIChvcHQuZGlzYWJsZWQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBnZXRXb3JzZU9wdGlvbkVsZW1lbnQob3B0KSBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVPcHRpb24oc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCB8IHVuZGVmaW5lZCwgc2Nyb2xsID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmFjdGl2ZU9wdGlvbiA9IHNlbGVjdE9wdGlvbjtcbiAgICAgICAgdGhpcy51cGRhdGVBY3RpdmVEZXNjZW5kYW50KCk7XG4gICAgICAgIHRoaXMudXBkYXRlQWN0aXZlT3B0aW9uU3RhdGUoKTtcbiAgICAgICAgaWYgKHNjcm9sbCkgc2Nyb2xsT3B0aW9uSW50b1ZpZXcoc2VsZWN0T3B0aW9uKTtcbiAgICB9XG5cbiAgICBtb3ZlQWN0aXZlT3B0aW9uKGRlbHRhOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2V0VmlzaWJsZUVuYWJsZWRPcHRpb25zKCk7XG4gICAgICAgIGlmIChvcHRpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHRoaXMuYWN0aXZlT3B0aW9uID8gb3B0aW9ucy5pbmRleE9mKHRoaXMuYWN0aXZlT3B0aW9uKSA6IC0xO1xuICAgICAgICBjb25zdCBuZXh0SW5kZXggPSBjdXJyZW50SW5kZXggPT09IC0xXG4gICAgICAgICAgICA/IChkZWx0YSA+PSAwID8gMCA6IG9wdGlvbnMubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgIDogTWF0aC5tYXgoMCwgTWF0aC5taW4ob3B0aW9ucy5sZW5ndGggLSAxLCBjdXJyZW50SW5kZXggKyBkZWx0YSkpO1xuXG4gICAgICAgIHRoaXMuc2V0QWN0aXZlT3B0aW9uKG9wdGlvbnNbbmV4dEluZGV4XSk7XG4gICAgfVxuXG4gICAgbW92ZUFjdGl2ZVRvQm91bmRhcnkoYm91bmRhcnk6ICdzdGFydCcgfCAnZW5kJykge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRWaXNpYmxlRW5hYmxlZE9wdGlvbnMoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlT3B0aW9uKGJvdW5kYXJ5ID09PSAnc3RhcnQnID8gb3B0aW9uc1swXSA6IG9wdGlvbnNbb3B0aW9ucy5sZW5ndGggLSAxXSk7XG4gICAgfVxuXG4gICAgZ2V0UGFnZUp1bXBTaXplKCkge1xuICAgICAgICBjb25zdCB7IG9wdGlvbnNMaXN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm4gMTA7XG5cbiAgICAgICAgY29uc3QgZmlyc3RPcHRpb24gPSBBcnJheS5mcm9tKG9wdGlvbnNMaXN0RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yc2Utc2VsZWN0LW9wdGlvbicpKVxuICAgICAgICAgICAgLmZpbmQoZWwgPT4gZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCk7XG4gICAgICAgIGlmICghKGZpcnN0T3B0aW9uIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm4gMTA7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uSGVpZ2h0ID0gZmlyc3RPcHRpb24ub2Zmc2V0SGVpZ2h0IHx8IDE7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgxLCBNYXRoLmZsb29yKG9wdGlvbnNMaXN0RWxlbWVudC5jbGllbnRIZWlnaHQgLyBvcHRpb25IZWlnaHQpKTtcbiAgICB9XG5cbiAgICBtb3ZlQWN0aXZlQnlQYWdlKGRpcmVjdGlvbjogMSB8IC0xKSB7XG4gICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbih0aGlzLmdldFBhZ2VKdW1wU2l6ZSgpICogZGlyZWN0aW9uKTtcbiAgICB9XG5cbiAgICBjb21taXRBY3RpdmVPcHRpb25TZWxlY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHsgYWN0aXZlT3B0aW9uLCBzZWxlY3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIWFjdGl2ZU9wdGlvbiB8fCBhY3RpdmVPcHRpb24uZGlzYWJsZWQpIHJldHVybjtcblxuICAgICAgICBpZiAoc2VsZWN0RWxlbWVudC5tdWx0aXBsZSkge1xuICAgICAgICAgICAgYWN0aXZlT3B0aW9uLnNlbGVjdGVkID0gIWFjdGl2ZU9wdGlvbi5zZWxlY3RlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5pbmRleE9mKGFjdGl2ZU9wdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxlY3RFbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xuICAgIH1cblxuICAgIC8vIC0tLSBJbnRlcm5hbCB3aXJpbmcgLS0tXG4gICAgcHJpdmF0ZSBpbml0UGx1Z2lucygpIHtcbiAgICAgICAgaWYgKCEodGhpcy5oZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKHRoaXMub3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY29udGV4dDogUGx1Z2luQ29udGV4dCA9IHtcbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQ6IHRoaXMuc2VsZWN0RWxlbWVudCxcbiAgICAgICAgICAgIGhlYWRlckVsZW1lbnQ6IHRoaXMuaGVhZGVyRWxlbWVudCxcbiAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudDogdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQsXG4gICAgICAgICAgICBzZWFyY2hJbnB1dEVsZW1lbnQ6IHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50LFxuICAgICAgICAgICAgc2V0TWVzc2FnZTogKHRleHQpID0+IHRoaXMuc2V0TWVzc2FnZSh0ZXh0KSxcbiAgICAgICAgICAgIGNsZWFyTWVzc2FnZTogKCkgPT4gdGhpcy5jbGVhck1lc3NhZ2UoKSxcbiAgICAgICAgICAgIG9uOiAodGFyZ2V0LCBldmVudCwgaGFuZGxlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbkxpc3RlbmVycy5wdXNoKHsgdGFyZ2V0LCBldmVudCwgaGFuZGxlciB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICBwbHVnaW4uaW5pdChjb250ZXh0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEtleWJvYXJkIGNvbnRyYWN0cyBmb3IgaGVhZGVyLCBsaXN0LCBhbmQgc2VhcmNoIGFyZSBrZXB0IHRvZ2V0aGVyIGhlcmUgXHUyMDE0IHNwbGl0dGluZyB0aGVtXG4gICAgLy8gd291bGQgc2NhdHRlciByZWxhdGVkIGtleSBoYW5kbGluZyBhY3Jvc3MgbXVsdGlwbGUgbWV0aG9kcy4gSWYgdGhpcyBncm93cyBzaWduaWZpY2FudGx5LFxuICAgIC8vIGNvbnNpZGVyIGJyZWFraW5nIG91dCBwZXItY29tcG9uZW50IGhhbmRsZXJzLlxuICAgIHByaXZhdGUgYmluZEV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgeyB3b3JzZVNlbGVjdEVsZW1lbnQsIHNlbGVjdEVsZW1lbnQsIGRyb3Bkb3duUGFuZWxFbGVtZW50LCBvcHRpb25zTGlzdEVsZW1lbnQsIGhlYWRlckVsZW1lbnQsIHNlYXJjaElucHV0RWxlbWVudCB9ID0gdGhpcztcblxuICAgICAgICBpZiAoISh3b3JzZVNlbGVjdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEoZHJvcGRvd25QYW5lbEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKGhlYWRlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBvbk9wdGlvbnNDbGljazogRXZlbnRMaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkVsID0gdGFyZ2V0LmNsb3Nlc3QoJy53b3JzZS1zZWxlY3Qtb3B0aW9uJyk7XG4gICAgICAgICAgICBpZiAoIShvcHRpb25FbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKCFkcm9wZG93blBhbmVsRWxlbWVudC5jb250YWlucyhvcHRpb25FbCkpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChvcHRpb25FbC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9uID0gZ2V0U2VsZWN0T3B0aW9uRWxlbWVudChvcHRpb25FbCk7XG4gICAgICAgICAgICBpZiAoIXNlbGVjdE9wdGlvbiB8fCBzZWxlY3RPcHRpb24uZGlzYWJsZWQpIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVPcHRpb24oc2VsZWN0T3B0aW9uLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RFbGVtZW50Lm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uLnNlbGVjdGVkID0gIXNlbGVjdE9wdGlvbi5zZWxlY3RlZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5zZWxlY3RlZEluZGV4ID0gQXJyYXkuZnJvbShzZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmluZGV4T2Yoc2VsZWN0T3B0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywgeyBidWJibGVzOiB0cnVlIH0pKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9uU2VsZWN0Q2hhbmdlOiBFdmVudExpc3RlbmVyID0gKCkgPT4gdGhpcy5zeW5jQWxsKCk7XG4gICAgICAgIGNvbnN0IG9uSGVhZGVyQ2xpY2s6IEV2ZW50TGlzdGVuZXIgPSAoKSA9PiB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG5cbiAgICAgICAgY29uc3Qgb25IZWFkZXJLZXlEb3duOiBFdmVudExpc3RlbmVyID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdzdGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICcgJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuID8gdGhpcy5jbG9zZURyb3Bkb3duQW5kRm9jdXNIZWFkZXIoKSA6IHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9uT3B0aW9uc0tleURvd246IEV2ZW50TGlzdGVuZXIgPSBldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoIShldmVudCBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZVRvQm91bmRhcnkoJ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZVRvQm91bmRhcnkoJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlRG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZVVwJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJyAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1pdEFjdGl2ZU9wdGlvblNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdEVsZW1lbnQubXVsdGlwbGUpIHRoaXMuY2xvc2VEcm9wZG93bkFuZEZvY3VzSGVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bkFuZEZvY3VzSGVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9uU2VhcmNoS2V5RG93bjogRXZlbnRMaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghKGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlVG9Cb3VuZGFyeSgnc3RhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZVRvQm91bmRhcnkoJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlRG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBkcm9wZG93blBhbmVsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uT3B0aW9uc0NsaWNrKTtcbiAgICAgICAgc2VsZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvblNlbGVjdENoYW5nZSk7XG4gICAgICAgIGhlYWRlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkhlYWRlckNsaWNrKTtcbiAgICAgICAgaGVhZGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25IZWFkZXJLZXlEb3duKTtcbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbk9wdGlvbnNLZXlEb3duKTtcblxuICAgICAgICBpZiAoc2VhcmNoSW5wdXRFbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgc2VhcmNoSW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvblNlYXJjaEtleURvd24pO1xuICAgICAgICAgICAgdGhpcy5vblNlYXJjaEtleURvd24gPSBvblNlYXJjaEtleURvd247XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uT3B0aW9uc0NsaWNrID0gb25PcHRpb25zQ2xpY2s7XG4gICAgICAgIHRoaXMub25TZWxlY3RDaGFuZ2UgPSBvblNlbGVjdENoYW5nZTtcbiAgICAgICAgdGhpcy5vbkhlYWRlckNsaWNrID0gb25IZWFkZXJDbGljaztcbiAgICAgICAgdGhpcy5vbkhlYWRlcktleURvd24gPSBvbkhlYWRlcktleURvd247XG4gICAgICAgIHRoaXMub25PcHRpb25zS2V5RG93biA9IG9uT3B0aW9uc0tleURvd247XG5cbiAgICAgICAgdGhpcy5zeW5jQWxsKCk7XG4gICAgfVxuXG4gICAgLy8gRE9NIGRpZmZpbmcgaXMga2VwdCBpbmxpbmUgaGVyZSBiZWNhdXNlIHRoZSBtdXRhdGlvbiBjYXNlcyBhcmUgdGlnaHRseSBjb3VwbGVkIHRvIGVhY2hcbiAgICAvLyBvdGhlciBhbmQgdGhlIHNjcm9sbGVyJ3MgY2hpbGQgb3JkZXIuIElmIHRoaXMgZ3Jvd3MgKGUuZy4gb3B0aW9uIGdyb3VwcywgcmVvcmRlcmluZ1xuICAgIC8vIGFuaW1hdGlvbnMpLCBleHRyYWN0IGludG8gYSBkZWRpY2F0ZWQgcmVjb25jaWxlci5cbiAgICBwcml2YXRlIG9ic2VydmVPcHRpb25zKCkge1xuICAgICAgICBjb25zdCB7IHNlbGVjdEVsZW1lbnQsIG9wdGlvbnNMaXN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbkxpc3QgPT4ge1xuICAgICAgICAgICAgbGV0IHNob3VsZFJlYnVpbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBzaG91bGRVcGRhdGVTdGF0ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9uTGlzdCkge1xuICAgICAgICAgICAgICAgIGlmIChtdXRhdGlvbi50eXBlID09PSAnY2hpbGRMaXN0Jykge1xuICAgICAgICAgICAgICAgICAgICBzaG91bGRSZWJ1aWxkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkVXBkYXRlU3RhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2F0dHJpYnV0ZXMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZVN0YXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRSZWJ1aWxkKSB7XG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShvcHRpb25zTGlzdEVsZW1lbnQuY2hpbGRyZW4pLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5rZWRPcHRpb24gPSBnZXRTZWxlY3RPcHRpb25FbGVtZW50KGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFsaW5rZWRPcHRpb24gfHwgIUFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5pbmNsdWRlcyhsaW5rZWRPcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlua2VkT3B0aW9uKSB1bmxpbmtPcHRpb24obGlua2VkT3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuZm9yRWFjaCgoc2VsZWN0T3B0aW9uLCBvcHRpb25JbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwgPSBjcmVhdGVXb3JzZU9wdGlvbkVsZW1lbnQodGhpcywgc2VsZWN0T3B0aW9uLCBvcHRpb25JbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rT3B0aW9uKHNlbGVjdE9wdGlvbiwgZWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZWwuaWQgPSBnZXRPcHRpb25JZCh0aGlzLCBvcHRpb25JbmRleCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEF0SW5kZXggPSBvcHRpb25zTGlzdEVsZW1lbnQuY2hpbGRyZW5bb3B0aW9uSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudEF0SW5kZXggIT09IGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50QXRJbmRleCA/IGN1cnJlbnRBdEluZGV4LmJlZm9yZShlbCkgOiBvcHRpb25zTGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBBcnJheS5mcm9tKG9wdGlvbnNMaXN0RWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50ICYmICFnZXRTZWxlY3RPcHRpb25FbGVtZW50KGNoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNob3VsZFVwZGF0ZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jQWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoc2VsZWN0RWxlbWVudCwge1xuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgc3VidHJlZTogZmFsc2UsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbJ3N0eWxlJywgJ2NsYXNzJywgJ2Rpc2FibGVkJywgJ211bHRpcGxlJywgJ3NpemUnXVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm9wdGlvbk9ic2VydmVyID0gb2JzZXJ2ZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgc2VsZWN0RWxlbWVudCwgd29yc2VTZWxlY3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoISh3b3JzZVNlbGVjdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBzZWxlY3RFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHNlbGVjdEVsZW1lbnQuYWZ0ZXIod29yc2VTZWxlY3RFbGVtZW50KTtcbiAgICB9XG59XG5cbi8qKlxuICogRW5oYW5jZXMgZXZlcnkgbmF0aXZlIGA8c2VsZWN0PmAgZWxlbWVudCBpbnNpZGUgdGhlIHByb3ZpZGVkIHJvb3QuXG4gKlxuICogVGhlIGZ1bmN0aW9uIGlzIHNhZmUgdG8gY2FsbCBtdWx0aXBsZSB0aW1lcy4gRWFjaCBgPHNlbGVjdD5gIGlzIG1vdW50ZWQgYXQgbW9zdCBvbmNlLlxuICogSWYgYG9wdGlvbnMub2JzZXJ2ZWAgaXMgdHJ1ZSwgbmV3bHkgYWRkZWQgc2VsZWN0cyB1bmRlciB0aGUgcm9vdCBhcmUgZW5oYW5jZWQgYXV0b21hdGljYWxseS5cbiAqXG4gKiBSZXR1cm5zIGEgY2xlYW51cCBmdW5jdGlvbiB0aGF0IGRpc2Nvbm5lY3RzIHRoZSByb290IG9ic2VydmVyIGFuZCBkZXN0cm95cyBtb3VudGVkIGluc3RhbmNlc1xuICogdW5kZXIgdGhlIHByb3ZpZGVkIHJvb3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3b3JzZVNlbGVjdChyb290OiBSb290Tm9kZSA9IGRvY3VtZW50LCBvcHRpb25zOiBXb3JzZVNlbGVjdE9wdGlvbnMgPSB7fSk6ICgpID0+IHZvaWQge1xuICAgIGNvbnN0IHBsdWdpbnMgPSBvcHRpb25zLnBsdWdpbnMgPz8gW107XG4gICAgbW91bnRTZWxlY3RzSW5Sb290KHJvb3QsIHBsdWdpbnMpO1xuXG4gICAgbGV0IHJvb3RPYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlciB8IHVuZGVmaW5lZDtcblxuICAgIGlmIChvcHRpb25zLm9ic2VydmUpIHtcbiAgICAgICAgcm9vdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25MaXN0ID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25MaXN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgIT09ICdjaGlsZExpc3QnKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIG11dGF0aW9uLmFkZGVkTm9kZXMuZm9yRWFjaChhZGRlZE5vZGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShhZGRlZE5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChhZGRlZE5vZGUgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW91bnRTZWxlY3RFbGVtZW50KGFkZGVkTm9kZSwgcm9vdCwgcGx1Z2lucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBhZGRlZE5vZGUucXVlcnlTZWxlY3RvckFsbDxIVE1MU2VsZWN0RWxlbWVudD4oJ3NlbGVjdCcpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW91bnRTZWxlY3RFbGVtZW50KGVsLCByb290LCBwbHVnaW5zKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvb3RPYnNlcnZlci5vYnNlcnZlKHJvb3QsIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHJvb3RPYnNlcnZlcj8uZGlzY29ubmVjdCgpO1xuXG4gICAgICAgIGdldFNlbGVjdEVsZW1lbnRzSW5Sb290KHJvb3QpLmZvckVhY2goc2VsZWN0RWxlbWVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IGluc3RhbmNlcy5nZXQoc2VsZWN0RWxlbWVudCk7XG4gICAgICAgICAgICBpZiAoIWluc3RhbmNlKSByZXR1cm47XG4gICAgICAgICAgICBpbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgICAgICAgICBpbnN0YW5jZXMuZGVsZXRlKHNlbGVjdEVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBlbnN1cmVTdHlsZXMoKSB7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXdvcnNlLXNlbGVjdC1zdHlsZXM9XCJ0cnVlXCJdJykpIHJldHVybjtcblxuICAgIGNvbnN0IHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS13b3JzZS1zZWxlY3Qtc3R5bGVzJywgJ3RydWUnKTtcbiAgICBzdHlsZUVsZW1lbnQudGV4dENvbnRlbnQgPSBjcmVhdGVDU1MoKTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGdldFNlbGVjdEVsZW1lbnRzSW5Sb290KHJvb3Q6IFJvb3ROb2RlKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20ocm9vdC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxTZWxlY3RFbGVtZW50Pignc2VsZWN0JykpO1xufVxuXG5mdW5jdGlvbiBtb3VudFNlbGVjdHNJblJvb3Qocm9vdDogUm9vdE5vZGUsIHBsdWdpbnM6IFBsdWdpbltdKSB7XG4gICAgZ2V0U2VsZWN0RWxlbWVudHNJblJvb3Qocm9vdCkuZm9yRWFjaChzZWxlY3RFbGVtZW50ID0+IG1vdW50U2VsZWN0RWxlbWVudChzZWxlY3RFbGVtZW50LCByb290LCBwbHVnaW5zKSk7XG59XG5cbmZ1bmN0aW9uIG1vdW50U2VsZWN0RWxlbWVudChzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudCwgcm9vdDogUm9vdE5vZGUsIHBsdWdpbnM6IFBsdWdpbltdKSB7XG4gICAgaWYgKGluc3RhbmNlcy5nZXQoc2VsZWN0RWxlbWVudCkpIHJldHVybjtcblxuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IFdvcnNlU2VsZWN0KHNlbGVjdEVsZW1lbnQsIGdldENvbmZpZyhzZWxlY3RFbGVtZW50KSwgcm9vdCwgcGx1Z2lucyk7XG4gICAgaW5zdGFuY2UubW91bnQoKTtcbiAgICBpbnN0YW5jZXMuc2V0KHNlbGVjdEVsZW1lbnQsIGluc3RhbmNlKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFHTyxJQUFNLGlCQUFpQjtBQUFBLEVBQzFCLFlBQVk7QUFBQSxFQUNaLGtCQUFrQjtBQUFBLEVBQ2xCLFFBQVE7QUFBQSxFQUNSLE9BQU87QUFDWDs7O0FDSE8sU0FBUyxZQUFZO0FBQ3hCO0FBQUE7QUFBQSxJQUEyQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBbUNkLGVBQWUsS0FBSztBQUFBLGtCQUNuQixlQUFlLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQkEyRmpCLGVBQWUsZ0JBQWdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFB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