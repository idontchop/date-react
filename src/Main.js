import React from 'react';
import DatingSearchContainer from './DatingSearchContainer';
import UpdateProfile from './UpdateProfile.js';
import withModal from './withModal.js';

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
    fetchProfile = async () => {

        // verbose
        //let response = await fetch ( this.restUrlProfile, this.headerArgs );
        //let responseData = await response.json();

        let responseData = await ( 
            await fetch ( this.restUrlProfile, this.headerArgs )).json();

        this.setState ( { "profile": responseData, loading: false } );
 
    }

    render () {

        let UpdateProfileWithModal = withModal(UpdateProfile, "Update Profile");        

        return (
            <div>
                <h1>Dating Site Backend Prototype</h1>
                <h2>Welcome {this.state.loading ? "User" : this.state.profile.displayName }</h2>
                <UpdateProfileWithModal />
                <DatingSearchContainer />
            </div>
        );
    }


}

export default Main;