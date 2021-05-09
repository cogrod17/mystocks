import React from "react";

const GainerItem = ({ gainer }) => {
  const percentage = gainer.changesPercentage;
  const trimPercent = percentage.slice(1, percentage.length - 1);

  return (
    <div className="gainer-item">
      <p className="gainer-ticker">{gainer.ticker}</p>
      <p className="gainer-price">{gainer.price}</p>
      <p className="gainer-percent-change">{trimPercent}</p>
    </div>
  );
};

export default GainerItem;
