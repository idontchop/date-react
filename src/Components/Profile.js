import React from 'react';
import InteractionButton from './InteractionsButtons.js';
import styled from 'styled-components';
import ProfileDropdown from './ProfileDropdown';

const ProfileWrapperDiv = styled.div`
    background-color: white;
    max-width: 500px;
    height: auto;
`;
const HeaderDiv = styled.div`
    background-color: #86888B;
`;

const ProfileImage = styled.img`
    width: 100%;
    height: auto;
`;

const NameH2 = styled.h2`
    font-family: "segoe UI", Arial;
    font-size: 36px;
    font-weight: normal;
    text-transform: capitalize;
    padding: .2em .5em;
    display: inline-block;
    margin: 0;
`;

const CityAgeH2 = styled.h2`
    font-family: "segoe UI", Arial;
    font-size: 24px;
    font-weight: normal;
    text-transform: capitalize;
    display: inline-block;
    margin: 0;
`;


/**
 * Stateless render under DatingListContainer. This component renders one user
 * profile as part of a list.
 * 
 * @param {user} props 
 */
const Profile = (props) => (

    <ProfileWrapperDiv>
        <HeaderDiv>
            <NameH2>{props.profile.displayName }</NameH2>
            <CityAgeH2>{props.profile.age + " • " + "Los Angeles, CA"}</CityAgeH2> 
            <div style={{float: "right", margin: "20px"}}>
                <ProfileDropdown />
            </div>
        </HeaderDiv>
        { props.media[0] && <ProfileImage src={"http://localhost:8080/dating/image/" + props.media[0].id}  /> }
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
    </ProfileWrapperDiv>
)

export default Profile;