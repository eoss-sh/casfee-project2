import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleScore } from "./singleScoreSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import { updateScore, updateSingleScore } from "./singleScoreSlice";
import ParamTypes from "../../interfaces/params";
import SmallHero from "../../components/SmallHero";
import { HoleList, Hole } from "../../styles/scores";
import { Icon } from "../../styles/elements";
import { StatsCotainer, Stat, StatNumber } from "../../styles/stats";
import { FaTrophy } from "react-icons/fa";
import { GiCondorEmblem, GiGolfFlag } from "react-icons/gi";
import { MdModeEditOutline } from "react-icons/md";
import { Container } from "../../styles/styles";

const SingleScore = () => {
  const { id } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const singleScore = useAppSelector((state) => state.singleScore);

  const submitUpdate = () => {
    dispatch(updateSingleScore({ id: id, data: singleScore.score.scorecard }));
  };

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
        <Stat>
          <StatNumber>
            <GiGolfFlag /> {singleScore.score.totalFIR}
          </StatNumber>
        </Stat>
        <Stat>
          <StatNumber>
            <GiGolfFlag /> {singleScore.score.totalGIR}
          </StatNumber>
        </Stat>
      </StatsCotainer>
      <Container>
        <HoleList>
          {singleScore.score.scorecard?.map((hole, index) => {
            return (
              <Hole key={index}>
                <Icon>{hole.holeNo}</Icon>
                <p>
                  Putts:
                  <input
                    type="number"
                    value={hole.putts}
                    name="putts"
                    onChange={(e) =>
                      dispatch(
                        updateScore({ index, value: e.target.valueAsNumber })
                      )
                    }
                  />
                </p>
                <p>Score: {hole.score}</p>
                <p>GIR: {hole.gir ? "yes" : "no"}</p>
                <p>FIR: {hole.fir ? "yes" : "NO"}</p>
              </Hole>
            );
          })}
        </HoleList>
        <button onClick={submitUpdate}>Update</button>
      </Container>
    </>
  );
};

export default SingleScore;
