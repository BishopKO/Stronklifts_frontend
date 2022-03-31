import React, { useEffect, useState } from "react";
import WorkoutButton from "../components/WorkoutButton/WorkoutButton";
import axios from "axios";
import styled from "styled-components";
import colors from "../themes/colors";
import WorkoutPanel from "../components/WorkoutPanel/WorkoutPanel";
import EditTraining from "../views/EditTraining";

const MainTemplate = styled.div`
  display: grid;
  box-sizing: border-box;  
  width: 100%;
  height: 100vh;
  grid-template-rows: 7% 30% 30% 30%;
`;

const TopBar = styled.div`
  display: grid;
  grid-template-columns: 20% 60% 20%;  
  width: 100%;
  height: 95%; 
  padding: 3px;
  border: none;   
  
  div{
    display: flex;
    flex-direction:column;
    align-items: center;    
    justify-content:center;  
    height:100%;
  }
`;

const EditButton = styled.button`
  outline: none;  
  width: 100%;
  height: 100%;
  border: 1.5px solid ${colors.red};
  border-radius:5px;
  font-weight: bold;
  background-color: transparent;  
  padding:0;
  margin:0;
  font-size:18px;
  color: ${colors.red};   
`;

const LogoutButton = styled.button`
 outline: none;  
  width: 100%;
  height: 100%;
  border: 1.5px solid ${colors.red};
  background-color: ${colors.red};
  border-radius:5px;
  padding:0;
  margin:0;
  font-size:18px;
  color: white;
`;

const MainView = () => {
  const [trainingData, setTrainingData] = useState(null);
  const [activeTraining, setActiveTraining] = useState(-1);

  useEffect(() => {
    const access_token = localStorage.getItem("access");
    const headers = { Authorization: `Bearer ${access_token}` };
    axios.get(`${process.env.REACT_APP_BACKEND_ADDRESS}/api/get_training_data`, { headers: headers }).then(resp => {
      setTrainingData(JSON.parse(resp.data.data));
    });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleSaveTrainingData = (data) => {
    const access_token = localStorage.getItem("access");
    const config = { headers: { Authorization: `Bearer ${access_token}` } };
    let tmpData = trainingData;
    tmpData[activeTraining] = data;

    axios.post(`${process.env.REACT_APP_BACKEND_ADDRESS}/api/save_training_data/`,
      tmpData, config).then(() => setActiveTraining(-1));
  };

  const handleEditTraining = () => {
    setActiveTraining("edit_view");
  };

  if (activeTraining === "edit_view") {
    return (<EditTraining onClick={() => setActiveTraining(-1)} data={trainingData}/>);
  }

  if (trainingData === null) {
    console.log("error");
    return (<div>No training data:(</div>);
  }

  if (activeTraining !== -1) {
    return (<WorkoutPanel data={trainingData[activeTraining]} handleSave={handleSaveTrainingData}/>);
  }

  return (
    <MainTemplate>
      <TopBar>
        <div><LogoutButton onClick={handleLogout}>Logout</LogoutButton></div>
        <div style={{ fontSize: "26px", color: colors.red }}>STRONKLIFTS</div>
        <div>
          <EditButton onClick={handleEditTraining}>
            Edit
          </EditButton>

        </div>
      </TopBar>
      {trainingData.map((plan, index) => (
        <WorkoutButton data={plan}
                       title={`Workout ${index + 1}`}
                       active={true}
                       onClick={() => setActiveTraining(index)}/>
      ))}
    </MainTemplate>
  );
};

export default MainView;
