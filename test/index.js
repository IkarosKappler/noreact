window.addEventListener("load", function () {
  console.log("load event");
  function log(html) {
    console.log(html);
  }

  var rootNode = NoReact.createRoot(document.getElementById("root"));

  // log(NoReact.TestApp("World"));
  rootNode.render(NoReact.TestApp("World"));
});
