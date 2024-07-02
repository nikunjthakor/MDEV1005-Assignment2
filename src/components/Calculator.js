import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
  // State to store the current input and result of the calculation
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  // Function to handle button clicks
  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  // Function to calculate the result based on the input
  const calculateResult = () => {
    try {
      setResult(eval(input)); // Use eval to evaluate the input as a mathematical expression
    } catch {
      setResult('Error'); // If there's an error in evaluation, set result to 'Error'
    }
  };

  // Function to clear the input and result
  const clearInput = () => {
    setInput('');
    setResult(null);
  };

  return (
    <div className="calculator">
      {/* Display section */}
      <div className="display">
        {/* Input display */}
        <input type="text" className="input" value={input} readOnly />
        {/* Result display */}
        {result !== null && <p className="result">{result}</p>}
      </div>

      {/* Button grid section */}
      <div className="button-grid">
        {/* Map over button values to create buttons */}
        {[7, 8, 9, 'C', 4, 5, 6, '+', 1, 2, 3, '-', 0, '.', '/', '*'].map((value) => (
          <button
            key={value}
            className={`button ${value === 'C' ? 'clear' : ''} ${['+', '-', '*', '/'].includes(value) ? 'operation' : ''}`}
            onClick={() => value === 'C' ? clearInput() : handleButtonClick(value.toString())}
          >
            {value}
          </button>
        ))}
        {/* Equals button */}
        <button className="button equals" onClick={calculateResult}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
