import React, { useEffect } from "react";
import ActivesItem from "./ActivesItem";
import Loader from "../reusables/Loader";
import ListHeader from "../reusables/ListHeader";

//redux
import { connect } from "react-redux";
import { getActives } from "../../actions";

const Actives = ({ getActives, actives }) => {
  useEffect(() => {
    getActives();
  }, [getActives]);

  const renderActives = () => {
    if (!actives || actives["Error Message"])
      return <div className="loader">There was an error!</div>;

    return actives.slice(0, 17).map((active, i) => {
      return <ActivesItem key={i} active={active} />;
    });
  };

  return (
    <div className="list-container">
      <ListHeader
        title={"Most Active"}
        categories={["Ticker", "Price", "Change"]}
      />
      {actives ? renderActives() : <Loader />}
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getActives })(Actives);
