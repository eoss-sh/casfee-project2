import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { ScorecardEntry } from "../../interfaces/scores";

interface UpdateModalProps {
  score: ScorecardEntry;
  onClose: () => void;
  showModal: boolean;
  onConfirm: (data: ScorecardEntry) => void;
}

const UpdateModal = (props: UpdateModalProps) => {
  const { onClose, showModal, score, onConfirm } = props;
  const [newScore, setNewScore] = useState(score);

  return (
    <Modal show={showModal}>
      <Modal.Header closeButton onClick={onClose}>
        <Modal.Title>Ergebnis anpassen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridScore">
            <Form.Label>Anzahl Schläge</Form.Label>
            <Form.Control
              name="score"
              placeholder="Schläge"
              value={newScore.score}
              onChange={(e) =>
                setNewScore({
                  ...newScore,
                  score: parseFloat(e.target.value)
                    ? parseFloat(e.target.value)
                    : 0,
                })
              }
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPutts">
            <Form.Label>Anzahl Putts</Form.Label>
            <Form.Control
              name="putts"
              placeholder="Putts"
              value={newScore.putts}
              onChange={(e) =>
                setNewScore({
                  ...newScore,
                  putts: parseFloat(e.target.value)
                    ? parseFloat(e.target.value)
                    : 0,
                })
              }
            />
          </Form.Group>
          <Form.Check
            type="switch"
            name="gir"
            onChange={(e) => {
              setNewScore({ ...newScore, gir: e.target.checked });
            }}
            checked={newScore.gir || false}
          />
          <Form.Check
            type="switch"
            name="fir"
            onChange={(e) => {
              setNewScore({ ...newScore, fir: e.target.checked });
            }}
            checked={newScore.fir || false}
          />
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Abbrechen
        </Button>
        <Button onClick={() => onConfirm(newScore)}>Bestätigen</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateModal;
