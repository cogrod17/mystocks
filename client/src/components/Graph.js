import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import alphaVantage from "../api/alphaVantage";
import {
  GradientDefs,
  Borders,
  XYPlot,
  XAxis,
  YAxis,
  LineSeries,
} from "react-vis";

const Graph = ({ stock }) => {
  const [loading, setLoading] = useState(true);
  const [firstPrice, setFirstPrice] = useState(0);
  const [lastPrice, setLastPrice] = useState(0);
  const [data, setData] = useState([]);

  //{x: date, y: adjusted close}

  //2021-05-14
  const orgData = async (timeSeries) => {
    console.log("organizing");

    setLastPrice(Number(timeSeries[0][1]["5. adjusted close"]));
    setFirstPrice(
      Number(timeSeries[timeSeries.length - 1][1]["5. adjusted close"])
    );

    let info = [];
    return timeSeries.map((date, i) => {
      let xy = {
        x: new Date(date[0]),
        y: Number(date[1]["5. adjusted close"]),
      };

      info.push(xy);
      if (i === timeSeries.length - 1) {
        setData(info);
      }
      return info;
    });
  };

  useEffect(() => {
    let mounted = true;
    alphaVantage
      .get("/query?", {
        params: {
          function: "TIME_SERIES_DAILY_ADJUSTED",
          symbol: stock.stock,
        },
      })
      .then((res) => {
        if (res.data.note) throw new Error();
        orgData(Object.entries(res.data["Time Series (Daily)"])).then(() => {
          if (mounted) setLoading(false);
        });

        //orgData(Object.entries(res.data["Time Series (Daily)"]));
        //console.log(res.data["Time Series (Daily)"]);
      })
      .catch((err) => {
        console.log(err);
        setData(["error"]);

        if (mounted) setLoading(false);
      }, []);

    return () => (mounted = false);
  }, [stock]);

  const renderGraph = () => {
    if (data[0] === "error") return <div>Cannot get graph</div>;

    return (
      <XYPlot
        height={300}
        width={900}
        xType="time"
        stroke={firstPrice < lastPrice ? "greenyellow" : "red"}
        style={{ border: "cyan solid 1px" }}
      >
        <GradientDefs>
          <linearGradient id="GreenGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="20%" stopColor="greenyellow" stopOpacity={0.6} />
            <stop
              offset="100%"
              stopColor="rgba(0, 0, 0, 0.3)"
              stopOpacity={0.3}
            />
          </linearGradient>
          <linearGradient id="RedGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="20%" stopColor="red" stopOpacity={0.6} />
            <stop
              offset="100%"
              stopColor="rgba(0, 0, 0, 0.3)"
              stopOpacity={0.3}
            />
          </linearGradient>
        </GradientDefs>
        <LineSeries
          style={{
            fill:
              firstPrice < lastPrice
                ? "url(#GreenGradient)"
                : "url(#RedGradient)",
            strokeWidth: 2,
          }}
          data={data}
        />

        <Borders
          style={{
            bottom: { fill: "#fff" },
            left: { fill: "#fff" },
            right: { fill: "#fff" },
            top: { fill: "#fff" },
          }}
        />
        <XAxis title="Date" />
        <YAxis title="Price" />
      </XYPlot>
    );
  };

  return <div className="graph">{loading ? <Loader /> : renderGraph()}</div>;
};

export default Graph;
