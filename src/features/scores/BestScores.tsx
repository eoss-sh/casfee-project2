import React, { useEffect } from "react";
import { fetchMultiScores } from "./scoresSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import { BestScore } from "../../styles/scores";
import { Container } from "../../styles/styles";

const BestScores = () => {
  const dispatch = useDispatch();
  const scores = useAppSelector((state) => state.scores.scores);
  const data = useAppSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchMultiScores({ attribute: "course", id: data.course.name }));
  }, [dispatch, data.course.name]);

  return (
    <>
      <Container>
        {scores.map((score) => {
          return (
            <BestScore>
              <p>{score.date}</p>
              <p>{score.score}</p>
            </BestScore>
          );
        })}
      </Container>
    </>
  );
};

export default BestScores;
