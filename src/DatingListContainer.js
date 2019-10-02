import React from 'react';

/**
 * Is passed the base API from the Spring backend.
 * 
 * This class is the container for the list data. 
 */
class DatingListContainer extends React.Component {

    constructor (props) {
        super (props);
    }

    componentDidUpdate ( newProps, newState) {
        console.log (newProps);
        console.log (newState);
    }

    render () {
        
        return (
        <div>
            { JSON.stringify(this.props) }
        </div>
        );
    }
}

export default DatingListContainer;