import React from "react";
import WorkoutPanel from "./WorkoutsPanel";
import styled from "styled-components";

const StyledTemplate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const AddNewButton = styled.button`
  font-size: 24px;
  width: 100px;
  border-radius: 3px;
  border: 1px solid red;
  color:white; 
  background-color: red;  
  height: 40px;
  margin-right: 10px;
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

const TopBar = styled.div`  
  position: fixed;
  top:0;
  width:100%;
  display: flex;
  flex-direction: row; 
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background-color: white;
`;

const TrainingsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  span{
    margin-right: 10px;
  }
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
      {/*<TrainingsWrapper>*/}
      {/*  {data.map((plan, index) => (*/}
      {/*    <TrainingButton onClick={() => handleEditWorkout(index)}>*/}
      {/*      <p>Workout {index + 1} <i className="fa fa-gear"></i></p>*/}
      {/*      <p>{plan.slice(0, 3).map((exc, index) => (*/}
      {/*        <span>{exc.exc} {index < 2 && ","}</span>*/}
      {/*      ))}*/}
      {/*      </p>*/}
      {/*    </TrainingButton>*/}
      {/*  ))}*/}
      {/*</TrainingsWrapper>*/}

      {/*TODO: Remove when done*/}
      <WorkoutPanel data={data[0]}/>
    </StyledTemplate>
  );
};

export default EditTraining;