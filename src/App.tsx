import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import ControlsPanel from "./components/ControlsPanel";
import WebMIDICheck from "./components/WebMidiCheck";
import Layout from "./components/Layout";
import usePulseClock from "./hooks/usePulseClock";
import sequencers from "./sequencers";

export interface MidiGarbageState {
  inputId: string;
  outputId: string;
  isPlaying: boolean;
  pulse: number;
  bpm: number;
}

const initialState: MidiGarbageState = {
  inputId: "",
  outputId: "",
  isPlaying: false,
  pulse: -1,
  bpm: 120,
};
const App = () => {
  const [state, setState] = useState<MidiGarbageState>(initialState);

  usePulseClock({
    bpm: state.bpm,
    isPlaying: state.isPlaying,
    onPulse: () => setState((s) => ({ ...s, pulse: s.pulse + 1 })),
  });

  return (
    <WebMIDICheck>
      <Router>
        <Layout
          aside={
            <ControlsPanel
              isPlaying={state.isPlaying}
              onPlayToggle={() =>
                setState((s) => ({ ...s, isPlaying: !s.isPlaying }))
              }
              pulse={state.pulse}
              onPulseReset={() =>
                setState((s) => ({ ...s, pulse: initialState.pulse }))
              }
              bpm={state.bpm}
              onBpmChange={(bpm) => setState((s) => ({ ...s, bpm }))}
              inputId={state.inputId}
              onInputChange={(inputId) => setState((s) => ({ ...s, inputId }))}
              outputId={state.outputId}
              onOutputChange={(outputId) =>
                setState((s) => ({ ...s, outputId }))
              }
            />
          }
          main={
            <Switch>
              {sequencers.map(({ route, component: Sequencer }) => (
                <Route key={route} path={route}>
                  <Sequencer {...state} />
                </Route>
              ))}
              <Redirect from="/" to="/franks-first-one" />
            </Switch>
          }
        />
      </Router>
    </WebMIDICheck>
  );
};

export default App;
