import React from "react";

const GainerItem = ({ gainer }) => {
  const percentage = gainer.changesPercentage;
  const trimPercent = percentage.slice(1, percentage.length - 1);

  return (
    <div className="list-item">
      <p className="listitem ticker">{gainer.ticker}</p>
      <p className="listitem">{gainer.price}</p>
      <p className="listitem" style={{ color: "greenyellow" }}>
        {trimPercent}
      </p>
    </div>
  );
};

export default GainerItem;
