import React from 'react';

function KeywordList({ keywords, removeKeyword }) {
  return (
<div className="keyword-list">
    {keywords.map((keyword, index) => (
        <div className="keyword-item" key={index}>
            <span>{keyword}</span>
            <button className="remove-btn" onClick={() => removeKeyword(keyword)}>×</button>
        </div>
    ))}
</div>


  );
}

export default KeywordList;
