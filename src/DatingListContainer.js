import React from 'react';
import Profile from './Components/Profile.js';

/**
 * Is passed the base API from the Spring backend.
 * 
 * This class is the container for the list data. This container should be contained within
 * another container that has the search logic. This container only cares about listing
 * and paging. Some children may have calls for likes, blocks, etc
 */
class DatingListContainer extends React.Component {

    constructor (props) {
        super (props);
        console.log(props+ "DatingListContainer-constructor");
    }

    componentDidUpdate ( newProps, newState) {
        console.log (newProps + "DatingListContainer-componentDidUpdate");
        console.log (newState + "DatingListContainer-componentDidUpdate");
    }

    render () {

        // this component will sometimes be rendered before rest call is made
        // TODO: Need working spinner
        if ( this.props == null ) return <div></div>

        // this render is after rest call
        else {
            console.log (this.props);
            return (
                <div>
                {this.props.content.map( ( user ) =>                 
                    // Need Component to list each profile
                    <Profile key={user.id} {...user} />)
                }
                </div>
            )
        }
    }
}

export default DatingListContainer;