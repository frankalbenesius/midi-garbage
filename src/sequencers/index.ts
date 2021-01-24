import { default as FranksFirstOne } from "./FranksFirstOne";
import SomeOtherOne from "./SomeOtherOne";

export interface SequencerProps {
  pulse: number;
}

interface SequencerOption {
  route: string;
  name: string;
  component: (props: SequencerProps) => JSX.Element;
}

const sequencers: SequencerOption[] = [
  {
    route: "/franks-first-one",
    name: "Frank's First One",
    component: FranksFirstOne,
  },
  {
    route: "/some-other-one",
    name: "Some Other One",
    component: SomeOtherOne,
  },
];

export default sequencers;
