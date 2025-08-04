import { Ref } from "./useRef";
export type IElementContent = Array<string | HTMLElement | IElementContent>;
export declare const ClickHandlerNames: Array<string>;
export type ElementProps = {
    [id: string]: string | Function | CSSStyleSheet | Ref<HTMLElement | undefined>;
};
