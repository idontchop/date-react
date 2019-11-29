import React from 'react';

/**
 * Idea behind this component is a standardized Modal for wrapping menus
 * the user may need such as updating profile / preferences.
 *  
 * Css currently borrowed from 
 * https://github.com/spring-guides/tut-react-and-spring-data-rest/blob/master/hypermedia/src/main/resources/static/main.css 
 * 
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

        }

    render () {
        return (
            <div>
                <a href={"#" + this.componentTag}>{componentTitle}</a>

                <div id={this.componentTag} className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>
                        <Component />
                    </div>
                </div>
            </div>
        )
    }
}
    
)

export default withModal