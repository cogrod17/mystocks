import React from "react";
import { Link } from "react-router-dom";

const GainerItem = ({ gainer }) => {
  const percentage = gainer.changesPercentage;
  const trimPercent = percentage.slice(1, percentage.length - 1);

  return (
    <Link to="/companyoverview">
      <div className="list-item">
        <p className="listitem symbol">{gainer.ticker}</p>
        <p className="listitem">{gainer.price}</p>
        <p className="listitem" style={{ color: "greenyellow" }}>
          {trimPercent}
        </p>
      </div>
    </Link>
  );
};

export default GainerItem;
