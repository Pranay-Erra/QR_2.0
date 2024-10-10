// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function Test() {
  const [inputValue, setInputValue] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8000/api/test', { inputValue });
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error('Error submitting input:', error);
    }
  };

  return (
    <div style={{ marginTop: '50px', textAlign: 'center' }}>
      <h1>Input Test</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter something"
        />
        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default Test;
