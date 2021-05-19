import React, { useState, useEffect } from "react";

import Graph from "./Graph";
import CompanyInfo from "./CompanyInfo";
import Loader from "./Loader";

import axios from "axios";
import "../styles/addbtn.css";
import alphaVantage from "../api/alphaVantage";

//COMPANY WILL BE PASSES DOWN AS A PROP

const CompanyOverview = ({ getUserInfo, selectedStock, user }) => {
  const [company, setCompany] = useState();
  const [loading, setLoading] = useState(true);

  const onSaveClick = async () => {
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
    let mounted = true;
    //console.log(selectedStock);
    alphaVantage
      .get("/query?", {
        params: {
          function: "OVERVIEW",
          symbol: selectedStock.stock,
        },
      })
      .then((res) => {
        if (res.data.Note) throw new Error();
        console.log(res);
        if (mounted) {
          setCompany(res.data);
          setLoading(false);
        }
        //console.log(res);
      })
      .catch((err) => {
        console.log(err);

        if (mounted) {
          setCompany("error");
          setLoading(false);
        }
      });
    return () => (mounted = false);
  }, [selectedStock]);

  const renderButton = () => {
    if (company === "error") return <div></div>;
    if (user.savedStocks.includes(selectedStock.stock)) {
      return (
        <div>
          <p className="add stock-btn" onClick={onRemoveClick}>
            Remove from my stocks
          </p>
        </div>
      );
    }

    return (
      <div>
        <p className="add stock-btn" onClick={onSaveClick}>
          add to my stocks
        </p>
      </div>
    );
  };

  if (loading)
    return (
      <div className="company-overview">
        <Loader />
      </div>
    );

  if (company === "error")
    return (
      <div className="company-overview">
        <h1>Could not get company data</h1>
      </div>
    );

  return (
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
  );
};

export default CompanyOverview;
