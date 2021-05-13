import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import alphaVantage from "../api/alphaVantage";

const StockItem = ({ stock, categories }) => {
  const [info, setInfo] = useState();
  const [color, setColor] = useState("white");
  const [loading, setLoading] = useState(true);

  const addCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getQuote = async (stock) => {
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

      //Setting font color on info
      if (obj.change && +obj.change.slice(0, obj.change.length - 1) < 0) {
        setColor("red");
      }
      if (obj.change && +obj.change.slice(0, obj.change.length - 1) > 0) {
        setColor("greenyellow");
      }

      obj.volume = addCommas(obj.volume);
      obj.price = Number(obj.price).toFixed(2);

      //setting state
      setInfo({ ...obj });
    } catch (e) {
      setInfo("error");
    }
  };

  useEffect(() => {
    let mounted = true;
    console.log("useEffect running");
    getQuote(stock).then(() => {
      if (mounted) setLoading(false);
    });
    return () => (mounted = false);
  }, [stock]);

  const renderCategories = (categories) => {
    if (info === "error") return <p className="listitem">cannot get info</p>;

    console.log("render categories running " + info.symbol);
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
    <Link to="/companyoverview">
      <div className="list-item">
        {loading ? <Loader /> : renderCategories(categories)}
      </div>
    </Link>
  );
};

export default StockItem;
