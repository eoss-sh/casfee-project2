import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { fetchSingleScore } from "./singleScoreSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import localDate from "../../helpers/functions/date";
import { updateSingleScore, deleteSingleScore } from "./singleScoreSlice";
import ParamTypes from "../../interfaces/params";
import SmallHero from "../../components/SmallHero";
import StatsCards from "../../components/StatsCards";
import ConfirmModal from "../../components/ConfirmModal";
import { Button, Table } from "react-bootstrap";
import {
  BsHandThumbsUp,
  BsHandThumbsDown,
  BsCheckCircle,
  BsXCircle,
  BsTrash,
} from "react-icons/bs";

const SingleScore = () => {
  const { id } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const history = useHistory();
  const singleScore = useAppSelector((state) => state.singleScore);
  const reverseScoreCard = [...singleScore.score.scorecard];
  const [showModal, setShowModal] = useState(false);

  const submitUpdate = () => {
    dispatch(updateSingleScore({ id: id, data: singleScore.score.scorecard }));
  };

  const dispatchDelete = () => {
    dispatch(deleteSingleScore(id));
    history.push("/scores");
  };

  useEffect(() => {
    dispatch(fetchSingleScore(id));
  }, [dispatch, id]);

  return (
    <>
      <SmallHero
        title={`Runde im ${singleScore.score?.course}`}
        subtitle={`gespielt am ${localDate(singleScore.score?.date.seconds)}`}
      />
      <div className="container">
        <StatsCards
          score={singleScore.score.score || 0}
          putts={singleScore.score.totalPutts || 0}
          fir={singleScore.score.totalFIR || 0}
          gir={singleScore.score.totalGIR || 0}
          compare={false}
        />
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
        <Link to="/scores" className="btn btn-primary">
          Zurück
        </Link>
        <Button variant="secondary" onClick={submitUpdate}>
          Update
        </Button>
        <Button variant="danger" onClick={() => setShowModal(true)}>
          <BsTrash />
          Löschen
        </Button>
        <ConfirmModal
          title="Score löschen"
          message="Möchtest du diesen Score wirklich löschen?"
          onClose={() => setShowModal(false)}
          showModal={showModal}
          onConfirm={() => dispatchDelete()}
          icon={<BsTrash />}
          variant="danger"
        />
      </div>
    </>
  );
};

export default SingleScore;
