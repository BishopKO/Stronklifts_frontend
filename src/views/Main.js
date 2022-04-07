import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import WorkoutButton from '../components/WorkoutButton/WorkoutButton';
import colors from '../themes/colors';
import WorkoutPanel from '../components/WorkoutPanel/WorkoutPanel';
import EditTraining from '../views/Edit';
import StyledButton from '../components/Atoms/StyledButton';
import TopBar from '../components/Atoms/TopBar';

const MainTemplate = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledMenu = styled.div`
  display: none;

  ${({ isVisible }) =>
    isVisible &&
    css`
      display: block;
      position: fixed;
      top: 70px;
      right: 10px;
      width: 150px;
      height: fit-content;
      background-color: white;
      border-radius: 10px;
      border: 1px solid green;
    `}
`;

const StyledBreakLine = styled.div`
  background-color: lightgrey;
  margin: 5px 0 0 0;
  width: 100%;
  height: 1px;
`;

const MainView = () => {
  const [trainingData, setTrainingData] = useState([]);
  const [activeTraining, setActiveTraining] = useState(-1);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const access_token = localStorage.getItem('access');
    const headers = { Authorization: `Bearer ${access_token}` };
    axios
      .get(`${process.env.REACT_APP_BACKEND_ADDRESS}/api/get_training_data`, {
        headers: headers,
      })
      .then((resp) => {
        setTrainingData(JSON.parse(resp.data.data));
        setActiveWorkout(JSON.parse(resp.data.active_plan));
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleSaveTrainingData = (data) => {
    const access_token = localStorage.getItem('access');
    const config = { headers: { Authorization: `Bearer ${access_token}` } };
    let tmpData = trainingData;
    tmpData[activeTraining] = data;

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/api/save_training_data/`,
        tmpData,
        config,
      )
      .then(() => setActiveTraining(-1));
  };

  const handleEditTraining = () => {
    setActiveTraining('edit_view');
    setMenuVisible(false);
  };

  if (activeTraining === 'edit_view') {
    return (
      <EditTraining onClick={() => setActiveTraining(-1)} data={trainingData} />
    );
  }

  if (activeTraining !== -1) {
    return (
      <WorkoutPanel
        data={trainingData[activeTraining]}
        handleSave={handleSaveTrainingData}
      />
    );
  }

  return (
    <MainTemplate>
      <TopBar>
        <div
          style={{
            fontSize: '35px',
            fontWeight: 'bold',
            color: colors.red,
            width: '70%',
            textAlign: 'center',
          }}
        >
          STRONKLIFTS
        </div>
        <div style={{ width: '20%' }}>
          <StyledButton
            green
            full
            big
            onClick={() => setMenuVisible(!menuVisible)}
            style={{ position: 'relative' }}
          >
            <i className="fa fa-bars" aria-hidden="true"></i>
          </StyledButton>
          <StyledMenu isVisible={menuVisible}>
            <StyledButton clear full onClick={handleEditTraining}>
              Create New
            </StyledButton>
            <StyledButton clear full onClick={handleEditTraining}>
              Edit
            </StyledButton>
            <StyledBreakLine />
            <StyledButton
              style={{ color: 'red' }}
              clear
              full
              onClick={handleLogout}
            >
              Logout
            </StyledButton>
          </StyledMenu>
        </div>
      </TopBar>
      <div style={{ height: '80px' }}></div>
      {trainingData.map((workout, index) => (
        <WorkoutButton
          key={JSON.stringify(workout)}
          data={workout}
          title={`Workout ${index + 1}`}
          active={activeWorkout === index}
          onClick={() => setActiveTraining(index)}
        />
      ))}
    </MainTemplate>
  );
};

export default MainView;
