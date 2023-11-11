import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./card.css";
import "./cardFlipper.css";
import jasonData from "../words.json";

interface WordObject {
  kor: string;
  eng: string;
}

// Define a type for an array of WordObject
type WordArray = WordObject[];

export const Card = () => {
  const [flipCard, setFlipCard] = useState(true);
  const [jason, setJason] = useState<WordObject | null>(null);
  const nodeRef = useRef(null);

  const getRandomWord = (data: WordArray) => {
    if (data.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * data.length);

    const randomWord = () => {
      setJason(data[randomIndex]);
    };
    randomWord();
  };
  // console.log(getRandomWord(jason));
  // debugger;

  const synthesis = window.speechSynthesis;

  const handleSpeak = (voice: any) => {
    if (synthesis.speaking) {
      synthesis.cancel();
    }

    const textToSpeak = voice ? `${voice}` : "";
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const voices = speechSynthesis.getVoices();

    if (voice === jason?.eng) {
      utterance.lang = "en-EN";
      utterance.rate = 1;
      utterance.voice = voices[158];
    } else {
      utterance.lang = "ko-KR";
      utterance.rate = 0.8;
      utterance.voice = voices[168];
    }

    synthesis.speak(utterance);
  };
  speechSynthesis.onvoiceschanged = () => {
    const voices = speechSynthesis.getVoices();
    console.log(voices);
  };

  const flipingCard = () => {
    setFlipCard((flip) => !flip);

    console.log("fliped");
    // console.log("jason");
  };
  return (
    <>
      <div className="card">
        <CSSTransition in={flipCard} timeout={300} classNames="card">
          <div className="flipper" onClick={flipingCard} ref={nodeRef}>
            <div className="frontCard">{jason?.kor}</div>
            <div className="backCard">{jason?.eng}</div>
          </div>
        </CSSTransition>
      </div>
      <button className="nextBtn" onClick={() => getRandomWord(jasonData)}>
        Next
      </button>
      <button className="nextBtn" onClick={() => handleSpeak(jason?.kor)}>
        Kor
      </button>
      <button className="nextBtn" onClick={() => handleSpeak(jason?.eng)}>
        Eng
      </button>
    </>
  );
};
