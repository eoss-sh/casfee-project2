import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../helpers/hooks";
import { fetchCoursesList } from "../courses/coursesSlice";
import { useDispatch } from "react-redux";
import { fetchCourse } from "../singleCourse/singleCourseSlice";
import { ScorecardEntry } from "../../interfaces/scores";
import { database } from "../../config/firebase";
import logging from "../../config/logging";
import {
  CourseSelector,
  FormContainer,
  Input,
  Selectors,
} from "../../styles/forms";
import {
  ScorecardRow,
  Scorecard,
  ScorecardTitelRow,
  ScorecardTitel,
} from "../../styles/scorecard";
import { Container } from "../../styles/styles";
import { MainButton } from "../../styles/buttons";
import SmallHero from "../../components/SmallHero";

interface ScoreInputsInterface {
  [key: string]: ScorecardEntry;
}

const AddScore = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const courses = useAppSelector((state) => state.courses.courses);
  const user = useAppSelector((state) => state.auth.user);
  const course = useAppSelector((state) => state.course.course);

  const [distance, setDistance] = useState("");
  const [scorecard, setScorecard] = useState<ScoreInputsInterface>({});

  // Function to select course from dropdown
  const handleSetSelectedCourse = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) => {
    dispatch(fetchCourse(id));
  };

  // Function to change to current scorecard by the user
  const handleScoreChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    no: number
  ) => {
    const { name, value } = e.target;
    setScorecard((prev) => {
      const valueType =
        name === "fir" || name === "gir"
          ? value === "true"
          : parseInt(value, 10);
      if (prev === null) {
        return { [no]: { [name]: valueType } };
      }
      return {
        ...prev,
        [no]: { ...scorecard?.[no], [name]: valueType },
      };
    });
  };

  // Function to get Totals of different types of score
  const getTotalScore = (attribute: string) => {
    return Object.values(scorecard).reduce(
      (acc, hole: any) => acc + hole[attribute],
      0
    );
  };

  // Function to add a new scorecard to the database
  const addScore = async () => {
    const date = new Date();
    const score = {
      date:
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear(),
      course: course.name,
      appUser: user.uid,
      score: getTotalScore("score"),
      totalPutts: getTotalScore("putts"),
    };
    logging.info(score);
    try {
      const result = await database.collection("scores").add(score);
      for (let [no, score] of Object.entries(scorecard)) {
        await database
          .collection("scores")
          .doc(result.id)
          .collection("scorecard")
          .add({ ...score, holeNo: parseInt(no, 10) });
      }
      history.push("/scores");
    } catch (error) {
      logging.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchCoursesList());
  }, [dispatch]);

  return (
    <>
      <SmallHero
        title="Los geht's!"
        subtitle="Platz und Tee auswählen - und loslegen."
      />
      <Container>
        <Selectors>
          <CourseSelector
            name="course"
            id="course"
            onChange={(e) => setDistance(e.target.value)}
          >
            <option disabled selected value="">
              -- Distanz auswählen --
            </option>
            <option value="dist1">Mens Champions</option>
            <option value="dist2">Mens Medal</option>
            <option value="dist3">Women Champions</option>
            <option value="dist4">Women Medal</option>
          </CourseSelector>
          <CourseSelector
            name="distance"
            id="distance"
            onChange={(e) => handleSetSelectedCourse(e, e.target.value)}
          >
            <option disabled selected value="">
              -- Kurs auswählen --
            </option>
            {courses.map((course) => (
              <option key={course.course.uid} value={course.course.uid}>
                {course.course.name}
              </option>
            ))}
          </CourseSelector>
        </Selectors>
        <FormContainer>
          <Scorecard>
            <ScorecardTitelRow columnsAmount={8}>
              <ScorecardTitel showMobile={true}>No.</ScorecardTitel>
              <ScorecardTitel showMobile={true}>Par</ScorecardTitel>
              <ScorecardTitel showMobile={true}>HCP</ScorecardTitel>
              <ScorecardTitel showMobile={true}>Distanz</ScorecardTitel>
              <ScorecardTitel showMobile={false}>Score</ScorecardTitel>
              <ScorecardTitel showMobile={false}>Putts</ScorecardTitel>
              <ScorecardTitel showMobile={false}>GIR</ScorecardTitel>
              <ScorecardTitel showMobile={false}>FIR</ScorecardTitel>
            </ScorecardTitelRow>
            {course.holes?.map((hole, index) => {
              return (
                <ScorecardRow key={index} columnsAmount={8}>
                  <p>{hole.no}</p>
                  <p>{hole.par}</p>
                  <p>{hole.hcp}</p>
                  {distance === "dist1" && <p>{hole.dist1}</p>}
                  {distance === "dist2" && <p>{hole.dist2}</p>}
                  {distance === "dist3" && <p>{hole.dist3}</p>}
                  {distance === "dist4" && <p>{hole.dist4}</p>}
                  <Input
                    large
                    type="number"
                    name="score"
                    placeholder="Score"
                    onChange={(e) => handleScoreChange(e, hole.no as number)}
                    value={scorecard?.[hole.no as number]?.score || 0}
                  />
                  <Input
                    large
                    type="number"
                    name="putts"
                    placeholder="Putts"
                    onChange={(e) => handleScoreChange(e, hole.no as number)}
                    value={scorecard?.[hole.no as number]?.putts || 0}
                  />
                  <select
                    name="gir"
                    onChange={(e) => handleScoreChange(e, hole.no as number)}
                    value={scorecard?.[hole.no as number]?.gir}
                  >
                    <option value="na">Wählen</option>
                    <option value="true">Ja</option>
                    <option value="false">Nein</option>
                  </select>
                  <select
                    name="fir"
                    onChange={(e) => handleScoreChange(e, hole.no as number)}
                    value={scorecard?.[hole.no as number]?.fairway}
                  >
                    <option value="na">Wählen</option>
                    <option value="true">Ja</option>
                    <option value="false">Nein</option>
                  </select>
                </ScorecardRow>
              );
            })}
            <MainButton onClick={() => addScore()}>Submit Score</MainButton>
          </Scorecard>
        </FormContainer>
      </Container>
    </>
  );
};

export default AddScore;
