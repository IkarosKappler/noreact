import { Ref } from "./useRef";

export type IElementContent = Array<string | HTMLElement | IElementContent>;

export const ClickHandlerNames: Array<string> = [
  "onchange",
  "onclick",
  "oninput",
  "onkeydown",
  "onload",
  "onmouseover",
  "onmouseout",
  "onmouseenter",
  "onmouseover",
  "onmouseout",
  "ontouchcancel",
  "ontouchend",
  "ontouchmove",
  "ontouchstart"
];

export type ElementProps = { [id: string]: string | Function | CSSStyleSheet | Ref<HTMLElement | undefined> };
