import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import { fetchCoursesList } from "./coursesSlice";

import CourseCard from "./CourseCard";
import SpinnerComp from "../../components/Spinner";

import { Row } from "react-bootstrap";

const Courses = () => {
  const dispatch = useDispatch();
  const courses = useAppSelector((state) => state.courses.courses);
  const loading = useAppSelector((state) => state.courses.loading);

  useEffect(() => {
    dispatch(fetchCoursesList());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <SpinnerComp />
      ) : (
        <section className="courses-cards">
          <div className="container">
            <Row xs={1} md={2} className="g-4">
              {courses.map((course) => {
                return (
                  <CourseCard
                    id={course.course.uid}
                    url={course.course.url}
                    name={course.course.name}
                    shortDesc={course.course.shortDesc}
                  />
                );
              })}
            </Row>
          </div>
        </section>
      )}
    </>
  );
};

export default Courses;
