import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import { changePassword, resetError } from "./authSlice";
import { Form, Col, InputGroup, Row, Button, Alert } from "react-bootstrap";
import { BiShowAlt } from "react-icons/bi";

const ChangePwPage = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [showPasswordAlert, setShowPasswordAlert] = useState<boolean>(false);

  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  const handleChangePassword = () => {
    dispatch(changePassword(newPassword));
  };

  const handleCloseModal = () => {
    dispatch(resetError());
    setShowPasswordAlert(false);
    setNewPassword("");
  };

  useEffect(() => {
    if (user.error) {
      setShowPasswordAlert(true);
    }
  }, [user.error]);

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
            onClick={() => handleChangePassword()}
          >
            Passwort ändern
          </Button>
        </Row>
        {showPasswordAlert && (
          <Alert
            variant="danger"
            onClose={() => handleCloseModal()}
            dismissible
          >
            {user.error}
          </Alert>
        )}
      </div>
    </section>
  );
};

export default ChangePwPage;
