import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';
import { gsap } from 'gsap';
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

const StyledSavedSuccess = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: white;
  opacity: 0;
  z-index: -100;
  top: 0;

  p {
    margin-top: 150px;
    font-size: 40px;
    color: black;
  }
`;

const WorkoutPanel = ({
  addExercise,
  changeOrder,
  state,
  activeWorkout,
  data,
  goBack,
}) => {
  const [workoutData, setWorkoutData] = useState(data);
  const [showSettings, setShowSettings] = useState(null);
  const [moveSourceTarget, setMoveSourceTarget] = useState(null);

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

  const SaveAnimation = () => {
    const element = document.getElementById('save_success');
    gsap
      .to(element, {
        opacity: 1,
        zIndex: 5000,
        duration: 1,
      })
      .then(() => {
        gsap.to(element, {
          opacity: 0,
          zIndex: -100,
          duration: 0.2,
        });
      });
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
      .then(() => {
        SaveAnimation();
      });
  };
  const handleChangeOrder = (index) => {
    if (moveSourceTarget === null) {
      setMoveSourceTarget(index);
      setShowSettings(null);
    } else {
      changeOrder(activeWorkout, moveSourceTarget, index);
      setMoveSourceTarget(null);
    }
  };

  return (
    <MainTemplate>
      <StyledSavedSuccess id="save_success">
        <p>Saved!</p>
      </StyledSavedSuccess>
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
          active={moveSourceTarget === index}
          showSettings={showSettings === index}
          showAction={() => handleShowSettings(index)}
          changeOrderAction={() => handleChangeOrder(index)}
          handleUpdateData={handleUpdateData}
          handleRemoveExercise={() => handleRemoveExercise(index)}
          startChangeOrder={moveSourceTarget !== null}
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

    changeOrder: (workout_number, first_exercise, second_exercise) =>
      dispatch({
        type: 'change_order',
        payload: {
          workout_number: workout_number,
          first_exercise: first_exercise,
          second_exercise: second_exercise,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutPanel);
