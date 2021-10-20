import React, {useEffect} from 'react'
import { fetchCoursesList } from './coursesSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../helpers/hooks';

const Courses = () => {
  const dispatch = useDispatch(); 
  const courses = useAppSelector((state) => state.courses.courses);

  useEffect(() => {
    dispatch(fetchCoursesList())
  }, [dispatch])

  return (
      <div>
        <h1>Golfplätze der Schweiz</h1>
        {courses.map((course)=> {
          console.log(course)
          return <p>{course}</p>
        })}
      </div>
  )
  
};

export default Courses;