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

  if (!seriesData)
    return (
      <div className="graph">
        <Loader />
      </div>
    );

  return (
    <div className="graph">
      <Graph />
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { getTimeSeries })(GraphContainer);
