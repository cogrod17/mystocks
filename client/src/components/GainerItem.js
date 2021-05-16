import React from "react";

const GainerItem = ({ gainer, viewStock }) => {
  const percentage = gainer.changesPercentage;
  const trimPercent = percentage.slice(1, percentage.length - 1);

  return (
    <div
      onClick={() => viewStock(gainer.ticker, gainer.price)}
      className="list-item"
    >
      <p className="listitem symbol">{gainer.ticker}</p>
      <p className="listitem">{gainer.price}</p>
      <p className="listitem" style={{ color: "greenyellow" }}>
        {trimPercent}
      </p>
    </div>
  );
};

export default GainerItem;
