import React from 'react';
import styled from 'styled-components';
import { useDrag, useDrop } from 'react-dnd'

/**
 * receives the id for an image, fetches, and displays it
 * Displayed under UpdateProfile
 * 
 * props:   id = the id of the media, will be used to retrieve from api
 *                  If id === 'add', it is the add button and is not swappable
 *          swapMedia = callback to method for swapping order and posting to api
 * 
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
    
    // render the add button
    if ( props.id === "add" ) 
        return (    <div>
                        open add modal
                    </div>
        )
    // else assume prop is image id
    else 
    return (<div ref={drop}>
                <ProfileImage ref={drag}  src={"/dating/image/" + props.id } />
            </div>
    )
}

export default Media;