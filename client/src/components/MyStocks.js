import React from "react";
import NavBar from "./NavBar";
import ListHeader from "./ListHeader";
import StockItem from "./StockItem";
import "../styles/Home.css";

//WILL HAVE TO GET FAVORITE STOCKS PASSED DOWN AS PROPS

const MyStocks = () => {
  let stocks = ["IBM", "AAPL", "JPM"];

  const categories = ["symbol", "price", "volume", "change", "low", "high"];

  const renderStockItems = (stocks) => {
    return stocks.map((stock, i) => {
      return <StockItem key={i} stock={stock} categories={categories} />;
    });
  };

  return (
    <div>
      <NavBar />
      <div className="my-stocks">
        <div className="list-container">
          <ListHeader title={"My Stocks"} categories={categories} />
          {renderStockItems(stocks)}
        </div>
      </div>
    </div>
  );
};

export default MyStocks;
