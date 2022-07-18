import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Board from "../Leaderboard/Board";
import "./instructions.css";
import { Reload } from '../layout/Header/Navbar'

export default function Instructions({ startGame }) {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <div className="main">

        <Reload />
        <div className="InstructionsBoard">
          <h3 >Word Race</h3>
          {isAuthenticated
            ? <button className="start-btn" onClick={startGame}>
              Start Game
            </button>
            : <div className="notLogin">

              <div className="notLogin-LoginSignup">
                <h1 style={{ color: "black", textDecoration: "none", fontSize: '30px', width: '500px' }} >Login or Signup to View Your Profile and Save Your Score</h1>
                <button type='button' className='start-btn'>
                  <Link className="navbar-signup-button" to='/login' >
                    Login / Sign up
                  </Link>
                </button>
              </div>
              <div className="line-container">
                <div className="line"></div>
              </div>
              <div className="notLogin-start">
                <h1 style={{ color: "black", textDecoration: "none", fontSize: '30px', width: '500px' }} >Your Score will Not be Saved and Displayed on Leaderboard</h1>
                <button className="start-btn" onClick={startGame}>
                  Start Game
                </button>
              </div>
            </div>


          }

          <Board />

        </div>
      </div>

    </>

  );
}
