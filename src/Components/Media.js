import React from 'react';
import styled from 'styled-components';
import { ItemTypes } from '../Constants/ItemTypes.js'
import { useDrag, useDrop } from 'react-dnd'

/**
 * receives the id for an image, fetches, and displays it
 */

const Media = (props) => {

    /**
     * react-dnd hooks
     */
    const [{isDragging}, drag] = useDrag ( {
        item: { type: "profileMedia", id: props.id },
        begin:  () => {/* test drag */},
        collect: monitor => ({            
            isDragging: !!monitor.isDragging(),
        }),
    })

    const [{isOver, canDrop}, drop] = useDrop ( {
        accept: "profileMedia",
        drop: ( item ) => props.swapMedia( item.id, props.id ),
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
    
    return (<div ref={drop}>
                <ProfileImage ref={drag}  src={"/dating/image/" + props.id } />
            </div>
    )
}

export default Media;