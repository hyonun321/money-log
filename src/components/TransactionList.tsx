import React from 'react';
import { Transaction } from '../types';
import TransactionItem from './TransactionItem';

interface Props {
  transactions: Transaction[];
  onDelete: (id: number) => void;
}

export default function TransactionList({ transactions, onDelete }: Props) {
  return (
    <div className="transaction-list">
      {transactions.length === 0 && <p>거래 내역이 없습니다.</p>}
      {transactions.map(tx => (
        <TransactionItem key={tx.id} transaction={tx} onDelete={onDelete} />
      ))}
    </div>
  );
}
