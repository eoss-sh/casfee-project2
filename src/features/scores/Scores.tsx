import React, { useEffect } from "react";
import { fetchMultiScores } from "./scoresSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import { MainLinkText } from "../../styles/buttons";
import SmallHero from "../../components/SmallHero";
import { SingleScore, ScoresContainer } from "../../styles/scores";

const Scores = () => {
  const dispatch = useDispatch();
  const scores = useAppSelector((state) => state.scores.scores);
  const currentUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchMultiScores({ attribute: "appUser", id: currentUser.uid }));
  }, [dispatch, currentUser.uid]);

  return (
    <>
      <SmallHero title="Scores" subtitle="See your scores" />
      <ScoresContainer>
        {scores.map((score) => {
          return (
            <SingleScore key={score.id} to={`singlescore/${score.id}`}>
              <p>Datum: {score.date}</p>
              <p>Course: {score.course}</p>
              <p>Score: {score.score}</p>
              <p>Putts: {score.totalPutts}</p>
            </SingleScore>
          );
        })}
      </ScoresContainer>
    </>
  );
};

export default Scores;
