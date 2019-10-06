import React from 'react';
import logo from './logo.svg';
import './App.css';
import DatingListContainer from './DatingListContainer.js';
import DatingSearchContainer from './DatingSearchContainer.js';
import withRestData from './withRestData.js';

function App() {
  const withData = withRestData();
  const DatingList = withData ( DatingListContainer );

  return (
    <div>
    <DatingSearchContainer />

    </div>
  );
}

export default App;
