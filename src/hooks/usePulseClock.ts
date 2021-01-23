import { useEffect } from "react";
import webmidi from "webmidi";
import { PPQN } from "../constants";

interface PulseClockArgs {
  bpm: number;
  isPlaying: boolean;
  onPulse: () => void;
}

const usePulseClock = ({ bpm, isPlaying, onPulse }: PulseClockArgs) => {
  useEffect(() => {
    let lastPulseMs = webmidi.time;
    const pulseThresholdMs = (60 * 1000) / bpm / PPQN;
    const tick = () => {
      if (isPlaying) {
        const deltaMs = webmidi.time - lastPulseMs;
        const shouldPulse = deltaMs >= pulseThresholdMs;
        if (shouldPulse) {
          lastPulseMs = lastPulseMs + pulseThresholdMs;
          onPulse();
        }
      }
    };
    const interval = setInterval(tick, 1);
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, bpm, onPulse]);
};

export default usePulseClock;
