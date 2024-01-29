import { useState } from "react";

export const TextArea = () => {
  const [textToSpeakArea, setTextToSpeakArea] = useState<string>("");
  const synthesis = window.speechSynthesis;

  const handleSpeak = (textToSpeakArea: any) => {
    if (synthesis.speaking) {
      synthesis.cancel();
    }

    const textToSpeak = textToSpeakArea ? `${textToSpeakArea}` : "";
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const voices = speechSynthesis.getVoices();

    utterance.lang = "en-EN";
    utterance.rate = 1;
    utterance.voice = voices[158];

    synthesis.speak(utterance);
  };
  return (
    <section>
      <input
        className="textArea"
        type="textArea"
        value={textToSpeakArea}
        onChange={(e) => {
          setTextToSpeakArea(e.target.value);
        }}
      />
      <button
        className="btn"
        type="button"
        onClick={() => {
          handleSpeak(textToSpeakArea);
        }}
      >
        chlick me
      </button>
    </section>
  );
};
