import React from "react";

import NewsFeed from "./NewsFeed";
import Gainers from "./Gainers";
import MarketInfo from "./MarketInfo";
import "../styles/Home.css";

//ADD SPINNERS TO THE COMPONENTS

const Home = ({ viewStock }) => {
  return (
    <div className="home">
      <NewsFeed />
      <div className="gainer-and-index">
        <Gainers viewStock={viewStock} />
        <MarketInfo />
      </div>
    </div>
  );
};

export default Home;
