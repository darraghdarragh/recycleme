import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from 'antd';
import axios from 'axios';
import 'antd/dist/antd'; // Import Ant Design styles

const { Meta } = Card;
const { Search } = Input;

function News() {
  const [news, setNews] = useState([]); // State for storing news articles
  const [searchQuery, setSearchQuery] = useState('recycling'); // State for storing the search query

  // Function for fetching news based on the search query
  const handleSearch = async (value) => {
    try {
      const response = await axios.get(
        `http://newsapi.org/v2/everything?q=${value}&apiKey=223d2ddedac44d4fbc89d39b95d9f69c`
      );
      setNews(response.data.articles); // Update the news state with the fetched articles
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  // Function for fetching recycling news
  const fetchRecyclingNews = async () => {
    try {
      const response = await axios.get(
        `http://newsapi.org/v2/everything?q=recycling&apiKey=223d2ddedac44d4fbc89d39b95d9f69c`
      );
      setNews(response.data.articles); // Update the news state with the fetched articles
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  // Effect hook for fetching recycling news on component mount
  useEffect(() => {
    fetchRecyclingNews();
  }, []); // Empty array ensures this runs on mount only

  return (
    <div className="news-container">
      <div className="search-container">
        <Search
          placeholder="Search for news"
          allowClear
          enterButton="Search"
          onSearch={handleSearch} // Handle search on button click
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
        />
      </div>

      {/* Map over the news state and render a card for each article */}
      {news &&
        news.map((item, index) => (
          <Card
            key={index}
            hoverable
            className="news-card"
            cover={<img alt={`News article - ${item.title}`} src={item.urlToImage} />}
          >
            <Meta title={item.title} description={item.content} />
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <Button type="primary" className="read-more-button">
                Read More
              </Button>
            </a>
          </Card>
        ))}
    </div>
  );
}

export default News;
