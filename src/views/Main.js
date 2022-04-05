import React, { useEffect, useState } from "react";
import WorkoutButton from "../components/WorkoutButton/WorkoutButton";
import axios from "axios";
import styled from "styled-components";
import colors from "../themes/colors";
import WorkoutPanel from "../components/WorkoutPanel/WorkoutPanel";
import EditTraining from "../views/Edit";
import StyledButton from "../components/Atoms/StyledButton";


const MainTemplate = styled.div`
  display: grid;   
  height: 100vh;
  grid-template-rows: 80px 1fr 1fr 1fr;
`;

const TopBar = styled.div`
  display: grid;
  grid-template-columns: 20% 60% 20%;  
  width: 100%;
  height: 100%; 
  border: none;   
  
  div{
    display: flex;
    flex-direction:column;
    align-items: center;    
    justify-content:center;  
    height: 100%;
  }
`;


const MainView = () => {
  const [trainingData, setTrainingData] = useState([]);
  const [activeTraining, setActiveTraining] = useState(-1);
  const [activeWorkout, setActiveWorkout] = useState(null);


  useEffect(() => {
    const access_token = localStorage.getItem("access");
    const headers = { Authorization: `Bearer ${access_token}` };
    axios.get(`${process.env.REACT_APP_BACKEND_ADDRESS}/api/get_training_data`, { headers: headers }).then(resp => {
      setTrainingData(JSON.parse(resp.data.data));
      setActiveWorkout(JSON.parse(resp.data.active_plan));
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

  if (activeTraining !== -1) {
    return (<WorkoutPanel data={trainingData[activeTraining]} handleSave={handleSaveTrainingData}/>);
  }

  return (
    <MainTemplate>
      <TopBar>
        <div>
          <StyledButton red onClick={handleLogout}>Logout</StyledButton>
        </div>
        <div style={{ fontSize: "26px", color: colors.red }}>STRONKLIFTS</div>
        <div>
          <StyledButton clear onClick={handleEditTraining}>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </StyledButton>

        </div>
      </TopBar>
      {trainingData.map((workout, index) => (
        <WorkoutButton key={JSON.stringify(workout)}
                       data={workout}
                       title={`Workout ${index + 1}`}
                       active={activeWorkout === index}
                       onClick={() => setActiveTraining(index)}/>
      ))}
    </MainTemplate>
  );
};

export default MainView;
