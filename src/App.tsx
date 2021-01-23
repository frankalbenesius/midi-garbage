import React, { useState } from "react";
import ControlsPanel from "./components/ControlsPanel";
import WebMIDICheck from "./components/WebMidiCheck";
import Layout from "./components/Layout";

interface MidiGarbageState {
  inputId: string;
  outputId: string;
  isPlaying: boolean;
  tick: number;
  bpm: number;
}

function App() {
  const [state, setState] = useState<MidiGarbageState>({
    inputId: "",
    outputId: "",
    isPlaying: false,
    tick: 0,
    bpm: 120,
  });

  // TODO, make a ticking clock that sequencers can listen to
  // in order to derive their current step n stuff

  return (
    <WebMIDICheck>
      <Layout
        aside={
          <ControlsPanel
            isPlaying={state.isPlaying}
            onPlayToggle={() =>
              setState((s) => ({ ...s, isPlaying: !s.isPlaying }))
            }
            tick={state.tick}
            onTickReset={() => setState((s) => ({ ...s, tick: 0 }))}
            bpm={state.bpm}
            onBpmChange={(bpm) => setState((s) => ({ ...s, bpm }))}
            inputId={state.inputId}
            onInputChange={(inputId) => setState((s) => ({ ...s, inputId }))}
            outputId={state.outputId}
            onOutputChange={(outputId) => setState((s) => ({ ...s, outputId }))}
          />
        }
        main={<div>sequencer content!</div>}
      />
    </WebMIDICheck>
  );
}

export default App;
