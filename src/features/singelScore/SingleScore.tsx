import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleScore } from "./singleScoreSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import { updateSingleScore } from "./singleScoreSlice";
import ParamTypes from "../../interfaces/params";
import SmallHero from "../../components/SmallHero";
import { Card, Row, Col, Button, Table } from "react-bootstrap";
import scoreIcon from "../../assets/score.png";
import firIcon from "../../assets/fir.png";
import girIcon from "../../assets/gir.png";
import puttsIcon from "../../assets/putts.png";
import {
  BsHandThumbsUp,
  BsHandThumbsDown,
  BsCheckCircle,
  BsXCircle,
} from "react-icons/bs";

const SingleScore = () => {
  const { id } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const singleScore = useAppSelector((state) => state.singleScore);
  const reverseScoreCard = [...singleScore.score.scorecard];

  const statCards = [
    { stat: singleScore.score.score, title: "Score", icon: scoreIcon },
    { stat: singleScore.score.totalPutts, title: "Putts", icon: puttsIcon },
    { stat: singleScore.score.totalFIR, title: "FIR", icon: firIcon },
    { stat: singleScore.score.totalGIR, title: "GIR", icon: girIcon },
  ];

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
        subtitle={`gespielt am ${singleScore.score.date
          .toDate()
          .toLocaleDateString()}`}
      />
      <div className="container">
        <section className="stats">
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
        </section>
        <section className="scorecard">
          <Table responsive>
            <thead>
              <tr>
                <th>Nr.</th>
                <th>Schläge</th>
                <th>Putts</th>
                <th>GIR</th>
                <th>FIR</th>
              </tr>
            </thead>
            <tbody>
              {reverseScoreCard.reverse().map((hole, i) => (
                <tr key={i}>
                  <td>{hole.holeNo}</td>
                  <td>{hole.score}</td>
                  <td>{hole.putts}</td>
                  <td>
                    {hole.gir ? <BsHandThumbsUp /> : <BsHandThumbsDown />}
                  </td>
                  <td>{hole.fir ? <BsCheckCircle /> : <BsXCircle />}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
        <Button variant="primary" onClick={submitUpdate}>
          Update
        </Button>
      </div>
    </>
  );
};

export default SingleScore;
