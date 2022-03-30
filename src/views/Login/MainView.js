import React, { useState } from "react";
import styled, { css } from "styled-components";
import LoginView from "./LoginView";
import RegisterView from "./RegisterView";

const StyledTemplate = styled.div`
  display: grid;
  grid-template-rows: 10% 1fr;  
  border: 2px solid rgba(124,119,120,0.55);
  border-radius: 10px;
  top: 20%;
  position: absolute;  
  left: 0;
  right:0;
  margin: auto;    
  height: 300px;
  width: 90%;
  background-color: white;
  overflow: hidden;
  
  #top_buttons{
    display: flex;
    flex-direction: row;    
    width: 100%;  
  }
`;

const LoginButton = styled.button` 
  background-color: lightgrey;
  color: rgba(71,255,60,0.55);
  font-weight: bold;
  border: none; 
  width: 50%;
  font-size: 20px;
  
  ${({ active }) => active && css`   
    background-color: white;
    color: rgb(71,255,60);
  `}
`;

const RegisterButton = styled.button`
  width: 50%;
  border: none;
  background-color: lightgrey;
  color: rgba(255,0,0,0.55);
  font-weight: bold;
  font-size: 20px;
  
  ${({ active }) => active && css`     
    background-color: white;
    color: red;
  `}
`;

const StyledTitle = styled.p`
 text-align: center;
 font-size: 40px;
 padding: 0;
 margin: 20px 0 0 0;
 color: red;
`;

const MainView = () => {
  const [view, setView] = useState("login_view");

  return (
    <div>
      <StyledTitle>StronkLifts</StyledTitle>
      <StyledTemplate>
        <div id="top_buttons">
          {/*<button>Login</button>*/}
          <LoginButton active={view === "login_view"}
                       onClick={() => setView("login_view")}
          >Login</LoginButton>
          <RegisterButton active={view === "register_view"}
                          onClick={() => setView("register_view")}
          >Register</RegisterButton>
        </div>
        {view === "login_view" && <LoginView/>}
        {view === "register_view" && <RegisterView/>}
      </StyledTemplate>
    </div>
  );


};

export default MainView;