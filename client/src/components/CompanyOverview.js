import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Graph from "./Graph";
import CompanyInfo from "./CompanyInfo";
import Loader from "./Loader";
import axios from "axios";
import "../styles/addbtn.css";
import alphaVantage from "../api/alphaVantage";

//COMPANY WILL BE PASSES DOWN AS A PROP

const CompanyOverview = ({ getUserInfo, selectedStock, user }) => {
  const [company, setCompany] = useState();

  const onButtonClick = async () => {
    try {
      console.log(user);
      const res = await axios.patch(
        "http://localhost:3001/users/update",
        { savedStocks: [...user.savedStocks, company.Symbol] },
        {
          headers: { Authorization: "Bearer " + user.token },
        }
      );
      console.log(res);
      getUserInfo(res.data);
      console.log(selectedStock.stock + "added to saved list!");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(selectedStock);
    alphaVantage
      .get("/query?", {
        params: {
          function: "OVERVIEW",
          symbol: selectedStock.stock,
        },
      })
      .then((res) => {
        if (res.data.Note) throw new Error();
        setCompany(res.data);
        console.log(res);
      })
      .catch(
        (err) => {
          console.log(err);
          setCompany("error");
        },
        [selectedStock]
      );

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
        <p className="add" onClick={onButtonClick}>
          add to my stocks
        </p>
        <h1>{company.Name}</h1>

        <h2>
          {selectedStock.price
            ? `${company.Symbol} ~ $${selectedStock.price}`
            : company.Symbol}
        </h2>
        <CompanyInfo company={company} />
        <Graph stock={selectedStock} />
        <div className="company-description">
          <h3>Company Profile</h3>
          <p>{company.Description}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;
