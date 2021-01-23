import React, { useEffect } from "react";
import styled from "styled-components";

interface DropdownProps {
  label: string;
  value: string | number;
  options: {
    value: string | number;
    label: string;
  }[];
  onChange: (value: string | number) => void;
}
const Dropdown = (props: DropdownProps) => {
  useEffect(() => {
    if (!props.value && props.options.length > 0) {
      props.onChange(props.options[0].value);
    }
  }, [props.options, props.value]);
  return (
    <DropdownWrapper>
      <label htmlFor={props.label}>{props.label}</label>
      <br />
      <DropdownSelect
        id={props.label}
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
      >
        <option value="">None</option>
        {props.options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </DropdownSelect>
    </DropdownWrapper>
  );
};
export default Dropdown;

const DropdownWrapper = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;

const DropdownSelect = styled.select`
  padding: 0.5rem;
  width: 100%;
`;
