import React, { useState } from "react";
import ControlsPanel from "./components/ControlsPanel";
import WebMIDICheck from "./components/WebMidiCheck";

interface MidiGarbageState {
  inputId: string;
  outputId: string;
  isPlaying: boolean;
  currentStepIndex: number;
  steps: Tuple16<Step>;
}
type Step = null | number | string; // "null" is rest, otherwise pitch info
type Tuple16<T> = [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T];

function App() {
  const [state, setState] = useState<MidiGarbageState>({
    inputId: "",
    outputId: "",
    isPlaying: false,
    currentStepIndex: 0,
    steps: [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  });

  // // step sequencer crap i'll figure out later
  // const bpm = 120;
  // const minuteLength = 60 * 1000;
  // const stepLength = minuteLength / bpm;
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setShow(true);
  //     setTimeout(() => {
  //       setShow(false);
  //     }, stepLength * 0.5);
  //   }, stepLength);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <WebMIDICheck>
      <div className="future layout shiz">
        <ControlsPanel />
      </div>
    </WebMIDICheck>
  );
}

export default App;
