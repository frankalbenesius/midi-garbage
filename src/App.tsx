import React, { useState } from "react";
import ControlsPanel from "./components/ControlsPanel";
import WebMIDICheck from "./components/WebMidiCheck";
import Layout from "./components/Layout";
import usePulseClock from "./hooks/usePulseClock";
import { PPQN } from "./constants";

interface MidiGarbageState {
  inputId: string;
  outputId: string;
  isPlaying: boolean;
  pulse: number;
  bpm: number;
}

const App = () => {
  const [state, setState] = useState<MidiGarbageState>({
    inputId: "",
    outputId: "",
    isPlaying: true,
    pulse: -1,
    bpm: 120,
  });

  usePulseClock({
    bpm: state.bpm,
    isPlaying: state.isPlaying,
    onPulse: () => setState((s) => ({ ...s, pulse: s.pulse + 1 })),
  });

  const showBeat = state.pulse % PPQN < PPQN / 2;

  return (
    <WebMIDICheck>
      <Layout
        aside={
          <ControlsPanel
            isPlaying={state.isPlaying}
            onPlayToggle={() =>
              setState((s) => ({ ...s, isPlaying: !s.isPlaying }))
            }
            pulse={state.pulse}
            onPulseReset={() => setState((s) => ({ ...s, pulse: -1 }))}
            bpm={state.bpm}
            onBpmChange={(bpm) => setState((s) => ({ ...s, bpm }))}
            inputId={state.inputId}
            onInputChange={(inputId) => setState((s) => ({ ...s, inputId }))}
            outputId={state.outputId}
            onOutputChange={(outputId) => setState((s) => ({ ...s, outputId }))}
          />
        }
        main={
          <div>
            sequencer content!
            <div>pulse: {Math.floor(state.pulse / PPQN)}</div>
            {showBeat && <div>beat</div>}
          </div>
        }
      />
    </WebMIDICheck>
  );
};

export default App;
