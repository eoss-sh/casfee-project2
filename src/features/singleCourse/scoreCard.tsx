import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../helpers/hooks';
import {
  Scorecard,
  ScorecardRow,
  ScorecardTitel,
  ScorecardTitelRow,
} from '../../styles/scorecard';
import { Container } from '../../styles/styles';
import { fetchCourse } from './singleCourseSlice';

interface scoreCardProps {
    id: string;
}

const ScoreCard = ({id}: scoreCardProps) => {
  const dispatch = useDispatch();
  const data = useAppSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchCourse(id));
  }, [dispatch, id]);

  return (
      <Container>
        <Scorecard>
          <ScorecardTitelRow>
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
              <ScorecardRow key={index}>
                <p>{hole.no}</p>
                <p>{hole.data.par}</p>
                <p>{hole.data.hcp}</p>
                <p>{hole.data.dist1}</p>
                <p>{hole.data.dist2}</p>
                <p>{hole.data.dist3}</p>
                <p>{hole.data.dist4}</p>
              </ScorecardRow>
            );
          })}
        </Scorecard>
      </Container>
  );
};

export default ScoreCard;
