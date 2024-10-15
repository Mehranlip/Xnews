import React, { useState, useEffect } from 'react';

function App() {
  const [keywords, setKeywords] = useState(JSON.parse(localStorage.getItem('keywords')) || []);
  const [newKeyword, setNewKeyword] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(5);
  const [hasMore, setHasMore] = useState(true);

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  const fetchNews = async (keyword) => {
    if (!keyword) return;

    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`
      );
      const data = await response.json();

      if (data.articles) {
        return data.articles;
      } else {
        console.error('Error fetching news:', data);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    return [];
  };

  const addKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      const updatedKeywords = [...keywords, newKeyword];
      setKeywords(updatedKeywords);
      localStorage.setItem('keywords', JSON.stringify(updatedKeywords));
      setNewKeyword('');
    }
  };

  const removeKeyword = (keywordToRemove) => {
    const updatedKeywords = keywords.filter(keyword => keyword !== keywordToRemove);
    setKeywords(updatedKeywords);
    localStorage.setItem('keywords', JSON.stringify(updatedKeywords));
  };

  const loadNews = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // اگر هیچ کیبوردی وجود نداشت، مقادیر اولیه را تنظیم کنید
    if (keywords.length === 0) {
      setArticles([]);
      setLoading(false);
      return;
    }

    const allArticles = [];

    for (const keyword of keywords) {
      const articlesFromKeyword = await fetchNews(keyword);
      allArticles.push(...articlesFromKeyword);
    }

    const groupedArticles = keywords.reduce((acc, keyword) => {
      acc[keyword] = allArticles.filter(article =>
        article.title.toLowerCase().includes(keyword.toLowerCase()) ||
        (article.description && article.description.toLowerCase().includes(keyword.toLowerCase()))
      );
      return acc;
    }, {});

    const selectedArticles = [];
    const articlesPerKeyword = Math.ceil(currentOffset / keywords.length);

    for (const keyword of keywords) {
      const articles = groupedArticles[keyword];
      const randomArticles = articles.sort(() => 0.5 - Math.random()).slice(0, articlesPerKeyword);
      selectedArticles.push(...randomArticles);
    }

    const finalArticles = selectedArticles.sort(() => 0.5 - Math.random()).slice(0, currentOffset);

    setArticles(finalArticles);
    setLoading(false);

    if (finalArticles.length < currentOffset) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, [keywords]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
        setCurrentOffset((prev) => prev + 5);
        loadNews();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentOffset, keywords]);

  return (
    <div className="app">
      <h1>Personalized News Widget</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter keyword (e.g. AI)"
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
        />
        <button onClick={addKeyword}>Add Keyword</button>
      </div>
      <div className="keywords">
        <h2>Saved Keywords:</h2>
        <ul>
          {keywords.map((keyword, index) => (
            <li key={index}>
              {keyword}
              <button onClick={() => removeKeyword(keyword)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="news">
        {articles.length > 0 && (
          <ul>
            {articles.map((article, index) => (
              <li key={index}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                </a>
              </li>
            ))}
          </ul>
        )}
        {loading && <p>Loading more news...</p>}
        {!hasMore && <p>No more news available.</p>}
      </div>
    </div>
  );
}

export default App;
