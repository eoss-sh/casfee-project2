import { Modal, Button } from "react-bootstrap";

export interface ConfirmModalProps {
  title: string;
  message: string;
  onClose: () => void;
  showModal: boolean;
  onConfirm: () => void;
  icon: React.ReactNode;
  variant: string;
}

const ConfirmModal = (props: ConfirmModalProps) => {
  const { title, message, onConfirm, onClose, showModal, variant, icon } =
    props;

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
        <Button variant={variant} onClick={onConfirm}>
          {icon}
          Bestätigen
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
