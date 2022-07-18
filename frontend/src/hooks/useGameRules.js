import { useEffect, useRef, useState } from "react";

const randomWords = require("random-words");

const wordBank = randomWords({ exactly: 200 });

export default function useGameRules() {
  const [wordStack, setWordStack] = useState([]);

  const [numberOfWordsAdded, setNumberOfWordsAdded] = useState(0);

  const [numberOfWordsCompleted, setNumberOfWordsCompleted] = useState(0);

  const [isGameEnded, setIsGameEnded] = useState(false);

  const [isScoreUpdated, setIsScoreUpdated] = useState(false);

  const [pressedChar, setPressedChar] = useState("");

  const [wordStartTime, setWordStartTime] = useState(0);

  const [score, setScore] = useState(0);

  const [multiplier, setMultiplier] = useState(1);

  const [isMistype, setIsMistype] = useState(false);

  const noWordsAdded = useRef(0);

  const noWordsRemoved = useRef(0);

  const stackWordIndex = useRef(0);

  const nextChar = useRef("");

  const timer = useRef(null);

  const delay = useRef(2000);

  const rateOfWords = useRef(50);

  useEffect(() => {
    setWordStack(wordBank.slice(noWordsRemoved.current, noWordsAdded.current));
  }, [numberOfWordsAdded, numberOfWordsCompleted]);

  function endGame() {
    clearInterval(timer.current);
    setIsGameEnded(true);
  }

  function resetTimer() {
    clearInterval(timer.current);
    startTimer();
  }

  function startTimer() {
    timer.current = setInterval(() => {
      if (noWordsAdded.current - noWordsRemoved.current < 10) {
        addWordToStack();
        if (delay.current > 1100) {
          delay.current -= rateOfWords.current;
          resetTimer();
        }
      } else {
        endGame();
      }
    }, delay.current);
  }

  function removeWordFromStack() {
    setNumberOfWordsCompleted(
      (numberOfWordsCompleted) => numberOfWordsCompleted + 1
    );
    noWordsRemoved.current++;
    stackWordIndex.current = 0;
    nextChar.current = wordBank[noWordsRemoved.current][0];
  }

  function addWordToStack() {
    if (noWordsAdded.current === 0) {
      updateWordTime();
      nextChar.current = wordBank[0][0];
    }
    setNumberOfWordsAdded((numberOfWordsAdded) => numberOfWordsAdded + 1);
    noWordsAdded.current++;
  }

  function checkForCharMatch(char) {
    if (char === nextChar.current) {
      setIsMistype(false);
      moveToNextChar();
    } else {
      setIsMistype(true);
      setMultiplier(1);
    }
  }

  function updateWordTime() {
    setWordStartTime((wordStartTime) => {
      if (wordStartTime) {
        let timeTaken = (Date.now() - wordStartTime) / 1000;
        setScore((score) => Math.ceil((score + 10 / timeTaken) * multiplier));
        setMultiplier((multiplier) => multiplier + 0.5);
      }
      return Date.now();
    });
  }

  function moveToNextChar() {
    if (
      stackWordIndex.current ===
      wordBank[noWordsRemoved.current].length - 1
    ) {
      removeWordFromStack();
      updateWordTime();
    } else {
      nextChar.current =
        wordBank[noWordsRemoved.current][stackWordIndex.current + 1];
      stackWordIndex.current++;
    }
  }

  return {
    startTimer,
    addWordToStack,
    moveToNextChar,
    isGameEnded,
    setIsGameEnded,
    isScoreUpdated,
    setIsScoreUpdated,
    checkForCharMatch,
    wordStack,
    nextChar: nextChar.current,
    score,
    delay: delay.current,
    isMistype,
    pressedChar,
    setPressedChar,
    multiplier,
    stackWordIndex: stackWordIndex.current,
  };
}
