import styled from 'styled-components';
import {NavLink, Link} from 'react-router-dom'

const baseButtonStyle = `
    padding: 10px 30px;
    border-radius: 30px;
    text-decoration: none;
    cursor: pointer;
`;

const mainButtonStyle = `
    border: 1px solid var(--light-blue);
    background-color: var(--light-blue);
    color: var(--white);
    :hover {
        background-color: transparent;
        color: var(--light-blue);
    }
`;

const secondaryButtonStyle = `
    border: 1px solid var(--yellow);
    background-color: var(--yellow);
    color: var(--white);
    :hover {
        background-color: transparent;
        color: var(--yellow);
    }
`;

export const MainButton = styled.button`
    ${baseButtonStyle}
    ${mainButtonStyle}
`;
export const SecondaryButton = styled.button`
  ${baseButtonStyle}
  ${secondaryButtonStyle}
`;
export const MainLink = styled.a`
    ${baseButtonStyle}
    ${mainButtonStyle}
`;
export const NavButtonLink = styled(NavLink)`
    ${baseButtonStyle}
    ${mainButtonStyle}
`;
export const NavButtonLinkSecondary = styled(NavLink)`
    ${baseButtonStyle}
    ${secondaryButtonStyle}
`;
export const MainLinkText = styled(Link)`
    text-decoration: none;
    color: var(--dark-blue);
`
export const SecondaryLinkText = styled(Link)`
    text-decoration: none;
    color: var(--yellow);
`