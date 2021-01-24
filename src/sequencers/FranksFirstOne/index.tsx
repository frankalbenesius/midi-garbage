import React, { useState } from "react";
import styled from "styled-components";
import { SequencerProps } from "..";
import { PPQN } from "../../constants";

interface StepState {
  [index: number]: number | null;
}

const PPS = PPQN / 4;
const NUM_STEPS = 16;
const NUM_DEGREES = 8;

const FranksFirstOne = (props: SequencerProps) => {
  const [steps, setSteps] = useState<StepState>({
    0: 1,
    1: 0,
    2: null,
    3: null,
    4: 5,
    5: null,
    6: 3,
    7: null,
    8: null,
    9: 7,
    10: null,
    11: null,
    12: 5,
    13: 4,
    14: 6,
    15: 7,
  });

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

//colorhunt.co/palette/252885
const colors = {
  a: "#f7f7e8",
  b: "#c7cfb7",
  c: "#9dad7f",
  d: "#557174",
};

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${colors.a};
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
  background-color: ${(p) => (p.isSelected ? colors.d : colors.c)};
  opacity: ${(p) => (p.isActive ? 1 : 0.5)};
  &:hover {
    opacity: 1;
  }
`;
