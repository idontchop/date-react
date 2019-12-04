import React from 'react';
import Media from './Media.js';

/**
 * Receives the id of the user, then retrives the user's list of media
 * arranging them and passing the id of the data to a sub-component
 * which requests the data and displays it.
 * 
 * Ultimately, this component will allow the user to drag and drop
 * to prioritize the media
 */
class UserMedia extends React.Component {

    constructor(props) {
        super(props);

        // Fetch 
        this.restUrl = '/dating/MyImages';
        this.headerArgs = { mode: 'no-cors', credentials: 'include' };
        this.postHeaderArgs = { method: 'POST', mode: 'no-cors', 'content-type': 'application/json', 
            credentials: 'include'};

        this.fetchMedia(props.id);
    }

    /**
     * Fetches a list of the user's media
     * 
     * @param {user id} id 
     */
    async fetchMedia ( id ) {

        let response = await fetch ( this.restUrl, this.headerArgs );

        let mediaData = await response.json();

        // sory by priority
        mediaData.sort( (a, b) => a.priority > b.priority ? 1 : -1);

        this.setState({mediaData: mediaData});
        
    }

    render() {
        if (this.state == null) return <div></div>
        console.log("This state: " + this.state)
        console.log(this.state)
        console.log ( Array.from (this.state))
        const mediaList = this.state.mediaData.map ( (i) =>
            <li key={i.id} style={ {display: "inline-block"} }><Media id={i.id} priority={i.priority} /></li>
        );
        return <div>{mediaList}</div>
    }
}

export default UserMedia;