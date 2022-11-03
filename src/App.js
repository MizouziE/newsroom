import React, { useCallback, useEffect, useState } from 'react';
import ArticleList from './components/ArticleList';
import logo from './logo.svg'
import './App.css';
import Card from './components/Card';

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArticlesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://energy-price-news.p.rapidapi.com/news', {
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': 'energy-price-news.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      let loadedArticles = [];

      for (const key in data) {
        loadedArticles.push({
          id: key,
          title: data[key].title,
          source: data[key].source,
          url: data[key].url,
          image: data[key].image

        })
      }

      setArticles(loadedArticles);
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchArticlesHandler();
  }, [fetchArticlesHandler]);

  let content = <p>No articles to show.</p>

  if (articles.length > 0) {
    content = <ArticleList articles={articles} />;
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading...</p>
  }

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <header>
        NewsRoom
      </header>
      <button onClick={fetchArticlesHandler}>Get Articles</button>
      <Card>
        <section>{content}</section>
      </Card>
    </div>
  );
}

export default App;
