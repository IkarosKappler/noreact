export declare const NoReact: {
    createRoot: (rootHtmlElement: HTMLElement) => import("./createRoot").RootNode;
    createElement: (name: string, props: import("./interfaces").ElementProps, ...content: import("./interfaces").IElementContent) => HTMLElement;
    useRef: <T extends HTMLElement | undefined>() => import("./useRef").Ref<T>;
    TestApp: (name: string) => import("typescript").JsxElement;
};
export default NoReact;
