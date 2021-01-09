import React from "react";
import ReactDOM from "react-dom";

import Something from "./components/Something";

function App() {
  return (
    <div>
      app &
      <Something />
    </div>
  );
}

var mountNode = document.getElementById("react-app");
ReactDOM.render(<App />, mountNode);
