import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import ListHeader from "./ListHeader";
import StockItem from "./StockItem";
import "../styles/MyStocks.css";
import axios from "axios";

// import Loader from "./Loader";

const API_KEY = `9VTUD3XE4HKHNVBM`;

//WILL HAVE TO GET FAVORITE STOCKS PASSED DOWN AS PROPS

const MyStocks = () => {
  const [stocks, setStocks] = useState({});
  const [loading, setLoading] = useState(true);
  const categories = ["Symbol", "Price", "Volume", "Change ($)", "Change (%)"];

  const getMyStocks = async () => {
    try {
      //https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo
      //promise.allSettled()
      let res = await axios.get("https://www.alphavantage.co/query?", {
        params: {
          function: "GLOBAL_QUOTE",
          symbol: "IBM",
          apikey: API_KEY,
        },
      });

      const keys = Object.keys(res.data["Global Quote"]);
      const values = Object.values(res.data["Global Quote"]);
      let obj = {};
      keys.map((key, i) => {
        obj[key.split(" ")[1]] = values[i];
      });
      console.log({ IMB: obj });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let mounted = true;
    getMyStocks().then(() => {
      if (mounted) setLoading(false);
    });

    return () => (mounted = false);
  }, []);

  return (
    <div>
      <NavBar />
      <div className="my-stocks">
        <div className="list-container">
          <ListHeader title={"My Stocks"} categories={categories} />
          <StockItem categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default MyStocks;
