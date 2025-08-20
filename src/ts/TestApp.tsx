import NoReact from "./NoReact";
import { JsxElement } from "typescript";

export const TestApp = (name: string): JsxElement => {
  const click1 = () => {
    console.log("First clicked");
  };

  const click2 = () => {
    console.log("Second clicked");
  };

  const mouseEnter = (event: Event) => {
    (event.target as HTMLDivElement).style["background-color"] = "grey";
  };

  const mouseOut = (event: Event) => {
    (event.target as HTMLDivElement).style["background-color"] = "DeepSkyBlue";
  };

  return (
    <div className="NoReact-main" style={{ padding: "3em", mx: "2em", my: 0 }}>
      Hello {name}
      <div className="NoReact-child-1" onClick={click1}>
        Hello Nested
      </div>
      <div
        className="NoReact-child-2"
        onClick={click2}
        onMouseEnter={mouseEnter}
        onMouseOut={mouseOut}
        style={{ backgroundColor: "yellow" }}
      >
        Hello Nested 2
      </div>
      <div>
        {["A", "B", "C"].map((text: string) => {
          return <div>{text}</div>;
        })}
      </div>
    </div>
  );
};
