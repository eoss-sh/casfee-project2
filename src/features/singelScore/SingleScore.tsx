import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleScore } from "./singleScoreSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import ParamTypes from "../../interfaces/params";
import SmallHero from "../../components/SmallHero";
import { HoleList, Hole } from "../../styles/scores";
import { Icon } from "../../styles/elements";

const SingleScore = () => {
  const { id } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const singleScore = useAppSelector((state) => state.singleScore);

  useEffect(() => {
    dispatch(fetchSingleScore(id));
  }, [dispatch, id]);

  return (
    <>
      <SmallHero
        title={`Runde im ${singleScore.score.course}`}
        subtitle={`gespielt am ${singleScore.score.date}`}
      />
      <HoleList>
        {singleScore.score.scorecard?.map((hole) => {
          return (
            <Hole>
              <Icon>{hole.holeNo}</Icon>
              <p>Putts: {hole.putts}</p>
              <p>Score: {hole.score}</p>
            </Hole>
          );
        })}
      </HoleList>
    </>
  );
};

export default SingleScore;
