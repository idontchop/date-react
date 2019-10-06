import React from 'react';
import DatingListContainer from './DatingListContainer.js';

/**
 * Over arching search component. Handles the user search preferences, paginations, etc
 */
class DatingSearchContainer extends React.Component {

    constructor (props) {
        super (props);

        // Fetch 
        this.restUrl = '/dating/mainSearch/';
        this.headerArgs = { mode: 'no-cors', credentials: 'include' };

        // data structure for profiles
        this.profileList = [];

        // initial state
        this.state = {
            perPage: 5,     // arbitrary / not set by user / determines # profiles per load
            page: 0,
            maxPage: 0     // will be reset by fetch
        };

        // initial location
        navigator.geolocation.getCurrentPosition( (position) => {
            this.state.sloc = `&lat=${position.coords.latitude}&lng=${position.coords.longitude}`;
            this.newSearch();
        } );
            
    }

    /**
     * Helper function, returns the full GET url
     */
    getUrl () {
        return this.restUrl + `?perPage=${this.state.perPage}&page=${this.state.page}` +
            (this.state.sloc != null ? this.state.sloc : "");

    }

    componentDidMount () {
        this.newSearch();
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
    }


    render () {
        
        // TODO: need spinner
        if ( this.state.data == null ) 
            return (
            <div><img src="./images/Loading_icon.gif" /></div>
            );
        return (
            <div>
            <DatingListContainer content={this.state.data.content} />
            <button onClick={ () => this.loadMoreProfiles() }>Load More</button>
            </div>
        );
            
    }
}

export default DatingSearchContainer;