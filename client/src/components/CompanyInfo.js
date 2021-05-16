import React from "react";

const CompanyInfo = ({ company }) => {
  const addCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (company === "error")
    return (
      <div className="company-info">
        <h1>Cannot get information</h1>
      </div>
    );

  return (
    <div className="company-info">
      <div className="overview-section">
        <p className="overview-item overview-title">Sector:</p>
        <p className="overview-item overview-info">{company.Sector}</p>
      </div>
      <div className="overview-section">
        <p className="overview-item overview-title">Market Cap:</p>
        <p className="overview-item overview-info">
          {addCommas(+company.MarketCapitalization)}
        </p>
      </div>
      <div className="overview-section">
        <p className="overview-item overview-title">P/E ratio</p>
        <p className="overview-item overview-info">{company.PERatio}</p>
      </div>
      <div className="overview-section">
        <p className="overview-item overview-title">Book Value</p>
        <p className="overview-item overview-info">{company.BookValue}</p>
      </div>
      <div className="overview-section">
        <p className="overview-item overview-title">Yield</p>
        <p className="overview-item overview-info">
          {(Number(company.DividendYield) * 100).toFixed(2)}
        </p>
      </div>
      <div className="overview-section">
        <p className="overview-item overview-title">EPS</p>
        <p className="overview-item overview-info">{company.EPS}</p>
      </div>
      <div className="overview-section">
        <p className="overview-item overview-title">Profit Margin</p>
        <p className="overview-item overview-info">{company.ProfitMargin}</p>
      </div>
      <div className="overview-section">
        <p className="overview-item overview-title">Price/Book</p>
        <p className="overview-item overview-info">
          {company.PriceToBookRatio}
        </p>
      </div>
      <div className="overview-section">
        <p className="overview-item overview-title">Beta</p>
        <p className="overview-item overview-info">
          {(+company.Beta).toFixed(2)}
        </p>
      </div>
      <div className="overview-section">
        <p className="overview-item overview-title">52w High</p>
        <p className="overview-item overview-info">
          {Number(company["52WeekHigh"]).toFixed(2)}
        </p>
      </div>
      <div className="overview-section">
        <p className="overview-item overview-title">52w Low</p>
        <p className="overview-item overview-info">
          {Number(company["52WeekLow"]).toFixed(2)}
        </p>
      </div>
      <div className="overview-section">
        <p className="overview-item overview-title">Shares Outstanding</p>
        <p className="overview-item overview-info">
          {addCommas(+company.SharesOutstanding)}
        </p>
      </div>
    </div>
  );
};

export default CompanyInfo;
