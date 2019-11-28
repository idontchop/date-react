import React from 'react';


/**
 * Stateless render under Form. This component renders one input text field.
 * @param {user} props 
 */
const DateInputText = (props) => (

    <div>
        <label>{props.name}</label>
        <input
            name={props.name}
            type="text"
            value={props.value}
            onChange={props.onChange} />

    </div>
)

export default DateInputText;