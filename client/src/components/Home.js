import React from "react";
import NavBar from "./NavBar";
import NewsFeed from "./NewsFeed";
import Gainers from "./Gainers";
import Losers from "./Losers";

const Home = () => {
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
