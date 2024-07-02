import React, { useState } from 'react';

function Checklist() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  const addItem = () => {
    if (input.trim()) {
      setItems([...items, { text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleItemCompletion = (index) => {
    setItems(items.map((item, i) => (i === index ? { ...item, completed: !item.completed } : item)));
  };

  return (
    <div>
      <h2>Checklist</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new item"
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" onClick={addItem}>
            Add
          </button>
        </div>
      </div>
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={index}
            className={`list-group-item ${item.completed ? 'list-group-item-success' : ''}`}
            onClick={() => toggleItemCompletion(index)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Checklist;
