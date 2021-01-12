import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { Transport, Time } from "tone";
import { getNoteNumberSafe, midiSync } from "../utils";
import { useGlobalConfig } from "./GlobalConfig";

interface Props {
  channel: MidiChannel;
}

const Sequencer: FunctionComponent<Props> = (props) => {
  const { output } = useGlobalConfig();
  const [repeats, setRepeats] = useState<number[]>([]);

  const sixteenthSecs = Time("16n").toSeconds();

  const scheduleNote = (step: number) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      if (repeats[step] !== undefined) {
        Transport.clear(repeats[step]);
      }
      const note = getNoteNumberSafe(e.currentTarget.value);
      if (output && note) {
        const repeat = Transport.scheduleRepeat(
          midiSync((time) => {
            console.log("playing", note);
            output.playNote(note, props.channel, {
              time,
              duration: 500,
            });
          }),
          "1n",
          step * sixteenthSecs
        );
        const newRepeats = [...repeats];
        newRepeats[step] = repeat;
        setRepeats(newRepeats);
      }
    };
  };

  const stepInputs = [];
  for (let step = 0; step < 16; step++) {
    stepInputs.push(
      <div key={step}>
        <input
          maxLength={3} // e.g C#9
          onChange={scheduleNote(step)}
        />
      </div>
    );
  }

  return (
    <div>
      16th note sequencer on MIDI channel {props.channel}
      <div>{stepInputs}</div>
    </div>
  );
};

export default Sequencer;
