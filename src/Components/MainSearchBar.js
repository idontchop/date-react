import React from 'react';

/**
 * Plugs into DatingSearchContainer. Menu bar for user to select search preferences
 * 
 * @param {} props 
 */
const MainSearchBar = props => {

        return (
            <div>
                <form>
                <label>
                        Min Age:
                        <input
                            name="minAge"
                            type="text"
                            value={props.minAge}
                            onChange = { e=> props.handleChange(e) } />
                    </label>
                   <label>
                        Max Age:
                        <input
                            name="maxAge"
                            type="text"
                            value={props.maxAge}
                            onChange = { e=> props.handleChange(e) } />
                    </label>
                    { props.searchPrefsChanged ? <button>Update Search</button> : null }
                </form>
            </div>
        )
    
}

export default MainSearchBar;