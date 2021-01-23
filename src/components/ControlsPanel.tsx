import React, { FunctionComponent, useEffect, useState } from "react";
import webmidi, { Input, Output } from "webmidi";
import Dropdown from "./Dropdown";
import RangeInput from "./RangeInput";
import TransportInputs from "./TransportInputs";

interface Props {
  inputId: string;
  onInputChange: (id: string) => void;
  outputId: string;
  onOutputChange: (id: string) => void;
  bpm: number;
  onBpmChange: (bpm: number) => void;
  isPlaying: boolean;
  onPlayToggle: () => void;
  pulse: number;
  onPulseReset: () => void;
}

interface Devices {
  inputs: Input[];
  outputs: Output[];
}

const ControlsPanel: FunctionComponent<Props> = (props) => {
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
      <h1>MIDI Garbage 🚮</h1>
      <TransportInputs
        isPlaying={props.isPlaying}
        onPlayToggle={props.onPlayToggle}
        pulse={props.pulse}
        onPulseReset={props.onPulseReset}
      />
      <RangeInput
        label="BPM"
        value={props.bpm}
        min={1}
        max={240}
        onChange={props.onBpmChange}
      />
      <Dropdown
        label="Sequencer"
        value={"default"}
        options={[]}
        onChange={console.log}
      />
      <Dropdown
        label="MIDI Input Device"
        value={props.inputId}
        options={devices.inputs.map((d) => ({ value: d.id, label: d.name }))}
        onChange={props.onInputChange}
      />
      <Dropdown
        label="MIDI Output Device"
        value={props.outputId}
        options={devices.outputs.map((d) => ({ value: d.id, label: d.name }))}
        onChange={props.onOutputChange}
      />
    </div>
  );
};

export default ControlsPanel;
