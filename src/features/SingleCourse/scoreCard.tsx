import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import { Table } from "react-bootstrap";
import { fetchCourse } from "./singleCourseSlice";
import { BsTrophy } from "react-icons/bs";

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
    <Table responsive>
      <thead>
        <tr>
          <th>Nr.</th>
          <th>Par</th>
          <th>HCP</th>
          <th>
            Männer <BsTrophy />
          </th>
          <th>Männer</th>
          <th>
            Frauen <BsTrophy />
          </th>
          <th>Frauen</th>
        </tr>
      </thead>
      <tbody>
        {data.course.holes?.map((hole, index) => {
          return (
            <tr key={index}>
              <td>{hole.no}</td>
              <td>{hole.par}</td>
              <td>{hole.hcp}</td>
              <td>{hole.dist1}m</td>
              <td>{hole.dist2}m</td>
              <td>{hole.dist3}m</td>
              <td>{hole.dist4}m</td>
            </tr>
          );
        })}
        <tr>
          <td>Total</td>
          <td>{getTotal("par")}</td>
          <td></td>
          <td>{getTotal("dist1")}m</td>
          <td>{getTotal("dist2")}m</td>
          <td>{getTotal("dist3")}m</td>
          <td>{getTotal("dist4")}m</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ScoreCard;
