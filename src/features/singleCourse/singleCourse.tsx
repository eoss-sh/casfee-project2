import React, {useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../helpers/hooks';
import {fetchCourse} from './singleCourseSlice'

interface ParamTypes {
  id: string
}

const SingleCourse = () => {
  const {id} = useParams<ParamTypes>()
  const dispatch = useDispatch();
  const course = useAppSelector((state) => state.course);


  useEffect(() => {
    dispatch(fetchCourse(id));
  }, [dispatch, id]);

  return (
    <>
     <h1>{course.course.name}</h1>
    </>
  );
};

export default SingleCourse;
