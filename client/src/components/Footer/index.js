import React from 'react'
import icon from '../../assets/logo192.png'


function Footer() {
    return (
        <footer id="links" className="container">

            <div  >
                <div className="row" id="footer">

                    <h3>&#169; 2021 Created by Adam Ramos, John Halley and Mark Peterson</h3>
                    
                   

                
                </div>

                <div className="row" id="react">
                    <span>Built with React<a href="https://reactjs.org/" target="_blank" rel="noreferrer"><img src={icon} alt="react icon" style={{ width: "2rem" }} /> </a></span>
                </div>
            </div>

        </footer>

    )

}

export default Footer;