import React from 'react';

const modelStyle = {
    display: "none",
    position: "fixed",
    zIndex: "1",
    paddingTop: "100px",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgb(0,0,0)",
    backgroundColor: "rgba(0,0,0,0.4)"
}

const modelContentStyle = {
    backgroundColor: "#fefef1",
    margin: "auto",
    padding: "20px",
    border: "1px solid #888",
    width: "80%"
}

const closeButtonStyle = {
    color: "#aaaaaa",
    float: "right",
    fontSize: "25px",
    fontWeight: "bold"
}


/**
 * Idea behind this component is a standardized Modal for wrapping menus
 * the user may need such as updating profile / preferences.
 *  
 * Css currently borrowed from 
 * https://github.com/spring-guides/tut-react-and-spring-data-rest/blob/master/hypermedia/src/main/resources/static/main.css 
 * 
 * TODO: handle click outside: https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-react-component-5604830beb7f
 *  For outside clicks, we may want to create another with
 * 
 * @param {} Component 
 * @param {*} componentTitle 
 */
const withModal = (Component, componentTitle) => (

   
    class extends React.Component {
        
        constructor(props) {
            super (props);

            // create component tag by removing whitespace from title
            this.componentTag = componentTitle.replace (/\s/g,'');

            // Note here the entire style is loaded into the state
            // since this is the only style we need to change, it works well
            this.state = modelStyle;
        }

    render () {
        return (
            <div>
                <a href={"#" + this.componentTag} 
                    onClick={ () => this.setState( {display: "block"})}>
                    {componentTitle}</a>

                <div id={this.componentTag} style={this.state}>
                    <div style={modelContentStyle}>
                        <a href="#" title="Close"
                            style={closeButtonStyle}
                            onClick = { () => this.setState( {display: "none"} ) }>X</a>
                        <Component {...this.props} />
                    </div>
                </div>
            </div>
        )
    }
}
    
)

export default withModal