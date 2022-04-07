import React, { useState, useEffect } from 'react';
import MainView from '../views/Main';
import jwt_decode from 'jwt-decode';
import Login from './Login';

const jwt_expiry_check = (token) => {
  if (token === null) {
    return false;
  }
  const d = new Date(0);
  const token_expiry = jwt_decode(token).exp;
  const token_date = d.setSeconds(token_expiry);
  return token_date > new Date();
};

const Root = () => {
  const [view, setView] = useState('login_view');

  useEffect(() => {
    const access_token = localStorage.getItem('access');
    if (access_token === null) {
      setView('login_view');
    } else if (!jwt_expiry_check(access_token)) {
      setView('login_view');
    } else {
      setView('main_view');
    }
  });

  switch (view) {
    case 'login_view':
      return <Login />;
    case 'main_view':
      return <MainView />;
  }
};

export default Root;
