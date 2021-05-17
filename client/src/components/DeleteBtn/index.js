// DELETE BUTTON

import React from 'react';

// spread all of the props onto this element so they don't have to be defined individually
function DeleteBtn(props) {
    return (
        <span {...props} role="button" tabIndex="0">
            ✗
        </span>
    );
};

export default DeleteBtn;