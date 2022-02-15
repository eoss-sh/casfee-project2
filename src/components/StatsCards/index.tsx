import { Card, Row, Col } from "react-bootstrap";
import scoreIcon from "../../assets/score.png";
import firIcon from "../../assets/fir.png";
import girIcon from "../../assets/gir.png";
import puttsIcon from "../../assets/putts.png";

export interface StatsCardsProps {
  score: number;
  putts: number;
  fir: number;
  gir: number;
  compare: boolean;
  compareScore?: number;
  comparePutts?: number;
  compareFIR?: number;
  compareGIR?: number;
}

const StatsCards = (props: StatsCardsProps) => {
  const {
    score,
    putts,
    fir,
    gir,
    compare,
    compareScore,
    comparePutts,
    compareFIR,
    compareGIR,
  } = props;
  const statCards = [
    {
      stat: score,
      title: "Score",
      icon: scoreIcon,
      comparere: compareScore,
      better: "lower",
    },
    {
      stat: putts,
      title: "Putts",
      icon: puttsIcon,
      comparere: comparePutts,
      better: "lower",
    },
    {
      stat: fir,
      title: "FIR",
      icon: firIcon,
      comparere: compareFIR,
      better: "higher",
    },
    {
      stat: gir,
      title: "GIR",
      icon: girIcon,
      comparere: compareGIR,
      better: "higher",
    },
  ];

  return (
    <section className="stats">
      <Row xs={2} md={2} lg={4}>
        {statCards.map((stat, i) => (
          <Col key={i}>
            <Card
              className={`stats-card ${
                (compare &&
                  stat.comparere &&
                  stat.better === "lower" &&
                  stat.stat * 0.9 > stat.comparere) ||
                (compare &&
                  stat.comparere &&
                  stat.better === "higher" &&
                  stat.comparere * 0.9 > stat.stat)
                  ? "stats-card-red"
                  : (compare &&
                      stat.comparere &&
                      stat.better === "lower" &&
                      stat.stat * 1.1 < stat.comparere) ||
                    (compare &&
                      stat.comparere &&
                      stat.better === "higher" &&
                      stat.comparere * 1.1 < stat.stat)
                  ? "stats-card-green"
                  : ""
              }`}
            >
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
                  {stat.stat ? stat.stat : "-"}
                </Card.Text>
                <Card.Text className="stats-card__text-compare">
                  {compare &&
                    `Durchschnitt aller Runden: ${
                      stat.comparere ? stat.comparere : "-"
                    }`}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default StatsCards;
