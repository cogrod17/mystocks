import React from "react";

//redux
import { connect } from "react-redux";
import { selectStock } from "../actions";

const ActiveItem = ({ active, selectStock }) => {
  const trimPercent = active.changesPercentage.slice(
    1,
    active.changesPercentage.length - 1
  );

  let color = trimPercent[0] === "+" ? "greenyellow" : "red";

  return (
    <div
      onClick={() => selectStock(active.ticker, active.price)}
      className="list-item"
    >
      <p className="listitem symbol">{active.ticker}</p>
      <p className="listitem">{active.price}</p>
      <p className="listitem" style={{ color }}>
        {trimPercent}
      </p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { selectStock })(ActiveItem);
