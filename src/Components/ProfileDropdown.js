import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import InteractionsListItem from './InteractionsListItem';

const ProfileDropdownWrapper = styled.div`
    position: relative;
`;

const ProfileDropdownMenu = styled.div`
    background-color: white;
    position: absolute;
    z-index: 5;
    width: 150px;
    right: -15px;
    top: 30px;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    padding: 5px 10px;
    box-shadow: 0px 0px 38px -8px #000;

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 80%;
        width: 0;
        height: 0;
        border: 14px solid transparent;
        border-bottom-color: white;
        border-top: 0;
        margin-left: -7px;
        margin-top: -14px;
    }
`;

const HamburgerDiv = styled.div`
    width: 31px;
    height: 3px;
    background-color: white;
    border-radius: 3px;
    margin: 3px 1px;
`;

// For use in showing an X instead of hamburger: TODO
const XDiv1 = styled.div`
    width: 31px;
    height: 3px;
    background-color: white;
    border-radius: 3px;
    margin: 3px 1px;
    transform: rotate(-45deg) translate(-9px, 6px);
`;

const XDiv2 = styled.div`
    width: 31px;
    height: 3px;
    background-color: white;
    border-radius: 3px;
    margin: 3px 1px;
    transform: rotate(45deg) translate(-8px, -2px);
`;

const ProfileDropDownUl = styled.ul `
    list-style-type: none;
    padding: 0;
`;



const ProfileDropdown = (props) => {

    // Setup Closing the dropdown if clicked outside
    const ref = useRef(null);  // passed to dropdown div
    const [dropDownShow, setDropDownShow] = useState(false);

    const handleClickOutside = (event, ref) => {

        // Click is outside the dropdown div
        if ( ref.current && !ref.current.contains(event.target)) {
            setDropDownShow(false);
        } else {
            // click is inside
        }
    }

    useEffect( () => {
        // Bind listener for clicks to handleClickOutside
        document.addEventListener("click", e => handleClickOutside(e, ref));
        return () => {
          // react hook cleanup
          document.removeEventListener("click", e => handleClickOutside(e, ref));
        };
      });

    return (
    //wrapper and hamburger menu TODO: change hamburger to if shown
    <ProfileDropdownWrapper ref={ref}>
        <div onClick={ () => setDropDownShow( !dropDownShow ) }>
            <HamburgerDiv />
            <HamburgerDiv />
            <HamburgerDiv />            
        </div>

    
    {   // drop down bubble
        !!dropDownShow && (
        <ProfileDropdownMenu >
            <ProfileDropDownUl>
                <InteractionsListItem
                    target={props.interactions && props.interactions.block /*redundant*/}
                    title={"Block"}
                    handler={props.handler.blockHandler}
                    id={props.id} />
                <InteractionsListItem 
                    target={props.interactions && props.interactions.favorite}
                    title={"Favorite"}
                    handler={props.handler.favoriteHandler}
                    id={props.id} />
            </ProfileDropDownUl>
        </ProfileDropdownMenu> )
    }

    </ProfileDropdownWrapper>
    );
}

export default ProfileDropdown;