import React, { FunctionComponent, useEffect, useState } from "react";
import WebMidi from "webmidi";

const WebMIDICheck: FunctionComponent = (props) => {
  const [midiReady, setMidiReady] = useState<"checking" | boolean>("checking");

  useEffect(() => {
    WebMidi.enable((err) => {
      setMidiReady(!err);
    });
  }, []);

  switch (midiReady) {
    case "checking": {
      return null;
    }
    case false: {
      return <div>WebMidi could not be enabled.</div>;
    }
    case true: {
      return <>{props.children}</>;
    }
  }
};

export default WebMIDICheck;
