import React, {useState, useEffect } from 'react';
import styled from 'styled-components';

const styleButtonTrue = {background: "white"};
const styleButtonFalse = {background: "grey"};

/**
 * From styled-components plugin
 */
const StyledButton = styled.button`
    cursor: pointer;
    padding: 8px 12px;
    text-align: center;
    font-size: 15px;
    margin: 5px;
    opacity: 0.8;
    transition: 0.2s;
    border-radius: 12px;
    background: ${props => props.target ? 'grey' : 'white' }

    &:hover {
        color: black;
        background-color: ${props => props.target ? 'grey' : 'OldLace' };
        opacity: 1;
    }
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
    return (
        <StyledButton onClick={ () => props.handler(props.id) } target={props.target}> {props.title}
        </StyledButton>
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

