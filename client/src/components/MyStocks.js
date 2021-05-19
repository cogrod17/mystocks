import React from "react";

import ListHeader from "./ListHeader";
import StockItem from "./StockItem";
import "../styles/Home.css";

//WILL HAVE TO GET FAVORITE STOCKS PASSED DOWN AS PROPS

const MyStocks = ({ savedStocks, viewStock }) => {
  const categories = ["symbol", "price", "change", "volume", "low", "high"];

  if (!savedStocks) return (window.location.pathname = "/");

  const renderStockItems = (stocks) => {
    console.log("rendering stock items in MYSTOCKS");
    if (stocks === undefined) return;
    if (stocks.length === 0) return <div>You have no saved stocks</div>;
    return stocks.map((stock, i) => {
      return (
        <StockItem
          key={i}
          viewStock={viewStock}
          stock={stock}
          categories={categories}
        />
      );
    });
  };

  return (
    <div className="my-stocks">
      <div className="list-container">
        <ListHeader title={"My Stocks"} categories={categories} />
        {renderStockItems(savedStocks)}
      </div>
    </div>
  );
};

export default MyStocks;
