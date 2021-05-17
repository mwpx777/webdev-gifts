// NO MATCH

import React from 'react';
import Jumbotron from '../components/Jumbotron';


const NoMatch = () => {
    return (
        <div>
            <Jumbotron>
                <h2> 4040 Page Not Found!</h2>
                <h1>
                    <span role="img" aria-label="Rolling eyes">🙄</span>
                </h1>
            </Jumbotron>
        </div>
    );
};

export default NoMatch;