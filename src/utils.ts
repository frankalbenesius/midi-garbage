import webmidi from "webmidi";
import { context } from "tone";

/**
 * A callback wrapper for reconciling timing differences between Tone.js's clock and WebMidi's clock.
 * Use this when scheduling midi events via `Tone.Transport`'s scheduling functions.
 *
 * See this thread for detailed overview: https://github.com/Tonejs/Tone.js/issues/805
 *
 * @param callback
 * @returns a new callback that invokes the provided callback with
 */
export function midiSync(
  callback: (midiTime: number) => void
): (toneTime: number) => void {
  return (toneTime) => {
    const offset = toneTime * 1000 + webmidi.time - context.currentTime * 1000;
    return callback(offset);
  };
}

/**
 * A wrapper for WebMidi's guessNoteNumber function that returns `null` instead of erroring.
 * @param note A note-ish thing.
 * @returns the midi note number corresponding to `note`, or null if none exists.
 */
export function getNoteNumberSafe(note: string | number): number | null {
  try {
    return webmidi.guessNoteNumber(note);
  } catch (e) {
    return null;
  }
}
