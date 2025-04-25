import  { useState, FormEvent } from 'react';
import { Transaction } from '../types';
import CategoryModal from './CategoryModal';

interface Props {
   categories: string[];
   onAdd: (tx: Transaction) => void;
   onAddCategory: (cat: string) => void;
}

 export default function TransactionForm({ categories, onAdd, onAddCategory }: Props) {
   const [description, setDescription] = useState('');
   const [amount, setAmount] = useState<number | ''>(0);
   const [type, setType] = useState<'income' | 'expense'>('income');
   const [category, setCategory] = useState(categories[0] || '');
  const [isModalOpen, setIsModalOpen] = useState(false);

   const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!description || amount === '' || !category) return;
        onAdd({
        id: Date.now(),
        description,
        amount: Number(amount),
        type,
        date: new Date().toISOString().split('T')[0],
        category
        });
        setDescription('');
        setAmount('');
    };

    const handleAddCategory = (cat: string) => {
        onAddCategory(cat);
        setCategory(cat);
    };

   return (
        <>
        <form className="transaction-form" onSubmit={handleSubmit}>
            카테고리
        <div className="select-wrap">
            <select value={category} onChange={e => setCategory(e.target.value)}>
                {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
            <button
                type="button"
                className="btn-add-cat"
                onClick={() => setIsModalOpen(true)}
            >＋</button>
        </div>
               사유
         <input
           type="text"
           placeholder="내용 입력..."
           value={description}
           onChange={e => setDescription(e.target.value)}
               />
               금액
         <input
           type="number"
           placeholder="금액 입력..."
           value={amount}
           onChange={e => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
         />

        <div className="radio-group">
            <button
                type="button"
                className={`radio-btn income ${type === 'income' ? 'selected' : ''}`}
                onClick={() => setType('income')}
            >
                수입
            </button>
            <button
                type="button"
                className={`radio-btn expense ${type === 'expense' ? 'selected' : ''}`}
                onClick={() => setType('expense')}
            >
                지출
            </button>
        </div>

         <button type="submit" className="add-btn">거래 추가</button>
       </form>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCategory}
        />
        </>
    );  
    }   
