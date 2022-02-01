import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginWithUsernameAndPassword } from "./authSlice";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FloatingLabel } from "react-bootstrap";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();
  const history = useHistory();

  const logInEmailPassword = () => {
    if (error !== "") setError("");
    dispatch(loginWithUsernameAndPassword({ email, password }));
    history.push("/");
  };

  return (
    <section className="container">
      <h2>LogIn</h2>
      <Form.Group>
        <FloatingLabel label="Email-Adresse" className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel label="Passwort" className="mb-3">
          <Form.Control
            type="password"
            placeholder="Passwort"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </FloatingLabel>
      </Form.Group>
      <Button variant="primary" onClick={() => logInEmailPassword()}>
        Anmelden
      </Button>
      <small>
        Noch nicht registriert?
        <Link to="/register">Jetzt registrieren!</Link>
      </small>
    </section>
  );
};

export default LoginPage;
