import React, { useState } from "react";
import styled from "styled-components";
import { PPQN } from "../../constants";
import { SequencerProps } from "../index";

interface StepState {
  [index: number]: number | null;
}

const PPS = PPQN / 4;
const NUM_STEPS = 16;
const NUM_DEGREES = 8;

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

const FranksFirstOne = (props: SequencerProps) => {
  const [steps, setSteps] = useState<StepState>(getRandomStepState());

  const currentStep = Math.floor(props.pulse / PPS) % NUM_STEPS;

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

interface StepProps {
  isActive: boolean;
  degree: number | null;
  onDegreeClick: (degree: number) => void;
}
const Step = (props: StepProps) => {
  const degrees: number[] = new Array(NUM_DEGREES).fill(null).map((_, i) => i);
  return (
    <StepWrapper>
      {degrees.map((deg) => (
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
