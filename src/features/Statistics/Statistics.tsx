import { useEffect } from "react";
import { fetchMultiScores, calcAverage } from "../Scores/scoresSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import SmallHero from "../../components/SmallHero";
import { StatsCotainer, Stat, StatNumber } from "../../styles/stats";
import { FaTrophy } from "react-icons/fa";
import { GiGolfFlag } from "react-icons/gi";

const Statistics = () => {
  const dispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const averagePutts = useAppSelector((state) => state.scores.averagePutts);
  const averageScore = useAppSelector((state) => state.scores.averageScore);

  useEffect(() => {
    dispatch(
      fetchMultiScores({
        attribute: "appUser",
        id: currentUser.uid,
        order: "date",
        limit: 1000,
        direction: "desc",
      })
    );
  }, [dispatch, currentUser.uid]);

  useEffect(() => {
    dispatch(calcAverage());
  }, [dispatch]);

  return (
    <>
      <SmallHero
        title="Statistik"
        subtitle="Deine wichtigsten Statistiken im Überblick"
      />
      <StatsCotainer>
        <Stat>
          <StatNumber>
            <FaTrophy /> {averageScore}
          </StatNumber>
        </Stat>
        <Stat>
          <StatNumber>
            <GiGolfFlag /> {averagePutts}
          </StatNumber>
        </Stat>
      </StatsCotainer>
    </>
  );
};

export default Statistics;
