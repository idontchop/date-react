import React from 'react';
import styled from 'styled-components';

const backButtonStyle = `
    -webkit-box-sizing: content-box
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    width: 160px;
    margin: 2em auto 0;
    padding: 12px;
    overflow: hidden;
    border: none;
    font: normal 17px/1 "andada", Helvetica, sans-serif;
    color: rgba(247,205,205,1);
    text-align: center;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    background: rgba(117,117,117,1);
    -webkit-box-shadow: 2px 1px 1px 0 rgba(0,0,0,0.3) ;
    box-shadow: 2px 1px 1px 0 rgba(0,0,0,0.3) ;
    text-shadow: 3px 1px 1px rgba(40,40,40,1) ;
    -webkit-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1) 10ms;
    -moz-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1) 10ms;
    -o-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1) 10ms;
    transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1) 10ms;
    `;

/**
 * This will wrap a component with a navigation bar at the top.
 * This is meant to be used in place of withModal on small
 * screens.
 * 
 * This component is meant to use the whole screen and will
 * need to be supplied functions for use when the back button
 * is hit.
 * 
 * props.backPressed
 * 
 * @param {Component to wrap} Component 
 */
 const withNavigation = ( Component ) => (

    class extends React.Component {

        constructor(props) {
            super(props)

        }

        render () {

            const BackButton = styled.button`${backButtonStyle}`;

            return (
                <div>
                    <BackButton> BACK </BackButton>
                    <Component />
                </div>
                
            )
        }
    }
)

export default withNavigation;