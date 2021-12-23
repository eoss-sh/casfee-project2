import styled from "styled-components";

export const HeroContainer = styled.section`
  display: flex;
  align-items: flex-end;
  width: 100vw;
  height: 60vh;
  padding: 10%;
  margin-bottom: 5%;
  background: rgba(35, 61, 77, 0.6);
`;

export const HeroImage = styled.img`
  position: absolute;
  top: 4rem;
  left: 0;
  z-index: -9;
  height: 60vh;
  width: 100vw;
  object-fit: cover;
`;
export const HeroTitel = styled.h1`
  font-size: 3rem;
  color: var(--white);
`;

export const HeroSubTitel = styled.h4`
  font-size: 1rem;
  color: var(--white);
  margin-bottom: 2%;
`;

export const SmallHeroContainer = styled.section`
  display: flex;
  justify-content: center;
  height: 20vh;
  background-color: var(--dark-blue);
`;

export const SmallHeroContent = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  height: 100%;
`;
