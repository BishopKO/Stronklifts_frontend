import React, { useState } from "react";
import styled from "styled-components";

const MainTemplate = styled.div`
  width: 95%;
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
  grid-template-rows: 1fr 20px;
  padding:5px;
  width:100%;
  height: 180px;
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
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 5px;
`;

const SettingsRow = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  margin-top: 5px;
`;


const WorkoutPanel = ({ data }) => {
  const [showSettings, setShowSettings] = useState(0);

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
        <div>
          <ExerciseButton onClick={() => handleShowSettings(index)}>{exercise.exc}
            <i className="fa fa-sliders" aria-hidden="true"></i>
          </ExerciseButton>
          {showSettings === index &&
          <SettingsPanel>
            <SettingsTop>
              <SettingsRow>Workout name: <input defaultValue={exercise.exc}/></SettingsRow>
              <SettingsRow>Series:
                <select onChange={(element) => console.log(element.target.value)}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </SettingsRow>
              <SettingsRow>Reps:<input/>

              </SettingsRow>
              <SettingsRow>Weight: <input/></SettingsRow>
            </SettingsTop>
            <SettingsBottom>

              <button>Save</button>
              <button>Delete</button>

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