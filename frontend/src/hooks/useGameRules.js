import { useEffect, useRef, useState } from "react";

import { playWordCompleteAudio } from "../component/Game/Game";

const randomWords = require("random-words");

const wordBank1 = randomWords({ exactly: 30 });
const wordBank2 = randomWords({ exactly: 30 });
const wordBank3 = randomWords({ exactly: 30 });
const wordBank4 = randomWords({ exactly: 30 });
const wordBank5 = randomWords({ exactly: 30 });

export default function useGameRules() {
  const [wordStack1, setWordStack1] = useState([]);
  const [wordStack2, setWordStack2] = useState([]);
  const [wordStack3, setWordStack3] = useState([]);
  const [wordStack4, setWordStack4] = useState([]);
  const [wordStack5, setWordStack5] = useState([]);

  const [numberOfWordsAdded1, setNumberOfWordsAdded1] = useState(0);
  const [numberOfWordsAdded2, setNumberOfWordsAdded2] = useState(0);
  const [numberOfWordsAdded3, setNumberOfWordsAdded3] = useState(0);
  const [numberOfWordsAdded4, setNumberOfWordsAdded4] = useState(0);
  const [numberOfWordsAdded5, setNumberOfWordsAdded5] = useState(0);

  const [numberOfWordsCompleted1, setNumberOfWordsCompleted1] = useState(0);
  const [numberOfWordsCompleted2, setNumberOfWordsCompleted2] = useState(0);
  const [numberOfWordsCompleted3, setNumberOfWordsCompleted3] = useState(0);
  const [numberOfWordsCompleted4, setNumberOfWordsCompleted4] = useState(0);
  const [numberOfWordsCompleted5, setNumberOfWordsCompleted5] = useState(0);

  const noWordsAdded1 = useRef(0);
  const noWordsAdded2 = useRef(0);
  const noWordsAdded3 = useRef(0);
  const noWordsAdded4 = useRef(0);
  const noWordsAdded5 = useRef(0);

  const noWordsRemoved1 = useRef(0);
  const noWordsRemoved2 = useRef(0);
  const noWordsRemoved3 = useRef(0);
  const noWordsRemoved4 = useRef(0);
  const noWordsRemoved5 = useRef(0);

  const stackWordIndex1 = useRef(0);
  const stackWordIndex2 = useRef(0);
  const stackWordIndex3 = useRef(0);
  const stackWordIndex4 = useRef(0);
  const stackWordIndex5 = useRef(0);

  const nextChar1 = useRef("");
  const nextChar2 = useRef("");
  const nextChar3 = useRef("");
  const nextChar4 = useRef("");
  const nextChar5 = useRef("");

  const [isGameEnded, setIsGameEnded] = useState(false);

  const [isScoreUpdated, setIsScoreUpdated] = useState(false);

  const [pressedChar, setPressedChar] = useState("");

  const [wordStartTime, setWordStartTime] = useState(0);

  const [score, setScore] = useState(0);

  const [multiplier, setMultiplier] = useState(1);

  const [isMistype, setIsMistype] = useState(false);

  const timer = useRef(null);

  const delay = useRef(2000);

  const rateOfWords = useRef(50);


  useEffect(() => {
    setWordStack1(wordBank1.slice(noWordsRemoved1.current, noWordsAdded1.current));
  }, [numberOfWordsAdded1, numberOfWordsCompleted1]);

  useEffect(() => {
    setWordStack2(wordBank2.slice(noWordsRemoved2.current, noWordsAdded2.current));
  }, [numberOfWordsAdded2, numberOfWordsCompleted2]);

  useEffect(() => {
    setWordStack3(wordBank3.slice(noWordsRemoved3.current, noWordsAdded3.current));
  }, [numberOfWordsAdded3, numberOfWordsCompleted3]);

  useEffect(() => {
    setWordStack4(wordBank4.slice(noWordsRemoved4.current, noWordsAdded4.current));
  }, [numberOfWordsAdded4, numberOfWordsCompleted4]);

  useEffect(() => {
    setWordStack5(wordBank5.slice(noWordsRemoved5.current, noWordsAdded5.current));
  }, [numberOfWordsAdded5, numberOfWordsCompleted5]);


  function endGame() {
    clearInterval(timer.current);
    setIsGameEnded(true);
  }

  function resetTimer() {
    clearInterval(timer.current);
    startTimer();
  }


  //-----------------------Timer----------------------------//


  function startTimer() {
    timer.current = setInterval(() => {

      if (noWordsAdded1.current - noWordsRemoved1.current < 20) {
        let j = 1;
        addWordToStack(j);
        if (delay.current > 1100) {
          delay.current -= rateOfWords.current;
          resetTimer();
        }
      }
      else {
        endGame();
      }

      //----------------------------------------------------

      if (noWordsAdded2.current - noWordsRemoved2.current < 20) {
        let j = 2;
        addWordToStack(j);
        if (delay.current > 1100) {
          delay.current -= rateOfWords.current;
          resetTimer();
        }
      }
      else {
        endGame();
      }

      //----------------------------------------------------

      if (noWordsAdded3.current - noWordsRemoved3.current < 20) {
        let j = 3;
        addWordToStack(j);
        if (delay.current > 1100) {
          delay.current -= rateOfWords.current;
          resetTimer();
        }
      }
      else {
        endGame();
      }

      //----------------------------------------------------

      if (noWordsAdded4.current - noWordsRemoved4.current < 20) {
        let j = 4;
        addWordToStack(j);
        if (delay.current > 1100) {
          delay.current -= rateOfWords.current;
          resetTimer();
        }
      }
      else {
        endGame();
      }

      //----------------------------------------------------

      if (noWordsAdded5.current - noWordsRemoved5.current < 20) {
        let j = 5;
        addWordToStack(j);
        if (delay.current > 1100) {
          delay.current -= rateOfWords.current;
          resetTimer();
        }
      }
      else {
        endGame();
      }



    }, delay.current);
  }



  //-----------------------Remove Words----------------------------//



  function removeWordFromStack(r) {

    if (r === 1) {
      setNumberOfWordsCompleted1(
        (numberOfWordsCompleted1) => numberOfWordsCompleted1 + 1
      );
      noWordsRemoved1.current++;
      stackWordIndex1.current = 0;
      nextChar1.current = wordBank1[noWordsRemoved1.current][0];
    }

    if (r === 2) {
      setNumberOfWordsCompleted2(
        (numberOfWordsCompleted2) => numberOfWordsCompleted2 + 1
      );
      noWordsRemoved2.current++;
      stackWordIndex2.current = 0;
      nextChar2.current = wordBank2[noWordsRemoved2.current][0];
    }

    if (r === 3) {
      setNumberOfWordsCompleted3(
        (numberOfWordsCompleted3) => numberOfWordsCompleted3 + 1
      );
      noWordsRemoved3.current++;
      stackWordIndex3.current = 0;
      nextChar3.current = wordBank3[noWordsRemoved3.current][0];
    }

    if (r === 4) {
      setNumberOfWordsCompleted4(
        (numberOfWordsCompleted4) => numberOfWordsCompleted4 + 1
      );
      noWordsRemoved4.current++;
      stackWordIndex4.current = 0;
      nextChar4.current = wordBank4[noWordsRemoved4.current][0];
    }

    if (r === 5) {
      setNumberOfWordsCompleted5(
        (numberOfWordsCompleted5) => numberOfWordsCompleted5 + 1
      );
      noWordsRemoved5.current++;
      stackWordIndex5.current = 0;
      nextChar5.current = wordBank5[noWordsRemoved5.current][0];

    }
    playWordCompleteAudio();

  }



  //-----------------------ADD Words----------------------------//



  function addWordToStack(j) {

    if (j === 1) {
      if (noWordsAdded1.current === 0) {
        // updateWordTime();
        nextChar1.current = wordBank1[0][0];
      }
      setNumberOfWordsAdded1((numberOfWordsAdded1) => numberOfWordsAdded1 + 1);
      noWordsAdded1.current++;
    }

    else if (j === 2) {
      if (noWordsAdded2.current === 0) {
        // updateWordTime();
        nextChar2.current = wordBank2[0][0];
      }
      setNumberOfWordsAdded2((numberOfWordsAdded2) => numberOfWordsAdded2 + 1);
      noWordsAdded2.current++;
    }

    else if (j === 3) {
      if (noWordsAdded3.current === 0) {
        // updateWordTime();
        nextChar3.current = wordBank3[0][0];
      }
      setNumberOfWordsAdded3((numberOfWordsAdded3) => numberOfWordsAdded3 + 1);
      noWordsAdded3.current++;
    }

    else if (j === 4) {
      if (noWordsAdded4.current === 0) {
        // updateWordTime();
        nextChar4.current = wordBank4[0][0];
      }
      setNumberOfWordsAdded4((numberOfWordsAdded4) => numberOfWordsAdded4 + 1);
      noWordsAdded4.current++;
    }

    else if (j === 5) {
      if (noWordsAdded5.current === 0) {
        updateWordTime();
        nextChar5.current = wordBank5[0][0];
      }
      setNumberOfWordsAdded5((numberOfWordsAdded5) => numberOfWordsAdded5 + 1);
      noWordsAdded5.current++;
    }

  }



  //-----------------------Check Character Match----------------------------//



  function checkForCharMatch(char) {
    let k = 0;

    if (char === nextChar1.current) {
      k = 1;
      setIsMistype(false);
      moveToNextChar(k);
    }

    if (char === nextChar2.current) {
      k = 2;
      setIsMistype(false);
      moveToNextChar(k);
    }

    if (char === nextChar3.current) {
      k = 3;
      setIsMistype(false);
      moveToNextChar(k);
    }

    if (char === nextChar4.current) {
      k = 4;
      setIsMistype(false);
      moveToNextChar(k);
    }

    if (char === nextChar5.current) {
      k = 5;
      setIsMistype(false);
      moveToNextChar(k);
    }


    //  else {
    //     setIsMistype(true);
    //     setMultiplier(1);
    //   }
  }



  //-----------------------Update Word Time----------------------------//


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



  //-----------------------Move to Next Character----------------------------//



  function moveToNextChar(k) {
    let r = 0;

    if (k === 1) {
      if (stackWordIndex1.current === wordBank1[noWordsRemoved1.current].length - 1) {
        r = 1;
        removeWordFromStack(r);
        updateWordTime();
      } else {
        nextChar1.current = wordBank1[noWordsRemoved1.current][stackWordIndex1.current + 1];
        stackWordIndex1.current++;
      }
    }

    else if (k === 2) {
      if (stackWordIndex2.current === wordBank2[noWordsRemoved2.current].length - 1) {
        r = 2;
        removeWordFromStack(r);
        updateWordTime();
      } else {
        nextChar2.current = wordBank2[noWordsRemoved2.current][stackWordIndex2.current + 1];
        stackWordIndex2.current++;
      }
    }

    else if (k === 3) {
      if (stackWordIndex3.current === wordBank3[noWordsRemoved3.current].length - 1) {
        r = 3;
        removeWordFromStack(r);
        updateWordTime();
      } else {
        nextChar3.current = wordBank3[noWordsRemoved3.current][stackWordIndex3.current + 1];
        stackWordIndex3.current++;
      }
    }

    else if (k === 4) {
      if (stackWordIndex4.current === wordBank4[noWordsRemoved4.current].length - 1) {
        r = 4;
        removeWordFromStack(r);
        updateWordTime();
      } else {
        nextChar4.current = wordBank4[noWordsRemoved4.current][stackWordIndex4.current + 1];
        stackWordIndex4.current++;
      }
    }

    else if (k === 5) {
      if (stackWordIndex5.current === wordBank5[noWordsRemoved5.current].length - 1) {
        r = 5;
        removeWordFromStack(r);
        updateWordTime();
      } else {
        nextChar5.current = wordBank5[noWordsRemoved5.current][stackWordIndex5.current + 1];
        stackWordIndex5.current++;
      }
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
    score,
    delay: delay.current,
    isMistype,
    pressedChar,
    setPressedChar,
    multiplier,
    wordStack1,
    wordStack2,
    wordStack3,
    wordStack4,
    wordStack5,
    stackWordIndex1: stackWordIndex1.current,
    stackWordIndex2: stackWordIndex2.current,
    stackWordIndex3: stackWordIndex3.current,
    stackWordIndex4: stackWordIndex4.current,
    stackWordIndex5: stackWordIndex5.current,

  };
}
