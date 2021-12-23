import styled from "styled-components";
import { device } from "./grid";

export const CourseListe = styled.section`
  display: flex;
  flex-flow: column;
  gap: 5%;

  @media ${device.l} {
    flex-flow: row wrap;
  }
`;

export const SingelCourseCard = styled.section`
  flex: 47.5%;
`;
export const SingelCourseCardImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

export const SingelCourseCardDescription = styled.p`
  height: 5rem;
`;
