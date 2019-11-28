import React from 'react';

class UpdateProfile extends React.Component {

    constructor (props) { 
        super (props);
        // Fetch 
        this.restUrl = '/dating/MyProfile';
        this.headerArgs = { mode: 'no-cors', credentials: 'include' };
        this.postHeaderArgs = { method: 'POST', mode: 'no-cors', 'content-type': 'application/json', 
            credentials: 'include'};
        this.deleteHeaderArgs = { method: 'DELETE', 'content-type': 'application/json',
            credentials: 'include'};

        this.state = { loading: true };

        this.fetchProfile();

    }

    fetchProfile () {

        fetch ( this.restUrl, this.headerArgs )
        .then ( response => response.json() )
        .then ( responseData => {
            this.setState ( { "profile" : responseData, loading: false } );
        })
        .catch ( err => console.error(err));

    }

    writeProfile () {

        
        /* TODO: add profile to body */
        fetch ( this.restUrl,  {
            method: 'POST',
            headers: this.postHeaderArgs,
            body: JSON.stringify(this.state.profile)
        } ) 
        .then ( response => response.json() )
        .then ( responseData => { this.setState ({loading: false})} )
        .catch ( err => console.log (err) );

        

    }

    handleSubmit (e) {
        if ( this.state.loading == false ) {
            this.setState( { loading: true });
            this.writeProfile();
        } else {
            // TODO: alert
        }
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
            <div>
            <form >
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
            </form>
            <button onClick= { e => this.handleSubmit (e) }>{ this.state.loading ? "*" : "Save"}</button>
            </div>
        );
    }
}

export default UpdateProfile;