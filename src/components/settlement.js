import React, { PropTypes } from 'react';

const Settlement = ({ className, colour }) => {
    return (
        <i style={{color: colour}} className="fa fa-home" aria-hidden="true"></i>
    );
};

Settlement.displayName = 'Settlement';

Settlement.propTypes = {
    className: PropTypes.string,
    colour: PropTypes.string
};

export default Settlement;
