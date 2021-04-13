import React from 'react'
import { Jumbotron } from 'react-bootstrap';

const Header = ({title, imageUrl}) => {
    return ( 
        <React.Fragment>
            <Jumbotron className="mt-5 mb-2 text-center bg-dark text-white">
            {imageUrl? <img 
                src={imageUrl} 
                className="img-thumbnail"
                alt="Cinque Terre"/> 
            : <p className="lead">{title}</p>}
            </Jumbotron>
        </React.Fragment>
    );
}
 
export default Header;