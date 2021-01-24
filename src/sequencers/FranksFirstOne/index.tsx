import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WebMidi from "webmidi";

import { MidiGarbageState } from "../../App";
import { PPQN } from "../../constants";

// CONSTANTS:

const MINUTE_MS = 60 * 1000;
const STEPS_PER_QUARTER_NOTE = 4;
const PPS = PPQN / STEPS_PER_QUARTER_NOTE;
const NUM_STEPS = 16;
const NUM_DEGREES = 8;
const MIDDLE_C = 60;
const MIDI_CHANNEL = 10;
const MAJOR_SCALE_INTERVALS = [0, 2, 4, 5, 7, 9, 11, 12];

// SEQUENCER COMPONENT:

interface StepState {
  [index: number]: number | null;
}

const FranksFirstOne = (props: MidiGarbageState) => {
  const [steps, setSteps] = useState<StepState>(getRandomStepState());

  const currentStep = Math.floor(props.pulse / PPS) % NUM_STEPS;

  useEffect(() => {
    var output = WebMidi.getOutputById(props.outputId);
    const degree = steps[currentStep];
    if (props.isPlaying && output && degree !== null) {
      // Play a note on all channels of the selected output
      const note: number = MIDDLE_C + MAJOR_SCALE_INTERVALS[degree];
      const duration = MINUTE_MS / props.bpm / STEPS_PER_QUARTER_NOTE;
      output.playNote(note, MIDI_CHANNEL, { duration });
    }
  }, [currentStep]); // TODO: this is definitely not exhaustive dependencies... not sure if that's bad

  return (
    <FlexWrapper>
      <StepsWrapper>
        {Object.entries(steps).map(
          ([stepIdx, degree]: [string, number | null]) => (
            <Step
              key={stepIdx}
              isActive={parseInt(stepIdx) === currentStep}
              degree={degree}
              onDegreeClick={(clickedDegree) => {
                setSteps((s) => {
                  const curStepDegree = s[parseInt(stepIdx)];
                  const newDegree =
                    curStepDegree === clickedDegree ? null : clickedDegree;
                  return {
                    ...s,
                    [stepIdx]: newDegree,
                  };
                });
              }}
            />
          )
        )}
      </StepsWrapper>
    </FlexWrapper>
  );
};

export default FranksFirstOne;

// HELPER COMPONENTS:

interface StepProps {
  isActive: boolean;
  degree: number | null;
  onDegreeClick: (degree: number) => void;
}
const Step = (props: StepProps) => {
  const degrees: number[] = new Array(NUM_DEGREES).fill(null).map((_, i) => i);
  return (
    <StepWrapper>
      {degrees
        .sort((a, b) => b - a)
        .map((deg) => (
          <DegreeSquare
            key={deg}
            onClick={() => props.onDegreeClick(deg)}
            isActive={props.isActive}
            isSelected={deg === props.degree}
          />
        ))}
    </StepWrapper>
  );
};

// HELPER FUNCTIONS:

const getEmptyStepState = (): StepState => Array(NUM_STEPS).fill(null);
const getRandomStepState = (): StepState =>
  Array(NUM_STEPS)
    .fill(null)
    .map(() => {
      if (Math.random() < 0.2) {
        return null;
      } else {
        return Math.floor(Math.random() * 1000) % NUM_DEGREES;
      }
    });

// STYLES:

// https://colorhunt.co/palette/2763
const colors = {
  white: "#eeeeee",
  blue: "#00adb5",
  black: "#222831",
};

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${colors.white};
`;

const StepsWrapper = styled.div`
  display: flex;
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DegreeSquare = styled.div<{ isActive: boolean; isSelected: boolean }>`
  width: 2rem;
  height: 2rem;
  margin: 0.25rem;
  border-radius: 0.25em;
  background-color: ${(p) => (p.isSelected ? colors.black : colors.blue)};
  opacity: ${(p) => (p.isActive ? 1 : 0.5)};
  &:hover {
    opacity: 1;
  }
`;
