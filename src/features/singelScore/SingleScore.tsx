import { useEffect, useState } from "react";
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
import { MdModeEditOutline } from "react-icons/md";
import { Container } from "../../styles/styles";
import { ScorecardEntry } from "../../interfaces/scores";

const SingleScore = () => {
  const { id } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const singleScore = useAppSelector((state) => state.singleScore);

  const [dirty, setDirty] = useState(false);
  const [scorecard, setScorecard] = useState<ScorecardEntry[]>(
    singleScore.score.scorecard
  );

  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    no: number = 0
  ) => {
    setDirty(true);
    console.log(no);
    setScorecard((scorecard) => {
      console.log(scorecard);
      return {
        ...scorecard,
        [no]: { ...scorecard?.[no], [e.target.name]: e.target.value },
      };
    });
    console.log(scorecard);
  };

  useEffect(() => {
    dispatch(fetchSingleScore(id));
  }, [dispatch, id]);

  useEffect(() => {
    setScorecard(singleScore.score.scorecard);
  }, [singleScore.score.scorecard]);

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
          {singleScore.score.scorecard?.map((hole) => {
            return (
              <Hole key={hole.holeNo}>
                <Icon>{hole.holeNo}</Icon>
                <p>
                  Putts:
                  <input
                    value={hole.putts}
                    name="putts"
                    onChange={(e) => handleUpdate(e, hole.holeNo)}
                  />
                </p>
                <p>Score: {hole.score}</p>
                <p>GIR: {hole.gir ? "yes" : "NO"}</p>
                <p>FIR: {hole.fir ? "yes" : "NO"}</p>
                {dirty && <MdModeEditOutline />}
              </Hole>
            );
          })}
        </HoleList>
      </Container>
    </>
  );
};

export default SingleScore;
