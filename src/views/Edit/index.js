import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from '../../reducer/store';
import WorkoutPanel from './Workout';
import TopBar from '../../components/Atoms/TopBar';
import StyledButton from '../../components/Atoms/StyledButton';
import SetReduxData from './SetReduxData';
import styled from 'styled-components';
import CreateNewWorkout from '../CreateNewWorkout';

const StyledTemplate = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WorkoutCard = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
  border: 0.5px solid rgba(255, 0, 0, 0.71);
  border-radius: 5px;
  background-color: white;
  width: 100%;
  height: 100px;
  padding: 10px;
  color: rgba(0, 0, 0, 0.7);
  p:nth-child(1) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 30px;
    text-align: left;
    margin: 0;
    i {
      color: #cccccc;
    }
  }
  p:nth-child(2) {
    color: grey;
    font-size: 16px;
  }
`;

const CardsTemplate = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  span {
    margin-right: 10px;
  }
`;

const StyledContent = styled.div`
  width: 100%;
  position: relative;
`;

const EditTraining = ({ data, onClick }) => {
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [createViewActive, setCreateView] = useState(false);

  if (createViewActive) {
    return (
      <Provider store={store}>
        <CreateNewWorkout goBack={() => setCreateView(false)} />
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <SetReduxData data={data} />
      <StyledTemplate>
        {activeWorkout === null && (
          <CardsTemplate>
            <TopBar>
              <StyledButton red onClick={onClick}>
                Back
              </StyledButton>
              <StyledButton bgGreen onClick={() => setCreateView(true)}>
                Create
              </StyledButton>
            </TopBar>
            <StyledContent>
              {data.map((plan, index) => (
                <WorkoutCard
                  key={JSON.stringify(plan[index])}
                  onClick={() => setActiveWorkout(index)}
                >
                  <p>
                    Workout {index + 1} <i className="fa fa-gear"></i>
                  </p>
                  <p>
                    {plan.slice(0, 3).map((exc, index) => (
                      <span>
                        {exc.exc} {index < 2 && ','}
                      </span>
                    ))}
                  </p>
                </WorkoutCard>
              ))}
            </StyledContent>
          </CardsTemplate>
        )}
        {activeWorkout !== null && (
          <div style={{ width: '100%' }}>
            <WorkoutPanel
              activeWorkout={activeWorkout}
              goBack={() => setActiveWorkout(null)}
            />
          </div>
        )}
      </StyledTemplate>
    </Provider>
  );
};

export default EditTraining;
