import React from "react";
import ListHeader from "./ListHeader";
import StockItem from "./StockItem";
import "../styles/Home.css";

//redux
import { connect } from "react-redux";

const MyStocks = ({ user }) => {
  const categories = ["symbol", "price", "change", "volume", "low", "high"];
  let { savedStocks } = user;

  const renderStockItems = () => {
    if (!savedStocks || savedStocks.length === 0)
      return <div>You have no saved stocks</div>;

    return savedStocks.map((ticker, i) => {
      return <StockItem key={i} ticker={ticker} categories={categories} />;
    });
  };

  return (
    <div className="mystocks">
      <div className="list-container">
        <ListHeader title={"My Stocks"} categories={categories} />
        {renderStockItems()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyStocks);
