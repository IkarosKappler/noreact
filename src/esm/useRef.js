export class Ref {
    constructor(value) {
        this.current = value;
    }
}
export const useRef = () => {
    return new Ref(undefined);
};
//# sourceMappingURL=useRef.js.map