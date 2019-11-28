import React from 'react';
import DateInputText from './Components/DateInputText.js';


class CreateAccount extends React.Component {

    constructor (props) {
        super (props);

        // Fetch
        this.restUrl = '/dating/createAccountForm';
        this.headerArgs = { mode: 'no-cors', credentials: 'include' };
        this.postHeaderArgs = { method: 'POST', mode: 'no-cors', 'content-type': 'application/json', 
            credentials: 'include'};
        this.state = { loading: false }; // temp setting false DEVELOPMENT

        this.fetchCreateForm();
    }

    fetchCreateForm () {

        fetch ( this.restUrl, this.headerArgs )
        .then ( response => response.json() )
        .then ( responseData => {
            this.setState ( { "form": responseData, loading: false })
        })
        .catch ( err => console.log (err) );
    }

    handleSubmit (e) {

        if ( this.state.loading == false ) {
            this.setState ( {loading: true } );
            this.writeAccount();
        } else {
            // TODO: alert
        }

    }

    writeAccount () {

        fetch ( this.restUrl, {
            method: 'POST',
            headers: this.postHeaderArgs,
            body: JSON.stringify (this.state.form)
        })
        .then ( response => response.json() )
        .then ( responseData => { console.log(responseData);this.setState ( {loading: false } ) } )
        .catch ( err => console.log (err) );

    }

    handleChange (e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        let prevForm = {...this.state.form};
        prevForm[name] = value;

        this.setState ( { "form": prevForm } );
    }

    render () {
        if ( this.state.form == null )
            return ( <div><img src="./images/Loading_icon.gif" /></div>);
        else {

            // use data from server to populate form
            // This probably wont work in production since front end
            // will have such specific goals

            
            const formElements = Object.keys(this.state.form)
                .filter ( s => !s.includes("constraint")) // don't include constraints
                .map ( s => 
                <DateInputText key={s} name={s} value={ this.state.form[s] == null ? "" : this.state.form[s] }
                    onChange={ e => this.handleChange(e) } />
                );
            return (
            <div>
                <form>
                    {formElements}
                    
                </form>
                <button onClick = { e => this.handleSubmit(e) }>Create Account</button>
            </div>
        );}
    }
}

export default CreateAccount;