import React, { PropTypes } from 'react';

const DevelopmentCards = ({ className, cards, onBuyCard }) => {
    return (
        <div>
        	<button onClick={onBuyCard}>Buy development card</button>
        </div>
    );
};

DevelopmentCards.displayName = 'DevelopmentCards';

DevelopmentCards.propTypes = {
    className: PropTypes.string,
};

export default DevelopmentCards;
