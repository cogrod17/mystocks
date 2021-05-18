import React, { useState, useEffect } from "react";
import Loader from "./Loader";

import alphaVantage from "../api/alphaVantage";

const StockItem = ({ stock, categories, viewStock }) => {
  const [info, setInfo] = useState();
  const [color, setColor] = useState("greenyellow");
  const [loading, setLoading] = useState(true);

  const addCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getQuote = async (stock) => {
    console.log("running");
    try {
      const res = await alphaVantage.get("/query?", {
        params: { function: "GLOBAL_QUOTE", symbol: stock },
      });
      if (!res.data) throw new Error();

      //grabbing the keys and values and reorganizing
      const keys = Object.keys(res.data["Global Quote"]);
      const values = Object.values(res.data["Global Quote"]);
      let obj = {};
      await keys.map((key, i) => {
        return (obj[key.split(" ")[1]] = values[i]);
      });

      //Setting font color on info to red if it is in negatives for day
      if (obj.change && +obj.change.slice(0, obj.change.length - 1) < 0) {
        setColor("red");
      }

      obj.volume = addCommas(obj.volume);
      obj.price = Number(obj.price).toFixed(2);

      //setting state
      setInfo({ ...obj });
      return obj;
    } catch (e) {
      console.log(e);
      setInfo("error");
    }
  };

  useEffect(() => {
    let mounted = true;

    getQuote(stock)
      .then(() => {
        if (mounted) setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        if (mounted) setLoading(false);
      });
    return () => (mounted = false);
  }, [stock, categories]);

  const renderCategories = (categories) => {
    if (!info) return;
    console.log("rendering");
    if (info === "error") return <p className="listitem">cannot get info</p>;

    return categories.map((item, i) => {
      let fontColor = item === "change" || item === "price" ? color : "white";

      return (
        <p
          key={i}
          className={`listitem ${item}`}
          style={{
            color: `${fontColor}`,
          }}
        >
          {info[categories[i]]}
        </p>
      );
    });
  };

  return (
    <div
      onClick={() => {
        viewStock(info.symbol, info.price);
      }}
      className="list-item"
    >
      {loading ? <Loader /> : renderCategories(categories)}
    </div>
  );
};

export default StockItem;
