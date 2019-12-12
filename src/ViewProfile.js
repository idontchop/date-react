import React from 'react';
import styled from 'styled-components';

// Styled components

const imageStyle = `
    width: 100%;
    height: auto;
    `;
const imageMenuStyle = `
    width: 100px
    height: 100px
    `;


/**
 * Used to view another person's profile. 
 * Will lead with big media image and slider menu for browing images
 * 
 * Receives the User's Json, passed in from main search. 
 * This component will only need to fetch profile media
 */
export default class ViewProfile extends React.Component {

    constructor(props) {
        super(props);

        console.log("ViewProfile constructor:")
        console.log(props);
        
    }

    /**
     * Probably will do nothing, but we may want to fullscreen the image later
     * 
     * @param {event} e 
     */
    onHeaderImageClick (e) {

    }

    onMenuImageClick (e) {
        this.setState( {activeMedia: e })
    }

    componentWillMount() {
        this.setState({activeMedia: 0}); // controls which media displayed
    }

    /**
     * Returns the media at the top of the profile
     * The selected image is shown above a thumbnail list of other media
     * controlled by state.activeMedia
     */
    imageMenu () {

        let numImages = Object.keys(this.props.media).length;

        //Style header media and menu media
        let HeaderImage = styled.img`${imageStyle}`;
        let MenuImage = styled.img`${imageMenuStyle}`;

        // check if we have media at all
        if ( numImages < 1 ) {
            // no media at all, so we can return an empty div
            return <div></div>

        } else {

            // header menu, use state to display
            var headerMedia = (<div>
                <HeaderImage src={"/dating/image/" + this.props.media[this.state.activeMedia].id}
                    onClick={ e => this.onHeaderImageClick(e) } />
            </div>);

            // menu, show thumbnails horizontally and allow click to change header media
            var menuMedia = (numImages > 1) ? (<div>
                {this.props.media.map ( (e, index) => <MenuImage src={"/dating/image/" + e.id}
                    id={e.id} key={e.id}
                    onClick={ e => this.onMenuImageClick(index)}
                    />)}
            </div>)
                
            : <div></div>;


        }


        return  (<div>
                    {headerMedia}
                    {menuMedia}
                </div>);
    }

    profileAttributes () {

        return ( 
        <div>
            {this.profileAttribute( "About", this.props.profile.aboutMe)}
            {this.profileAttribute("Looking For", this.props.profile.lookingFor)}
        </div>)
    }

    profileAttribute ( title, text ) {
        return (
        <div>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>)
    }

    
    render () {
        if ( !this.props.profile ) return <div></div>
        else return  (<div>
                    <h2>{this.props.profile.displayName}</h2>
                    <div>{this.imageMenu()}</div>
                    {this.profileAttributes()}
                </div>)

    }

}