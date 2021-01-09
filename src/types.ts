type Step = null | number | string; // "null" is rest

interface MidiGarbageState {
  inputDevice: string;
  outputDevice: string;
  isPlaying: boolean;
  currentStepIndex: number;
  steps: Tuple16<Step>;
}

type Tuple16<T> = [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T];
