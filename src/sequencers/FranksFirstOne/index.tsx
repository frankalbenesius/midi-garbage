import React, { useState } from "react";
import styled from "styled-components";
import { SequencerProps } from "..";
import { PPQN } from "../../constants";

interface StepState {
  index: number;
}

const NUM_STEPS = 16;

const FranksFirstOne = (props: SequencerProps) => {
  const [steps, setSteps] = useState<StepState[]>([
    { index: 0 },
    { index: 1 },
    { index: 2 },
    { index: 3 },
    { index: 4 },
    { index: 5 },
    { index: 6 },
    { index: 7 },
    { index: 8 },
    { index: 9 },
    { index: 10 },
    { index: 11 },
    { index: 12 },
    { index: 13 },
    { index: 14 },
    { index: 15 },
  ]);

  // i dont think this is right...... how do i do this better
  const currentStep = Math.floor((props.pulse / PPQN) * 4) % NUM_STEPS;

  return (
    <FlexWrapper>
      <StepsWrapper>
        {steps.map((step) => (
          <Step
            key={step.index}
            isActive={step.index === currentStep}
            state={step}
          />
        ))}
      </StepsWrapper>
    </FlexWrapper>
  );
};

export default FranksFirstOne;

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

interface StepProps {
  isActive: boolean;
  state: StepState;
}
const Step = (props: StepProps) => {
  return (
    <StepWrapper>
      <StepSquare {...props} />
    </StepWrapper>
  );
};

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepSquare = styled.div<StepProps>`
  background: ${(p) => (p.isActive ? colors.c : colors.b)};
  width: 2rem;
  height: 2rem;
  margin: 0.25rem;
  border-radius: 0.25em;
`;
