import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../helpers/hooks";
import { fetchCoursesList } from "../courses/coursesSlice";
import { useDispatch } from "react-redux";
import { fetchCourse } from "../singleCourse/singleCourseSlice";
import logging from "../../config/logging";
import { MainButton } from "../../styles/buttons";
// import { Score } from "../../interfaces/scores";
import {
  FormContainer,
  Input,
  InputRow,
  Label,
  Icon,
} from "../../styles/forms";
import { ScorecardRow, Scorecard } from "../../styles/scorecard";
import { Container } from "../../styles/styles";

const AddScore = () => {
  const dispatch = useDispatch();
  const courses = useAppSelector((state) => state.courses.courses);
  const user = useAppSelector((state) => state.auth.user);
  const course = useAppSelector((state) => state.course.course);

  const [date, setDate] = useState("");
  const [distance, setDistance] = useState("");
  const [scorecard, setScorecard] = useState([]);

  const handleSetSelectedCourse = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) => {
    dispatch(fetchCourse(id));
  };

  const handleScoreChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    no: number | undefined
  ) => {
    console.log(e.target.valueAsNumber);
    console.log(no);
  };

  useEffect(() => {
    dispatch(fetchCoursesList());
  }, [dispatch]);

  return (
    <FormContainer>
      Los gehts!
      <select
        name="course"
        id="course"
        onChange={(e) => handleSetSelectedCourse(e, e.target.value)}
      >
        <option value="dist1">Mens Champions</option>
        <option value="dist2">Mens Medal</option>
        <option value="dist3">Women Champions</option>
        <option value="dist4">Women Medal</option>
      </select>
      <select
        name="distance"
        id="distance"
        onChange={(e) => setDistance(e.target.value)}
      >
        {courses.map((course) => (
          <option key={course.course.uid} value={course.course.uid}>
            {course.course.name}
          </option>
        ))}
      </select>
      <Container>
        <Scorecard>
          {course.holes?.map((hole, index) => {
            return (
              <ScorecardRow key={index}>
                <p>{hole.no}</p>
                <p>{hole.par}</p>
                <p>{hole.hcp}</p>
                <Input
                  placeholder="Score"
                  type="number"
                  onChange={(e) => handleScoreChange(e, hole.no)}
                />
              </ScorecardRow>
            );
          })}
        </Scorecard>
      </Container>
    </FormContainer>
  );
};

export default AddScore;
