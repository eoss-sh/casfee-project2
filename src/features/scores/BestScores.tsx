import React, { useEffect } from "react";
import { fetchMultiScores } from "./scoresSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import { BestScore, TrophyIcon } from "../../styles/scores";
import { Container } from "../../styles/styles";
import UserData from "../../components/UserData";
import { FaTrophy } from "react-icons/fa";

const BestScores = () => {
  const dispatch = useDispatch();
  const scores = useAppSelector((state) => state.scores.scores);
  const data = useAppSelector((state) => state.course);

  useEffect(() => {
    dispatch(
      fetchMultiScores({
        attribute: "course",
        id: data.course.name,
        order: "score",
        limit: 10,
        direction: "asc",
      })
    );
  }, [dispatch, data.course.name]);

  return (
    <>
      <Container>
        <TrophyIcon>
          <FaTrophy />
        </TrophyIcon>
        {scores.map((score) => {
          const roundDate = score.date?.toDate().toLocaleDateString();
          return (
            <BestScore key={score.id}>
              <p>{roundDate}</p>
              <UserData id={score.appUser} />
              <p>{score.score}</p>
            </BestScore>
          );
        })}
      </Container>
    </>
  );
};

export default BestScores;
