import React from 'react';
import styled from 'styled-components';

/**
 * receives the id for an image, fetches, and displays it
 */

const Media = (props) => {

    const ProfileImage = styled.img`
        border-radius: 10%;
        width: 150px;
        height: auto;
        border: 1px solid #ccc;
        margin: 5px;
        display: inline-block;
    `;

    console.log("Media: " + props)
    return <ProfileImage src={"/dating/image/" + props.id } />
}

export default Media;