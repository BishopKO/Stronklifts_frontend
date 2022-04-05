import React, { useState, useEffect, useReducer, useRef, useCallback } from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import StyledButton from "../../components/Atoms/StyledButton";
import WorkoutButton from "./WourkoutButton";
import TopBar from "../../components/TopBar";

const MainTemplate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 80px; 
`;

const WorkoutPanel = ({ state, activeWorkout, data, goBack }) => {
  const [workoutData, setWorkoutData] = useState(data);
  const [showSettings, setShowSettings] = useState(null);

  const handleRemoveExercise = (exercise_index) => {
    const tmpData = workoutData.filter((item, index) => {
      if (exercise_index !== index) {
        return item;
      }
    });
    setWorkoutData([...tmpData]);
  };

  const handleAddNew = () => {
    let tmpData = workoutData;
    const empty = { exc: "", ser: 0, reps: 0, weight: 0, unit: "kg" };
    // TODO: Rewrite to use redux (dispatch)
    // tmpData.push(empty);
    // setWorkoutData([...tmpData]);
    // setShowSettings(workoutData.length - 1);
  };

  const handleShowSettings = (index) => {
    setShowSettings(index === showSettings ? null : index);
  };

  const handleUpdateData = (index, data) => {
    let tmpData = workoutData;
    tmpData[index] = data;
    setWorkoutData([...tmpData]);
  };


  if (state.length === 0) {
    return (<div>Error... :(</div>);
  }

  return (
    <MainTemplate>
      <TopBar>
        <StyledButton red onClick={goBack}>Back</StyledButton>
        <StyledButton bgRed onClick={() => console.log(state)}>Save</StyledButton>
      </TopBar>
      {state[activeWorkout].map((exercise, index) => (
        <WorkoutButton key={JSON.stringify(`workout_${index}`)}
                       exerciseNumber={index}
                       workoutNumber={activeWorkout}
                       showAction={() => handleShowSettings(index)}
                       showSettings={showSettings === index}
                       handleUpdateData={handleUpdateData}
                       handleRemoveExercise={() => handleRemoveExercise(index)}
        />
      ))
      }
      <div style={{ height: "20px" }}></div>
      <StyledButton bgGreen full onClick={handleAddNew}>Add</StyledButton>

    </MainTemplate>
  );
};

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return {
    setData: (data) => dispatch({ type: "set_data", payload: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutPanel);