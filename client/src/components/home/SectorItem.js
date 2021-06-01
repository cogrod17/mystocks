import React from "react";

const SectorItem = ({ sector }) => {
  const trimPercent = sector.changesPercentage.slice(
    1,
    sector.changesPercentage.length - 1
  );

  let color = trimPercent[0] === "-" ? "red" : "greenyellow";

  return (
    <div className="list-item">
      <p className="listitem symbol">{sector.sector}</p>
      <p className="listitem" style={{ color: color }}>
        {`${Number(trimPercent).toFixed(2)}%`}
      </p>
    </div>
  );
};

export default SectorItem;
