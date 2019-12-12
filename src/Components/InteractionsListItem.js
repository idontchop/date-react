import React from 'react';
import styled from 'styled-components';

const StyledListItem = styled.li`
    margin: 0;
    padding: 1px;
    cursor: pointer;
`;

const InteractionsListItem = (props) => {

    // proper text whether adding or removing
    let actionText = props.target ? "Remove" : "Add";
    return (
        <StyledListItem onClick={ () => props.handler(props.id)}>
            {actionText + " " + props.title}
        </StyledListItem>
    );

}

export default InteractionsListItem;