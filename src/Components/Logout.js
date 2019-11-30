import React from 'react';

const Logout = (props) => {

    
    return (
        <div><button onClick = { 
            () => props.logout()
         }>Logout</button></div>
    );

    /*
    return (
        <div>
            <form onSubmit={props.logout() } method="post">
                <input type="submit" value="Logout" />
            </form>

        </div>
    )*/

}

export default Logout;