import React from 'react';
import InteractionButton from './InteractionsButtons.js';
import styled from 'styled-components';
import ProfileDropdown from './ProfileDropdown';

const ProfileWrapperDiv = styled.div`
    max-width: 500px;
    height: auto;
`;
const HeaderDiv = styled.div`
    background-color: #86888B;
`;

const ProfileImage = styled.img`
    width: 100%;
    height: auto;
    max-height: 600px
    position: relative;
    z-index: -1;
    object-fit: cover;
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

const AboutMeDiv = styled.div`
    margin: -0px 10px 10px 10px;
    padding: 15px;
    background-color: white;
    border-radius: 10px;
    z-index: 0;
    position: relative;
    font-family: "Book Antiqua", serif;
    font-size: 1em;
    color: #682A2A;

`;

const ButtonsContainerDiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0px 100px
    position: relative;
    z-index: 0;
    margin: -90px 0px 0px 0px;
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
            <NameH2 onClick={ () => props.focusProfileHandler() }>{props.profile.displayName }</NameH2>
            <CityAgeH2>{props.profile.age + " • " + "Los Angeles, CA"}</CityAgeH2> 
            <div style={{float: "right", margin: "20px"}}>
                <ProfileDropdown {...props} />
            </div>
        </HeaderDiv>
        { (props.media[0] && <ProfileImage src={"http://localhost:8080/dating/image/" + props.media[0].id}  /> ) }
        { (!props.media[0] && <ProfileImage src={"http://localhost:8080/dating/image/1"} /> ) }   
        <ButtonsContainerDiv>
            <InteractionButton target = {props.interactions && props.interactions.like}
                title="Like"
                id={props.id}
                handler={props.handler.likeHandler} />
            <InteractionButton target = {props.interactions && props.interactions.hide}
                title="Hide"
                id={props.id}
                handler = {props.handler.hideHandler} />
        </ButtonsContainerDiv>
        <AboutMe aboutMe={props.profile.aboutMe} lookingFor={props.profile.lookingFor} />

    </ProfileWrapperDiv>
);

const AboutMe = (props) => {
    return (
        <AboutMeDiv>
            <p>
                {props.aboutMe}
            </p>
            <p>
                Seeking: {props.lookingFor}
            </p>

        </AboutMeDiv>
    )
}


export default Profile;