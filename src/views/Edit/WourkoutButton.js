import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

const SettingsTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  p {
    margin: 0;
  }
`;

const ExerciseButton = styled.button`
  width: 100%;
  border-radius: 5px;
  border: 1px solid rgba(255, 0, 0, 0.8);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 24px;
  margin-top: 10px;
  height: 70px;
  background-color: white;
  color: rgba(0, 0, 0, 0.7);
  i {
    color: rgba(255, 0, 0, 0.7);
  }

  ${({ active }) =>
    active &&
    css`
      opacity: 0.3;
    `}
`;

const SettingsPanel = styled.div`
  display: grid;
  grid-template-rows: 1fr 40px;
  padding: 5px;
  width: 100%;
  height: 200px;
  margin-top: 5px;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 20px;
  i {
    color: rgba(255, 0, 0, 0.7);
    font-size: 26px;
  }
`;

const SettingsRow = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  margin-top: 8px;
`;

const SettingsBottom = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const StyledInput = styled.input`
  font-size: 18px;
  border: none;
  border-bottom: 1px solid black;
`;

const StyledButton = styled.button`
  width: 100px;
  height: 40px;
  font-size: 20px;
  border-radius: 3px;
  background-color: white;

  i {
    font-size: 22px;
  }
  ${({ red }) =>
    red &&
    css`
      border: 1px solid red;
      color: red;
    `}

  ${({ green }) =>
    green &&
    css`
      border: 1px solid green;
      color: green;
    `}
`;

const GenerateSelect = ({ defaultValue, onChange, name, qty }) => {
  return (
    <div>
      <select onChange={onChange} value={defaultValue} name={name}>
        {Array(qty)
          .fill(0)
          .map((item, index) => (
            <option key={`select_${index}`} value={index + 1}>
              {index + 1}
            </option>
          ))}
      </select>
    </div>
  );
};

const WorkoutButton = ({
  state,
  removeExercise,
  updateData,
  workoutNumber,
  exerciseNumber,
  showSettings,
  showAction,
  changeOrderAction,
  startChangeOrder,
  active,
}) => {
  const workoutData = state[workoutNumber][exerciseNumber];
  let firstClickTimeout = null;

  const handleSingleDoubleClick = () => {
    if (startChangeOrder) {
      changeOrderAction();
    } else {
      if (firstClickTimeout === null) {
        firstClickTimeout = setTimeout(() => {
          firstClickTimeout = null;
          showAction();
        }, 150);
      } else {
        clearTimeout(firstClickTimeout);
        firstClickTimeout = null;
        changeOrderAction();
      }
    }
  };

  const updateWorkoutData = (element) => {
    let { name, value } = element.target;
    let tmpData = workoutData;
    tmpData[name] = value;
    updateData(workoutNumber, exerciseNumber, tmpData);
  };

  const handleRemoveExercise = () => {
    removeExercise(workoutNumber, exerciseNumber);
    showAction();
  };

  return (
    <div style={{ width: '100%' }}>
      <ExerciseButton active={active} onClick={handleSingleDoubleClick}>
        <div>{workoutData.exc}</div>
        <i className="fa fa-sliders" aria-hidden="true"></i>
      </ExerciseButton>
      {showSettings && (
        <SettingsPanel>
          <SettingsTop>
            <SettingsRow>
              Workout name:{' '}
              <StyledInput
                value={workoutData.exc}
                name="exc"
                onChange={updateWorkoutData}
              />
            </SettingsRow>
            <SettingsRow>
              Series:
              <GenerateSelect
                defaultValue={workoutData.ser}
                name="ser"
                onChange={updateWorkoutData}
                value={workoutData.ser}
                qty={20}
              />
            </SettingsRow>

            <SettingsRow>
              Reps:
              <GenerateSelect
                defaultValue={workoutData.reps}
                name="reps"
                onChange={updateWorkoutData}
                value={workoutData.reps}
                qty={20}
              />
            </SettingsRow>
            <SettingsRow>
              Weight (kg):
              <StyledInput
                name="weight"
                value={workoutData.weight}
                onChange={updateWorkoutData}
              />
            </SettingsRow>
          </SettingsTop>
          <SettingsBottom>
            <StyledButton red onClick={handleRemoveExercise}>
              <i className="fa fa-trash" aria-hidden="true"></i>
            </StyledButton>
          </SettingsBottom>
        </SettingsPanel>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateData: (workout_number, exercise_number, value) =>
      dispatch({
        type: 'update_data',
        payload: {
          workout_number: workout_number,
          exercise_number: exercise_number,
          value,
        },
      }),
    removeExercise: (workout_number, exercise_number) =>
      dispatch({
        type: 'remove_exercise',
        payload: {
          workout_number: workout_number,
          exercise_number: exercise_number,
        },
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WorkoutButton);
