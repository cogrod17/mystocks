import React, { useEffect } from "react";
import NavBar from "./NavBar";
import NewsFeed from "./NewsFeed";
import Gainers from "./Gainers";
import Losers from "./Losers";
import axios from "axios";

const Home = () => {
  const renderNews = (newsArray) => {
    newsArray.map((article) => {
      return <div className="article" key={article.title}></div>;
    });
  };

  return (
    <div className="home">
      <NavBar />

      <div className="movers-container">
        <Gainers />
        <Losers />
      </div>
      <NewsFeed />
    </div>
  );
};

export default Home;
