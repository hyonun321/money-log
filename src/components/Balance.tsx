import { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
}

export default function Balance({ transactions }: Props) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  return (
    <div className="balance-container">
      <div className="balance">
        <h3>잔액</h3>
        <p>₩{balance.toLocaleString()}</p>
      </div>
      <div className="summary">
        <div className="income">
          <h4>수입</h4>
          <p>₩{income.toLocaleString()}</p>
        </div>
        <div className="divider" />
        <div className="expense">
          <h4>지출</h4>
          <p>₩{expense.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
