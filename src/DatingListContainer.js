import React from 'react';
import Profile from './Components/Profile.js';
import withModal from './withModal.js';
import ViewProfile from './ViewProfile.js';
import withToggleModal from './withToggleModal.js';

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

    closeProfileModal () {
        this.setState( {modalVisible: false } );
    }

    viewProfileModal ( id ) {

        // find the user
        let user = this.props.content.find ( u => u.id === id);

        // assign user to view profile state and set to visible
        this.setState ( { ...user, modalVisible: true} );

        console.log("viewprofilemodal")
        console.log(this.state)

    }

    render () {

        // Setup view profile modal
        const ViewProfileWithModal = withModal(ViewProfile,"View Profile");

        const ViewProfileWithToggleModal = withToggleModal(ViewProfile, () => this.closeProfileModal() );

        // this component will sometimes be rendered before rest call is made
        // TODO: Need working spinner
        if ( this.props == null ) return <div></div>
        // this render is after rest call
        else {
            console.log (this.props);
            return (
                <div>
                <ViewProfileWithToggleModal {...this.state} />
                {this.props.content.map( ( user ) =>                 
                    // Need Component to list each profile
                    <div key={user.id} >                        
                        <Profile {...user} handler={{...this.props.handler}} focusProfileHandler={ () => this.viewProfileModal(user.id) }/>
                    </div>)
                }
                </div>
            )
        }
    }
}

export default DatingListContainer;