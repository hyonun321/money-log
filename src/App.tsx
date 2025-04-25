import useLocalStorage from './hooks/useLocalStorage';
import Balance from './components/Balance';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import { Transaction } from './types';
import './styles.css';

export default function App() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);

  const addTransaction = (tx: Transaction) => {
    setTransactions([tx, ...transactions]);
  };

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="container">
      <h1>용돈기입장</h1>
      <Balance transactions={transactions} />
      <div className="main">
        <div className="form-box">
          <h2>새로운 거래 추가</h2>
          <TransactionForm onAdd={addTransaction} />
        </div>
        <div className="list-box">
          <h2>내역</h2>
          <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        </div>
      </div>
    </div>
  );
}
