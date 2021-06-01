import React, { useEffect } from "react";
import Graph from "./Graph";
import Loader from "../../reusables/Loader";

//rdux
import { connect } from "react-redux";
import { getTimeSeries } from "../../../actions";

const GraphContainer = ({ getTimeSeries, seriesData }) => {
  useEffect(() => {
    getTimeSeries();
  }, [getTimeSeries]);

  if (seriesData === ["error"])
    return <div className="graph">Cannot get graph</div>;

  return <div className="graph">{seriesData ? <Graph /> : <Loader />}</div>;
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { getTimeSeries })(GraphContainer);
