import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Graph from "./Graph";
import Loader from "./Loader";
import alphaVantage from "../api/alphaVantage";

//COMPANY WILL BE PASSES DOWN AS A PROP

const CompanyOverview = () => {
  const [company, setCompany] = useState();

  useEffect(() => {
    console.log("useeffect running");
    alphaVantage
      .get("/query?", {
        params: {
          function: "OVERVIEW",
          symbol: "JPM",
        },
      })
      .then((res) => {
        setCompany(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setCompany("error");
      });

    //will need to add the stock to the dependency array
    //it will be passed from app
  }, []);

  if (!company)
    return (
      <div>
        <NavBar />
        <div className="company-overview">
          <Loader />
        </div>
      </div>
    );

  if (company === "error")
    return (
      <div>
        <NavBar />
        <div className="company-overview">
          <h1>Could not get company data</h1>
        </div>
      </div>
    );

  return (
    <div>
      <NavBar />
      <div className="company-overview">
        <h2>{company.Symbol}</h2>
        <h1>{company.Name}</h1>

        <h3>Statistics</h3>
        <div className="company-info">
          <div className="overview-section">
            <p className="overview-item overview-title">Sector:</p>
            <p className="overview-item overview-info">{company.Sector}</p>
          </div>
          <div className="overview-section">
            <p className="overview-item overview-title">Market Cap:</p>
            <p className="overview-item overview-info">
              {company.MarketCapitalization}
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
            <p className="overview-item overview-info">
              {company.ProfitMargin}
            </p>
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
              {company.SharesOutstanding}
            </p>
          </div>
        </div>
        <Graph />
        <div className="company-description">
          <h3>Company Profile</h3>
          <p>{company.Description}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;
