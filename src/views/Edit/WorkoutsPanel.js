import React, { useState } from "react";
import TopBar from "../../components/TopBar";
import styled, { css } from "styled-components";

const MainTemplate = styled.div`
  width: 100%;
  margin-top: 80px; 
`;

const ExerciseButton = styled.button`
  width: 100%;
  border-radius: 5px;
  border: 1px solid rgba(255,0,0,0.8);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 24px;  
  margin-top: 10px;
  height: 70px;
  background-color: white;
  color: rgba(0,0,0,0.7);
  i{
    color:rgba(255,0,0,0.7);
  }    
`;

const SettingsPanel = styled.div`
  display: grid;
  grid-template-rows: 1fr 40px;
  padding:5px;
  width:100%;
  height: 200px;
  margin-top: 5px;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 20px;
  i{
    color:rgba(255,0,0,0.7);
    font-size: 26px;
  }
`;

const SettingsTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  p{    
    margin:0;
  }
`;

const SettingsBottom = styled.div`
  display: flex; 
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;  
`;

const SettingsRow = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  margin-top: 8px; 
`;

const StyledButton = styled.button`
  width: 100px;
  height: 40px;
  font-size: 20px;
  border-radius: 3px; 
  background-color: white;

  i{
    font-size: 22px;
  }
  ${({ red }) => red && css`
    border: 1px solid red;
    color: red;
  `}
  
  ${({ green }) => green && css`
    border: 1px solid green;
    color: green;
  `}
`;

const StyledInput = styled.input`
  font-size: 18px;
  border:none;
  border-bottom: 1px solid black;
`;

const BackButton = styled.button`
  font-size: 24px;
  width: 100px;
  height: 40px;
  border-radius: 3px;
  border: 1px solid red;
  color:red; 
  background-color: white;
  margin-left: 10px;
`;


const WorkoutPanel = ({ data }) => {
  const [showSettings, setShowSettings] = useState(null);

  const handleShowSettings = (index) => {
    if (showSettings === false) {
      setShowSettings(index);
    } else if (index !== showSettings && showSettings !== false) {
      setShowSettings(index);
    } else {
      setShowSettings(false);
    }

  };

  return (
    <MainTemplate>
      {data.map((exercise, index) => (
        <div style={{ width: "100%" }}>
          <ExerciseButton onClick={() => handleShowSettings(index)}>{exercise.exc}
            <i className="fa fa-sliders" aria-hidden="true"></i>
          </ExerciseButton>
          {showSettings === index &&
          <SettingsPanel>
            <SettingsTop>
              <SettingsRow>Workout name: <StyledInput defaultValue={exercise.exc}/></SettingsRow>
              <SettingsRow>Series:
                <select onChange={(element) => console.log(element.target.value)}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </SettingsRow>
              <SettingsRow>Reps:<StyledInput/>

              </SettingsRow>
              <SettingsRow>Weight (kg): <StyledInput/></SettingsRow>
            </SettingsTop>
            <SettingsBottom>
              <StyledButton red>
                <i className="fa fa-trash" aria-hidden="true"></i>
              </StyledButton>
              <StyledButton green>Save</StyledButton>
            </SettingsBottom>
          </SettingsPanel>
          }
        </div>
      ))
      }

    </MainTemplate>
  );
};

export default WorkoutPanel;