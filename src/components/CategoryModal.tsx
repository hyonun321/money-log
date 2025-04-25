import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (cat: string) => void;
}

export default function CategoryModal({ isOpen, onClose, onAdd }: Props) {
  const [name, setName] = useState('');

  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>새 카테고리 추가</h3>
        <input
          type="text"
          placeholder="카테고리명 입력"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div className="modal-actions">
          <button
            className="btn-secondary"
            onClick={onClose}
          >취소</button>
          <button
            className="btn-primary"
            onClick={() => { onAdd(name.trim()); setName(''); onClose(); }}
            disabled={!name.trim()}
          >추가</button>
        </div>
      </div>
    </div>
  );
}
