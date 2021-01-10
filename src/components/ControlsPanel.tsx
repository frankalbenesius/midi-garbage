import React, { FunctionComponent, useEffect, useState } from "react";
import webmidi, { Input, Output } from "webmidi";

interface Props {
  inputId: string;
  outputId: string;
  onInputChange: (id: string) => void;
  onOutputChange: (id: string) => void;
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
      <div className="dropdown">
        <label htmlFor="inputSelect">Input</label>
        <select id="inputSelect">
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
        <select id="outputSelect">
          <option value="">None Selected</option>
          {devices.outputs.map((output) => (
            <option value={output.id} key={output.id}>
              {output.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ControlsPanel;
