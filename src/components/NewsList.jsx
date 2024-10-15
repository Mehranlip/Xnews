import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function NewsList({ articles, loading, hasMore }) {
  const getRandomGradient = () => {
    const colors = [
      'rgba(255, 0, 150, 0.6)',   // صورتی
      'rgba(0, 204, 255, 0.6)',   // آبی
      'rgba(100, 255, 0, 0.6)',    // سبز
      'rgba(255, 255, 0, 0.6)',    // زرد
      'rgba(255, 100, 100, 0.6)',  // قرمز
      'rgba(75, 0, 130, 0.6)',     // نیلی
    ];
    const color1 = colors[Math.floor(Math.random() * colors.length)];
    const color2 = colors[Math.floor(Math.random() * colors.length)];
    return `linear-gradient(to bottom, ${color1}, ${color2})`;
  };

  // فیلتر کردن مقالات
  const filteredArticles = articles.filter(article => article.description !== '[Removed]');

  return (
    <div className="news container">
      <div className="row">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
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
          ))
        ) : (
          <p>No news available.</p>
        )}
      </div>
      {loading && <p>Loading more news...</p>}
      {!hasMore && <p>No more news available.</p>}
    </div>
  );
}

export default NewsList;
