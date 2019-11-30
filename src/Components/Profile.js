import React from 'react';
import InteractionButton from './InteractionsButtons.js';

/**
 * Stateless render under DatingListContainer. This component renders one user
 * profile
 * @param {user} props 
 */
const Profile = (props) => (

    <div>
        <div>
            { props.media[0] && <img src={"http://localhost:8080/dating/image/" + props.media[0].id} style={{width:50, height:50}} /> }
            <h2 style={{display: "inline-block"}}>{props.id + ": " + props.profile.displayName + " - " + props.profile.age}</h2>
        </div>
        <p><b>About Me:</b>{props.profile.aboutMe}</p>
        <p><b>Looking For:</b>{props.profile.lookingFor}</p>
        <p><b>Birthday:</b>{props.profile.birthday}</p>
        <p><b>Created:</b>{props.created}</p>
        <div>
            <InteractionButton target = {props.interactions && props.interactions.like}
                title="Like"
                id={props.id}
                handler={props.handler.likeHandler} />
            <InteractionButton target = {props.interactions && props.interactions.hide}
                title="Hide"
                id={props.id}
                handler = {props.handler.hideHandler} />
            <InteractionButton title="Block"/>
            <InteractionButton target = {props.interactions && props.interactions.favorite}
                title="Favorite" 
                id={props.id}
                handler = {props.handler.favoriteHandler} />
        </div>
    </div>
)

export default Profile;