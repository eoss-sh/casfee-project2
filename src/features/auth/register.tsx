import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import ErrorText from "../../components/ErrorText";
import Uploader from "../../components/Uploader";
import { auth, database } from "../../config/firebase";
import logging from "../../config/logging";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
import { BiShowAlt } from "react-icons/bi";

const RegisterPage = () => {
  const [registering, setRegistering] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [hcp, setHcp] = useState<number>(0);
  const [image, setImage] = useState<File>();
  const [url, setUrl] = useState<String>(
    "https://firebasestorage.googleapis.com/v0/b/birdiebook-c8af5.appspot.com/o/golfer-gd2c89f964_1280.png?alt=media&token=9489c1f6-1ead-481a-a9a3-8442551e8071"
  );
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");

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
    if (name === "") {
      setError("Bitte gib deinen Namen an.");
      return;
    }
    if (hcp > 45) {
      setError("Bitte gib ein korrektes Handicap an.");
    }
    if (error !== "") setError("");

    setRegistering(true);

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        return database.collection("appUser").doc(result.user?.uid).set({
          hcp,
          url,
          name,
        });
      })
      .then((result) => {
        logging.info(result);
        history.push("/login");
      })
      .catch((error) => {
        logging.error(error);

        if (error.code.includes("auth/weak-password")) {
          setError("Bitte verwenden Sie ein strengeres Passwort.");
        } else if (error.code.includes("auth/email-already-in-use")) {
          setError("Die eingegebene Email-Adresse wird bereits verwendet.");
        } else {
          setError(
            "Im Moment können Sie sich nicht anmelden. Bitte probieren Sie es später wieder."
          );
        }

        setRegistering(false);
      });
  };

  return (
    <div className="container">
      <section className="form form-register">
        <h2>Registrierung</h2>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Passwort</Form.Label>
          <InputGroup>
            <Form.Control
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
        <Form.Group className="mb-3">
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
            Um Ihren User in Ranglisten zu erkennen, empfehlen wir Ihnen einen
            Namen anzugeben.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Handicap (empfohlen)</Form.Label>
          <Form.Control
            type="number"
            step="0.1"
            placeholder="Handicap"
            onChange={(event) => setHcp(parseFloat(event.target.value))}
            value={hcp}
          />
          <Form.Text className="text-muted">
            Um Ihre Spielstärke in die Bewertung einzubeziehen, empfehlen wir
            ein realistisches Handicap anzugeben.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Profilbild</Form.Label>
          <Form.Control type="file" onChange={handleFileUpload} />
          {image && (
            <Uploader image={image} setImage={setImage} setUrl={setUrl} />
          )}
        </Form.Group>
        <Button
          variant="primary"
          className="btn-primary__login"
          disabled={registering}
          onClick={() => signUpWithEmailAndPassword()}
        >
          Anmelden
        </Button>
        <small>
          <p>
            Bereits registriert? <Link to="/login">Login</Link>
          </p>
        </small>
        <ErrorText error={error} />
      </section>
    </div>
  );
};

export default RegisterPage;
