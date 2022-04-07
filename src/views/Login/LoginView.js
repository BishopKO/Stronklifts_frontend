import React, { useState } from 'react';
import axios from 'axios';
import clog from '../../utils';
import styled from 'styled-components';
import colors from '../../themes/colors';

const StyledLoginTemplate = styled.div`
  display: grid;
  grid-template-rows: 8% 35% 35% 1fr;
  justify-content: center;
  background-color: white;
  div {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

const StyledInput = styled.input`
  margin: auto;
  border: none;
  width: 90%;
  border-bottom: 1px solid grey;
  text-align: center;
  background-color: transparent;
  font-size: 24px;
  :focus {
    outline: none;
    background-color: transparent;
  }
`;

const StyledLoginButton = styled.button`
  width: 50%;
  height: 80%;
  border: 2px solid ${colors.green};
  border-radius: 15px;
  color: ${colors.green};
  font-size: 18px;
  font-weight: bold;
  background-color: white;
`;

const LoginView = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleLogin = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_ADDRESS}/api/token/`, {
        username: loginDetails.username,
        password: loginDetails.password,
      })
      .then((resp) => {
        const { refresh, access } = resp.data;
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
        window.location.replace('/');
      })
      .catch((err) => {
        clog(`Login: ${err.message}`);
        setError('Login Error');
      });
  };

  const handleOnChange = (element) => {
    const { name, value } = element.target;
    let tmpState = { ...loginDetails };
    tmpState[name] = value;
    setLoginDetails(tmpState);
  };

  return (
    <StyledLoginTemplate>
      <div>{error !== null && <p style={{ color: 'red' }}>Login error</p>}</div>
      <div>
        <StyledInput
          name="username"
          placeholder="username"
          onChange={(element) => handleOnChange(element)}
          value={loginDetails.username}
        />
      </div>
      <div>
        <StyledInput
          name="password"
          type="password"
          placeholder="password"
          onChange={(element) => handleOnChange(element)}
          value={loginDetails.password}
        />
      </div>
      <div>
        <StyledLoginButton onClick={handleLogin}>Login</StyledLoginButton>
      </div>
    </StyledLoginTemplate>
  );
};

export default LoginView;
