import React, { useEffect } from "react";
import SectorItem from "./SectorItem";
import Loader from "./Loader";
import ListHeader from "./ListHeader";

//redux
import { connect } from "react-redux";
import { getSectors } from "../actions";

const Sectors = ({ getSectors, sectors }) => {
  useEffect(() => {
    getSectors();
  }, [getSectors]);

  const renderSectors = () => {
    if (!sectors || sectors === ["error"])
      return <div className="loader">Could not get sector data</div>;

    return sectors.map((sector, i) => {
      return <SectorItem key={i} sector={sector} />;
    });
  };

  return (
    <div className="list-container market-info">
      <ListHeader title={"Sectors"} categories={["Sector", "Change (%)"]} />
      {sectors ? renderSectors() : <Loader />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { getSectors })(Sectors);
