import React, {useState, useEffect } from 'react';
import styled from 'styled-components';

const styleButtonTrue = {background: "white"};
const styleButtonFalse = {background: "grey"};

const styledButton = styled.button`
    cursor: pointer;
    padding: 5px 8px;
    text-align: center;
    font-size: 10px;
    margin: 4px;
    opacity: 0.6;
    transition: 0.3s;

    &:hover {
        color: black;
        opacity: 1;
    }
`;
const styledButtonTrue = styled(styledButton)`

    background: white;

`;

const styledButtonFalse = styled(styledButton)`

    background: grey;

`;
/**
 * Handles the buttons for interactions.
 * Accepts the name of the button title
 * Id of target
 * target: true of false
 * handler: callback to api
 * 
 * @param { target, handler, title, id} props 
 */
const InteractionButtons = (props) => {

    let Button;
    if ( props.target ) Button = styledButtonTrue;
    else Button = styledButtonFalse;

    return (
        <Button onClick={ () => props.handler(props.id) }> {props.title}
        </Button>
    )
}

/**
 * These buttons will display the state of interactions as well as call
 * the api to change the state of interactions
 * 
 * @param {like, favorite} props 
 */
const LikeButton = (props) => {

    return (
        <button style={ props.like ? styleButtonTrue : styleButtonFalse }
        onClick={props.handler.likeHandler.bind(this, props.id)}>Like
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
        <button onClick={props.handler.hideHandler.bind (this, props.id)}>Hide</button>
    )
}

const BlockButton = (props) => {
    
    return (
        <button>Block</button>
    )
}


export default InteractionButtons;

