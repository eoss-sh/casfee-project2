import { useEffect, useState } from "react";
import { fetchMultiScores } from "./scoresSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import SmallHero from "../../components/SmallHero";
import Spinner from "../../components/Spinner";
import ConfirmModal from "../../components/ConfirmModal";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { BsArrowRightCircle, BsTrash } from "react-icons/bs";
import { IconContext } from "react-icons";
import { deleteSingleScore } from "../SingelScore/singleScoreSlice";

const Scores = () => {
  const dispatch = useDispatch();
  const scores = useAppSelector((state) => state.scores);
  const currentUser = useAppSelector((state) => state.auth.user);
  const [showModal, setShowModal] = useState(false);
  const [scoreToDelete, setScoreToDelete] = useState("");
  const fetchScoresAttributes = {
    attribute: "appUser",
    id: currentUser.uid,
    order: "date",
    limit: 100,
    direction: "desc",
  };

  const dispatchDelete = (id: string) => {
    dispatch(deleteSingleScore(id));
    setShowModal(false);
    dispatch(fetchMultiScores(fetchScoresAttributes));
  };

  useEffect(() => {
    dispatch(fetchMultiScores(fetchScoresAttributes));
  }, [dispatch, currentUser.uid]);

  return (
    <>
      <SmallHero title="Scores" subtitle="Alle deine Scores auf einen Blick" />
      <div className="container">
        {scores.loading ? (
          <Spinner />
        ) : (
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Datum</th>
                <th>Platz</th>
                <th>Score</th>
                <th>Putts</th>
                <th>FIR</th>
                <th>GIR</th>
                <th>Details</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {scores.scores.map((score, index) => {
                const roundDate = score.date?.toDate().toLocaleDateString();
                return (
                  <tr key={index}>
                    <td>{roundDate}</td>
                    <td>{score.course}</td>
                    <td>{score.score}</td>
                    <td>{score.totalPutts}</td>
                    <td>{score.totalFIR}</td>
                    <td>{score.totalGIR}</td>
                    <td>
                      <Link to={`singlescore/${score.id}`}>
                        <BsArrowRightCircle />
                      </Link>
                    </td>
                    <td>
                      <Button
                        className="btn-table"
                        onClick={() => {
                          setShowModal(true);
                          setScoreToDelete(score.id || "");
                        }}
                      >
                        <IconContext.Provider
                          value={{ style: { color: "#ff5b57" } }}
                        >
                          <BsTrash />
                        </IconContext.Provider>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
        <ConfirmModal
          title="Score löschen"
          message="Möchtest du diesen Score wirklich löschen?"
          onClose={() => setShowModal(false)}
          showModal={showModal}
          onConfirm={() => dispatchDelete(scoreToDelete)}
          icon={<BsTrash />}
          variant="danger"
        />
      </div>
    </>
  );
};

export default Scores;
