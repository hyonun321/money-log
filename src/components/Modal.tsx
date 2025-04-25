import React from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({
  isOpen,
  title,
  children,
  onClose,
}: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {title && <h3 className="modal-title">{title}</h3>}
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
