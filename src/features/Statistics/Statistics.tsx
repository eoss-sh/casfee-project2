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
import StatsCards from "../../components/StatsCards";

const Statistics = () => {
  const dispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const averagePutts = useAppSelector((state) => state.scores.averagePutts);
  const averageScore = useAppSelector((state) => state.scores.averageScore);
  const averageGIR = useAppSelector((state) => state.scores.averageGIR);
  const averageFIR = useAppSelector((state) => state.scores.averageFIR);
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
      <div className="container">
        <StatsCards
          score={averageScore}
          putts={averagePutts}
          fir={averageFIR}
          gir={averageGIR}
          compare={false}
        />
        <section className="chart">
          <h2>Deine letzten Scores im Überblick</h2>
          <ResponsiveContainer width="100%" height={600}>
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
        </section>
      </div>
    </>
  );
};

export default Statistics;
