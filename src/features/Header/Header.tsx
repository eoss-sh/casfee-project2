import { useAppSelector } from "../../helpers/hooks";
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Header() {
  const currentUser = useAppSelector((state) => state.auth.user);

  return (
    <>
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="md"
        bg="primary"
        variant="dark"
      >
        <div className="container">
          <LinkContainer exact to="/">
            <Navbar.Brand>BirdieBook</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              {!currentUser.uid && (
                <>
                  <Nav.Item>
                    <LinkContainer to="register">
                      <Button variant="secondary">Registrieren</Button>
                    </LinkContainer>
                  </Nav.Item>
                  <Nav.Item>
                    <LinkContainer to="login">
                      <Button variant="primary">Login</Button>
                    </LinkContainer>
                  </Nav.Item>
                </>
              )}
              {currentUser.admin && (
                <Nav.Item>
                  <LinkContainer to="add-course">
                    <Nav.Link>Kurse erfassen</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              )}
              {currentUser.uid && (
                <>
                  <Nav.Item>
                    <LinkContainer to="scores">
                      <Nav.Link>Scores</Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                  <Nav.Item>
                    <LinkContainer to="statistics">
                      <Nav.Link>Statistik</Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                  <Nav.Item>
                    <LinkContainer to="add-score">
                      <Button variant="secondary">Play</Button>
                    </LinkContainer>
                  </Nav.Item>
                  <NavDropdown
                    title={
                      <img
                        className="nav-profile__image"
                        src={currentUser.url}
                        alt={currentUser.name}
                      />
                    }
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item>
                      <LinkContainer to="profile">
                        <Nav.Link>User Profil</Nav.Link>
                      </LinkContainer>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <LinkContainer to="profile">
                        <Nav.Link>User Profil</Nav.Link>
                      </LinkContainer>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
}
