import React, { PropTypes } from 'react';

const Road = ({ className, colour }) => {
    return (
        <i style={{color: colour}} className="fa fa-road" aria-hidden="true"></i>
        
    );
};

Road.displayName = 'Road';

Road.propTypes = {
    className: PropTypes.string,
};

export default Road;
