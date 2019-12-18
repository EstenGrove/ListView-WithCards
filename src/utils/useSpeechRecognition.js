import { useEffect, useState } from "react";
import { debugWithColor } from "../helpers/utils_logging";
// cross browser support
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export const useSpeechRecognition = (continuous, interimResults) => {
  const recog = new window.SpeechRecognition();
  recog.continuous = continuous;
  recog.interimResults = interimResults;
  const { continuous: cont, interimResults: interim } = recog;
  debugWithColor("useSpeechRecognition", {
    cont,
    interim
  });
  const [dictaphone, setDictaphone] = useState({
    interimTranscript: [],
    finalTranscript: "",
    isSupported: "SpeechRecognition" in window ? true : false
  });
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(false);

  const { interimTranscript, finalTranscript, isSupported } = dictaphone;

  const checkForSupport = () => {
    if ("SpeechRecognition" in window) {
      return setDictaphone({
        ...dictaphone,
        isSupported: true
      });
    }
    return setDictaphone({
      ...dictaphone,
      isSupported: false
    });
  };

  const handleRecording = e => {
    recog.onresult = e => {
      let interimResults = "";
      let finalTranscript = "";

      // const interimText = e.results[0][0].transcript;
      const isFinal = e.results[0].isFinal;

      for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
        let transcript = e.results[i][0].transcript;

        if (isFinal) {
          finalTranscript += transcript;
          setIsStopped(true);
          setIsRecording(false);
          return setDictaphone({
            ...dictaphone,
            finalTranscript: finalTranscript
          });
        } else {
          interimResults += transcript;
          return setDictaphone({
            ...dictaphone,
            interimTranscript: interimResults
          });
        }
      }
    };
  };

  const startRecording = e => {
    recog.start();
    setIsRecording(true);

    return handleRecording(e);
  };

  const stopRecording = () => {
    setIsRecording(false);
    return recog.stop();
  };

  useEffect(() => {
    checkForSupport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isSupported,
    isRecording,
    setIsRecording,
    isPaused,
    setIsPaused,
    dictaphone,
    interimTranscript,
    finalTranscript,
    setDictaphone,
    checkForSupport,
    startRecording,
    handleRecording,
    stopRecording,
    isStopped,
    setIsStopped
  };
};
