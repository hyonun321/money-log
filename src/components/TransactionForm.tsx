import { useState, FormEvent } from "react";
import { Transaction } from "../types";
import CategoryModal from "./CategoryModal";

interface Props {
  categories: string[];
  onAdd: (tx: Transaction) => void;
  onAddCategory: (cat: string) => void;
}

export default function TransactionForm({
  categories,
  onAdd,
  onAddCategory,
}: Props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState(categories[0] || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (!description.trim()) throw new Error("사유를 입력해주세요.");
      if (amount === "" || isNaN(amount))
        throw new Error("금액을 입력해주세요.");
      if (amount <= 0) throw new Error("금액은 0보다 커야 합니다.");
      if (!category) throw new Error("카테고리를 선택해주세요.");

      const tx: Transaction = {
        id: Date.now(),
        description: description.trim(),
        amount: Number(amount),
        type,
        date: new Date().toISOString().split("T")[0],
        category,
      };
      onAdd(tx);

      // 성공 시 초기화
      setDescription("");
      setAmount("");
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleAddCategory = (cat: string) => {
    onAddCategory(cat);
    setCategory(cat);
  };

  return (
    <>
      <form className="transaction-form" onSubmit={handleSubmit}>
        <label>카테고리</label>
        <div className="select-wrap">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
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

        <label>사유</label>
        <input
          type="text"
          placeholder="내용 입력..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>금액</label>
        <input
          type="number"
          placeholder="금액 입력..."
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value === "" ? "" : Number(e.target.value))
          }
        />

        <div className="radio-group">
          <button
            type="button"
            className={`radio-btn income ${type === "income" ? "selected" : ""}`}
            onClick={() => setType("income")}
          >
            수입
          </button>
          <button
            type="button"
            className={`radio-btn expense ${type === "expense" ? "selected" : ""}`}
            onClick={() => setType("expense")}
          >
            지출
          </button>
        </div>

        <button type="submit" className="add-btn">
          거래 추가
        </button>

        {error && <div className="error-box">{error}</div>}
      </form>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCategory}
      />
    </>
  );
}
