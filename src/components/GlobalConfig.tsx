import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import webmidi, { Input, Output } from "webmidi";
import * as Tone from "tone";

interface GlobalConfig {
  input?: Input;
  output?: Output;
  bpm: number;
  setInput: (input?: Input) => void;
  setOutput: (output?: Output) => void;
  setBPM: (bpm: number) => void;
}

export const GlobalConfigContext = createContext<GlobalConfig>({
  bpm: 60,
  setInput: () => {},
  setOutput: () => {},
  setBPM: () => {},
});

export const GlobalConfigProvider: FunctionComponent = (props) => {
  const [input, setInput] = useState<Input | undefined>();
  const [output, setOutput] = useState<Output | undefined>();
  const [bpm, setBPM] = useState<number>(60);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  return (
    <GlobalConfigContext.Provider
      value={{ input, output, bpm, setInput, setOutput, setBPM }}
    >
      <div
        onMouseDown={() => {
          // Initialize the audio context after the first user interaction
          Tone.start();
        }}
      >
        {props.children}
      </div>
    </GlobalConfigContext.Provider>
  );
};

export const useGlobalConfig = () => useContext(GlobalConfigContext);

interface Devices {
  inputs: Input[];
  outputs: Output[];
}

export const ControlsPanel: FunctionComponent = () => {
  const config = useContext(GlobalConfigContext);
  const [devices, setDevices] = useState<Devices>({
    inputs: [],
    outputs: [],
  });

  useEffect(() => {
    function updateDevices() {
      setDevices({
        inputs: webmidi.inputs,
        outputs: webmidi.outputs,
      });
    }
    updateDevices();
    webmidi.addListener("connected", updateDevices);
    webmidi.addListener("disconnected", updateDevices);
  }, []);

  return (
    <div className="controls">
      <div className="dropdown">
        <label htmlFor="inputSelect">Input</label>
        <select
          id="inputSelect"
          value={config.input?.id}
          onChange={(e) => {
            const input = webmidi.getInputById(e.currentTarget.value);
            config.setInput(input || undefined);
          }}
        >
          <option value="">None Selected</option>
          {devices.inputs.map((input) => (
            <option value={input.id} key={input.id}>
              {input.name}
            </option>
          ))}
        </select>
      </div>
      <div className="dropdown">
        <label htmlFor="outputSelect">Output</label>
        <select
          id="outputSelect"
          value={config.output?.id}
          onChange={(e) => {
            const output = webmidi.getOutputById(e.currentTarget.value);
            config.setOutput(output || undefined);
          }}
        >
          <option value="">None Selected</option>
          {devices.outputs.map((output) => (
            <option value={output.id} key={output.id}>
              {output.name}
            </option>
          ))}
        </select>
      </div>
      <div className="numberInput">
        <label htmlFor="bpmInput">BPM</label>
        <input
          id="bpmInput"
          type="number"
          defaultValue={60}
          min={1}
          onChange={(e) => {
            config.setBPM(Number(e.currentTarget.value));
          }}
        />
      </div>
      <button onClick={() => Tone.Transport.start()}>start</button>
      <button onClick={() => Tone.Transport.pause()}>pause</button>
      <button onClick={() => Tone.Transport.stop()}>stop</button>
    </div>
  );
};

export default ControlsPanel;
