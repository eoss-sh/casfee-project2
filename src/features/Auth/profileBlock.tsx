import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../helpers/hooks";
import { useHistory } from "react-router-dom";
import { updateUserData, deleteUser } from "./authSlice";
import { Form, Row, Col, Button } from "react-bootstrap";
import Uploader from "../../components/Uploader";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useAppSelector((state) => state.auth.user);
  const [image, setImage] = useState<File>();
  const [url, setUrl] = useState(user.url);
  const [hcp, setHcp] = useState(user.hcp);
  const [name, setName] = useState(user.name);

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
      })
    );
    history.push("/profile");
  };

  const dispatchDelete = () => {
    dispatch(deleteUser(user.uid));
    history.push("/login");
  };

  return (
    <div className="container">
      <Form>
        <Row>
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
        <Row>
          <Col>
            <Button
              variant="secondary"
              className="btn-secondary__register"
              onClick={() => dispatchUpdate()}
            >
              Update
            </Button>
          </Col>
          <Col>
            <Button
              variant="danger"
              className="btn-danger__delete"
              onClick={() => dispatchDelete()}
            >
              Profil Löschen
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Profile;
