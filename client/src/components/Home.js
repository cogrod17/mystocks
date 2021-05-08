import React from "react";
import NavBar from "./NavBar";

const Home = () => {
  return (
    <div>
      <NavBar />

      <div className="movers-container">
        <div className="movers-up">
          <h2>Gainers</h2>
          <p>words</p>
          <p>words</p>
          <p>words</p>
        </div>
        <div className="movers-down">
          <h2>Losers</h2>
          <p>words</p>
          <p>words</p>
          <p>words</p>
        </div>
      </div>
      <div className="news">
        <h2>News</h2>
        <p>words</p>
        <p>words</p>
        <p>words</p>
      </div>
    </div>
  );
};

export default Home;
