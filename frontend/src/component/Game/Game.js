import { useEffect, useState } from "react"
import Instructions from "../Instructions/Instructions";
import Keyboard from "../Keyboard/Keyboard";
import EndGame from "../EndGame/EndGame";
import Scoreboard from "../Scoreboard/Scoreboard";
import WordsList from "../WordsList/WordsList";
import useGameRules from "../../hooks/useGameRules";
import "./game.css";
import { Reload } from '../layout/Header/Navbar'



export default function Game() {
    const [isLoggingKeys, setIsLoggingKeys] = useState(false);

    const {
        wordStack1,
        wordStack2,
        wordStack3,
        wordStack4,
        wordStack5,
        stackWordIndex1,
        stackWordIndex2,
        stackWordIndex3,
        stackWordIndex4,
        stackWordIndex5,
        startTimer,
        isGameEnded,
        setIsGameEnded,
        checkForCharMatch,
        score,
        delay,
        isMistype,
        pressedChar,
        setPressedChar,
        multiplier,
    } = useGameRules();

    function end() {
        setIsGameEnded(true)
    }

    function startGame() {
        startTimer();
        setIsLoggingKeys(true);
    }

    useEffect(() => {
        function handleKeyUp(e) {
            if (e.key !== " ") {
                checkForCharMatch(e.key);
                setPressedChar(e.key);
            }
        }

        function handleKeyDown(e) {
            setPressedChar("");
        }
        if (isLoggingKeys && !isGameEnded) {
            document.addEventListener("keyup", handleKeyUp);
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("keyup", handleKeyUp);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isLoggingKeys, isGameEnded]);

    if (isLoggingKeys && !isGameEnded) {
        return (
            <div className="GameBoard">
                <Reload />
                <Scoreboard multiplier={multiplier} score={score} delay={delay} />

                <div className="wordList-div">
                    <WordsList stack={wordStack1} currentIndex={stackWordIndex1} />
                    <WordsList stack={wordStack2} currentIndex={stackWordIndex2} />
                    <WordsList stack={wordStack3} currentIndex={stackWordIndex3} />
                    <WordsList stack={wordStack4} currentIndex={stackWordIndex4} />
                    <WordsList stack={wordStack5} currentIndex={stackWordIndex5} />
                </div>

                <Keyboard

                    pressedChar={pressedChar}
                    isMistype={isMistype}
                />
                <button className="end-button" onClick={end}>End</button>
            </div>
        );
    } else if (isGameEnded) {
        return (

            <EndGame finalScore={score} />

        );

    } else {
        return <Instructions startGame={startGame} />;
    }
}
