import styled from "styled-components";
import { ContainerStyles } from "./styles";
import { device } from "./grid";
import { Link } from "react-router-dom";

export const ScoresContainer = styled.section`
  ${ContainerStyles}
  margin-top: 5%;
`;

export const SingleScore = styled(Link)`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 2rem 0;
  color: var(--dark-grey);
  text-decoration: none;
  :hover {
    background-color: var(--dark-blue);
    color: var(--white);
  }

  @media ${device.l} {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
    padding: 0.5% 0;
  }
`;

export const BestScore = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const HoleList = styled.section`
  ${ContainerStyles}
  display: flex;
  flex-flow: column;
  margin-top: 5%;
`;

export const Hole = styled.article`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 20px;
  align-items: center;
  position: relative;
  height: 50px;
  padding-left: 70px;
  margin-bottom: 2%;
`;

export const TrophyIcon = styled.h1`
  font-size: 5rem;
  text-align: center;
  color: var(--yellow);
`;