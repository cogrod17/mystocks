import React from "react";
import InfoSection from "./InfoSection";

import { connect } from "react-redux";

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
      <InfoSection title={"Sector"} info={company.Sector} />
      <InfoSection
        title={"Market Cap"}
        info={addCommas(+company.MarketCapitalization)}
      />
      <InfoSection title={"P/E Ratio"} info={company.PERatio} />
      <InfoSection title={"Book Value"} info={company.BookValue} />
      <InfoSection
        title={"Yield"}
        info={(Number(company.DividendYield) * 100).toFixed(2)}
      />
      <InfoSection title={"EPS"} info={company.EPS} />
      <InfoSection title={"Profit Margin"} info={company.ProfitMargin} />
      <InfoSection title={"Price/Book"} info={company.PriceToBookRatio} />
      <InfoSection title={"Beta"} info={(+company.Beta).toFixed(2)} />
      <InfoSection
        title={"52w High"}
        info={Number(company["52WeekHigh"]).toFixed(2)}
      />
      <InfoSection
        title={"52w Low"}
        info={Number(company["52WeekLow"]).toFixed(2)}
      />
      <InfoSection
        title={"Shares Outstanding"}
        info={addCommas(+company.SharesOutstanding)}
      />
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(CompanyInfo);
