import React from 'react';

/**
 * Follows the pattern of a Rest API HoC.
 * The argument url is expected to be the url of the Spring backend.
 * 
 * When the data is fetched, it is written to state and supplied to Component passed in.
 * 
 * @param {*} url 
 */
const withRestData = url => Component => (

    class extends React.Component {
        constructor (props) {
            super (props);
        }

        componentDidMount () {

            fetch ('/dating/mainSearch/', { 
                mode: 'no-cors' ,
                credentials: 'include',
                })
            .then ( response => response.json() )
            .then ( responseData => {

                this.setState ( {data: responseData} );
                console.log (responseData);

            })
            .catch ( err => console.error(err) );
        }

        render () {

            return <Component {...this.props} { ...this.state } />;

        }
    }

);

export default withRestData;