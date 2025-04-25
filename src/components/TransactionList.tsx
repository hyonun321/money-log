import { Transaction } from '../types';
import TransactionItem from './TransactionItem';

interface Props {
  transactions: Transaction[];
  onEdit: (tx: Transaction) => void;
  onDelete: (id: number) => void;
}

export default function TransactionList({ transactions, onEdit, onDelete }: Props) {
  return (
    <div className="transaction-list">
      {transactions.length === 0 && <p>거래 내역이 없습니다.</p>}
      {transactions.map(tx => (
        <TransactionItem
          key={tx.id}
          transaction={tx}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
