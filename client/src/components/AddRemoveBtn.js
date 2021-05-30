import React from "react";

import { connect } from "react-redux";
import { saveStock, removeStock } from "../actions";

const AddRemoveBtn = (props) => {
  const { saveStock, removeStock, user, selectedStock, company } = props;

  if (!company) return null;

  if (user.savedStocks.includes(selectedStock.stock)) {
    return (
      <div>
        <p className="add stock-btn" onClick={removeStock}>
          Remove from my stocks
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="add stock-btn" onClick={saveStock}>
        add to my stocks
      </p>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { saveStock, removeStock })(
  AddRemoveBtn
);
