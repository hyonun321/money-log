import useLocalStorage from './hooks/useLocalStorage';
import { Transaction } from './types';
import Balance from './components/Balance';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import './styles.css';

export default function App() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [categories, setCategories] = useLocalStorage<string[]>('categories', ['용돈', '영화', '외식']);

  const addTransaction = (tx: Transaction) => {
    setTransactions([tx, ...transactions]);
  };

  const editTransaction = (updated: Transaction) => {
    setTransactions(transactions.map(t => t.id === updated.id ? updated : t));
  };

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const addCategory = (cat: string) => {
    if (cat && !categories.includes(cat)) setCategories([cat, ...categories]);
  };

  return (
    <div className="container">
      <h1>용돈기입장</h1>
      <Balance transactions={transactions} />
      <div className="main">
        <div className="form-box">
          <h2>새로운 거래 추가</h2>
          <TransactionForm
            categories={categories}
            onAdd={addTransaction}
            onAddCategory={addCategory}
          />
        </div>
        <div className="list-box">
          <h2>내역</h2>
          <TransactionList
            transactions={transactions}
            categories={categories}
            onAddCategory={addCategory}
            onEdit={editTransaction}
            onDelete={deleteTransaction}
          />
        </div>
      </div>
    </div>
  );
}
