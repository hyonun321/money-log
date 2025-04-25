import React, { useState, FormEvent } from 'react';
import { Transaction } from '../types';

interface Props {
  onAdd: (tx: Transaction) => void;
}

export default function TransactionForm({ onAdd }: Props) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [type, setType] = useState<'income' | 'expense'>('income');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!description || amount === '') return;

    onAdd({
      id: Date.now(),
      description,
      amount: typeof amount === 'number' ? amount : parseFloat(amount),
      type,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription('');
    setAmount('');
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="내용 입력..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="금액 입력..."
        value={amount}
        onChange={e => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <div className="type-selector">
        <label>
          <input
            type="radio"
            name="type"
            value="income"
            checked={type === 'income'}
            onChange={() => setType('income')}
          />
          수입
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="expense"
            checked={type === 'expense'}
            onChange={() => setType('expense')}
          />
          지출
        </label>
      </div>
      <button type="submit">거래 추가</button>
    </form>
  );
}
