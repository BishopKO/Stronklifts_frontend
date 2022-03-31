import React from "react";
import data from "../../data/data";

const History = () => {
  const extractLastWeight = (data) => {

    data.forEach(workout => {
      workout.forEach(excercise => {
        const { exc, weight } = excercise;
        console.log(exc, weight);
      });
    });
  };

  extractLastWeight(data);
  // extractLastWeight(data);

  return (<div>History</div>);
};

export default History;