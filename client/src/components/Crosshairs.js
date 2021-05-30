import React from "react";
import { connect } from "react-redux";

const Crosshairs = ({ crosshairValues, mouseLocation, display }) => {
  const { x, y } = mouseLocation;
  const { date, y: price } = crosshairValues;

  return (
    <div>
      <div>
        <div
          className="crosshairs"
          style={{
            display: display,
            top: y - 40,
            left: x - 60,
          }}
        >
          <p>{`Price: $${Number(price).toFixed(2)}`}</p>
          <p>{`Date: ${date}`}</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Crosshairs);
