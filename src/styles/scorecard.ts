import styled from 'styled-components';

export const Scorecard = styled.section`
    display: flex;
    flex-flow: column;
`

export const ScorecardHeader = styled.header``

export const ScorecardTitelRow = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background-color: var(--light-grey);
    margin-bottom: 2%;
`
export const ScorecardTitel = styled.p`
    font-size: 1.5rem;
    font-weight: bold;
`
export const ScorecardRow = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 1%;
`