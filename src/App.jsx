import React, { useState, useEffect } from 'react';
import KeywordInput from './components/KeywordInput';
import KeywordList from './components/KeywordList';
import NewsList from './components/NewsList';

function App() {
  const [keywords, setKeywords] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const storedKeywords = JSON.parse(localStorage.getItem('keywords') || '[]');
    setKeywords(storedKeywords);
    if (storedKeywords.length > 0) {
      loadNews(storedKeywords);
    }
  }, []);

  const addKeyword = (newKeyword) => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      const updatedKeywords = [...keywords, newKeyword];
      setKeywords(updatedKeywords);
      localStorage.setItem('keywords', JSON.stringify(updatedKeywords));
      loadNews(updatedKeywords);
    }
  };

  const removeKeyword = (keyword) => {
    const updatedKeywords = keywords.filter(k => k !== keyword);
    setKeywords(updatedKeywords);
    localStorage.setItem('keywords', JSON.stringify(updatedKeywords));
    loadNews(updatedKeywords);
  };

  const loadNews = async (keywordsToSearch) => {
    setLoading(true);
    try {
      const query = keywordsToSearch.join(' OR ');
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
      );
      const data = await response.json();
      if (data.status === 'ok') {
        setArticles(data.articles);
        setHasMore(data.articles.length > 0);
      } else {
        console.error('Error fetching news:', data);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <div className='main-section container-flue'>
        <div className='row justify-content-center align-items-center full-height'>
          <div className='col-12 col-md-6 text-center intro-text'>
            <h1>Xnews </h1>
            <KeywordInput addKeyword={addKeyword} />
            <KeywordList keywords={keywords} removeKeyword={removeKeyword} />
            <div className="copyright">
              &copy; {new Date().getFullYear()} All Rights Reserved. Developed by <a href="https://github.com/mehranlip" target="_blank" rel="noopener noreferrer">Mehran</a>.
            </div>
          </div>
        </div>
      </div>
      <NewsList articles={articles} loading={loading} hasMore={hasMore} />
    </div>
  );
}

export default App;
