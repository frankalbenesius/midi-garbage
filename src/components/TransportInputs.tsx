import React from "react";
import styled from "styled-components";
import { Rewind, Play, Pause } from "react-feather";

interface TransportInputsProps {
  isPlaying: boolean;
  onPlayToggle: () => void;
  pulse: number;
  onPulseReset: () => void;
}
const TransportInputs = (props: TransportInputsProps) => {
  return (
    <Wrapper>
      <StopButton disabled={props.pulse < 1} onClick={props.onPulseReset}>
        <Rewind />
      </StopButton>
      <PlayButton isPlaying={props.isPlaying} onClick={props.onPlayToggle}>
        {props.isPlaying ? <Pause /> : <Play />}
      </PlayButton>
    </Wrapper>
  );
};
export default TransportInputs;

const Wrapper = styled.div`
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
`;

const Button = styled.button`
  padding: 0.5rem;
  border: none;
  background: #11698e;
  color: white;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:disabled {
    opacity: 0.5;
  }
`;

const StopButton = styled(Button)`
  flex: 0 0 4rem;
  margin-right: 0.5em;
`;

const PlayButton = styled<{ isPlaying: boolean }>(Button)`
  flex: 1 0 auto;
  ${(p) =>
    p.isPlaying &&
    `
    background-color: #16c79a;
  `}
`;
