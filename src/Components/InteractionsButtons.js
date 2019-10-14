import React, {useState, useEffect } from 'react';

/**
 * These buttons will display the state of interactions as well as call
 * the api to change the state of interactions
 * 
 * @param {like, favorite} props 
 */
const LikeButton = (props) => {
    let styleButton = {};

    // set initial like state from props
    const [ like, setLike ] = useState ( false );

    let styleButtonTrue = {background: "white"};
    let styleButtonFalse = {background: "default"};
    
    useEffect ( () => {
        if ( props.like != like ) {
            setLike ( props.like );
        }

    })
    
    return (
        <button style={ like ? styleButtonTrue : styleButtonFalse }>Like
        </button>
    )
}

const FavoriteButton = (props) => {
    return (
        <button>Favorite</button>
    )
}

const HideButton = (props) => {
    return (
        <button>Hide</button>
    )
}

const BlockButton = (props) => {
    
    return (
        <button>Block</button>
    )
}

export default LikeButton;
export {HideButton, FavoriteButton, BlockButton, LikeButton}
