import { useState ,useEffect} from 'react';
import { Transaction } from '../types';
import CategoryModal from './CategoryModal';
import ConfirmModal from './ConfirmModal';
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
  onDelete,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState(transaction.description);
  const [amt, setAmt] = useState(transaction.amount);
  const [cat, setCat] = useState(transaction.category);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    
const handleDelete = () => {
    onDelete(transaction.id);
    setConfirmOpen(false);
  };
    
    useEffect(() => {
    if (!error) return;
    const id = setTimeout(() => setError(null), 1800);
    return () => clearTimeout(id);
  }, [error]);
    
    
    
  const saveEdit = () => {
    // 검증
    if (!cat) {
      setError('카테고리를 선택해주세요.');
      return;
    }
    if (!desc.trim()) {
      setError('사유를 입력해주세요.');
      return;
    }
    if (isNaN(amt) || amt <= 0) {
      setError('금액은 0보다 커야 합니다.');
      return;
    }

    // 문제 없으면 저장
    setError(null);
    onEdit({ ...transaction, description: desc.trim(), amount: amt, category: cat });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="transaction-item editing">
        {/* 카테고리 */}
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
          {/* 사유 */}
          <input
            className="edit-input edit-desc"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
        </div>

        {/* 금액 */}
        <span className="amount">
          <input
            className="edit-input edit-amount"
            type="number"
            value={amt}
            onChange={e => setAmt(Number(e.target.value))}
          />
        </span>

        {/* 버튼 */}
        <div className="item-right">
          <button className="btn-save" onClick={saveEdit}>✎</button>
          <button className="btn-cancel" onClick={() => setIsEditing(false)}>✕</button>
        </div>

        {error && <div className="item-error">{error}</div>}

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
        {transaction.type === 'income' ? '+' : '-'}₩{transaction.amount.toLocaleString()}
      </span>
      <div className="item-right">
        <button className="edit-btn" onClick={() => setIsEditing(true)}>✎</button>
        <button
                  className="delete-btn"
                  onClick={() => setConfirmOpen(true)}
              >×</button>
              
<ConfirmModal
        isOpen={confirmOpen}
        message={`${transaction.category} • ${transaction.description} 을(를) 삭제합니다.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />

      </div>
    </div>
  );
}
