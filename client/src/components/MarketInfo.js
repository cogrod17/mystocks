import React, { useState, useEffect } from "react";
import MarketIndexItem from "./MarketIndexItem";
import axios from "axios";

const MarketInfo = () => {
  const [marketInfo, setMarketInfo] = useState([]);

  //https://twelvedata.com/
  const API_KEY = "5f75c7639947410a99d3551417a18f60";

  const getMarketInfo = async () => {
    try {
      const res = await axios.get(`https://api.twelvedata.com/quote?`, {
        params: {
          symbol: "SPX,DJI,NDX,RUA",
          apikey: API_KEY,
        },
      });
      console.log(res.data);
      setMarketInfo(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMarketInfo();
  }, []);

  const renderMarketInfo = (marketInfo) => {
    const keys = Object.keys(marketInfo);
    return keys.map((key, i) => {
      return <MarketIndexItem key={i} index={marketInfo[key]} />;
    });
  };

  return (
    <div className="index">
      <h1>Market</h1>
      <div className="index-header">
        <p className="index-ticker">Index</p>
        <p className="index-price-head">Price</p>
        <p className="index-change">Change (%)</p>
      </div>
      {renderMarketInfo(marketInfo)}
    </div>
  );
};

export default MarketInfo;
