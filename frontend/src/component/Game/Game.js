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
        wordStack,
        stackWordIndex,
        startTimer,
        isGameEnded,
        setIsGameEnded,
        checkForCharMatch,
        nextChar,
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
                <WordsList stack={wordStack} currentIndex={stackWordIndex} />
                <Keyboard
                    nextChar={nextChar}
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
