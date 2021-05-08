import React, { useState, useEffect } from "react";
import Article from "./Article";
import axios from "axios";

const NewsFeed = () => {
  const [articleList, setArticleList] = useState([]);

  ///news api.org KEY
  //https://newsapi.org/
  const API_KEY = "1dd10770c7944d70aff43d9ab5c463e9";

  const getNews = async () => {
    try {
      const news = await axios.get("https://newsapi.org/v2/top-headlines", {
        params: {
          country: "us",
          category: "business",
          apiKey: API_KEY,
        },
      });
      console.log(news.data.articles);
      setArticleList(news.data.articles);
    } catch (e) {
      console.log("could not get news");
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const renderFeed = (articleList) => {
    if (!articleList) return <div>Could not get news</div>;

    return articleList.map((item, i) => {
      return <Article key={i} article={item} />;
    });
  };

  return (
    <div className="news">
      <h1>News</h1>
      {renderFeed(articleList)}
    </div>
  );
};

export default NewsFeed;
