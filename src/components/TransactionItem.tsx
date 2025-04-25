import { useState } from 'react';
import { Transaction } from '../types';
import CategoryModal from './CategoryModal';

interface Props {
  transaction: Transaction;
  categories: string[];
  onAddCategory: (cat: string) => void;
  onEdit: (tx: Transaction) => void;
  onDelete: (id: number) => void;
}

export default function TransactionItem({
  transaction,
  categories,
  onAddCategory,
  onEdit,
  onDelete
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState(transaction.description);
  const [amt, setAmt] = useState(transaction.amount);
  const [cat, setCat] = useState(transaction.category);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const saveEdit = () => {
    onEdit({ ...transaction, description: desc, amount: amt, category: cat });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="transaction-item editing">
        <div className="item-left">
            <div className="select-wrap">
        <select
            className="edit-input edit-cat"
            value={cat}
            onChange={e => setCat(e.target.value)}
        >
            {categories.map(c => (
            <option key={c} value={c}>
                {c}
            </option>
            ))}
        </select>
        <button
            type="button"
            className="btn-add-cat"
            onClick={() => setIsModalOpen(true)}
        >
            ＋
        </button>
        </div>
        <input
        className="edit-input"
        value={desc}
        onChange={e => setDesc(e.target.value)}
        />
        
        </div>

        {/* 중앙: 금액 입력 */}
        <span className="amount">
          <input
            className="edit-input edit-amount"
            type="number"
            value={amt}
            onChange={e => setAmt(Number(e.target.value))}
          />
        </span>

        {/* 오른쪽: 저장/취소 */}
        <div className="item-right">
          <button className="btn-save" onClick={saveEdit}>
            ✎
          </button>
          <button
            className="btn-cancel"
            onClick={() => setIsEditing(false)}
          >
            ×
          </button>
        </div>

        {/* 카테고리 추가 모달 */}
        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={newCat => {
            onAddCategory(newCat);
            setCat(newCat);
          }}
        />
      </div>
    );
  }


  return (
    <div className={`transaction-item ${transaction.type}`}>
      <div className="item-left">
        <span className="category">{transaction.category}</span>
        <span className="desc">{transaction.description}</span>
      </div>
      <span className="amount">
        ₩{transaction.amount.toLocaleString()}
      </span>
      <div className="item-right">
        <button className="edit-btn" onClick={() => setIsEditing(true)}>
          ✎
        </button>
        <button
          className="delete-btn"
          onClick={() => {
            if (confirm('정말 삭제하시겠습니까?')) onDelete(transaction.id);
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
