import React from "react";
import styled, { css } from "styled-components";
import colors from "../../themes/colors";

const StyledButton = styled.button`;
  height: 100%;
  width: 100%;
  background-color: ${colors.white}; 
  border: 1.5px solid ${colors.grey};    
  outline: none;    
  font-size: 2.5vh;   
  border-radius:5px;
  color: ${colors.darkBlue};
  
  ${({ active }) => active && css`
      border: 1.5px solid ${colors.red}; 
`}
`;

const StyledTemplate = styled.div`
  height: 100%;
  display: grid;  
  grid-template-rows: repeat(4, 25%);
`;

const StyledGridRow = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100%;
  width: 100%;  
  align-items: center;
  font-size: 20px;
`;

const WorkoutButton = ({ active, data, title, onClick }) => {
  if (data.length > 0) {
    return (
      <div style={{ padding: "2px" }}>
        <StyledButton onClick={() => onClick()} active={active}>
          <StyledTemplate>
            <div style={{ color: "grey", marginTop: "15px", fontSize: "18px" }}>{title}</div>
            {
              data.slice(0, 3).map((item) => (
                <StyledGridRow>
                  <div>{item.exc}</div>
                  <div>{item.ser}x{item.reps} {item.weight} {item.unit}</div>
                </StyledGridRow>
              ))
            }
          </StyledTemplate>
        </StyledButton>
      </div>
    );
  }

  return (<></>);

};

export default WorkoutButton;