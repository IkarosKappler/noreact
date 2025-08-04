export class Ref<T extends HTMLElement | undefined> {
  public current: T;

  public constructor(value: T) {
    this.current = value;
  }
}

export const useRef = <T extends HTMLElement | undefined>() => {
  return new Ref<T>(undefined);
};
