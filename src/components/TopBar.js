import styled from "styled-components";

const TopBar = styled.div`  
  position: fixed;
  padding: 0 10px 0 10px;
  top:0;
  left:0;
  width: 100vw;
  display: flex;
  flex-direction: row; 
  justify-content: space-between;
  align-items: center;
  height: 80px;
  overflow: hidden;
`;

export default TopBar;