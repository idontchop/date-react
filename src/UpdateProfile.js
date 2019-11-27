import React from 'react';

class UpdateProfile extends React.Component {

    constructor (props) {
        super (props);
        // Fetch 
        this.restUrl = '/dating/MyProfile';
        this.headerArgs = { mode: 'no-cors', credentials: 'include' };
        this.postHeaderArgs = { method: 'post', mode: 'no-cors', credentials: 'include'};
        this.deleteHeaderArgs = { method: 'DELETE', 'content-type': 'application/json', credentials: 'include'};

        this.state = { loading: true };

        this.fetchProfile();

    }

    fetchProfile () {

        fetch ( this.restUrl, this.headerArgs )
        .then ( response => response.json() )
        .then ( responseData => {
            this.setState ( { "profile" : responseData } );
        })
        .catch ( err => console.error(err));

    }

    writeProfile () {

        /* TODO: add profile to body */
        fetch ( this.restUrl, this.postHeaderArgs )
        .then ( response => response.json() )
        .then ( responseData => {} )
        .catch ( err => console.log (err) );

    }

    handleSubmit (e) {
        this.writeProfile();
    }

    handleChange (e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        let prevProfile = {...this.state.profile };
        prevProfile[name] = value;

        this.setState ( { "profile" : prevProfile } );
    }

    render () {
        if ( this.state.profile == null )
            return (
                <div><img src="./images/Loading_icon.gif" /></div>
            );
        else
        return (
            <form onSubmit={ e => this.handleSubmit(e) }>
                <label>
                    Display Name:
                    <input
                        name="displayName"
                        type="text"
                        value={this.state.profile.displayName}
                        onChange={ e => this.handleChange(e) } />
                </label>
                <label>
                    Birthday:
                    <input
                        name="birthday"
                        type="text"
                        value={this.state.profile.birthday}
                        onChange={ e => this.handleChange(e) } />
                </label>
                <label>
                    I am a:
                    <select 
                        value={this.state.profile.gender}
                        name="gender" 
                        onChange={ e => this.handleChange(e) } >
                            <option value="Man">Man</option>
                            <option value="Woman">Woman</option>
                        </select>
                </label>
                <label>
                    Seeking a:
                    <select
                        value={this.state.profile.interestedIn}
                        name="interestedIn"
                        onChange= { e => this.handleChange(e) } >
                            <option value="Woman">Woman</option>
                            <option value="Man">Man</option>
                        </select>
                </label>
                <label>
                    About You:
                    <textarea
                        name="aboutMe"
                        type="textarea"
                        value={this.state.profile.aboutMe}
                        onChange={ e => this.handleChange(e) } />
                </label>
                <label>
                    Looking For:
                    <textarea
                        name="lookingFor"
                        type="textarea"
                        value={this.state.profile.lookingFor}
                        onChange= { e => this.handleChange(e)} />
                </label>
                <input type="submit" value="Update Profile" />
            </form>
        );
    }
}

export default UpdateProfile;