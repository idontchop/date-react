import React from 'react';
import styled from 'styled-components';

const ProfileDropdownWrapper = styled.div`
    position: relative;
`;

const ProfileDropdownMenu = styled.div`
    background-color: white;
    position: absolute;
    right: -15px;
    top: 30px;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    padding: 5px 15px;
    box-shadow: 0px 0px 38px -8px #000;

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
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

const ProfileDropdown = (props) => (

    <ProfileDropdownWrapper>
        <div onClick={ e => props.showDropDown(e) }>
            <HamburgerDiv />
            <HamburgerDiv />
            <HamburgerDiv />
        </div>

        <ProfileDropdownMenu>
            <ul>
                <li>1</li>
                <li>2</li>
            </ul>
        </ProfileDropdownMenu>

    </ProfileDropdownWrapper>
)

export default ProfileDropdown;