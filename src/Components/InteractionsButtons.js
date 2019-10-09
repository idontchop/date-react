import React from 'react';

const LikeButton = (props) => {
    return (
        <button>Like</button>
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
