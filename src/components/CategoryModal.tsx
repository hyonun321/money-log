import React, { useState } from 'react';
import Modal from './Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (cat: string) => void;
}

export default function CategoryModal({ isOpen, onClose, onAdd }: Props) {
  const [name, setName] = useState('');

  return (
    <Modal isOpen={isOpen} title="새 카테고리 추가" onClose={onClose}>
      <input
        type="text"
        placeholder="카테고리명 입력"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <div className="modal-actions">

        <button
          className="btn-primary"
          onClick={() => {
            onAdd(name.trim());
            setName('');
            onClose();
          }}
          disabled={!name.trim()}
        >
          추가
              </button>
              <button className="btn-secondary" onClick={() => {
                  setName('');
                  onClose();
              }}>취소</button>
      </div>
    </Modal>
  );
}
