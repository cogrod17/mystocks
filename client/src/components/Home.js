import React from "react";
import NavBar from "./NavBar";
import NewsFeed from "./NewsFeed";
import Gainers from "./Gainers";
import MarketInfo from "./MarketInfo";
import "../styles/Home.css";

//ADD SPINNERS TO THE COMPONENTS

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="home">
        <NewsFeed />
        <div className="gainer-and-index">
          <Gainers />
          <MarketInfo />
        </div>
      </div>
    </div>
  );
};

export default Home;
