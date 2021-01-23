import React from "react";
import styled from "styled-components";

interface RangeInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}
const RangeInput = (props: RangeInputProps) => {
  return (
    <Wrapper>
      <label htmlFor={props.label}>
        {props.label} ({props.value})
      </label>
      <br />
      <Input
        id={props.label}
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
        type="range"
        min={props.min}
        max={props.max}
      />
    </Wrapper>
  );
};
export default RangeInput;

const Wrapper = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;

const Input = styled.input`
  padding: 7px 0;
  margin: 0;
  width: 100%;
`;
