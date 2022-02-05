import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import { fetchCoursesList } from "./coursesSlice";
import Hero from "../../components/Hero";
import image from "./images/course1.jpg";
import SingleCourseCard from "../SingleCourse/singleCourseCard";
import { CourseListe } from "../../styles/courses";
import { Container } from "../../styles/styles";

const Courses = () => {
  const dispatch = useDispatch();
  const courses = useAppSelector((state) => state.courses.courses);

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
      <Container>
        <h2>Golfplätze der Schweiz</h2>
        <CourseListe>
          {courses.map((course) => {
            return (
              <SingleCourseCard
                key={course.course.uid}
                name={course.course.name}
                shortDesc={course.course.shortDesc}
                id={course.course.uid}
                url={course.course.url}
              />
            );
          })}
        </CourseListe>
      </Container>
    </>
  );
};

export default Courses;
