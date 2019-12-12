import React from 'react';
import { Slider, Handles, Rail, Tracks } from 'react-compound-slider';
import styled from 'styled-components';


const sliderStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
    height: 60,
}

const railStyle = {
    position: 'absolute',
    width: '100%',
    height: 5,
    marginTop: 33,
    borderRadius: 5,
    backgroundColor: '#682A2A',
  }

const SliderDiv = styled.div`
    position: absolute;
    width: 100%;
    height: 10;
    margin-top: 35;
    border-radius: 5;
    background-color: black;
`;

const StyledFieldSet = styled.fieldset`
    margin: 1em;
    padding: 1em;
    max-width: 470px;
    background-color: white;
    border: 1px solid #682A2A;
`;

const StyledLegend = styled.legend`
    padding: 0.2em 1em
    border: #A68181 solid 1px;
    color: black;
    background-color: #A68181 ;
    font-size: 1.1em;
    font-family: "Book Antiqua", serif;
    
`;

const StyledCheckbox = styled.input`
    padding: 0.2em 1em;
    color: #A68181;
    font-size: 1.1em;
    font-family: "Book Antiqua", serif;

`;

const StyledLabel = styled.label`
    padding: 0.2em 1em;
    color: #A68181;
    font-size: 1.1em;
    font-family: "Book Antiqua", serif;
`;

/**
 * Plugs into DatingSearchContainer. Menu bar for user to select search preferences
 * 
 * Range Bars from React plugin: https://sghall.github.io/react-compound-slider/
 * 
 * @param {} props 
 */
const MainSearchBar = props => {

        return (
            <div>
                <form onSubmit= { e => props.handleSearchSubmit(e) }>
                <StyledFieldSet>
                        <StyledLegend>
                            Age:
                        </StyledLegend>
                                                
                        <Slider
                            rootStyle={sliderStyle}
                            domain={[18, 100]}
                            step={1}
                            mode={2}
                            values={[22, 60]}
                            onChange= { e => props.handleAgeChange(e) }
                            >

                            <div style={railStyle} />

                            <Handles>
                                { ({ handles, getHandleProps}) => (
                                    <div className="slider-handles">
                                        { handles.map (handle => (
                                            <Handle
                                                key={handle.id}
                                                handle={handle}
                                                getHandleProps={getHandleProps}
                                            />
                                        ))}
                                    </div>
                                )}
                            </Handles>

                            <Tracks left={false} right={false}>
                                {({ tracks, getTrackProps }) => (
                                    <div className="slider-tracks">
                                    {tracks.map(({ id, source, target }) => (
                                        <Track
                                        key={id}
                                        source={source}
                                        target={target}
                                        getTrackProps={getTrackProps}
                                        />
                                    ))}
                                    </div>
                                )}
                            </Tracks>

                            <Rail>
                                {({ getRailProps }) => (
                                    <div style={railStyle} {...getRailProps()} />
                                )}
                            </Rail>

                        </Slider>
                </StyledFieldSet>
                <StyledFieldSet>
                    <StyledLegend>
                        Show:
                    </StyledLegend>
                    <StyledLabel>
                        <StyledCheckbox type={"checkbox"} />
                        Likes
                    </StyledLabel>
                    <StyledLabel>
                        <StyledCheckbox type={"checkbox"} />
                        Hides
                    </StyledLabel>
                    <StyledLabel>
                        <StyledCheckbox type={"checkbox"} />
                        Favorites
                    </StyledLabel>
                </StyledFieldSet>
                    { props.searchPrefsChanged ? <button>Update Search</button> : null }
                </form>
            </div>
        )
    
}

export default MainSearchBar;

const Handle = ( {handle: { id, value, percent}, getHandleProps} ) => {
    return (
        <div
            style= {{
                left: `${percent}%`,
                position: 'absolute',
                marginLeft: -15,
                marginTop: 25,
                zIndex: 2,
                width: 20,
                height: 20,
                border: 0,
                textAlign: 'center',
                cursor: 'pointer',
                borderRadius: '50%',
                backgroundColor: '#2C4870',
                color: '#333',
                }}
                {...getHandleProps(id)}
        >
            <div style={{ fontFamily: 'Roboto', fontSize: 11, marginTop: -15 }}>
                {value}
            </div>
        </div>
    )
}

const Track = ( {source, target, getTrackProps }) => {
    return (
        <div
            style= {{
                position: 'absolute',
                height: 5,
                zIndex: 1,
                marginTop: 33,
                backgroundColor: '#546C91',
                borderRadius: 5,
                cursor: 'pointer',
                left: `${source.percent}%`,
                width: `${target.percent - source.percent}%`,
            }}
            {...getTrackProps()}
        />
    )
}
