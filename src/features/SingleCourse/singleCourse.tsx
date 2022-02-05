import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Hero from "../../components/Hero";
import { useAppSelector } from "../../helpers/hooks";
import ScoreCard from "./scoreCard";
import { fetchCourse } from "./singleCourseSlice";
import BestScores from "../Scores/BestScores";
import ParamTypes from "../../interfaces/params";
import {
  CourseDescription,
  CourseTwoColumnsSection,
} from "../../styles/course";
import { Container } from "../../styles/styles";

const SingleCourse = () => {
  const { id } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const data = useAppSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchCourse(id));
  }, [dispatch, id]);

  return (
    <>
      <Hero title={data.course.name} image={data.course.url} />
      <Container>
        <CourseDescription>{data.course.desc}</CourseDescription>
        <CourseTwoColumnsSection>
          <ScoreCard id={id} />
          <BestScores />
        </CourseTwoColumnsSection>
      </Container>
    </>
  );
};

export default SingleCourse;
