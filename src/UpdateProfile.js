import React from 'react';
import UserMedia from './Components/UserMedia';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class UpdateProfile extends React.Component {

    constructor (props) { 
        super (props);
        // Fetch 
        this.restUrl = '/dating/MyProfile';
        this.headerArgs = { mode: 'no-cors', credentials: 'include' };
        this.postHeaderArgs = { method: 'POST', mode: 'no-cors', 'content-type': 'application/json', 
            credentials: 'include'};
        this.imageUploadHeaderArgs = { method: 'POST', mode: 'no-cors',
             credentials: 'include'}
        this.deleteHeaderArgs = { method: 'DELETE', 'content-type': 'application/json',
            credentials: 'include'};

        this.state = { loading: true };

    }

    componentDidMount () {

        this._isMounted = true;
        this.fetchProfile();

    }

    componentWillUnmount () {

        this._isMounted = false;
    }

    fetchProfile () {

        this._isMounted && fetch ( this.restUrl, this.headerArgs )
        .then ( response => response.json() )
        .then ( responseData => {
             this.setState ( { "profile" : responseData, loading: false } );
        })
        .catch ( err => console.log(err));

    }

    writeProfile () {

        console.log(this.state.profile);
        /* TODO: add profile to body */
        fetch ( this.restUrl,  {
            method: 'POST',
            headers: this.postHeaderArgs,
            body: JSON.stringify(this.state.profile)
        } ) 
        .then ( response => response.json() )
        .then ( responseData => { this.setState ({loading: false});
                                    this.responseData = responseData; console.log(this.responseData);} )
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

    handleFileChange (e) {
        this.profilePic = e.target.files[0];

        const formData = new FormData();
        formData.append(
            'file',
            this.profilePic,
            'profilePic'
        );
        fetch ( '/dating/uploadImage',  {
            method: 'POST',
            headers: this.imageUploadHeaderArgs,
            body: formData
        } ) 
        .then ( response => response.json() )
        .then ( responseData => { this.setState ({loading: false});
                                    this.responseData = responseData; console.log(this.responseData);} )
        .catch ( err => console.log (err) );
    }

    render () {
        
        if ( this.state.profile == null )
            return (
                <div><img src="./images/Loading_icon.gif" /></div>
            );
        else
        return (
            <DndProvider backend={HTML5Backend}>
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
                    <label>
                        Profile pic:
                        <input 
                            type="file"
                            name = "profilePic"
                            onChange = { e => this.handleFileChange(e) } />
                    </label>
                </form>
                <UserMedia id={this.state.profile.id} />
                <button onClick= { e => this.handleSubmit (e) }>{ this.state.loading ? "*" : "Save"}</button>
            </div>
            </DndProvider>
        );
    }
}

export default UpdateProfile;