import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "../../themes/colors";

const StyledTemplate = styled.div`  
  display: grid;
  grid-template-rows: 20% 30% 30% 20%;
  position: absolute;
  padding: 10px;
  top: 30%;
  left: 0;
  right:0;
  margin: auto;
  background-color: ${colors.white};
  border: 1px solid ${colors.red};
  border-radius: 10px;
  height: 300px;
  width: 90%;
  z-index: 200;
      
  #exc_weight_title{
    padding-top: 10px;
    padding-left: 10px; 
    font-size: 20px;
    font-weight: bold;   
    justify-content: flex-start;
  }
  
  #exc_input{
    display: flex;
    justify-content: center;  
    width: 100%; 
    align-items: center;
  input{
    padding: 0;
    border: none;
    font-size: 45px;  
    background-color: transparent;
    font-weight: bold;
    border-bottom: 1px solid ${colors.red};
    color: ${colors.red};
    outline: none;
    width: 3em;
    text-align: center;
    }
  }
  
  #exc_plus_minus_buttons{
  display: flex;
  justify-content: space-around;
  align-items: center;
    button{
      font-weight: bold;
      font-size: 18px;
      border-radius: 5px;
      border: 1px solid ${colors.red};
      background-color: transparent;
      width: 40%;      
      height: 80%;
      color: ${colors.red};
    }
  }  
  
  #exc_cancel_ok_buttons{
    display: flex;
    justify-content: flex-end;
    align-items: center;    
    button{
      font-size: 18px;
      background-color: transparent;
      color: ${colors.red};
      border: none;     
      border-radius: 3px;
      height: 50%;   
      width: 25%;   
    }
  }
`;

const WeightSettings = ({ index, initWeight, parentAction }) => {
  const [weight, setWeight] = useState(parseFloat(initWeight));

  return (
    <StyledTemplate>
      <div id="exc_weight_title">Exercise weight:</div>
      <div id="exc_input"><input value={isNaN(weight) ? "" : weight}
                                 onChange={(element) => setWeight(parseFloat(element.target.value))}/>
      </div>
      <div id="exc_plus_minus_buttons">
        <button onClick={() => {
          setWeight(weight - 2.5);
        }}>-2.5kg
        </button>
        <button onClick={() =>
          setWeight(weight + 2.5)}>+2.5kg
        </button>
      </div>
      <div id="exc_cancel_ok_buttons">
        <button onClick={() => {
          parentAction(-1, initWeight);
        }}>CANCEL
        </button>
        <button onClick={() => {
          parentAction(index, weight);
        }}>OK
        </button>
      </div>
    </StyledTemplate>
  );
};
;

export default WeightSettings;
