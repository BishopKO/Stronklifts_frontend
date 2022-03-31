import React, { useState } from "react";
import WorkoutPanel from "./WorkoutsPanel";
import TopBar from "../../components/TopBar";
import styled from "styled-components";

const StyledTemplate = styled.div`
  width: 100%;
  display: flex;  
  flex-direction: column;
  align-items: center; 
`;

const TrainingButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  margin-top: 10px; 
  border: 0.5px solid rgba(255,0,0,0.71);
  border-radius: 5px;
  background-color: white;
  width: 100%;  
  height: 100px;
  padding: 10px;
  color: rgba(0,0,0,0.7);
  p:nth-child(1){
    width:100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 30px;
    text-align: left;    
    margin: 0;   
    i{
      color:lightgrey;  
    }
  }
  p:nth-child(2){
    color: grey;
    font-size: 16px;
  }
`;

const AddNewButton = styled.button`
  font-size: 24px;
  width: 100px;
  border-radius: 3px;
  border: 1px solid red;
  color:white; 
  background-color: red;  
  height: 40px;  
`;

const BackButton = styled.button`
  font-size: 24px;
  width: 100px;
  height: 40px;
  border-radius: 3px;
  border: 1px solid red;
  color:red; 
  background-color: white;
`;


const TrainingsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 80px;  
  span{
    margin-right: 10px;
  }
`;

const StyledContent = styled.div`
  width:100%;
  position: relative;  
`;

const EditTraining = ({ data, onClick }) => {
  const [edit, setEdit] = useState(null);

  const handleEditWorkout = (index) => {
    console.log(index);
    setEdit(index);
  };

  return (
    <StyledTemplate>
      {edit === null &&
      <TrainingsWrapper>
        <TopBar>
          <BackButton onClick={onClick}>Back</BackButton>
          <AddNewButton>Add</AddNewButton>
        </TopBar>
        <StyledContent>
          {data.map((plan, index) => (
            <TrainingButton onClick={() => handleEditWorkout(index)}>
              <p>Workout {index + 1} <i className="fa fa-gear"></i></p>
              <p>{plan.slice(0, 3).map((exc, index) => (
                <span>{exc.exc} {index < 2 && ","}</span>
              ))}
              </p>
            </TrainingButton>
          ))}
        </StyledContent>
      </TrainingsWrapper>
      }
      {edit !== null &&
      <div style={{ width: "100%" }}>
        <TopBar>
          <BackButton onClick={() => setEdit(null)}>Back</BackButton>
        </TopBar>
        <WorkoutPanel data={data[edit]}/>
      </div>
      }
    </StyledTemplate>
  );

};
export default EditTraining;