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

  const onSaveClick = async (e) => {
    //console.log(user);
    //console.log("trying");
    try {
      const res = await axios.patch(
        "http://localhost:3001/users/update",
        { savedStocks: [...user.savedStocks, company.Symbol] },
        {
          headers: { Authorization: "Bearer " + user.token },
        }
      );
      //console.log(res);
      getUserInfo(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onRemoveClick = async () => {
    //console.log("deleting");
    let updated = user.savedStocks.filter((stock) => stock !== company.Symbol);
    //console.log(updated);

    try {
      const res = await axios.patch(
        "http://localhost:3001/users/update",
        { savedStocks: updated },
        { headers: { Authorization: "Bearer " + user.token } }
      );
      // console.log(res);
      getUserInfo(res.data);
      //console.log("deleted");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
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
        //console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setCompany("error");
      });

    //will need to add the stock to the dependency array
    //it will be passed from app
  }, [selectedStock]);

  const renderButton = () => {
    if (user.savedStocks.includes(selectedStock.stock)) {
      return (
        <p className="add" onClick={onRemoveClick}>
          Remove from my stocks
        </p>
      );
    }

    return (
      <p className="add" onClick={onSaveClick}>
        add to my stocks
      </p>
    );
  };

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
        {renderButton()}
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
