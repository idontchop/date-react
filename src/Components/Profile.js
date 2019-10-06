import React from 'react';

/**
 * Stateless render under DatingListContainer. This component renders one user
 * profile
 * @param {user} props 
 */
const Profile = (props) => (

    <div>
        <h2>{props.id + ": " + props.profile.displayName}</h2>
        <p><b>About Me:</b>{props.profile.aboutMe}</p>
        <p><b>Looking For:</b>{props.profile.lookingFor}</p>
        <p><b>Birthday:</b>{props.profile.birthday}</p>
        <p><b>Created:</b>{props.created}</p>
    </div>
)

export default Profile;