import React, { PropTypes } from 'react';
import styled from "styled-components";

const StyledRobber = styled.div`
	position: absolute;
	top: 20px;
	left: 20px;
`;


const Robber = ({ className, colour }) => {
    return (
    	<StyledRobber>
        	<i style={{color: colour}} className="robber fa fa-odnoklassniki" aria-hidden="true"></i>
        </StyledRobber>
    );
};

Robber.displayName = 'Robber';

Robber.propTypes = {
    className: PropTypes.string,
};

export default Robber;
