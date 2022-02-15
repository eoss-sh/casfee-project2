import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import { resetPassword } from "./authSlice";
import { Button, Form, FloatingLabel, Alert } from "react-bootstrap";

const ForgotPwPage = () => {
  const [email, setEmail] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const dispatch = useDispatch();
  const error = useAppSelector((state) => state.auth.user.error);

  const handleResetPassword = () => {
    dispatch(resetPassword(email));
  };

  useEffect(() => {
    if (error) {
      setShow(true);
    }
  }, [error]);

  return (
    <div className="container">
      <section className="form form-auth form-auth__login">
        <h2>Passwort zurücksetzen</h2>
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
        </Form.Group>
        <small className="reset-password">
          <Link to="/login">Login</Link>
        </small>
        <Button
          id="login"
          variant="primary"
          className="btn-primary__login"
          onClick={() => handleResetPassword()}
        >
          Passwort zurücksetzen
        </Button>
        <div className="or-seperator">
          <span className="or-seperator__text">oder</span>
        </div>
        <Link
          className="btn btn-secondary btn-secondary__register"
          to="/register"
        >
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

export default ForgotPwPage;
