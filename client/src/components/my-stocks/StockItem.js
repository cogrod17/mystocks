import React, { useEffect } from "react";
import Loader from "../reusables/Loader";
import StockData from "./StockData";

//redux
import { connect } from "react-redux";
import { selectStock, getGlobalQuote } from "../../actions";

const StockItem = (props) => {
  const {
    ticker,
    categories,
    selectStock,
    getGlobalQuote,
    globalQuotes,
  } = props;

  //check reducer to see if the quote has
  //already been fetched without an error
  let [data] = globalQuotes.filter((d, i) => {
    return d.symbol === ticker && !d.e;
  });

  useEffect(() => {
    if (data && data.length !== 0) return;
    getGlobalQuote(ticker);
  }, [ticker, getGlobalQuote, data]);

  if (!data)
    return (
      <div className="list-item">
        <Loader />
      </div>
    );

  return (
    <div
      onClick={() => {
        selectStock(ticker, data.price);
      }}
      className="list-item"
    >
      <StockData categories={categories} data={data} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { selectStock, getGlobalQuote })(
  StockItem
);
