import styled from "styled-components";
import { ContainerStyles } from "./styles";

export const StatsCotainer = styled.section`
  ${ContainerStyles}
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 5%;
`;

export const Stat = styled.article`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--dark-grey);
  width: 20vw;
  height: 10vh;
`;

export const StatNumber = styled.h1`
  display: flex;
  flex-flow: column;
  font-size: 2rem;
  color: var(--dark-grey);
  text-align: center;
`;
