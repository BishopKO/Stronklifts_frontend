import React from "react";
import styled, { css } from "styled-components";
import colors from "../../themes/colors";

const StyledButton = styled.button`;
  height: 100%;
  width: 100%;
  background-color: ${colors.white};  
  border: 2px solid rgba(36,128,36,0.73);  
  outline: none;    
  font-size: 2.5vh;   
  border-radius:5px;
  color: ${colors.darkBlue};
  opacity: 0.4;
  
  ${({ active }) => active && css`
      border: 2px solid ${colors.red};   
      opacity: 1;
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
            <div style={{ color: "grey", marginTop: "15px", fontSize: "22px" }}>{title}</div>
            {
              data.slice(0, 3).map((item) => (
                <StyledGridRow key={JSON.stringify(item)}>
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