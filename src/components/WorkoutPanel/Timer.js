import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import colors from "../../themes/colors";

const MainWrapper = styled.div`
  position: absolute;
  width: 100%;
  right: 0;
  top:0;
  text-align: center;
  p{
    padding-right: 5px;
    padding-top: 5px;
    margin:0;
    font-size: 26px;
    font-weight: bold;
    color:  ${colors.green}
  }  
`;

const Timer = ({ time }) => {
  return (
    <MainWrapper id="timer_wrapper">
      <p>PAUSE: {time} {scroll}</p>
    </MainWrapper>
  );
};

export default Timer;