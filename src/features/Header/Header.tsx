import { useState } from "react";
import { useAppSelector } from "../../helpers/hooks";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../Auth/authSlice";
import ConfirmModal from "../../components/ConfirmModal";
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { BsHandThumbsUp } from "react-icons/bs";

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const [showModal, setShowModal] = useState(false);

  const logoutofApp = () => {
    dispatch(logout());
    setShowModal(false);
    history.push("/login");
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="md"
        bg="theme"
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
                    <LinkContainer to="/register">
                      <Button variant="secondary">Registrieren</Button>
                    </LinkContainer>
                  </Nav.Item>
                  <Nav.Item>
                    <LinkContainer to="/login">
                      <Button variant="primary">Login</Button>
                    </LinkContainer>
                  </Nav.Item>
                </>
              )}
              {currentUser.admin && (
                <Nav.Item>
                  <LinkContainer to="/add-course">
                    <Nav.Link>Kurse erfassen</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              )}
              {currentUser.uid && (
                <>
                  <Nav.Item>
                    <LinkContainer to="/scores">
                      <Nav.Link>Ergebnisse</Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                  <Nav.Item>
                    <LinkContainer to="/statistics">
                      <Nav.Link>Statistik</Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                  <Nav.Item>
                    <LinkContainer to="/add-score">
                      <Button variant="secondary">Spielen!</Button>
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
                    <Nav.Item>
                      <LinkContainer to="/profile">
                        <Nav.Link>User Profil</Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                    {currentUser.admin && (
                      <Nav.Item>
                        <LinkContainer to="/all-users">
                          <Nav.Link>Alle User</Nav.Link>
                        </LinkContainer>
                      </Nav.Item>
                    )}
                    <Nav.Item>
                      <Button
                        variant="primary"
                        onClick={() => setShowModal(true)}
                      >
                        Log Out
                      </Button>
                    </Nav.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          <ConfirmModal
            title="Log Out"
            message="Möchtest du dich wirklich ausloggen?"
            onClose={() => setShowModal(false)}
            showModal={showModal}
            onConfirm={() => logoutofApp()}
            icon={<BsHandThumbsUp />}
            variant="primary"
          />
        </div>
      </Navbar>
    </>
  );
}
