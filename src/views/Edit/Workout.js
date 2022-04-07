import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import StyledButton from '../../components/Atoms/StyledButton';
import WorkoutButton from './WourkoutButton';
import TopBar from '../../components/Atoms/TopBar';

const MainTemplate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 80px;
`;

const WorkoutPanel = ({ addExercise, state, activeWorkout, data, goBack }) => {
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
    addExercise(activeWorkout);
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
    return <div>Error... :(</div>;
  }

  const handleSave = () => {
    const access_token = localStorage.getItem('access');
    const config = { headers: { Authorization: `Bearer ${access_token}` } };
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/api/save_training_data/`,
        state,
        config,
      )
      .then((resp) => {
        console.log(resp);
      });
  };

  return (
    <MainTemplate>
      <TopBar>
        <StyledButton red onClick={goBack}>
          Back
        </StyledButton>
        <StyledButton bgRed onClick={handleSave}>
          Save
        </StyledButton>
      </TopBar>
      {state[activeWorkout].map((exercise, index) => (
        <WorkoutButton
          key={JSON.stringify(`workout_${index}`)}
          exerciseNumber={index}
          workoutNumber={activeWorkout}
          showAction={() => handleShowSettings(index)}
          showSettings={showSettings === index}
          handleUpdateData={handleUpdateData}
          handleRemoveExercise={() => handleRemoveExercise(index)}
        />
      ))}
      <div style={{ height: '20px' }}></div>
      <StyledButton bgGreen full onClick={handleAddNew}>
        Add
      </StyledButton>
    </MainTemplate>
  );
};

const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setData: (data) => dispatch({ type: 'set_data', payload: data }),
    addExercise: (activeWorkout) =>
      dispatch({ type: 'add_exercise', payload: activeWorkout }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutPanel);
