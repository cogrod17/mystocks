import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import alphaVantage from "../api/alphaVantage";
import {
  GradientDefs,
  Borders,
  Crosshair,
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
  const [crosshairValues, setCrosshairValues] = useState([{ x: 0, y: 0 }]);
  const [mouseLocation, setMouseLocation] = useState({ x: 0, y: 0 });
  const [display, setDisplay] = useState("none");
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
        console.log(res.data);
        orgData(Object.entries(res.data["Time Series (Daily)"])).then(() => {
          if (mounted) setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
        setData(["error"]);

        if (mounted) setLoading(false);
      });

    return () => (mounted = false);
  }, [stock]);

  //<p>Date: {crosshairValues ? crosshairValues[0].x : ""}</p>
  const renderGraph = () => {
    if (data[0] === "error") return <div>Cannot get graph</div>;
    const { x, y } = mouseLocation;

    return (
      <div
        onMouseLeave={() => setDisplay("none")}
        onMouseMove={(e) => {
          setDisplay("block");
          setMouseLocation({ x: e.clientX, y: e.clientY });
        }}
        className="graph"
      >
        <div
          className="crosshairs"
          style={{
            display: display,
            top: y - 30,
            left: x - 30,
          }}
        >
          <p>
            {crosshairValues
              ? `Price: $${Number(crosshairValues[0].y).toFixed(2)}`
              : ""}
          </p>
        </div>
        <XYPlot
          height={300}
          width={900}
          xType="time"
          stroke={firstPrice < lastPrice ? "greenyellow" : "red"}
          style={{ border: "cyan solid 1px" }}
        >
          <GradientDefs>
            <linearGradient id="GreenGradient" x1="0" x2="50" y1="0" y2="50">
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
            onNearestXY={(value, { index }) => {
              //console.log(value.y); //price
              //console.log(value.x); //date
              setCrosshairValues([data[index]]);
            }}
          />

          <Borders
            style={{
              bottom: { fill: "rgba(0, 0, 0, 0.3)" },
              left: { fill: "#fff" },
              right: { fill: "#fff" },
              top: { fill: "#fff" },
            }}
          />
          <XAxis title="Date" />
          <YAxis title="Price" />
          <Crosshair
            values={crosshairValues}
            titleFormat={(d) => ({
              title: "Date",
              value: new Date(d[0].x).toLocaleDateString(),
            })}
          />
        </XYPlot>
      </div>
    );
  };

  return <div className="graph">{loading ? <Loader /> : renderGraph()}</div>;
};

export default Graph;