import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Uploader from "../../components/Uploader";
import { auth, database } from "../../config/firebase";
import logging from "../../config/logging";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Alert, Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { BiShowAlt } from "react-icons/bi";

const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [hcp, setHcp] = useState<number>(0);
  const [image, setImage] = useState<File>();
  const [url, setUrl] = useState<string>(
    "https://firebasestorage.googleapis.com/v0/b/birdiebook-c8af5.appspot.com/o/golfer-gd2c89f964_1280.png?alt=media&token=9489c1f6-1ead-481a-a9a3-8442551e8071"
  );
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const history = useHistory();
  const types = ["image/png", "image/jpeg", "image/jpg"];

  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && types.includes(event.target.files[0].type)) {
      setImage(event.target.files[0]);
    }
  };

  const signUpWithEmailAndPassword = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        return database.collection("appUser").doc(result.user?.uid).set({
          hcp,
          url,
          name,
          email,
        });
      })
      .then((result) => {
        logging.info(result);
        history.push("/login");
      })
      .catch((err) => {
        const msg = err + "";
        if (msg.includes("auth/weak-password")) {
          setError("Bitte verwenden Sie ein strengeres Passwort.");
        } else if (msg.includes("auth/email-already-in-use")) {
          setError("Die eingegebene Email-Adresse wird bereits verwendet.");
        } else {
          setError(
            "Im Moment können Sie sich nicht anmelden. Bitte probieren Sie es später wieder."
          );
        }
        logging.error(msg);
      });
  };

  useEffect(() => {
    if (error) {
      setShow(true);
    }
  }, [error]);

  return (
    <div className="container">
      <section className="form form-auth form-auth__register">
        <h2>Registrierung</h2>
        <Form>
          <Row xs={1} lg={2}>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                data-test="register-email"
                type="email"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Passwort</Form.Label>
              <InputGroup>
                <Form.Control
                  data-test="register-pw"
                  type={passwordShow ? "text" : "password"}
                  placeholder="Passwort"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                />
                <InputGroup.Text>
                  <BiShowAlt onClick={togglePassword} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row xs={1} lg={2}>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Name (empfohlen)</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                />
              </InputGroup>
              <Form.Text className="text-muted">
                Um Ihren User in Ranglisten zu erkennen, empfehlen wir Ihnen
                einen Namen anzugeben.
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Handicap (empfohlen)</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Handicap"
                onChange={(event) => setHcp(parseFloat(event.target.value))}
                value={hcp}
              />
              <Form.Text className="text-muted">
                Um Ihre Spielstärke in die Bewertung einzubeziehen, empfehlen
                wir ein realistisches Handicap anzugeben.
              </Form.Text>
            </Form.Group>
          </Row>
          <Row xs={1} lg={2}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Profilbild</Form.Label>
              <Form.Control type="file" onChange={handleFileUpload} />
              {image && (
                <Uploader image={image} setImage={setImage} setUrl={setUrl} />
              )}
            </Form.Group>
          </Row>
          <Button
            variant="secondary"
            className="btn-secondary__register"
            onClick={() => signUpWithEmailAndPassword()}
          >
            Registrieren
          </Button>
        </Form>
        <div className="or-seperator">
          <span className="or-seperator__text">oder</span>
        </div>
        <Link className="btn btn-primary btn-primary__login" to="/login">
          Login
        </Link>
        {show && (
          <Alert
            data-test="register-alert"
            variant="danger"
            className="alert"
            onClose={() => {
              setShow(false);
              setError("");
            }}
            dismissible
          >
            {error}
          </Alert>
        )}
      </section>
    </div>
  );
};

export default RegisterPage;
