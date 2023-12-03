import { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./card.css";
import "./cardFlipper.css";
import jsonData from "../words";

jsonData.forEach((item) => {
  item.kor = item.kor.replace(/,/g, ", "); // Adds a space after commas in "kor"
  item.eng = item.eng.replace(/,/g, ", "); // Adds a space after commas in "eng"
});

interface WordObject {
  kor: string;
  eng: string;
}

// Define a type for an array of WordObject
type WordArray = WordObject[];

export const Card = () => {
  const [flipCard, setFlipCard] = useState(true);
  const [jason, setJson] = useState<WordObject | null>(null);
  const nodeRef = useRef(null);
  const [jsonIndex, setJsonIndex] = useState<number | null>(0);

  console.log(jsonIndex);
  console.log(jason);

  useEffect(() => {
    getRandomWord(jsonData);
  }, []);

  const getRandomWord = (data: WordArray) => {
    if (data.length === 0) {
      setJson(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * data.length);
    setJson(data[randomIndex]);
    setJsonIndex(randomIndex);
  };

  const getNextWord = () => {
    if (jsonIndex !== null && jsonData.length > 0) {
      const nextIndex = (jsonIndex + 1) % jsonData.length;
      setJson(jsonData[nextIndex]);
      setJsonIndex(nextIndex);
    }
  };

  const getPreviouseWord = () => {
    if (jsonIndex !== null && jsonData.length > 0) {
      const previouseIndex =
        (jsonIndex - 1 + jsonData.length) % jsonData.length;
      setJson(jsonData[previouseIndex]);
      setJsonIndex(previouseIndex);
    }
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
  // speechSynthesis.onvoiceschanged = () => {
  //   const voices = speechSynthesis.getVoices();
  //   // console.log(voices);
  // };

  const flipingCard = () => {
    setFlipCard((flip) => !flip);

    console.log("fliped");
    // console.log("jason");
  };
  return (
    <>
      <div className="card">
        <button className="nextAndPrevBtn" onClick={() => getPreviouseWord()}>
          &#8249;
        </button>
        <CSSTransition in={flipCard} timeout={300} classNames="card">
          <div className="flipper" onClick={flipingCard} ref={nodeRef}>
            <div className="frontCard">{jason?.kor}</div>
            <div className="backCard">{jason?.eng}</div>
          </div>
        </CSSTransition>
        <div className="rightBtns">
          <button
            className="speakBtn kor"
            onClick={() => handleSpeak(jason?.kor)}
          >
            Kor
          </button>
          <button
            className="speakBtn eng"
            onClick={() => handleSpeak(jason?.eng)}
          >
            Eng
          </button>
          <button className="nextAndPrevBtn" onClick={() => getNextWord()}>
            &#62;
          </button>
        </div>
      </div>
      <div className="buttons">
        <button className="nextBtn" onClick={() => getRandomWord(jsonData)}>
          Next
        </button>
      </div>
    </>
  );
};
