import { useState, useEffect } from "react";
import { useAppSelector } from "../../helpers/hooks";
import { NavLink } from "react-router-dom";
import { Container } from "../../styles/styles";
import {
  MainLink,
  NavButtonLink,
  NavButtonLinkSecondary,
  NaviLink,
} from "../../styles/buttons";
import {
  Hamburger,
  HeaderSection,
  MainNav,
  MainNavLinks,
  MainNavLink,
  MainNavLogo,
  MainNavProfileImage,
  MobileNav,
} from "../../styles/header";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";

export default function Header() {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const setWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", setWidth);
    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, []);

  const toggleMenuFunc = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <HeaderSection>
      <Container>
        <MainNav>
          <MainNavLogo>
            <NaviLink exact to="/">
              BirdieBook
            </NaviLink>
          </MainNavLogo>
          {(toggleMenu || screenWidth > 768) && (
            <MainNavLinks>
              {!currentUser.uid && (
                <>
                  <MainNavLink>
                    <NavButtonLinkSecondary exact to="/register">
                      Registrieren
                    </NavButtonLinkSecondary>
                  </MainNavLink>
                  <MainNavLink>
                    <NavButtonLink exact to="/login">
                      LogIn
                    </NavButtonLink>
                  </MainNavLink>
                </>
              )}
              {currentUser.admin && (
                <MainNavLink>
                  <NaviLink to="/add-course">Kurse erfassen</NaviLink>
                </MainNavLink>
              )}
              {currentUser.uid && (
                <>
                  <MainNavLink>
                    <NaviLink to="/scores">Scores</NaviLink>
                  </MainNavLink>
                  {screenWidth > 768 && (
                    <MainNavLink>
                      <NavButtonLinkSecondary to="/add-score">
                        Play
                      </NavButtonLinkSecondary>
                    </MainNavLink>
                  )}
                  <MainNavLink>
                    <NavLink exact to="/profile">
                      <MainNavProfileImage
                        className="main-nav__profile-image"
                        src={currentUser.url}
                        alt="name"
                      />
                    </NavLink>
                  </MainNavLink>
                </>
              )}
            </MainNavLinks>
          )}
          {screenWidth < 768 && (
            <MobileNav>
              <Hamburger onClick={toggleMenuFunc}>
                {toggleMenu ? <VscChromeClose /> : <GiHamburgerMenu />}
              </Hamburger>
              <NavButtonLinkSecondary to="/add-score">
                Play
              </NavButtonLinkSecondary>
            </MobileNav>
          )}
        </MainNav>
      </Container>
    </HeaderSection>
  );
}
