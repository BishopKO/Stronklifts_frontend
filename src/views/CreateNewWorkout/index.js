import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import TopBar from '../../components/Atoms/TopBar';
import WorkoutButton from './WorkoutButton';
import StyledButton from '../../components/Atoms/StyledButton';

const StyledTemplate = styled.div`
  display: grid;
  grid-template-rows: 80px 1fr;
  height: 100vh;
`;

const emptyExercise = {
  exc: 'Exercise Name',
  ser: 0,
  reps: 0,
  weight: 0,
  unit: 'kg',
};

const CreateNewWorkout = ({ goBack }) => {
  const [workoutData, setWorkoutData] = useState([{ ...emptyExercise }]);
  const [showSettings, setShowSettings] = useState(0);

  const handleUpdateData = (exerciseNumber, name, value) => {
    let tmpData = workoutData[exerciseNumber];
    tmpData[name] = value;
    setWorkoutData([...workoutData]);
  };

  const handleAddNewExercise = () => {
    setWorkoutData([...workoutData, { ...emptyExercise }]);
    setShowSettings(workoutData.length);
  };

  window.data = function () {
    workoutData.forEach((item) => console.log(item));
  };

  return (
    <StyledTemplate>
      <div>
        <TopBar>
          <StyledButton onClick={() => goBack()} red>
            Back
          </StyledButton>
          <StyledButton bgRed>Save</StyledButton>
        </TopBar>
      </div>
      <div>
        {workoutData.map((exercise, index) => (
          <WorkoutButton
            key={`exercise_${index}`}
            data={exercise}
            updateData={handleUpdateData}
            exerciseNumber={index}
            showSettings={index === showSettings}
            toggleSettings={() =>
              showSettings === index
                ? setShowSettings(null)
                : setShowSettings(index)
            }
          />
        ))}
      </div>
      <div style={{ height: '20px' }}></div>
      <StyledButton bgGreen full onClick={handleAddNewExercise}>
        Add
      </StyledButton>
    </StyledTemplate>
  );
};

export default CreateNewWorkout;
