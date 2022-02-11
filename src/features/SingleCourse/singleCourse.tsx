import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Hero from "../../components/Hero";
import { useAppSelector } from "../../helpers/hooks";
import ScoreCard from "./scoreCard";
import { fetchCourse } from "./singleCourseSlice";
import BestScores from "../Scores/BestScores";
import ParamTypes from "../../interfaces/params";

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
      <div className="container">
        <section className="singlecourse">
          <p className="singlecourse-description">{data.course.desc}</p>
        </section>
        <section className="singlecourse-stats">
          <ScoreCard id={id} />
          <BestScores />
        </section>
      </div>
    </>
  );
};

export default SingleCourse;
