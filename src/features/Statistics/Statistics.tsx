import { useEffect } from "react";
import { fetchMultiScores, calcAverage } from "../Scores/scoresSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SmallHero from "../../components/SmallHero";
import {
  StatsCotainer,
  Stat,
  StatNumber,
  ChartContainer,
} from "../../styles/stats";
import { Header2 } from "../../styles/type";
import { FaTrophy } from "react-icons/fa";
import { GiGolfFlag } from "react-icons/gi";

const Statistics = () => {
  const dispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const averagePutts = useAppSelector((state) => state.scores.averagePutts);
  const averageScore = useAppSelector((state) => state.scores.averageScore);
  const scores = useAppSelector((state) => state.scores.scores);

  useEffect(() => {
    dispatch(
      fetchMultiScores({
        attribute: "appUser",
        id: currentUser.uid,
        order: "date",
        limit: 1000,
        direction: "asc",
      })
    );
  }, [dispatch, currentUser.uid]);

  useEffect(() => {
    dispatch(calcAverage());
  }, [dispatch, scores]);

  return (
    <>
      <SmallHero
        title="Statistik"
        subtitle="Deine wichtigsten Statistiken im Überblick"
      />
      <StatsCotainer>
        <Stat>
          <StatNumber>
            <FaTrophy /> {averageScore ? averageScore : "-"}
          </StatNumber>
        </Stat>
        <Stat>
          <GiGolfFlag /> {averagePutts ? averagePutts : "-"}
          <StatNumber></StatNumber>
        </Stat>
      </StatsCotainer>
      <ChartContainer>
        <Header2>Deine letzten Scores im Überblick</Header2>
        <ResponsiveContainer width="80%" height={400}>
          <LineChart data={scores}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#233d4d"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </>
  );
};

export default Statistics;
