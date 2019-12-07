import React from 'react';
import Media from './Media.js';
import Dropzone from 'react-dropzone';

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
        this.imageUploadHeaderArgs = { method: 'POST', mode: 'no-cors',
            credentials: 'include'}            

        this.fetchMedia(props.id);
    }

    /**
     * Fetches a list of the user's media
     * 
     * @param {user id} id 
     */
    async fetchMedia ( id ) {

        let response = await fetch ( this.restUrl, this.headerArgs );

        this.mediaData = await response.json();

        this.sortMedia();
        this.swapMedia ( 150, 199);
        
    }

    /**
     * Sends updated media data to server
     */
    async postMedia () {
        
        let response = await fetch ( this.restUrl, {
            method: 'POST',
            headers: this.postHeaderArgs,
            body: JSON.stringify(this.state.mediaDataState)
        } );
        
        if ( !response.ok ) {
            //TODO: server responsed with error
            console.log("Error: server responded " + response.status);
        } else {
            // TODO: put a checkmark somewhere
        }

    }

    /**
     * Passed as a prop to media to be called with drag and drop.
     * 
     * @param {media being dragged} from 
     * @param {dropped target} to 
     */
    swapMedia ( from, to ) {

        let swapPriority = -1;
        let toIndex = -1;

        console.log ("Swap media: " + from + " " + to)
        // find to target, save priority/index, 
        this.mediaData.forEach ( (i,index) => {
            if ( i.id === to ) {
                swapPriority = i.priority; toIndex = index;
            }

        });

        if ( swapPriority === -1 || toIndex === -1 ) {
            console.log ("Error swapMedia -1"); return;
        }

        // find from target and swap priorities
        this.mediaData.forEach ( (i, index)  => {
            if ( i.id === from ) {
                this.mediaData[toIndex].priority = i.priority;
                i.priority = swapPriority;
            }
        });

        this.sortMedia();

        // finally, write it to server
        this.postMedia();
    }

    /**
     * puts this.state.mediaData in order by priority
     * and sets the state
     */
    sortMedia () {

        // sort by priority
        console.log ("sort:" + this.mediaData);
        console.log(this.mediaData);
        this.mediaData.sort( (a, b) => a.priority > b.priority ? 1 : -1);

        this.setState({mediaDataState: this.mediaData});

    }

    componentDidUpdate () {
        
    }

    /**
     * TODO: figure out how to set priority
     * 
     * @param {} acceptedFiles 
     */
    async onAddDrop ( acceptedFiles ) {
        
        acceptedFiles.forEach ( async (file) => {

                const formData = new FormData();

               
                formData.append (
                    'file',
                    file,
                    'profilePic'
                );

                let response = await fetch ( '/dating/uploadImage', {
                    method: 'POST',
                    headers: this.imageUploadHeaderArgs,
                    body: formData
                } )

                //let responseData = await response.json();

                console.log(response);
                       
        })

    }


    render() {
        if (this.state == null) return <div></div>
        console.log("This state: " + this.state)
        console.log(this.state)
        console.log ( Array.from (this.state))
        let mediaList = this.state.mediaDataState.map ( (i) =>
            <li key={i.id} style={ {display: "inline-block"} }><Media id={i.id} priority={i.priority} swapMedia={ (from, to) => this.swapMedia(from, to)} /></li>
        );
        
        return  <div>
                    {mediaList}
                    <li key={"add"} style = { {display: "inline-block" } }>
                        <Dropzone onDrop={ (e) => this.onAddDrop(e) }>
                            {( {getRootProps, getInputProps} ) => (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    Add
                                </div>
                            )}
                        </Dropzone>
                    </li>
                </div>
    }
}

export default UserMedia;