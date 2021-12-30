import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleScore } from "./singleScoreSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import ParamTypes from "../../interfaces/params";
import SmallHero from "../../components/SmallHero";
import { HoleList, Hole } from "../../styles/scores";
import { Icon } from "../../styles/elements";
import { StatsCotainer, Stat, StatNumber } from "../../styles/stats";
import { FaTrophy } from "react-icons/fa";
import { GiGolfFlag } from "react-icons/gi";

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
        title={`Runde im ${singleScore.score?.course}`}
        subtitle={`gespielt am ${singleScore.score.date}`}
      />
      <StatsCotainer>
        <Stat>
          <StatNumber>
            <FaTrophy /> {singleScore.score.score}
          </StatNumber>
        </Stat>
        <Stat>
          <StatNumber>
            <GiGolfFlag /> {singleScore.score.totalPutts}
          </StatNumber>
        </Stat>
      </StatsCotainer>
      <HoleList>
        {singleScore.score.scorecard?.map((hole) => {
          return (
            <Hole key={hole.holeNo}>
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
