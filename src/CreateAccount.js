import React from 'react';

class CreateAccount extends React.Component {

    constructor (props) {
        super (props);

        // Fetch
        this.restUrl = '/dating/createAccount';
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

    render () {
        if ( this.state.account == null )
            return ( <div><img src="./images/Loading_icon.gif" /></div>);
        else {

            // use data from server to populate form
            // This probably wont work in production since front end
            // will have such specific goals
            const formElements = this.state.form.map ( s =>
                <li>{}</li>
                );
            return (
            <div>
                <form>
                    { formElements }

                </form>
            </div>
        );}
    }


}