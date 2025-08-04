import NoReact from "./NoReact";
export const TestApp = (name) => {
    const click1 = () => {
        console.log("First clicked");
    };
    const click2 = () => {
        console.log("Second clicked");
    };
    const mouseEnter = (event) => {
        event.target.style["background-color"] = "grey";
    };
    const mouseOut = (event) => {
        event.target.style["background-color"] = "DeepSkyBlue";
    };
    return (NoReact.createElement("div", { className: "NoReact-main", style: { padding: "3em" } },
        "Hello ",
        name,
        NoReact.createElement("div", { className: "NoReact-child-1", onClick: click1 }, "Hello Nested"),
        NoReact.createElement("div", { className: "NoReact-child-2", onClick: click2, onMouseEnter: mouseEnter, onMouseOut: mouseOut, style: { backgroundColor: "yellow" } }, "Hello Nested 2"),
        NoReact.createElement("div", null, ["A", "B", "C"].map((text) => {
            return NoReact.createElement("div", null, text);
        }))));
};
//# sourceMappingURL=TestApp.js.map