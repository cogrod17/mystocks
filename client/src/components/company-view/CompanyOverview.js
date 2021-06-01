import React, { useEffect } from "react";
import GraphContainer from "./graph/GraphContainer";
import CompanyInfo from "./CompanyInfo";
import AddRemoveBtn from "./AddRemoveBtn";
import Loader from "../reusables/Loader";

//redux
import { getUserInfo, getCompany, saveStock } from "../../actions";
import { connect } from "react-redux";

const CompanyOverview = ({ getCompany, company }) => {
  useEffect(() => {
    getCompany();
  }, [getCompany]);

  if (!company)
    return (
      <div className="company-overview">
        <Loader />
      </div>
    );

  if (company === ["error"])
    return (
      <div className="company-overview">
        <h1>Could not get company data</h1>
      </div>
    );

  return (
    <div className="company-overview">
      <AddRemoveBtn />
      <h1>{company.Name}</h1>
      <h2>{company.Symbol}</h2>
      <CompanyInfo />
      <GraphContainer />
      <div className="company-description">
        <h3>Company Profile</h3>
        <p>{company.Description}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  getUserInfo,
  getCompany,
  saveStock,
})(CompanyOverview);
