import React, { useEffect } from "react";
import { connect } from "react-redux";

const SetReduxData = ({ setData, data }) => {
  useEffect(() => {
    setData(data);
  }, []);

  return (<div></div>);
};

const mapDispatchToProps = dispatch => {
  return {
    setData: (data) => dispatch({ type: "set_data", payload: data }),
  };
};

export default connect(null, mapDispatchToProps)(SetReduxData);
