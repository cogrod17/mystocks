import React, { useState, useEffect, useMemo, useCallback } from "react";
import MarketIndexItem from "./MarketIndexItem";
import Loader from "./Loader";
import ListHeader from "./ListHeader";
import axios from "axios";

//index.js:1 Warning: Can't perform a React state update on an
//unmounted component. This is a no-op, but it indicates a memory leak
//in your application. To fix, cancel all subscriptions and asynchronous
//tasks in a useEffect cleanup function.

// code: 429
// message: "You have reached the API calls limit. 9 quotes requested per minute, limit is 8. You can either wait for a while or extend the limits according to your needs by selecting the appropriate plan at https://twelvedata.com/pricing"
// status: "error"

const MarketInfo = ({ viewStock }) => {
  const [marketInfo, setMarketInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  //https://twelvedata.com/
  const API_KEY = "5f75c7639947410a99d3551417a18f60";

  const getMarketInfo = useCallback(async () => {
    try {
      const res = await axios.get(`https://api.twelvedata.com/quote?`, {
        params: {
          symbol: "SPX,DJI,NDX,RUA,AGG,BIG",
          apikey: API_KEY,
        },
      });

      if (res.data.code === 429) throw new Error();
      return res.data;
      //setMarketInfo(res.data);
    } catch (e) {
      console.log(e);
      return ["error"];
      //setMarketInfo(["error"]);
      //setLoading(false);
    }
  }, [API_KEY]);

  useEffect(() => {
    let mounted = true;
    getMarketInfo()
      .then((data) => {
        if (mounted) {
          setMarketInfo(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setMarketInfo(err);
          setLoading(false);
        }
      });
    //console.log(sumPercentChange);

    return () => (mounted = false);
  }, [getMarketInfo]);

  //let sumPercentChange = 0;

  const renderMarketInfo = useMemo(() => {
    if (marketInfo[0] === "error")
      return <div className="loader">Could not get market data</div>;

    const keys = Object.keys(marketInfo);
    return keys.map((key, i) => {
      //sumPercentChange += marketInfo[key].percent_change;
      return (
        <MarketIndexItem
          key={i}
          viewStock={viewStock}
          index={marketInfo[key]}
        />
      );
    });
  }, [marketInfo, viewStock]);

  return (
    <div className="list-container market-info">
      <ListHeader
        title={"Markets"}
        categories={["Symbol", "Price", "Change (%)"]}
      />
      {loading ? <Loader /> : renderMarketInfo}
    </div>
  );
};

export default MarketInfo;
