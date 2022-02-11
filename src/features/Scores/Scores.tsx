import { useEffect } from "react";
import { fetchMultiScores } from "./scoresSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import SmallHero from "../../components/SmallHero";
import Spinner from "../../components/Spinner";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { BsArrowRightCircle } from "react-icons/bs";

const Scores = () => {
  const dispatch = useDispatch();
  const scores = useAppSelector((state) => state.scores);
  const currentUser = useAppSelector((state) => state.auth.user);

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
  }, [dispatch, currentUser.uid]);

  return (
    <>
      <SmallHero title="Scores" subtitle="Alle deine Scores auf einen Blick" />
      <Container>
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
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default Scores;
