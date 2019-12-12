import React from 'react';

const modalStyle = {
    display: "block",
    position: "fixed",
    zIndex: "5",
    paddingTop: "100px",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgb(0,0,0)",
    backgroundColor: "rgba(0,0,0,0.4)"
}

const modalHideStyle = {
    display: "none",
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
 * This wraps a component in a modal and supplies an X to close.
 * The visibility state is supplied by the parent along with a callback for closing.
 * 
 * The idea is to have only one of these modals on th search page. The list will contain
 * state for the current profile being shown here and whether it's visible. When
 * that state changes, this modal will update.
 * 
 * Expects a modalVisible prop true/false
 * 
 * @param {} Component All props passed through to Component
 * @param {*} onClose the callback when user clicks X
 */
const withModal = (Component, onClose) => (

   
    class extends React.Component {
        
        constructor(props) {
            super (props);

            // Assign the close callback
            this.onClose = () => { onClose() };

        }

    

    render () {
        return (
            <div>
                <div style={ !!this.props.modalVisible ? modalStyle : modalHideStyle }>
                    <div style={modelContentStyle}>
                        <a href="#" title="Close"
                            style={closeButtonStyle}
                            onClick = { () => this.onClose() }>X</a>
                        <Component {...this.props} />
                    </div>
                </div>
            </div>
        )
    }
}
    
)

export default withModal