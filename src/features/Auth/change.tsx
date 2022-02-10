import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import ErrorText from "../../components/ErrorText";
import { auth } from "../../config/firebase";
import logging from "../../config/logging";
import { Form, Col, InputGroup, Row } from "react-bootstrap";
import { BiShowAlt } from "react-icons/bi";

const ChangePwPage = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [passwordShow, setPasswordShow] = useState<boolean>(false);

  const history = useHistory();

  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  const changePassword = () => {
    if (error !== "") setError("");

    const user = auth.currentUser;
    user
      ?.updatePassword(newPassword)
      .then(() => {
        logging.info("Passwort gäendert.");
        history.push("/login");
      })
      .catch((error) => {
        logging.error(error);
        if (error.code.includes("auth/wrong-password")) {
          setError("Das angegebene Passwort ist nicht korrekt.");
        } else if (error.code.includes("auth/weak-password")) {
          setError("Bitte verwenden Sie ein strengeres Passwort.");
        } else if (error.code.includes("auth/user-not-found")) {
          setError("Die eingegebene Email-Adresse existierst nicht.");
        } else {
          setError(
            "Im Moment können Sie sich nicht anmelden. Bitte probieren Sie es später wieder."
          );
        }
      });
  };
  return (
    <section className="password-change">
      <div className="container">
        <Row xs={1} lg={2} className="password-change__input-row">
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Neues Passwort</Form.Label>
            <InputGroup>
              <Form.Control
                type="password"
                placeholder="Neues Passwort"
                onChange={(event) => setNewPassword(event.target.value)}
                value={newPassword}
              />
              <InputGroup.Text>
                <BiShowAlt onClick={togglePassword} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Button
            className="btn-primary__change"
            onClick={() => changePassword()}
          >
            Passwort ändern
          </Button>
        </Row>
        <ErrorText error={error} />
      </div>
    </section>
  );
};

export default ChangePwPage;
