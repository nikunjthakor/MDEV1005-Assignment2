import React, { useState } from 'react';

function Checklist() {
  // State to store the list items and the current input value
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  // Function to add a new item to the checklist
  const addItem = () => {
    if (input.trim()) { // Ensure input is not empty
      setItems([...items, { text: input, completed: false }]); // Add the new item with initial 'completed' status as false
      setInput(''); // Clear the input field after adding the item
    }
  };

  // Function to toggle the completion status of an item
  const toggleItemCompletion = (index) => {
    setItems(items.map((item, i) => 
      (i === index ? { ...item, completed: !item.completed } : item) // Toggle 'completed' status for the clicked item
    ));
  };

  return (
    <div>
      {/* Header for the Checklist page */}
      <h2>Checklist</h2>

      {/* Input group for adding new items */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)} // Update input state on change
          placeholder="Add a new item"
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" onClick={addItem}>
            Add
          </button>
        </div>
      </div>

      {/* List of checklist items */}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={index}
            className={`list-group-item ${item.completed ? 'list-group-item-success' : ''}`} // Apply class if item is completed
            onClick={() => toggleItemCompletion(index)} // Toggle completion status on click
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Checklist;
