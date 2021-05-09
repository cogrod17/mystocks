import React, { useState, useEffect } from "react";
import GainerItem from "./GainerItem";
import axios from "axios";

//https://financialmodelingprep.com/

const Gainers = () => {
  const [gainers, setGainers] = useState([]);

  const API_KEY = "55291f85eb8b58745cc80fe4c443ba2c";

  const getGainers = async () => {
    try {
      const res = await axios.get(
        `https://financialmodelingprep.com/api/v3/gainers?apikey=${API_KEY}`
      );
      console.log(res.data);
      setGainers(res.data);
    } catch (e) {
      console.log("could not get gainers");
    }
  };

  useEffect(() => {
    getGainers();
  }, []);

  const renderGainers = (gainers) => {
    console.log("get gainers");
    return gainers.slice(0, 5).map((gainer, i) => {
      console.log(`${i} maps`);
      return <GainerItem key={i} gainer={gainer} />;
    });
  };

  return (
    <div className="movers-up">
      <h2>Top Gainers</h2>
      <div className="movers-header">
        <p className="movers-ticker">Ticker</p>
        <p className="movers-price">Price</p>
        <p className="moves-change">Change (%)</p>
      </div>
      {renderGainers(gainers)}
    </div>
  );
};
export default Gainers;
