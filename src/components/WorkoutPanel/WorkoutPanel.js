import React, { useState, useRef, useReducer, useEffect } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import colors from "../../themes/colors";
import WeightSettings from "./WeightSettings";
import RepsCounter from "./RepsCounter";

const StyledTemplate = styled.div`
  display: grid;
    
  .WorkoutRow{
    display: grid;
    grid-template-columns: repeat(5, 20%);  
    width: 100%;
    height: 19vw;  
    align-items: center;
    justify-items: center; 
  }
  
  .Panel{    
    border-bottom: 1px solid red;
    padding: 5px;   
    height: 100%
  }
  
  .WorkoutRowTop{
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
    font-size: 20px;
    font-weight: bold;
    
    #workout_name{
      color: ${colors.black};    
      }
    
    #workout_weight{
      color: ${colors.red};
      border: none;
      font-size: inherit;
      font-weight: inherit;
      outline:none;
      background-color: transparent;
    } 
   }
   
   #finish_button{
      background-color: transparent;
      color: ${colors.red};      
      border: 1px solid ${colors.red};
      border-radius: 5px;
      font-size: 24px;      
      width: fit-content;
    }
`;

const Timer = styled.div`
  position: fixed;
  width: 100%;
  right: 0;
  bottom:0;
  text-align: center;
  background-color: green;
  z-index: 100;
  filter: opacity(0.8);
  p{
    padding-right: 5px;
    padding-top: 5px;
    margin:0;
    font-size: 28px;
    font-weight: bold;
    color:  white
  }  
`;

const WorkoutPanel = ({ data, handleSave }) => {
  const interval = useRef(null);
  const [planData, setPlanData] = useState(null);
  const [timer, setTimer] = useState(0);
  const [weightSettings, setShowWeightSettings] = useState(-1);

  useEffect(() => {
    setPlanData(data);
  }, [data]);

  const handleTimer = () => {
    interval.current = setInterval(() => {
      setTimer(timer => timer + 1);
    }, 1000);
  };

  const handleCounters = () => {
    if (timer > 0) {
      setTimer(0);
    } else {
      clearInterval(interval.current);
      handleTimer();
    }
  };

  const handleShowExcOptions = (index) => {
    setShowWeightSettings(index);
  };

  const handleUpdateWeight = (index, weight) => {
    if (index === -1) {
      setShowWeightSettings(-1);
    } else {
      planData[index].weight = weight;
      setShowWeightSettings(-1);
    }
  };

  if (planData === null) {
    return (<div>loading...</div>);
  }

  return (
    <StyledTemplate>
      <button id="finish_button" onClick={() => handleSave(planData)}>Finish</button>
      {planData.map((item, index) => {
          const { exc, ser, reps, weight, unit } = item;
          return (
            <div className="Panel" key={`panel_${index}`}>
              <div className="WorkoutRowTop">
                <p id="workout_name">{exc}</p>
                <button onClick={() => handleShowExcOptions(index)}
                        id="workout_weight">{ser}x{reps} {unit === "kg" ? weight : ""}{unit}</button>
                {index === weightSettings &&
                <>

                  <WeightSettings index={index}
                                  initWeight={weight}
                                  parentAction={handleUpdateWeight}
                  />
                </>
                }
              </div>
              <div className="WorkoutRow">
                {
                  Array(ser).fill(0).map(() => (
                      <RepsCounter reps={reps} index={index} action={handleCounters}/>
                    ),
                  )
                }
              </div>
            </div>
          );
        },
      )
      }
      <Timer><p>Pause: {timer}s</p></Timer>
      <div style={{ height: "28px" }}></div>
    </StyledTemplate>
  );


};

export default WorkoutPanel;