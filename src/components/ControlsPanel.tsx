import React, { FunctionComponent, useEffect, useState } from "react";
import webmidi, { IMidiChannel, Input, Output } from "webmidi";

import Dropdown from "./Dropdown";
import RangeInput from "./RangeInput";
import TransportInputs from "./TransportInputs";
import sequencers from "../sequencers";
import { useHistory, useLocation } from "react-router-dom";

interface Props {
  inputId: string;
  onInputChange: (id: string) => void;
  outputId: string;
  onOutputChange: (id: string) => void;
  outputChannel: "all" | number;
  onOutputChannelChange: (channel: "all" | number) => void;
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
  const history = useHistory();
  const location = useLocation();

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
      <h1>🚮 MIDI Garbage</h1>
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
        value={location.pathname}
        options={sequencers.map((seq) => ({
          value: seq.route,
          label: seq.name,
        }))}
        onChange={(value) => {
          history.push(value.toString());
        }}
      />
      <Dropdown
        label="MIDI Input Device"
        value={props.inputId}
        options={devices.inputs.map((d) => ({ value: d.id, label: d.name }))}
        onChange={(value) => props.onInputChange(value.toString())}
      />
      <Dropdown
        label="MIDI Output Device"
        value={props.outputId}
        options={devices.outputs.map((d) => ({ value: d.id, label: d.name }))}
        onChange={(value) => props.onOutputChange(value.toString())}
      />
      <Dropdown
        label="MIDI Output Channel"
        value={props.outputChannel}
        options={Array(17)
          .fill(null)
          .map((_, idx) =>
            idx === 0
              ? { value: idx, label: "All" }
              : { value: idx, label: idx.toString() }
          )}
        onChange={(value) => {
          props.onOutputChannelChange(
            value === 0 ? "all" : parseInt(value.toString())
          );
        }}
      />
    </div>
  );
};

export default ControlsPanel;
