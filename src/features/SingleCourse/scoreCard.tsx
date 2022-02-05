import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import {
  Scorecard,
  ScorecardRow,
  ScorecardTitel,
  ScorecardTitelRow,
  ScorecardTotalRow,
} from "../../styles/scorecard";
import { fetchCourse } from "./singleCourseSlice";
interface scoreCardProps {
  id: string;
}

const ScoreCard = ({ id }: scoreCardProps) => {
  const dispatch = useDispatch();
  const data = useAppSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchCourse(id));
  }, [dispatch, id]);

  // function to get Total distance of each item
  const getTotal = (parameter: any) =>
    data.course.holes?.reduce((acc, hole: any) => {
      return acc + hole[parameter];
    }, 0);

  return (
    <Scorecard>
      <ScorecardTitelRow columnsAmount={7}>
        <ScorecardTitel>No.</ScorecardTitel>
        <ScorecardTitel>Par</ScorecardTitel>
        <ScorecardTitel>HCP</ScorecardTitel>
        <ScorecardTitel>Distanz 1</ScorecardTitel>
        <ScorecardTitel>Distanz 2</ScorecardTitel>
        <ScorecardTitel>Distanz 3</ScorecardTitel>
        <ScorecardTitel>Distanz 4</ScorecardTitel>
      </ScorecardTitelRow>
      {data.course.holes?.map((hole, index) => {
        return (
          <ScorecardRow key={index} columnsAmount={7}>
            <p>{hole.no}</p>
            <p>{hole.par}</p>
            <p>{hole.hcp}</p>
            <p>{hole.dist1}</p>
            <p>{hole.dist2}</p>
            <p>{hole.dist3}</p>
            <p>{hole.dist4}</p>
          </ScorecardRow>
        );
      })}
      <ScorecardTotalRow columnsAmount={7}>
        <ScorecardTitel></ScorecardTitel>
        <ScorecardTitel>{getTotal("par")}</ScorecardTitel>
        <ScorecardTitel></ScorecardTitel>
        <ScorecardTitel>{getTotal("dist1")}</ScorecardTitel>
        <ScorecardTitel>{getTotal("dist2")}</ScorecardTitel>
        <ScorecardTitel>{getTotal("dist3")}</ScorecardTitel>
        <ScorecardTitel>{getTotal("dist4")}</ScorecardTitel>
      </ScorecardTotalRow>
    </Scorecard>
  );
};

export default ScoreCard;
