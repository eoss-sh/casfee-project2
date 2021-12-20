import React, { useEffect } from "react";
import { fetchMultiScores } from "./scoresSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import { MainLinkText } from "../../styles/buttons";

const Scores = () => {
  const dispatch = useDispatch();
  const scores = useAppSelector((state) => state.scores.scores);
  const currentUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchMultiScores({ attribute: "appUser", id: currentUser.uid }));
  }, [dispatch, currentUser.uid]);

  return (
    <>
      <h1>Scores</h1>
      <p>{currentUser.uid}</p>
      {scores.map((score) => {
        console.log(scores);
        return (
          <div>
            <p>Course: {score.course}</p>
            <p>Score: {score.score}</p>
            <MainLinkText to={`singlescore/${score.id}`}>
              Details &rarr;
            </MainLinkText>
          </div>
        );
      })}
    </>
  );
};

export default Scores;
