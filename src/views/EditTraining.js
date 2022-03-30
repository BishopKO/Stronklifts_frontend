import React from "react";
import styled from "styled-components";

const StyledTemplate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackButton = styled.button`
  font-size: 24px;
  width: 100px;
  border-radius: 3px;
  border: 1px solid red;
  color:red; 
  background-color: white;
  margin-bottom: 50px;
`;

const AddNewButton = styled.button`
  font-size: 24px;
  width: 100px;
  border-radius: 3px;
  border: 1px solid red;
  color:white; 
  background-color: red;
  margin-bottom: 50px;
`;

const TrainingButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  margin-top: 10px; 
  border: 0.5px solid rgba(255,0,0,0.71);
  border-radius: 5px;
  background-color: white;
  width: 95%;  
  height: 100px;
  p:nth-child(1){
    width:100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 30px;
    text-align: left;
    padding: 0;
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

const TopBar = styled.div`
  width:95%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TrainingsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const EditTraining = ({ data, onClick }) => {

  const handleEditWorkout = (index) => {
    console.log(data[index]);
  };

  return (
    <StyledTemplate>
      <TopBar>
        <BackButton onClick={onClick}>Back</BackButton>
        <AddNewButton>Add</AddNewButton>
      </TopBar>
      <TrainingsWrapper>

        <div style={{
          displat: "flex",
          flexDirection: "column",
        }}>Excercise:<input/>Series:<input/>Reps:<input/>Weight:<input/></div>


        {data.map((item, index) => (
          <TrainingButton onClick={() => handleEditWorkout(index)}>
            <p>Workout {index + 1} <i className="fa fa-gear"></i></p>
            <p>Squat, Bench Press, Barbell Row</p>
          </TrainingButton>
        ))}
      </TrainingsWrapper>
    </StyledTemplate>
  );
};

export default EditTraining;