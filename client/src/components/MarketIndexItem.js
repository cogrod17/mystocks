import React, { useState, useEffect } from "react";

const MarketIndexItem = ({ index }) => {
  const [color, setColor] = useState("");
  const [background, setBackground] = useState("");

  const percent = +index.percent_change;
  const priceRounded = +index.open;

  useEffect(() => {
    if (percent >= 0) {
      setBackground("rgba(3, 243, 3, 0.5)");
      setColor("greenyellow");
    }
    if (percent < 0) {
      setColor("red");
      setBackground("red");
    }
  }, [percent]);

  return (
    <div className="index-item">
      <p className="index-ticker">{index.symbol}</p>
      <p className="index-price" style={{ color: color }}>
        {priceRounded.toFixed(2)}
      </p>
      <p className="index-percent-change" style={{ background: background }}>
        {`${percent.toFixed(2)}%`}
      </p>
    </div>
  );
};

export default MarketIndexItem;
