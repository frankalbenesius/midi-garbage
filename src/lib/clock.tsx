import webmidi from "webmidi";
import { PPQN } from "../constants";

interface PulseHandler {
  divider: number;
  handler: PulseHandlerFn;
}
type PulseHandlerFn = (pulse: number) => void;

class Clock {
  private intervalMarker: null | number = null;
  start = () => {
    if (this.intervalMarker === null) {
      this.intervalMarker = setInterval(this.tick, 1);
    }
  };
  stop = () => {
    if (this.intervalMarker !== null) {
      clearInterval(this.intervalMarker);
    }
  };

  private outputId = "";
  setOutputId = (outputId: string) => {
    this.outputId = outputId;
  };

  private bpm = 120;
  setBpm = (bpm: number) => {
    this.bpm = bpm;
  };

  private sendMidiClock = true;
  setSendMidiClock = (sendMidiClock: boolean) => {
    this.sendMidiClock = sendMidiClock;
  };

  private pulse = 0;
  resetPulse = () => {
    this.pulse = 0;
  };

  private lastPulseTime = webmidi.time;
  tick = () => {
    const pulseThresholdMs = (60 * 1000) / this.bpm / PPQN;
    const deltaMs = webmidi.time - this.lastPulseTime;
    const shouldPulse = deltaMs >= pulseThresholdMs;
    if (shouldPulse) {
      this.lastPulseTime = this.lastPulseTime + pulseThresholdMs;
      this.pulse = this.pulse + 1;
      this.triggerPulseHandlers(this.pulse);

      if (this.sendMidiClock) {
        const output = webmidi.getOutputById(this.outputId);
        if (output) {
          output.sendClock();
        }
      }
    }
  };

  pulseHandlers: {
    [handlerId: string]: PulseHandler;
  } = {};
  registerPulseHandler = (divider: number, handler: PulseHandlerFn): string => {
    const newHandlerId = webmidi.time.toString();
    this.pulseHandlers[newHandlerId] = {
      divider,
      handler,
    };
    return newHandlerId;
  };

  triggerPulseHandlers = (pulse: number) => {
    const handlers = Object.values(this.pulseHandlers);
    handlers.forEach(({ divider, handler }) => {
      if (pulse % divider === 0) {
        handler(pulse);
      }
    });
  };
}

const clock = new Clock();

export default clock;
