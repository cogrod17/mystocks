import React, { useState } from "react";
import Crosshairs from "./Crosshairs";
import {
  GradientDefs,
  Borders,
  Crosshair,
  XYPlot,
  XAxis,
  YAxis,
  AreaSeries,
} from "react-vis";

import { connect } from "react-redux";

const Graph = ({ seriesData }) => {
  const [crosshairValues, setCrosshairValues] = useState({});
  const [mouseLocation, setMouseLocation] = useState({ x: 0, y: 0 });
  const [crosshairDisplay, setCrosshairDisplay] = useState("none");

  const { coords, color } = seriesData;

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

  const getCrosshairData = (value, { index }) => {
    let { x, y } = seriesData.coords[index];
    let d = new Date(x);
    let date = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("-");
    setCrosshairValues({ date, y });
  };

  const watchMouse = (e) => {
    setCrosshairDisplay("block");
    setMouseLocation({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseLeave={() => setCrosshairDisplay("none")}
      onMouseMove={(e) => watchMouse(e)}
    >
      <Crosshairs
        crosshairValues={crosshairValues}
        display={crosshairDisplay}
        mouseLocation={mouseLocation}
      />
      <XYPlot
        yPadding={17}
        height={300}
        width={900}
        xType="time"
        stroke={color}
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
        <AreaSeries
          style={{
            fill:
              color === "greenyellow"
                ? "url(#GreenGradient)"
                : "url(#RedGradient)",
            strokeWidth: 2,
          }}
          data={coords}
          onNearestXY={getCrosshairData}
        />
        <Borders style={borderStyles} />
        <XAxis style={axisStyle} />
        <YAxis style={axisStyle} />
        <Crosshair />
      </XYPlot>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Graph);
