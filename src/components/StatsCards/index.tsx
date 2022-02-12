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
}

const StatsCards = (props: StatsCardsProps) => {
  const { score, putts, fir, gir, compare } = props;
  const statCards = [
    {
      stat: score,
      title: "Score",
      icon: scoreIcon,
    },
    {
      stat: putts,
      title: "Putts",
      icon: puttsIcon,
    },
    {
      stat: fir,
      title: "FIR",
      icon: firIcon,
    },
    {
      stat: gir,
      title: "GIR",
      icon: girIcon,
    },
  ];

  return (
    <section className="stats">
      <Row xs={2} md={2} lg={4}>
        {statCards.map((stat, i) => (
          <Col key={i}>
            <Card className={`stats-card {}`}>
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
                <Card.Text className="stats-card__text-compare"></Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default StatsCards;
