import React, { useState, useEffect, useMemo, useCallback } from "react";
import Loader from "./Loader";

import alphaVantage from "../api/alphaVantage";

const StockItem = ({ stock, categories, viewStock }) => {
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(true);

  const addCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const orgData = useCallback((res) => {
    //grabbing the keys and values and reorganizing
    const keys = Object.keys(res.data["Global Quote"]);
    const values = Object.values(res.data["Global Quote"]);
    let obj = {};
    keys.map((key, i) => {
      return (obj[key.split(" ")[1]] = values[i]);
    });

    obj.volume = addCommas(obj.volume);
    obj.price = Number(obj.price).toFixed(2);
    return obj;
  }, []);

  useEffect(() => {
    let mounted = true;
    console.log("running");
    alphaVantage
      .get("/query?", {
        params: { function: "GLOBAL_QUOTE", symbol: stock },
      })
      .then((res) => {
        //onsole.log(res);
        if (!res.data || res.data.Note) throw new Error();

        if (mounted) {
          setInfo(orgData(res));
          setLoading(false);
        }
      })
      .catch((e) => {
        if (mounted) {
          console.log(e);
          setInfo("error");
          setLoading(false);
        }
      });

    return () => (mounted = false);
  }, [stock, categories, orgData]);

  const renderCategories = useMemo(() => {
    let color = "greenyellow";
    if (!info) return;
    if (info === "error") return <p className="listitem">cannot get info</p>;
    console.log(info);

    //Setting font color on info to red if it is in negatives for day
    if (info.change && +info.change.slice(0, info.change.length - 1) < 0) {
      color = "red";
    }

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
  }, [categories, info]);

  return (
    <div
      onClick={() => {
        viewStock(info.symbol, info.price);
      }}
      className="list-item"
    >
      {loading ? <Loader /> : renderCategories}
    </div>
  );
};

export default StockItem;
