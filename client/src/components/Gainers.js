import React, { useState, useEffect } from "react";
import GainerItem from "./GainerItem";
import Loader from "./Loader";
import ListHeader from "./ListHeader";
import axios from "axios";

//index.js:1 Warning: Can't perform a React state update on an
//unmounted component. This is a no-op, but it indicates a memory leak
//in your application. To fix, cancel all subscriptions and asynchronous
//tasks in a useEffect cleanup function.

//https://financialmodelingprep.com/

const Gainers = ({ viewStock }) => {
  const [gainers, setGainers] = useState([]);

  const API_KEY = "55291f85eb8b58745cc80fe4c443ba2c";

  const getGainers = async () => {
    try {
      const res = await axios.get(
        `https://financialmodelingprep.com/api/v3/gainers?apikey=${API_KEY}`
      );

      setGainers(res.data);
    } catch (e) {
      console.log("could not get gainers");
      setGainers(["error"]);
    }
  };

  useEffect(() => {
    getGainers();
  }, []);

  const renderGainers = (gainers) => {
    if (gainers[0] === "error")
      return <div className="loader">Could not render content</div>;

    return gainers.slice(0, 17).map((gainer, i) => {
      return <GainerItem key={i} viewStock={viewStock} gainer={gainer} />;
    });
  };

  return (
    <div className="list-container">
      <ListHeader
        title={"Top Gainers"}
        categories={["Ticker", "Price", "Change (%)"]}
      />
      {gainers.length === 0 ? <Loader /> : renderGainers(gainers)}
    </div>
  );
};
export default Gainers;
