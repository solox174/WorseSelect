type RootNode = ParentNode;
type PluginContext = {
    readonly selectElement: HTMLSelectElement;
    readonly headerElement: HTMLButtonElement;
    readonly optionsListElement: HTMLDivElement;
    readonly searchInputElement?: HTMLInputElement;
    setMessage(text: string): void;
    clearMessage(): void;
    on(target: EventTarget, event: string, handler: EventListener): void;
};
type Plugin = {
    name: string;
    init(context: PluginContext): void;
    onSync?(): void;
    onOpen?(): void;
    onClose?(): void;
    destroy?(): void;
};
type WorseSelectOptions = {
    observe?: boolean;
    plugins?: Plugin[];
};

/**
 * Progressive-enhancement utilities for native {@link HTMLSelectElement} controls.
 *
 * Keeps the native `<select>` as source of truth for value, disabled state, `size`, and
 * `multiple`, while mirroring that state into a custom DOM structure that is easier to style.
 *
 * Widget-specific behavior uses `data-*` attributes such as `data-searchable` and
 * `data-dropdown-height-px`, keeping the public API aligned with standard HTML.
 */

/**
 * Enhances every native `<select>` element inside the provided root.
 *
 * The function is safe to call multiple times. Each `<select>` is mounted at most once.
 * If `options.observe` is true, newly added selects under the root are enhanced automatically.
 *
 * Returns a cleanup function that disconnects the root observer and destroys mounted instances
 * under the provided root.
 */
declare function worseSelect(root?: RootNode, options?: WorseSelectOptions): () => void;

export { type Plugin, type PluginContext, worseSelect };
