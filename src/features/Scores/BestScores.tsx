import React, { useEffect } from "react";
import { fetchMultiScores } from "./scoresSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import UserData from "../../components/UserData";
import Spinner from "../../components/Spinner";
import trophyIcon from "../../assets/champs.png";
import { Card } from "react-bootstrap";

const BestScores = () => {
  const dispatch = useDispatch();
  const scores = useAppSelector((state) => state.scores);
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
    <Card className="bestscores stats-card">
      <Card.Img className="stats-card__image" variant="top" src={trophyIcon} />
      <Card.Body>
        <Card.Title className="stats-card__title">Bests Scores</Card.Title>
        <ul className="bestsocres-list">
          {scores.loading ? (
            <Spinner />
          ) : (
            scores.scores.map((score) => {
              const roundDate = score.date?.toDate().toLocaleDateString();
              return (
                <li className="bestscores-list__single" key={score.id}>
                  <p>{roundDate}</p>
                  <UserData id={score.appUser} />
                  <p>{score.score} Schläge</p>
                </li>
              );
            })
          )}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default BestScores;
