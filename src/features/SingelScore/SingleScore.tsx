import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import {
  fetchSingleScore,
  deleteSingleScore,
  updateSingleScoreEntry,
  updateSingleScore,
} from "./singleScoreSlice";
import { fetchMultiScores, calcAverage } from "../Scores/scoresSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import localDate from "../../helpers/functions/date";
import ParamTypes from "../../interfaces/params";
import UpdateModal from "./UpdateModal";
import SmallHero from "../../components/SmallHero";
import StatsCards from "../../components/StatsCards";
import ConfirmModal from "../../components/ConfirmModal";
import { Button, Table } from "react-bootstrap";
import { BsCheckCircle, BsXCircle, BsTrash, BsPencil } from "react-icons/bs";
import { ScorecardEntry } from "../../interfaces/scores";
import logging from "../../config/logging";

interface isopen {
  isOpen: {
    [key: string]: boolean;
  };
}

const SingleScore = () => {
  const { id } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const history = useHistory();
  const singleScore = useAppSelector((state) => state.singleScore);
  const scores = useAppSelector((state) => state.scores);
  const averageScore = useAppSelector((state) => state.scores.averageScore);
  const currentUser = useAppSelector((state) => state.auth.user);
  const reverseScoreCard = [...singleScore.score.scorecard];

  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState<isopen>({
    isOpen: {},
  });

  const dispatchDelete = () => {
    dispatch(deleteSingleScore(id));
    history.push("/scores");
  };

  const dispatchUpdate = (id: string, data: ScorecardEntry) => {
    if (id) {
      dispatch(updateSingleScoreEntry({ id: id, data: data }));
      dispatch(updateSingleScore(id));
      setShowUpdateModal({ isOpen: { [data.holeNo as number]: false } });
    } else logging.warn("No score ID found");
  };

  useEffect(() => {
    dispatch(fetchSingleScore(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(
      fetchMultiScores({
        attribute: "appUser",
        id: currentUser.uid,
        order: "date",
        limit: 100,
        direction: "desc",
      })
    );
  }, [dispatch, currentUser]);

  useEffect(() => {
    dispatch(calcAverage());
  }, [dispatch, scores]);

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
          compare={true}
          compareScore={averageScore}
          comparePutts={scores.averagePutts}
          compareFIR={scores.averageFIR}
          compareGIR={scores.averageGIR}
        />
        <section className="scorecard">
          <Table responsive>
            <thead>
              <tr>
                <th>Nr.</th>
                <th>Schl??ge</th>
                <th>Putts</th>
                <th>GIR</th>
                <th>FIR</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {reverseScoreCard.reverse().map((hole, i) => (
                <tr key={i} id={hole.id}>
                  <td>{hole.holeNo}</td>
                  <td data-test={`score-${i}`}>{hole.score}</td>
                  <td>{hole.putts}</td>
                  <td>{hole.gir ? <BsCheckCircle /> : <BsXCircle />}</td>
                  <td>{hole.fir ? <BsCheckCircle /> : <BsXCircle />}</td>
                  <td>
                    <BsPencil
                      className="scorecard-edit"
                      data-test={`edit-score-${i}`}
                      onClick={() => {
                        setShowUpdateModal({
                          isOpen: { [hole.holeNo as number]: true },
                        });
                      }}
                    />
                    <UpdateModal
                      showModal={showUpdateModal.isOpen[hole.holeNo || 20]}
                      onClose={() =>
                        setShowUpdateModal({
                          isOpen: { [hole.id as string]: false },
                        })
                      }
                      score={hole}
                      onConfirm={(data: ScorecardEntry) =>
                        dispatchUpdate(id, data)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Link to="/scores" className="btn btn-primary btn-back">
            Zur??ck
          </Link>
          <Button variant="danger" onClick={() => setShowModal(true)}>
            <BsTrash />
            L??schen
          </Button>
        </section>
        <ConfirmModal
          title="Score l??schen"
          message="M??chtest du diesen Score wirklich l??schen?"
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
