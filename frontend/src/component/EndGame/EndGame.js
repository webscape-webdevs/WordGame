import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./endgame.css";
import { clearErrors, loadUser, updateGamesPlayed, updateScore } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Board from "../Leaderboard/Board"
import { Reload } from "../layout/Header/Navbar";
import useGameRules from "../../hooks/useGameRules";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";


const EndGame = ({ finalScore }) => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { error, isUpdated } = useSelector((state) => state.profile);
  const [isLoading] = useState(false);

  const { isScoreUpdated, setIsScoreUpdated } = useGameRules();

  useEffect(() => {


    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (!isScoreUpdated && isAuthenticated) {
      if (user.highestscore <= finalScore) {
        dispatch(updateScore(finalScore));
      } else {
        setIsScoreUpdated(true)

      }

    }

    if (isAuthenticated) {
      dispatch(updateGamesPlayed(++user.gamesPlayed))
    }

  }, []);

  useEffect(() => {
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      setIsScoreUpdated(true)
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, alert, isUpdated]);


  if (isLoading) {
    return (
      <div className="loadContainer">
        <div id="loading"></div>
      </div>
    );
  } else {
    return (

      <>

        <Reload />

        <div className="endGame">

          {isAuthenticated
            ? <>
              <h2 style={{ color: 'black' }}>{user.name}</h2>

              <p>Your Current Score is {finalScore}</p>
              <p>Your Highest Score is {user.highestscore}</p>
              <button className="start-btn" >
                <a href='/' style={{ textDecoration: 'none', color: "white" }}> Play Again</a>
              </button>

              {isScoreUpdated
                ? <>
                  <Board />
                </>

                : <div></div>}
            </>

            : <>
              <p>Your Current Score is {finalScore}</p>
              <button className="start-btn" >
                <a href='/' style={{ textDecoration: 'none', color: "white" }}> Play Again</a>
              </button>
              <Board />
            </>
          }

        </div>

      </>




    );

  }

}

export default EndGame;