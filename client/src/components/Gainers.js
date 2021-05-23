import React, { useState, useEffect } from "react";
import GainerItem from "./GainerItem";
import Loader from "./Loader";
import ListHeader from "./ListHeader";
import axios from "axios";

//https://financialmodelingprep.com/

const Gainers = ({ viewStock }) => {
  const [gainers, setGainers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "55291f85eb8b58745cc80fe4c443ba2c";

  const getGainers = async () => {
    try {
      const res = await axios.get(
        `https://financialmodelingprep.com/api/v3/gainers?apikey=${API_KEY}`
      );

      return res.data;
    } catch (e) {
      return ["error"];
    }
  };

  useEffect(() => {
    let mounted = true;

    getGainers()
      .then((data) => {
        if (mounted) {
          setGainers(data);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (mounted) {
          setGainers(e);
          setLoading(false);
        }
      });
    return () => (mounted = false);
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
      {loading ? <Loader /> : renderGainers(gainers)}
    </div>
  );
};
export default Gainers;
