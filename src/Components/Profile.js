import React from 'react';
import LikeButton, { HideButton, FavoriteButton, BlockButton } from './InteractionsButtons.js';

/**
 * Stateless render under DatingListContainer. This component renders one user
 * profile
 * @param {user} props 
 */
const Profile = (props) => (

    <div>
        <div>
            { props.media[0] && <img src={"http://localhost:8080/dating/image/" + props.media[0].id} style={{width:50, height:50}} /> }
            <h2 style={{display: "inline-block"}}>{props.id + ": " + props.profile.displayName}</h2>
        </div>
        <p><b>About Me:</b>{props.profile.aboutMe}</p>
        <p><b>Looking For:</b>{props.profile.lookingFor}</p>
        <p><b>Birthday:</b>{props.profile.birthday}</p>
        <p><b>Created:</b>{props.created}</p>
        <div>
            <LikeButton like = {props.interactions && props.interactions.like} />
            <HideButton hide = {props.interactions && props.interactions.like} />
            <BlockButton />
            <FavoriteButton favorite = {props.interactions && props.interactions.favorite}/>
        </div>
    </div>
)

export default Profile;