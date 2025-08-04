# noreact

A basic and very stupid JSX renderer.

No States. No Hooks. No Effects.
Just JSX.

Before

```
  const container = document.createElement("div");
  const button = document.createElement("button");

  container.style["display"] = "float";
  container.style["justify-content"] = "center";
  container.style["width"] = "100%";

  button.setAttribute("id", "mybutton");
  button.addEventListener("click", () => { console.log("clicked") });
  container.appendChild(button);
  document.body.appendChild(container);
```

Now

```
  var rootNode = NoReact.createRoot(document.body);
  rootNode.render(
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <button id="mybutton" onClick={() => {console.log("clicked") }}></button>
    </div>
  );
```

Yeah, I know. Re-inventing the wheel. But I needed a quick and un-sophisticated JSX renderer.

Fun fact: Refs exist. This is my way of accesses the rendered node later.
