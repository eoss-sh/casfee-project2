import React from 'react'
import { useAppSelector } from '../../helpers/hooks';
import { NavLink } from 'react-router-dom'
import { Container } from '../../styles/styles'
import './Header.css'


export default function Header() {

    const currentUser = useAppSelector((state) => state.auth.user);

    return (
      <header>
        <Container>
          <nav className="main-nav">
            <section className="main-nav_logo">
              <NavLink exact to="/">
                BirdieBook
              </NavLink>
            </section>
            <section className="main-nav_links">
              {!currentUser.uid && (
                <>
                  <NavLink
                    className="button button-primary"
                    exact
                    to="/register"
                  >
                    Registrieren
                  </NavLink>
                  <NavLink
                    className="button button-secondary"
                    exact
                    to="/login"
                  >
                    LogIn
                  </NavLink>
                </>
              )}
              {currentUser.admin && <NavLink to="/">Kurse erfassen</NavLink>}
              {currentUser.uid && (
                <NavLink exact to="/profile">
                  <img className="main-nav__profile-image" src={currentUser.url} alt="name" />
                </NavLink>
              )}
            </section>
          </nav>
        </Container>
      </header>
    );
}
