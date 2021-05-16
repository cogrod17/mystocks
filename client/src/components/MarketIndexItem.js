import React, { useState, useEffect } from "react";

const MarketIndexItem = ({ index, viewStock }) => {
  const [color, setColor] = useState("");

  const percent = +index.percent_change;
  const priceRounded = +index.open;

  useEffect(() => {
    if (percent >= 0) {
      setColor("greenyellow");
    }
    if (percent < 0) {
      setColor("red");
    }
  }, [percent]);

  ///CHANGE THESE TO GRID

  return (
    <div className="list-item">
      <p className="listitem symbol">{index.symbol}</p>
      <p className="listitem" style={{ color: color }}>
        {priceRounded.toFixed(2)}
      </p>
      <p className="listitem" style={{ color: color }}>
        {`${percent.toFixed(2)}%`}
      </p>
    </div>
  );
};

export default MarketIndexItem;
