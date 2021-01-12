import React from "react";
import ControlsPanel, { GlobalConfigProvider } from "./components/GlobalConfig";
import Sequencer from "./components/Sequencer";
import WebMIDICheck from "./components/WebMidiCheck";

function App() {
  return (
    <WebMIDICheck>
      <GlobalConfigProvider>
        <div className="future layout shiz">
          <ControlsPanel />
          <Sequencer channel={1} />
          <Sequencer channel={2} />
        </div>
      </GlobalConfigProvider>
    </WebMIDICheck>
  );
}

export default App;
