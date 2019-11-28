import React from 'react';
import logo from './logo.svg';
import './App.css';
import DatingListContainer from './DatingListContainer.js';
import DatingSearchContainer from './DatingSearchContainer.js';
import withRestData from './withRestData.js';
import UpdateProfile from './UpdateProfile.js';
import CreateAccount from './CreateAccount.js';

function App() {
  const withData = withRestData();
  const DatingList = withData ( DatingListContainer );

  // TODO: test code
  const Display = () => {return <UpdateProfile />};
  //const Display = () => {return <DatingSearchContainer />};

  return (
    <div>
    <CreateAccount />

    </div>
  );
}

export default App;
