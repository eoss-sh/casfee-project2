import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../helpers/hooks";
import { getTotalIR, getTotalScore } from "../../helpers/functions/totals";
import { fetchCoursesList } from "../Courses/coursesSlice";
import { addScore } from "./singleScoresApi";
import { useDispatch } from "react-redux";
import { fetchCourse } from "../SingleCourse/singleCourseSlice";
import { ScoreInputsInterface } from "../../interfaces/scores";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import SmallHero from "../../components/SmallHero";
import ConfirmModal from "../../components/ConfirmModal";
import { BsCheckCircle } from "react-icons/bs";

const AddScore = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const courses = useAppSelector((state) => state.courses.courses);
  const user = useAppSelector((state) => state.auth.user);
  const course = useAppSelector((state) => state.course.course);
  const [distance, setDistance] = useState("dist1");
  const [scorecard, setScorecard] = useState<ScoreInputsInterface>({});
  const [showModal, setShowModal] = useState(false);

  // Function to select course from dropdown
  const handleSetSelectedCourse = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) => {
    dispatch(fetchCourse(id));
  };

  // Function to change to current scorecard by the user
  const handleScoreChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    no: number
  ) => {
    const { name, value, checked } = e.target;
    setScorecard((prev) => {
      const valueType =
        name === "fir" || name === "gir" ? checked : parseInt(value, 10);
      if (prev === null) {
        return { [no]: { [name]: valueType } };
      }
      return {
        ...prev,
        [no]: { ...scorecard?.[no], [name]: valueType },
      };
    });
  };

  // Function to add a new scorecard to the database
  const handleAddScore = async () => {
    addScore(
      course.name,
      user.uid,
      getTotalScore("score", scorecard),
      getTotalScore("putts", scorecard),
      getTotalIR("gir", scorecard),
      getTotalIR("fir", scorecard),
      scorecard
    );
    window.localStorage.setItem("scorecard", "");
    history.push("/scores");
  };

  // Save current Score in Local Storage and retrieve it when the page is reloaded
  useEffect(() => {
    setScorecard(JSON.parse(localStorage.getItem("scorecard") || "{}"));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("scorecard", JSON.stringify(scorecard));
  }, [scorecard]);

  useEffect(() => {
    dispatch(fetchCoursesList());
    dispatch(fetchCourse("3pjVPyi0SqPgQPeV6i47"));
  }, [dispatch]);

  return (
    <>
      <SmallHero
        title="Los geht's!"
        subtitle="Platz und Tee auswählen - und loslegen."
      />
      <div className="container addscore">
        <section className="addscore-selectors">
          <Row xs={1} lg={3}>
            <Col className="addscore-selectors__controls">
              <p className="label">Platz auswählen</p>
              <Form.Select
                name="course"
                onChange={(e) => handleSetSelectedCourse(e, e.target.value)}
              >
                {courses.map((course) => (
                  <option key={course.course.uid} value={course.course.uid}>
                    {course.course.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col className="addscore-selectors__controls">
              <p className="label">Distanz auswählen</p>
              <Form.Select
                name="distance"
                onChange={(e) => setDistance(e.target.value)}
              >
                <option value="dist1">Mens Champions</option>
                <option value="dist2">Mens Medal</option>
                <option value="dist3">Women Champions</option>
                <option value="dist4">Women Medal</option>
              </Form.Select>
            </Col>
            <Col className="addscore-selectors__controls">
              <Button
                variant="danger"
                onClick={() => {
                  setScorecard({});
                }}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </section>
        <section className="addscore-scorecard">
          <Table responsive>
            <thead>
              <tr>
                <th>Nr.</th>
                <th className="no-mobile">Par</th>
                <th className="no-mobile">HCP</th>
                <th className="no-mobile">Distanz</th>
                <th>Schläge</th>
                <th>Putts</th>
                <th>FIR</th>
                <th>GIR</th>
              </tr>
            </thead>
            <tbody>
              {course.holes?.map((hole, index) => {
                return (
                  <tr key={index}>
                    <td>{hole.no}</td>
                    <td className="no-mobile">{hole.par}</td>
                    <td className="no-mobile">{hole.hcp}</td>
                    {distance === "dist1" && (
                      <td className="no-mobile">{hole.dist1}</td>
                    )}
                    {distance === "dist2" && (
                      <td className="no-mobile">{hole.dist2}</td>
                    )}
                    {distance === "dist3" && (
                      <td className="no-mobile">{hole.dist3}</td>
                    )}
                    {distance === "dist4" && (
                      <td className="no-mobile">{hole.dist4}</td>
                    )}
                    <td>
                      <input
                        className="table-input table-input__small"
                        type="number"
                        name="score"
                        placeholder="Score"
                        onChange={(e) =>
                          handleScoreChange(e, hole.no as number)
                        }
                        value={scorecard?.[hole.no as number]?.score || 0}
                      />
                    </td>
                    <td>
                      <input
                        className="table-input table-input__small"
                        type="number"
                        name="putts"
                        placeholder="Putts"
                        onChange={(e) =>
                          handleScoreChange(e, hole.no as number)
                        }
                        value={scorecard?.[hole.no as number]?.putts || 0}
                      />
                    </td>
                    <td>
                      <Form.Check
                        type="switch"
                        name="gir"
                        onChange={(e) =>
                          handleScoreChange(e, hole.no as number)
                        }
                        checked={scorecard?.[hole.no as number]?.gir || false}
                      />
                    </td>
                    <td>
                      <Form.Check
                        type="switch"
                        name="fir"
                        onChange={(e) =>
                          handleScoreChange(e, hole.no as number)
                        }
                        checked={scorecard?.[hole.no as number]?.fir || false}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </section>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Runde speichern
        </Button>
        <ConfirmModal
          title="Runde speichern"
          message="Möchtest du die Runde wirklich speichern? Gespeicherte Runden können nicht mehr geändert werden."
          onClose={() => setShowModal(false)}
          showModal={showModal}
          onConfirm={() => handleAddScore()}
          icon={<BsCheckCircle />}
          variant="primary"
        />
      </div>
    </>
  );
};

export default AddScore;
