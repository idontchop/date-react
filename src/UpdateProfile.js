import React from 'react';

class UpdateProfile extends React.Component {

    constructor (props) {
        super (props);
        this.state = {};
    }

    handleChange (e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState ({
            [name]: value
        });
    }

    render () {
        return (
            <form>
                <label>
                    Display Name:
                    <input
                        name="displayName"
                        type="text"
                        value={this.state.displayName}
                        onChange={ () => this.handleChange } />
                </label>
                <label>
                    Birthday:
                    <input
                        name="birthday"
                        type="text"
                        value={this.state.birthday}
                        onChange={ () => this.handleChange } />
                </label>
                <label>
                    I am a:
                    <select 
                        value={this.state.gender}
                        name="gender" 
                        onChange={ () => this.handleChange } >
                            <option value="Man">Man</option>
                            <option value="Woman">Woman</option>
                        </select>
                </label>
                <label>
                    Seeking a:
                    <select
                        value={this.state.interestedIn}
                        name="interestedIn"
                        onChange= { () => this.handlechange } >
                            <option value="Woman">Woman</option>
                            <option value="Man">Man</option>
                        </select>
                </label>
                <label>
                    About You:
                    <textarea
                        name="aboutme"
                        type="textarea"
                        value={this.state.aboutme}
                        onChange={ () => this.handleChange } />
                </label>
                <label>
                    Looking For:
                    <textarea
                        name="lookingfor"
                        type="textarea"
                        value={this.state.lookingfor}
                        onChange= { () => this.handleChange } />
                </label>
            </form>
        );
    }
}

export default UpdateProfile;