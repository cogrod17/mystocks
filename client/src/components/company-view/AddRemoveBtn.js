import React from "react";

import { connect } from "react-redux";
import { saveStock, removeStock } from "../../actions";

const AddRemoveBtn = (props) => {
  const { saveStock, removeStock, user, selectedStock, company } = props;

  if (!company) return null;

  let isSaved = user.savedStocks.includes(selectedStock.stock);

  return (
    <div>
      <p className="add stock-btn" onClick={isSaved ? removeStock : saveStock}>
        {isSaved ? `Remove from my stocks` : `add to my stocks`}
      </p>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { saveStock, removeStock })(
  AddRemoveBtn
);
