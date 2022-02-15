import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import { useHistory } from "react-router-dom";
import { updateUserData, deleteUser } from "./authSlice";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import Uploader from "../../components/Uploader";
import ConfirmModal from "../../components/ConfirmModal";
import { BsTrash } from "react-icons/bs";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useAppSelector((state) => state.auth.user);
  const [image, setImage] = useState<File>();
  const [url, setUrl] = useState(user.url);
  const [hcp, setHcp] = useState(user.hcp);
  const [name, setName] = useState(user.name);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [showConfirmAlert, setShowConfirmAlert] = useState<boolean>(false);

  const types = ["image/png", "image/jpeg", "image/jpg"];
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && types.includes(event.target.files[0].type)) {
      setImage(event.target.files[0]);
    }
  };

  const dispatchUpdate = () => {
    dispatch(
      updateUserData({
        id: user.uid,
        name,
        hcp,
        url,
        email,
      })
    );
    setShowConfirmAlert(true);
    history.push("/profile");
  };

  const dispatchDelete = () => {
    dispatch(deleteUser(user.uid));
    history.push("/login");
  };

  return (
    <div className="container">
      <Form>
        <Form.Group className="input-group__user-email">
          <Form.Label>E-Mail</Form.Label>
          <Form.Control
            type="email"
            disabled
            placeholder="Email"
            value={user.email || ""}
          />
        </Form.Group>
        <Row xs={1} lg={2}>
          <Col>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Handicap</Form.Label>
              <Form.Control
                data-test="update-hcp"
                type="number"
                placeholder="Handicap"
                value={hcp}
                onChange={(e) => {
                  setHcp(parseFloat(e.target.value));
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Profilbild</Form.Label>
          <Form.Control type="file" onChange={handleFileUpload} />
          {image && (
            <Uploader image={image} setImage={setImage} setUrl={setUrl} />
          )}
        </Form.Group>
        <Button
          variant="primary"
          className="btn-primary"
          onClick={() => dispatchUpdate()}
        >
          Update Profil
        </Button>
        <Button
          variant="danger"
          className="btn-danger__delete"
          onClick={() => setShowModal(!showModal)}
        >
          <BsTrash />
          Profil Löschen
        </Button>
      </Form>
      {showConfirmAlert && (
        <Alert
          variant="primary"
          onClose={() => setShowConfirmAlert(false)}
          dismissible
        >
          Änderung wurde gespeichert!
        </Alert>
      )}
      <ConfirmModal
        title="Profil löschen"
        message="Möchtest du dein Profil wirklich löschen?"
        onClose={() => setShowModal(false)}
        showModal={showModal}
        onConfirm={() => dispatchDelete()}
        icon={<BsTrash />}
        variant="danger"
      />
    </div>
  );
};

export default Profile;
