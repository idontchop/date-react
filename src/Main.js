import React from 'react';
import DatingSearchContainer from './DatingSearchContainer';
import UpdateProfile from './UpdateProfile.js';

class Main extends React.Component {

    constructor (props) {
        super(props);

        this.restUrlProfile = '/dating/MyProfile';
        this.headerArgs = { mode: 'no-cors', credentials: 'include' };
        this.postHeaderArgs = { method: 'POST', mode: 'no-cors', 'content-type': 'application/json', 
            credentials: 'include'};

        this.state = { loading: true };

        this.fetchProfile();
    }

    /**
     * Duplicated from UpdateProfile.js **
     * 
     * Fetches this user's profile and saves it to state. UserProfile
     * contains all information that is on a user's profile, such as
     * display name but doesn't have search preferences, security, etc
     */
    fetchProfile () {

        fetch ( this.restUrlProfile, this.headerArgs )
        .then ( response => response.json() )
        .then ( responseData => {
            this.setState ( { "profile" : responseData, loading: false } );
        })
        .catch ( err => console.log(err));

    }

    render () {
        return (
            <div>
                <h1>Dating Site Backend Prototype</h1>
                <h2>Welcome {this.state.loading ? "User" : this.state.profile.displayName }</h2>
                <UpdateProfile />
                <DatingSearchContainer />
            </div>
        );
    }


}

export default Main;