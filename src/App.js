import React from 'react';
import logo from './logo.svg';
import './App.css';
import DatingListContainer from './DatingListContainer.js';
import withRestData from './withRestData.js';

function App() {
  const withData = withRestData();
  const DatingList = withData ( DatingListContainer );

  return (
    <DatingList />
  );
}

export default App;
