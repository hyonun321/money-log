import { useState } from 'react';
import { Transaction } from '../types';

interface Props {
  transaction: Transaction;
  onEdit: (tx: Transaction) => void;
  onDelete: (id: number) => void;
}

export default function TransactionItem({ transaction, onEdit, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState(transaction.description);
  const [amt, setAmt] = useState(transaction.amount);
  const [cat, setCat] = useState(transaction.category);

  const saveEdit = () => {
    onEdit({ ...transaction, description: desc, amount: amt, category: cat });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="transaction-item editing">
        <input className="edit-input" value={desc} onChange={e => setDesc(e.target.value)} />
        <input
             className="edit-input"
             type="number"
             value={amt}
             onChange={e => setAmt(Number(e.target.value))}
        />
        <input className="edit-input" value={cat} onChange={e => setCat(e.target.value)} />
        <button className="btn-save" onClick={saveEdit}>저장</button>
        <button className="btn-cancel" onClick={() => setIsEditing(false)}>취소</button>
      </div>
    );
  }

  const sign = transaction.type === 'income' ? '+' : '-';

  return (
    <div className={`transaction-item ${transaction.type}`}>
      <div className="item-left">
        <span className="category">{transaction.category}</span>
        <span className="desc">{transaction.description}</span>
      </div>
      <span className="amount">
        {sign}₩{transaction.amount.toLocaleString()}
      </span>
      <div className="item-right">
        <button className="edit-btn" onClick={() => setIsEditing(true)}>✎</button>
        <button
          className="delete-btn"
          onClick={() => {
            if (confirm('정말 삭제하시겠습니까?')) onDelete(transaction.id);
          }}
        >×</button>
      </div>
    </div>
  );
}
