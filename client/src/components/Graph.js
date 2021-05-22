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
  AreaSeries,
} from "react-vis";

const Graph = ({ stock }) => {
  const [loading, setLoading] = useState(true);
  const [firstPrice, setFirstPrice] = useState(0);
  const [lastPrice, setLastPrice] = useState(0);
  const [data, setData] = useState([]);
  const [crosshairValues, setCrosshairValues] = useState([{ x: 0, y: 0 }]); //price
  const [date, setDate] = useState();
  const [mouseLocation, setMouseLocation] = useState({ x: 0, y: 0 });
  const [display, setDisplay] = useState("none");
  //{x: date, y: adjusted close}

  const borderStyles = {
    bottom: { fill: "#fff" },
    left: { fill: "#fff" },
    right: { fill: "#fff" },
    top: { fill: "#fff" },
  };

  const axisStyle = {
    ticks: {
      fontSize: "14px",
      color: "#333",
    },
    title: {
      fontSize: "16px",
      color: "#333",
    },
  };

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

  const getDate = (d) => {
    let date = new Date(d);
    setDate(
      [date.getMonth() + 1, date.getDate(), date.getFullYear()].join("-")
    );
  };

  const getXYValues = (value, { index }) => {
    getDate(value.x);
    setCrosshairValues([data[index]]);
  };

  const renderCrosshairs = () => {
    const { x, y } = mouseLocation;
    return (
      <div>
        <div
          className="crosshairs"
          style={{
            display: display,
            top: y - 40,
            left: x - 60,
          }}
        >
          <p>
            {crosshairValues
              ? `Price: $${Number(crosshairValues[0].y).toFixed(2)}`
              : ""}
          </p>
          <p>{`Date: ${date}`}</p>
        </div>
      </div>
    );
  };

  const watchMouse = (e) => {
    setDisplay("block");
    setMouseLocation({ x: e.clientX, y: e.clientY });
  };

  //<p>Date: {crosshairValues ? crosshairValues[0].x : ""}</p>
  const renderGraph = () => {
    if (data[0] === "error") return <div>Cannot get graph</div>;

    return (
      <div
        onMouseLeave={() => setDisplay("none")}
        onMouseMove={(e) => watchMouse(e)}
        className="graph"
      >
        {renderCrosshairs()}
        <XYPlot
          yPadding={17}
          height={300}
          width={900}
          xType="time"
          stroke={firstPrice < lastPrice ? "greenyellow" : "red"}
          style={{ border: "cyan solid 1px" }}
        >
          <GradientDefs>
            <linearGradient id="GreenGradient" x1="0" x2="0" y1="0" y2="5">
              <stop
                offset="20%"
                stopColor="rgba(94, 255, 0, 0.8)"
                stopOpacity={0.6}
              />
              <stop
                offset="10%"
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
          <AreaSeries
            style={{
              fill:
                firstPrice < lastPrice
                  ? "url(#GreenGradient)"
                  : "url(#RedGradient)",
              strokeWidth: 2,
            }}
            data={data}
            onNearestXY={getXYValues}
          />
          <Borders style={borderStyles} />
          <XAxis style={axisStyle} />
          <YAxis style={axisStyle} />
          <Crosshair values={crosshairValues} />
        </XYPlot>
      </div>
    );
  };

  return <div className="graph">{loading ? <Loader /> : renderGraph()}</div>;
};

export default Graph;
