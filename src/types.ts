type Step = null | number | string; // "null" is rest, otherwise pitch info

interface MidiGarbageState {
  inputId: string;
  outputId: string;
  isPlaying: boolean;
  currentStepIndex: number;
  steps: Tuple16<Step>;
}

type Tuple16<T> = [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T];

type MidiChannel =
  | "all"
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16;
