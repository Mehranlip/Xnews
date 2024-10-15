import React, { useState } from 'react';

function KeywordInput({ addKeyword }) {
  const [newKeyword, setNewKeyword] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addKeyword(newKeyword);
      setNewKeyword(''); // Reset input after adding
    }
  };

  return (
    <div className="keyword-input">
      <input
        type="text"
        placeholder="Enter keyword (e.g. AI)"
        value={newKeyword}
        onChange={(e) => setNewKeyword(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={() => {
        addKeyword(newKeyword);
        setNewKeyword(''); // Reset input after clicking button
      }}>
        Add Keyword
      </button>
    </div>
  );
}

export default KeywordInput;
