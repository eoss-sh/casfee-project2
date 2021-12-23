import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorText from "../../components/ErrorText";
import TwoColumnImage from "../../components/TwoColumnImage";
import Uploader from "../../components/Uploader";
import { auth, database } from "../../config/firebase";
import logging from "../../config/logging";
import { MainButton, MainLinkText } from "../../styles/buttons";
import { FormContainer, Input, Label } from "../../styles/forms";
import { Icon } from "../../styles/elements";
import { SmallText } from "../../styles/type";
import introImage from "../../assets/login.jpg";

const RegisterPage = () => {
  const [registering, setRegistering] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [hcp, setHcp] = useState<number>();
  const [image, setImage] = useState<File>();
  const [url, setUrl] = useState<String>("");
  const [error, setError] = useState<string>("");

  const history = useHistory();
  const types = ["image/png", "image/jpeg"];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && types.includes(event.target.files[0].type)) {
      setImage(event.target.files[0]);
    }
  };

  const signUpWithEmailAndPassword = () => {
    if (password !== confirm) {
      setError("Die eingegebenen Passwörter stimmen nicht überein.");
      return;
    }
    if (error !== "") setError("");

    setRegistering(true);

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        return database.collection("appUser").doc(result.user?.uid).set({
          hcp,
          url,
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
    <TwoColumnImage image={introImage}>
      <FormContainer>
        <h2>Registrierung</h2>
        <Input
          large
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <Input
          large
          type="password"
          name="password"
          id="password"
          placeholder="Passwort"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <Input
          large
          type="password"
          name="confirm"
          id="confirm"
          placeholder="Passwort bestätigen"
          onChange={(event) => setConfirm(event.target.value)}
          value={confirm}
        />
        <Input
          large
          type="number"
          step="0.1"
          name="hcp"
          id="hcp"
          placeholder="Handicap"
          onChange={(event) => setHcp(parseFloat(event.target.value))}
          value={hcp}
        />
        <Label htmlFor="userImage">
          <Icon>+</Icon>Bild hinzufügen
        </Label>
        <Input
          large
          type="file"
          name="userImage"
          id="userImage"
          placeholder="Bild"
          onChange={handleFileUpload}
        />
        {image && (
          <Uploader image={image} setImage={setImage} setUrl={setUrl} />
        )}
        <MainButton
          disabled={registering}
          onClick={() => signUpWithEmailAndPassword()}
        >
          Anmelden
        </MainButton>
        <SmallText>
          <p>
            Bereits registriert? <MainLinkText to="/login">Login</MainLinkText>
          </p>
        </SmallText>
        <ErrorText error={error} />
      </FormContainer>
    </TwoColumnImage>
  );
};

export default RegisterPage;
