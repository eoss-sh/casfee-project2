import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container } from '../../styles/styles'
import './Header.css'

export default function Header() {
    return (
        <header>
            <Container>
                <nav className="main-nav">
                    <section className="main-nav_logo">
                        <p>BirdieBook</p>
                    </section>
                    <section className="main-nav_links">
                        <NavLink
                            exact
                            to="/"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            exact
                            to="/about"
                        >
                            About
                        </NavLink>
                         <NavLink
                            exact
                            to="/register"
                        >
                            Registrieren
                        </NavLink>
                         <NavLink
                            exact
                            to="/login"
                        >
                            LogIn
                        </NavLink>
                    </section>
                </nav>
            </Container>        
        </header>
        
    )
}
