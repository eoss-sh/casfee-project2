import styled from "styled-components";
import { device } from "./grid";

export const HeaderSection = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 4rem;
  background-color: var(--dark-blue);
`;

export const MainNav = styled.nav`
  display: grid;
  grid-template-columns: 1fr 3fr;
  position: relative;
`;

export const MainNavLogo = styled.section`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
`;

export const MainNavLinks = styled.ul`
  display: flex;
  flex-flow: column;
  position: absolute;
  top: 3rem;
  right: -2.5%;
  padding: 2rem 2rem;
  background-color: var(--dark-blue);
  @media ${device.m} {
    justify-content: flex-end;
    align-items: center;
    flex-flow: row;
    gap: 50px;
    position: relative;
    top: 0;
    padding: 0;
  }
`;

export const MainNavLink = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  height: 3rem;
`;

export const MainNavProfileImage = styled.img`
  height: 50px;
  border-radius: 50%;
`;

export const MobileNav = styled.nav`
  display: flex;
  flex-flow: row-reverse;
  gap: 1rem;
`;

export const Hamburger = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  color: var(--white);
  cursor: pointer;
  font-size: 1.5rem;
`;
