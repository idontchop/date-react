import React from 'react';
import styled from 'styled-components';
import { ItemTypes } from '../Constants/ItemTypes.js'
import { useDrag } from 'react-dnd'

/**
 * receives the id for an image, fetches, and displays it
 */

const Media = (props) => {

    const [{isDragging}, drag] = useDrag ( {
        item: { type: ItemTypes.PROFILEIMAGE },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    const ProfileImage = styled.img`
        border-radius: 10%;
        width: auto;
        height: 150px;
        border: 1px solid #ccc;
        margin: 5px;
        display: inline-block;
        cursor: move,
        fontSize: 25,
        fontWeight: bold        
    `;

    console.log("Media: " + props)
    return <ProfileImage ref={drag}  src={"/dating/image/" + props.id } />
}

export default Media;