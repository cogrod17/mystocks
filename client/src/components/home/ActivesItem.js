import React from "react";

//redux
import { connect } from "react-redux";
import { selectStock } from "../../actions";

const ActiveItem = ({ active, selectStock }) => {
  const percent = active.changesPercentage.slice(
    1,
    active.changesPercentage.length - 1
  );

  let color = percent[0] === "+" ? "greenyellow" : "red";

  return (
    <div
      onClick={() => selectStock(active.ticker, active.price)}
      className="list-item"
    >
      <p className="listitem symbol">{active.ticker}</p>
      <p className="listitem">{active.price}</p>
      <p className="listitem" style={{ color }}>
        {percent}
      </p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { selectStock })(ActiveItem);
