import React, { useEffect } from "react";
import Loader from "./Loader";

//redux
import { connect } from "react-redux";
import { selectStock, getGlobalQuote } from "../actions";

const StockItem = (props) => {
  const {
    ticker,
    categories,
    selectStock,
    getGlobalQuote,
    globalQuotes,
  } = props;

  ///find the right stock data
  let datas = globalQuotes.filter((d, i) => {
    return d.symbol === ticker;
  });
  let [data] = datas.slice(-1);

  useEffect(() => {
    getGlobalQuote(ticker);
  }, [ticker, getGlobalQuote]);

  if (!data)
    return (
      <div className="list-item">
        <Loader />
      </div>
    );

  const renderCategories = () => {
    if (data.e) return <p className="listitem">cannot get info</p>;

    return categories.map((item, i) => {
      let fontColor =
        item === "change" || item === "price" ? data.color : "white";

      return (
        <p
          key={i}
          className={`listitem ${item}`}
          style={{
            color: fontColor,
          }}
        >
          {data[categories[i]]}
        </p>
      );
    });
  };

  return (
    <div
      onClick={() => {
        selectStock(ticker, data.price);
      }}
      className="list-item"
    >
      {renderCategories()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { selectStock, getGlobalQuote })(
  StockItem
);
