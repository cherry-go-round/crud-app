import React, { useState } from 'react';
import './index.css'; // 스타일 파일을 import

const CrudApp = () => {
  const [data, setData] = useState([]);
  const [newExpense, setNewExpense] = useState('');
  const [newCost, setNewCost] = useState('');
  const [editItemId, setEditItemId] = useState(null);

  const handleAddItem = () => {
    if (editItemId !== null) {
      // 업데이트 모드일 때
      const updatedData = data.map(item =>
        item.id === editItemId
          ? { id: item.id, expense: newExpense, cost: parseInt(newCost, 10) }
          : item
      );
      setData(updatedData);
      setEditItemId(null); // 업데이트가 끝나면 다시 null로 설정
    } else {
      // 추가 모드일 때
      const newItemObject = {
        id: data.length + 1,
        expense: newExpense,
        cost: parseInt(newCost, 10), // Convert cost to integer
      };
      setData([...data, newItemObject]);
    }
    setNewExpense('');
    setNewCost('');
  };

  const handleEditItem = (id, expense, cost) => {
    setEditItemId(id);
    setNewExpense(expense);
    setNewCost(cost);
  };

  const handleDeleteItem = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
  };

  const handleDeleteAll = () => {
    setData([]);
  };

  const calculateTotalCost = () => {
    return data.reduce((total, item) => total + item.cost, 0);
  };

  return (
    <div className="crud-app-container">
      <h1 className="main-title">예산 계산기</h1>

      <div className="body-container">
        <div className="input-container">
          <div className="input-group">
            <label htmlFor="expense">지출 항목</label>
            <input
              type="text"
              id="expense"
              placeholder="예) 렌트비"
              value={newExpense}
              onChange={(e) => setNewExpense(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="cost">비용</label>
            <input
              type="number"
              id="cost"
              placeholder="예) 100"
              value={newCost}
              onChange={(e) => setNewCost(e.target.value)}
            />
          </div>
        </div>

        <button className="add-button" onClick={handleAddItem}>
            {editItemId !== null ? '수정하기' : '제출'}
        </button>

        <ul className="item-list">
          {data.map(item => (
            <li key={item.id}>
              <span className="expense">{item.expense}     </span>
              <span className="cost">{item.cost}</span>
              <button onClick={() => handleEditItem(item.id, item.expense, item.cost)}>
                수정
              </button>
              <button onClick={() => handleDeleteItem(item.id)}>
                삭제
              </button>
            </li>
          ))}
        </ul>

        {data.length > 0 && (
          <div className="action-buttons">
            <button className="delete-all-button" onClick={handleDeleteAll}>
              목록 지우기
            </button>
          </div>
        )}
      </div>

      {data.length > 0 && (
        <div className="total-cost">
          <p>총 지출: {calculateTotalCost()}원</p>
        </div>
      )}
    </div>
  );
};

export default CrudApp;
