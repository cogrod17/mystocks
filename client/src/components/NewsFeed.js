import React, { useState, useEffect } from "react";
import Article from "./Article";
import axios from "axios";

//CAN ADD A NEWS CATAGORY OPTION HERE

const NewsFeed = () => {
  const [articleList, setArticleList] = useState([]);

  const API_KEY = "c2b9odaad3i8k5kfml40";

  const getNews = async () => {
    try {
      const news = await axios.get(
        `https://finnhub.io/api/v1/news?category=general&token=${API_KEY}`,
        {
          params: {
            category: "general",
          },
        }
      );
      console.log(news.data);
      setArticleList(news.data);
    } catch (e) {
      console.log("could not get news");
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const renderFeed = (articleList) => {
    if (!articleList) return <div>Could not get news</div>;

    return articleList.slice(0, 17).map((item, i) => {
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
