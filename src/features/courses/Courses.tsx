import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import { fetchCoursesList } from "./coursesSlice";

import CourseCard from "./CourseCard";
import SpinnerComp from "../../components/Spinner";

import { Row, Form, Col } from "react-bootstrap";

const Courses = () => {
  const dispatch = useDispatch();
  const courses = useAppSelector((state) => state.courses.courses);
  const loading = useAppSelector((state) => state.courses.loading);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCoursesList());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <SpinnerComp />
      ) : (
        <section className="courses-cards">
          <section className="courses-cards__search">
            <Form.Group as={Row} controlId="formGridEmail">
              <Form.Label column sm={2}>
                Platz suchen
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  className="courses-cards__search-input"
                  type="text"
                  placeholder="Platz suchen..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
          </section>
          <div className="container">
            <Row xs={1} md={2} className="g-4">
              {courses
                .filter((value) => {
                  if (searchTerm === "") {
                    return value;
                  } else if (
                    value.course.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((course, i) => {
                  return (
                    <CourseCard
                      key={i}
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
