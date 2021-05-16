import React from "react";
import NavBar from "./NavBar";
import ListHeader from "./ListHeader";
import StockItem from "./StockItem";
import "../styles/Home.css";

//WILL HAVE TO GET FAVORITE STOCKS PASSED DOWN AS PROPS

const MyStocks = ({ savedStocks, viewStock }) => {
  const categories = ["symbol", "price", "volume", "change", "low", "high"];

  const renderStockItems = (stocks) => {
    console.log(stocks);
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
    <div>
      <NavBar />
      <div className="my-stocks">
        <div className="list-container">
          <ListHeader title={"My Stocks"} categories={categories} />
          {renderStockItems(savedStocks)}
        </div>
      </div>
    </div>
  );
};

export default MyStocks;
