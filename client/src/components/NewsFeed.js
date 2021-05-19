import React, { useState, useEffect } from "react";
import Article from "./Article";
import axios from "axios";
import Loader from "./Loader";

//index.js:1 Warning: Can't perform a React state update on an
//unmounted component. This is a no-op, but it indicates a memory leak
//in your application. To fix, cancel all subscriptions and asynchronous
//tasks in a useEffect cleanup function.

//CAN ADD A NEWS CATAGORY OPTION HERE

const NewsFeed = () => {
  const [articleList, setArticleList] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "c2b9odaad3i8k5kfml40";

  //https://finnhub.io/api/v1/news?category=${category}&token=${API_KEY}

  const getNews = async () => {
    try {
      const news = await axios.get(`https://finnhub.io/api/v1/news?`, {
        params: {
          token: API_KEY,
        },
      });

      const businessNews = news.data.filter((item) => {
        return item.category === "business";
      });

      return businessNews;
      //setArticleList(businessNews);
      //setLoading(false);
    } catch (e) {
      return ["error"];
      // setArticleList(["error"]);
      // setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    getNews()
      .then((news) => {
        if (mounted) {
          setArticleList(news);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        if (mounted) {
          setArticleList(err);
          setLoading(false);
        }
      });

    return () => (mounted = false);
  }, []);

  const renderFeed = (articleList) => {
    console.log("getting news");

    let count = 0;
    if (articleList[0] === "error")
      return <div className="loader">Could not get news</div>;

    return articleList.slice(0, 10).map((item, i) => {
      count++;

      return <Article key={i} count={count} article={item} />;
    });
  };

  return (
    <div className="news">
      <h1 className="news-top">News</h1>
      {loading ? <Loader /> : renderFeed(articleList)}
    </div>
  );
};

export default NewsFeed;
