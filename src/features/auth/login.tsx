import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import { loginWithUsernameAndPassword } from "./authSlice";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FloatingLabel, Alert } from "react-bootstrap";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const error = useAppSelector((state) => state.auth.user.error);
  const user = useAppSelector((state) => state.auth.user.uid);

  const logInEmailPassword = () => {
    dispatch(loginWithUsernameAndPassword({ email, password }));
  };

  useEffect(() => {
    if (error) {
      setShow(true);
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      history.push("/statistics");
    }
  }, [user, history]);

  return (
    <div className="container">
      <section className="form form-login">
        <h2>Willkommen zurück</h2>
        <Form.Group>
          <FloatingLabel label="Email-Adresse" className="mb-3">
            <Form.Control
              data-test="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="Passwort" className="mb-3">
            <Form.Control
              data-test="password"
              type="password"
              placeholder="Passwort"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </FloatingLabel>
        </Form.Group>
        <small className="reset-password">
          <Link to="/register">Passwort vergessen?</Link>
        </small>
        <Button
          id="login"
          variant="primary"
          className="btn-primary__login"
          onClick={() => logInEmailPassword()}
        >
          Anmelden
        </Button>
        <div className="or-seperator">
          <span className="or-seperator__text">oder</span>
        </div>
        <Link className="btn btn-secondary btn-secondary__login" to="/register">
          Registrieren
        </Link>
        {show && (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            {error}
          </Alert>
        )}
      </section>
    </div>
  );
};

export default LoginPage;
