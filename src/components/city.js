import React, { PropTypes } from 'react';

const City = ({ className, colour }) => {
    return (
        <i style={{color: colour}} className="fa fa-industry" aria-hidden="true"></i>
        
    );
};

City.displayName = 'City';

City.propTypes = {
    className: PropTypes.string,
};

export default City;
