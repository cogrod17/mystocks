import React from "react";
import NewsFeed from "./NewsFeed";
import Actives from "./Actives";
import Sectors from "./Sectors";
import "../../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <NewsFeed />
      <div className="gainer-and-index">
        <Actives />
        <Sectors />
      </div>
    </div>
  );
};

export default Home;
