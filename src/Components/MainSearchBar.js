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
                </form>
            </div>
        )
    
}

export default MainSearchBar;