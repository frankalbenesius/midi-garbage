import React from "react";
import { SequencerProps } from "..";

const SomeOtherOne = (props: SequencerProps) => {
  return <div>{props.pulse}</div>;
};

export default SomeOtherOne;
