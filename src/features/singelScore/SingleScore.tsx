import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleScore } from "./singleScoreSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import ParamTypes from "../../interfaces/params";

const SingleScore = () => {
  const { id } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const singleScore = useAppSelector((state) => state.singleScore);

  useEffect(() => {
    dispatch(fetchSingleScore(id));
  }, [dispatch, id]);

  return (
    <>
      <h1>Score</h1>
      {singleScore.score.course}
      {singleScore.score.scorecard?.map((hole) => {
        return (
          <div>
            <h3>Hole {hole.holeNo}</h3>
            <p>Putts: {hole.putts}</p>
            <p>Score: {hole.score}</p>
          </div>
        );
      })}
    </>
  );
};

export default SingleScore;
