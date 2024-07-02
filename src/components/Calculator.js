import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const calculateResult = () => {
    try {
      setResult(eval(input));
    } catch {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult(null);
  };

  return (
    <div className="calculator">
      <div className="display">
        <input type="text" className="input" value={input} readOnly />
        {result !== null && <p className="result">{result}</p>}
      </div>
      <div className="button-grid">
        {[7, 8, 9, 'C', 4, 5, 6, '+', 1, 2, 3, '-', 0, '.', '/', '*'].map((value) => (
          <button
            key={value}
            className={`button ${value === 'C' ? 'clear' : ''} ${['+', '-', '*', '/'].includes(value) ? 'operation' : ''}`}
            onClick={() => value === 'C' ? clearInput() : handleButtonClick(value.toString())}
          >
            {value}
          </button>
        ))}
        <button className="button equals" onClick={calculateResult}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
