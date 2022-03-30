import React, { useState } from "react";
import styled, { css } from "styled-components";
import colors from "../../themes/colors";

const CounterCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;   
  border-radius: 50%;
  width: 80%; 
  height: 80%;
  color: grey;  
  overflow: hidden;
 
  ${({ active }) => active && css`      
      border: none;
  `} 
   
  button{      
    margin: 0;
    width: 100%;
    height: 100%;
    color: white;  
    background: lightgrey;
    border: none;
    font-size: 10vw;
    
    ${({ active }) => active && css`
      color: white;
      background-color: red;
  `} 
  }  
`;


const RepsCounter = ({ reps, action }) => {
  const [currentReps, setReps] = useState(0);

  const update = () => {
    if (currentReps > 0) {
      setReps(currentReps - 1);
    } else {
      action();
      setReps(reps);
    }
  };

  return (
    <CounterCircle active={currentReps > 0}>
      <button onClick={() => update()}>{currentReps}</button>
    </CounterCircle>
  );
};

export default RepsCounter;