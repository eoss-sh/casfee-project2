import styled from "styled-components";
import { device } from "./grid";

interface ScorecardProps {
  columnsAmount: number;
}

interface ScoreCardTitelProps {
  showMobile?: boolean;
}

export const Scorecard = styled.section`
  display: flex;
  flex-flow: column;
`;

export const ScorecardHeader = styled.header``;

export const ScorecardTitelRow = styled.div<ScorecardProps>`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 2%;
  @media ${device.l} {
    grid-auto-rows: 1fr;
    grid-template-columns: ${({ columnsAmount }) =>
      `repeat(${columnsAmount}, 1fr)`};
    background-color: var(--light-grey);
    margin-bottom: 2%;
  }
`;
export const ScorecardTitel = styled.p<ScoreCardTitelProps>`
  font-size: 1rem;
  font-weight: normal;
  display: ${(props: ScoreCardTitelProps) =>
    props.showMobile ? "block" : "none"};
  @media ${device.l} {
    font-size: 1.5rem;
    font-weight: bold;
    display: block;
  }
`;
export const ScorecardRow = styled.div<ScorecardProps>`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 10%;
  @media ${device.l} {
    grid-template-rows: 1fr;
    grid-template-columns: ${({ columnsAmount }) =>
      `repeat(${columnsAmount}, 1fr)`};
    margin-bottom: 1%;
  }
`;

export const ScorecardTotalRow = styled.div<ScorecardProps>`
  display: grid;
  grid-template-columns: ${({ columnsAmount }) =>
    `repeat(${columnsAmount}, 1fr)`};
  background-color: var(--light-grey);
  margin-top: 2%;
`;
