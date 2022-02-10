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
import { Card, Row, Col } from "react-bootstrap";
import scoreIcon from "../../assets/score.png";
import firIcon from "../../assets/fir.png";
import girIcon from "../../assets/gir.png";
import puttsIcon from "../../assets/putts.png";

const Statistics = () => {
  const dispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const averagePutts = useAppSelector((state) => state.scores.averagePutts);
  const averageScore = useAppSelector((state) => state.scores.averageScore);
  const averageGIR = useAppSelector((state) => state.scores.averageGIR);
  const averageFIR = useAppSelector((state) => state.scores.averageFIR);
  const scores = useAppSelector((state) => state.scores.scores);

  const statCards = [
    { stat: averageScore, title: "Score", icon: scoreIcon },
    { stat: averagePutts, title: "Putts", icon: puttsIcon },
    { stat: averageFIR, title: "FIR", icon: firIcon },
    { stat: averageGIR, title: "GIR", icon: girIcon },
  ];

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
      <section className="stats">
        <div className="container">
          <Row xs={2} md={2} lg={4}>
            {statCards.map((stat, i) => (
              <Col key={i}>
                <Card className="stats-card">
                  <Card.Img
                    className="stats-card__image"
                    variant="top"
                    src={stat.icon}
                  />
                  <Card.Body>
                    <Card.Title className="stats-card__title">
                      &empty; {stat.title}
                    </Card.Title>
                    <Card.Text className="stats-card__text">
                      {stat.stat ? stat.stat : "71.2"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>
      <section className="chart">
        <div className="container">
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
        </div>
      </section>
    </>
  );
};

export default Statistics;
