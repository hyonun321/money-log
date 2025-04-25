import React from 'react';
import { Transaction } from '../types';

interface Props {
  transaction: Transaction;
  onDelete: (id: number) => void;
}

export default function TransactionItem({ transaction, onDelete }: Props) {
  const sign = transaction.type === 'income' ? '+' : '-';

  return (
    <div className={`transaction-item ${transaction.type}`}>
      <span className="desc">{transaction.description}</span>
      <span className="amount">
        {sign}₩{transaction.amount.toLocaleString()}
      </span>
      <button
        className="delete-btn"
        onClick={() => {
          if (window.confirm('정말 삭제하시겠습니까?')) {
            onDelete(transaction.id);
          }
        }}
      >
        ×
      </button>
    </div>
  );
}
