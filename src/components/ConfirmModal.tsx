import Modal from "./Modal";

interface Props {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  message,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal isOpen={isOpen} title="정말 삭제하시겠습니까?" onClose={onCancel}>
      <p className="confirm-message">{message}</p>
      <div className="modal-actions">
        <button className="btn-primary" onClick={onConfirm}>
          예
        </button>
        <button className="btn-secondary" onClick={onCancel}>
          아니오
        </button>
      </div>
    </Modal>
  );
}
