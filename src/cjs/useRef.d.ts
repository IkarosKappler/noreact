export declare class Ref<T extends HTMLElement | undefined> {
    current: T;
    constructor(value: T);
}
export declare const useRef: <T extends HTMLElement | undefined>() => Ref<T>;
