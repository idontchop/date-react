import React from 'react';
import DatingListContainer from './DatingListContainer.js';
import MainSearchBar from './Components/MainSearchBar.js';

/**
 * Over arching search component. Handles the user search preferences, paginations, etc
 */
class DatingSearchContainer extends React.Component {

    constructor (props) {
        super (props);

        // Fetch 
        this.restUrl = '/dating/mainSearch/';
        this.headerArgs = { mode: 'no-cors', credentials: 'include' };
        this.postHeaderArgs = { method: 'post', mode: 'no-cors', credentials: 'include'};
        this.deleteHeaderArgs = { method: 'DELETE', 'content-type': 'application/json', credentials: 'include'};
        this.restInteractionsUrl = '/dating/interactionsList';
        this.likeHandlerUrl = '/dating/addLike';
        this.favoriteHandlerUrl = '/dating/addFav';
        this.hideHandlerUrl = '/dating/addHide';


        // data structure for profiles
        this.profileList = [];

        // initial state
        this.state = {
            perPage: 5,     // arbitrary / not set by user / determines # profiles per load
            page: 0,
            maxPage: 0,     // will be reset by fetch

            minAge: 18,     // handled by handleSearchPrefChange (MainSearchBar componnet)
            maxAge: 80,
            searchPrefsChanged: false
        };

        // For debug purposes until we have a form
        this.useLocation = false;
        // initial location
        navigator.geolocation.getCurrentPosition( (position) => {
            this.state.sloc = `&lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
            this.newSearch();
        } );

        // For setting up event handlers bubbler
        this.getUrl = this.getUrl.bind(this);
        this.likeHandler = this.likeHandler.bind(this);
        this.favoriteHandler = this.favoriteHandler.bind(this);
        this.hideHandler = this.hideHandler.bind(this);
        this.blockHandler = this.blockHandler.bind(this);
        
        this.handler={  likeHandler: this.likeHandler, 
                        favoriteHandler: this.favoriteHandler,
                        hideHandler: this.hideHandler,
                        blockHandler: this.blockHandler };
    }

    /**
     * Helper function, returns the full GET url
     */
    getUrl ( type ) {
        if ( type === "interactions" )
            return this.restInteractionsUrl;
        else if ( type === "addLike" )
            return this.likeHandlerUrl;
        else if ( type === "addFavorite" )
            return this.favoriteHandlerUrl;
        else if ( type === "addHide" )
            return this.hideHandlerUrl;
        else if ( type === "addBlock" )
            return this.blockHandlerUrl;
        else
            return this.restUrl + `?perPage=${this.state.perPage}&page=${this.state.page}` +
                    `&minAge=${this.state.minAge}&maxAge=${this.state.maxAge}` +
                    ( (this.useLocation && this.state.sloc != null) ? this.state.sloc : "");
    }

    componentDidMount () {
        this.newSearch();
    }

    componentDidUpdate () {
        this.loadInteractions();
    }


    /**
     * Ran when user presses a load more button at bottom of results
     */
    loadMoreProfiles () {

        if ( this.state.page === this.state.totalPages ) {
            // TODO: we have already reached end
        } else {

            // simply set the new page we want to load
            // possible bug: could add duplicate profiles since
            // the overall list could change due to block adds, etc
            // not sure how to overcome this, we can't load thousands of profiles at a time
            // possibly this simple:
            // TODO: remove any duplicates added
            this.state.page = this.state.page + 1;

            fetch ( this.getUrl(), this.headerArgs )
            .then ( response => response.json() )
            .then ( responseData => {
                // logic for adding more profiles
                console.log(this.getUrl());
                console.log (responseData);
                this.state.data.content.push (...responseData.content);
                this.setState ( {data: {content: this.state.data.content}});
            })
            .catch ( err => console.error(err));
        }
    }

    /**
     * Ran when the user changes the search parameters, location changed, etc.
     */
    newSearch () {
        console.log(this.getUrl());
        fetch ( this.getUrl(), this.headerArgs)
        .then ( response => response.json() )
        .then ( responseData => this.setState ({data: responseData}))
        .catch ( err => console.error(err));

        // load interactions after getting the search
       
    }

    /**
     * Uses the content list to update any necessary interactions for every user on the
     * search list.
     * This is separate from the search list so we can split it to a microservice and keep
     * speed of main search up.
     */
    loadInteractions () {

        console.log ( "load interactions: " );
        var listToFetch = [];
        if ( this.state.data != null ) {
            console.log (this.state);
            this.state.data.content.forEach ( e => {
                if ( e.interactions == null ) {
                    // The list of interactions is stored in object in each content (each user)
                    // if an interaction object is not found, the id added to list for fetch call
                    listToFetch.push(e.id);
                    
                }
            });

            if ( listToFetch.length > 0 ) {
                // if we need to fetch some interactions, do it here
                fetch ( this.getUrl( "interactions" ) + "?userList=" + listToFetch.join(","), this.headerArgs )
                .then ( response => response.json() )
                .then ( responseData => {
                    this.contentEdit = this.state.data.content;
                    this.contentEdit.forEach ( e => {
                        e.interactions = {};
                        e.interactions.connection = responseData.connections.includes (e.id) ? true : false;
                        e.interactions.favorite = responseData.favorites.includes (e.id) ? true : false;
                        e.interactions.like = responseData.likes.includes (e.id) ? true : false;
                    })
                    this.setState ( { data: {content: this.contentEdit }});
                } )
                .catch ( err => console.err(err));
            }
        }

    }

    /**
     * This calls the API and updates the like based on the button pressed.
     * The server will return a message with the new state of the like.
     * "like" "unlike" "connection"
     * @param {id of profile liked} targetId 
     */
    likeHandler (targetId) {

        // default we are adding
        let headerArgs = this.postHeaderArgs;
        // Loop through users to see if we should be removing
        this.state.data.content.forEach ( e => {
            if ( e.id === targetId && e.interactions.like === true ) {
                headerArgs = this.deleteHeaderArgs;
            }
        })

        fetch ( this.getUrl ("addLike") + "?target=" + targetId, headerArgs )
        .then ( response => response.json() )
        .then ( responseData => {
           
            this.contentEdit = this.state.data.content;
            this.contentEdit.forEach ( e => {
                if ( e.id === targetId && responseData.message === "added") 
                    e.interactions.like = true;
                else if ( e.id === targetId && responseData.message === "removed") 
                    e.interactions.like = false;
            });
            this.setState ( {data: {content: this.contentEdit }});
        })
        .catch ( err => console.log(err));

    }

    favoriteHandler (targetId) {

        // default we are adding
        let headerArgs = this.postHeaderArgs;
        // Loop through users to see if we should be removing
        this.state.data.content.forEach ( e => {
            if ( e.id === targetId && e.interactions.favorite === true ) {
                headerArgs = this.deleteHeaderArgs;
            }
        })

        fetch ( this.getUrl ("addFavorite") + "?target=" + targetId, headerArgs )
        .then ( response => response.json() )
        .then ( responseData => {
            // TODO: check if added or removed

            this.contentEdit = this.state.data.content;
            this.contentEdit.forEach ( e => {
                if ( e.id === targetId && responseData.message === "added")
                     e.interactions.favorite = true;
                else if ( e.id === targetId && responseData.message === "removed")
                    e.interactions.favorite = false;
            })
            this.setState ( {data: {content: this.contentEdit}});

        })
        .catch ( err => console.log(err));
    }

    hideHandler (targetId) {

        fetch ( this.getUrl ("addHide") + "?target=" + targetId, this.postHeaderArgs )
        .then ( response => response.json() )
        .then ( responseData => {
            // TODO: check if add or remove

            this.contentEdit =
                this.state.data.content.filter ( e => e.id !== targetId);
            this.setState ( {data: {content: this.contentEdit}});

        })
        .catch ( err => console.err(err));
    }

    blockHandler (targetId) {

    }

    /**
     * Passed down to MainSearchBar. Manages the search prefs from user.
     * 
     * @param {} event 
     */
    handleSearchPrefChange = ( event ) => {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState ( { [name] : value, searchPrefsChanged: true } );

    }

    render () {
        
        // TODO: need spinner
        if ( this.state.data == null ) 
            return (
            <div><img src="./images/Loading_icon.gif" /></div>
            );
        return (
            <div>
            <MainSearchBar {...this.state} handleChange={this.handleSearchPrefChange} />
            <DatingListContainer content={this.state.data.content} handler={this.handler} />
            <button onClick={ () => this.loadMoreProfiles() }>Load More</button>
            </div>
        );
            
    }
}

export default DatingSearchContainer;