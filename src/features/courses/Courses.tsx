import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import { Link } from "react-router-dom";
import { fetchCoursesList } from "./coursesSlice";
import Hero from "../../components/Hero";
import SpinnerComp from "../../components/Spinner";
import image from "./images/course1.jpg";
import { Card, Col, Row } from "react-bootstrap";

const Courses = () => {
  const dispatch = useDispatch();
  const courses = useAppSelector((state) => state.courses.courses);
  const loading = useAppSelector((state) => state.courses.loading);

  useEffect(() => {
    dispatch(fetchCoursesList());
  }, [dispatch]);

  return (
    <>
      <Hero
        image={image}
        title="Messen - vergleichen - verbessern"
        subtitle="Verbssere dein Golfspiel mit zuverlässigen Statistiken."
        buttonLink="/register"
        buttonText="Registrieren"
      />
      {loading ? (
        <SpinnerComp />
      ) : (
        <section className="courses-cards">
          <div className="container">
            <Row xs={1} md={2} className="g-4">
              {courses.map((course) => {
                return (
                  <Col key={course.course.uid}>
                    <Card>
                      <Card.Img variant="top" src={course.course.url} />
                      <Card.Body>
                        <Card.Title>{course.course.name}</Card.Title>
                        <Card.Text>{course.course.shortDesc}</Card.Text>
                        <Link
                          className="btn btn-primary"
                          to={`/course/${course.course.uid}`}
                        >
                          Details
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
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
