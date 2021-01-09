import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import WebMidi from "webmidi";

import Something from "./components/Something";

WebMidi.enable(function (err) {
  if (err) {
    console.log("WebMidi could not be enabled.", err);
  } else {
    console.log("WebMidi enabled!");

    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);

    // Reacting when a new device becomes available
    WebMidi.addListener("connected", function (e) {
      console.log(e);
    });

    // Reacting when a device becomes unavailable
    WebMidi.addListener("disconnected", function (e) {
      console.log(e);
    });

    // Display the current time
    console.log(WebMidi.time);
  }
});

function App() {
  useEffect(() => {}, []);

  return (
    <div>
      app &
      <Something />
    </div>
  );
}

var mountNode = document.getElementById("react-app");
ReactDOM.render(<App />, mountNode);
