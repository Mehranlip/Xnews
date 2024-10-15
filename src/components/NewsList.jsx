import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function NewsList({ articles, loading, hasMore }) {
  const getRandomGradient = () => {
    const colors = [
      'rgba(255, 0, 150, 0.6)',  
      'rgba(0, 204, 255, 0.6)',  
      'rgba(100, 255, 0, 0.6)',   
      'rgba(255, 255, 0, 0.6)',   
      'rgba(255, 100, 100, 0.6)', 
      'rgba(75, 0, 130, 0.6)',    
    ];
    const color1 = colors[Math.floor(Math.random() * colors.length)];
    const color2 = colors[Math.floor(Math.random() * colors.length)];
    return `linear-gradient(to bottom, ${color1}, ${color2})`;
  };

  const filteredArticles = articles.filter(article => article.description !== '[Removed]');

  const rows = [];
  for (let i = 0; i < filteredArticles.length; i++) {
    if (i % 5 === 0) {
      rows.push(
        <div className="row" key={i}>
          {filteredArticles.slice(i, i + 3).map((article, index) => (
            <div className="col-12 col-md-4 mb-4" key={index}>
              <li
                className="news-item"
                style={{
                  backgroundImage: article.urlToImage
                    ? `url(${article.urlToImage})`
                    : getRandomGradient(),
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <div className="news-content">
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                  </div>
                </a>
              </li>
            </div>
          ))}
        </div>
      );
    } else if (i % 5 === 3) {
      rows.push(
        <div className="row" key={i}>
          <div className="col-12 col-md-8 mb-4">
            <li
              className="news-item"
              style={{
                backgroundImage: filteredArticles[i].urlToImage
                  ? `url(${filteredArticles[i].urlToImage})`
                  : getRandomGradient(),
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <a href={filteredArticles[i].url} target="_blank" rel="noopener noreferrer">
                <div className="news-content">
                  <h2>{filteredArticles[i].title}</h2>
                  <p>{filteredArticles[i].description}</p>
                </div>
              </a>
            </li>
          </div>
          {filteredArticles[i + 1] && (
            <div className="col-12 col-md-4 mb-4">
              <li
                className="news-item"
                style={{
                  backgroundImage: filteredArticles[i + 1].urlToImage
                    ? `url(${filteredArticles[i + 1].urlToImage})`
                    : getRandomGradient(),
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <a href={filteredArticles[i + 1].url} target="_blank" rel="noopener noreferrer">
                  <div className="news-content">
                    <h2>{filteredArticles[i + 1].title}</h2>
                    <p>{filteredArticles[i + 1].description}</p>
                  </div>
                </a>
              </li>
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <div className="news container">
      {filteredArticles.length > 0 ? (
        rows
      ) : (
        <p>No news available.</p>
      )}
      {loading && <p>Loading more news...</p>}
      {!hasMore && <p>No more news available.</p>}
    </div>
  );
}

export default NewsList;
