import React from 'react';
import logo from './logo.svg';
import './App.css';
import DatingListContainer from './DatingListContainer.js';
import DatingSearchContainer from './DatingSearchContainer.js';
import Main from './Main.js';
import withRestData from './withRestData.js';
import UpdateProfile from './UpdateProfile.js';
import CreateAccount from './CreateAccount.js';
import withModal from './withModal.js';

function App() {
  const withData = withRestData();
  const DatingList = withData ( DatingListContainer );
  const CreateForm = withModal ( CreateAccount, "Create Account" );

  // TODO: test code
  const Display = () => {return <UpdateProfile />};
  //const Display = () => {return <DatingSearchContainer />};

  return (
    <div>
      <CreateForm />
    <Main />

    </div>
  );
}

export default App;
