import styled from "styled-components";
import { device } from "./grid";

export const CourseDescription = styled.section`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 5rem;
  @media ${device.l} {
    width: 60%;
  }
`;

export const CourseTwoColumnsSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr 1fr;
  gap: none;
  @media ${device.l} {
    grid-template-columns: 6fr 4fr;
    grid-auto-rows: 1fr;
    gap: 4rem;
  }
`;
