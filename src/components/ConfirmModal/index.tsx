import { Modal, Button } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";

export interface ConfirmModalProps {
  title: string;
  message: string;
  onClose: () => void;
  showModal: boolean;
  onConfirm: () => void;
}

const ConfirmModal = (props: ConfirmModalProps) => {
  const { title, message, onConfirm, onClose, showModal } = props;

  return (
    <Modal show={showModal}>
      <Modal.Header closeButton onClick={onClose}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Abbrechen
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          <BsTrash />
          Bestätigen
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
