import React from "react";
import NavBar from "./NavBar";
import NewsFeed from "./NewsFeed";
import Gainers from "./Gainers";
import MarketInfo from "./MarketInfo";

const Home = () => {
  return (
    <div className="home">
      <NavBar />

      <div className="movers-container">
        <Gainers />
        <MarketInfo />
      </div>
      <NewsFeed />
    </div>
  );
};

export default Home;
