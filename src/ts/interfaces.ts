import { Ref } from "./useRef";

export type IElementContent = Array<string | HTMLElement | IElementContent>;

export const ClickHandlerNames: Array<string> = [
  "onchange",
  "onclick",
  "oninput",
  "onkeydown",
  "onkeyup",
  "onkeypress",
  "onload",
  "onmouseover",
  "onmouseout",
  "onmouseenter",
  "onmouseover",
  "onmouseout",
  "ontouchcancel",
  "ontouchend",
  "ontouchmove",
  "ontouchstart",
  "onmousedown",
  "onmouseup"
];

export type ElementProps = { [id: string]: string | Function | CSSStyleSheet | Ref<HTMLElement | undefined> };
