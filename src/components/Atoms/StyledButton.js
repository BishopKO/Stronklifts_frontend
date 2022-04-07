import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  width: 100px;
  height: 50px;
  min-width: fit-content;
  min-height: fit-content;
  font-size: 20px;
  border-radius: 3px;
  background-color: white;

  i {
    font-size: 100%;
  }

  ${({ small }) =>
    small &&
    css`
      width: 60px;
    `}

  ${({ big }) =>
    big &&
    css`
      width: 120px;
    `}
  
  ${({ full }) =>
    full &&
    css`
      width: 100%;
    `}
  
  
  ${({ red }) =>
    red &&
    css`
      border: 1px solid red;
      color: red;
    `}
  
  ${({ green }) =>
    green &&
    css`
      border: 1px solid green;
      color: rgba(0, 128, 0, 0.7);
    `}
  
  ${({ bgRed }) =>
    bgRed &&
    css`
      background-color: rgba(255, 0, 0, 0.7);
      border: 1px solid red;
      color: white;
    `}
  
  ${({ bgGreen }) =>
    bgGreen &&
    css`
      background-color: rgba(0, 128, 0, 0.7);
      border: 1px solid green;
      color: white;
    `}
  
   ${({ clear }) =>
    clear &&
    css`
      background-color: transparent;
      border: none;
      color: black;
    `}
`;
export default StyledButton;
