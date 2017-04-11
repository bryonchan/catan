import React, { Component, PropTypes } from 'react';

class HelpMessage extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    render() {
    	let message = this.props.stage.name;

    	switch(this.props.stage.name){
    		case "Set Settlement":
    			message += ` ${this.props.player} - Place a settlement`;
    			break;
    		case "Set Road":
    			message += ` ${this.props.player} - Place a road`;
    			break;
    		case "Roll":
    			message += ` ${this.props.player} - Roll!`;
    			break;
            case "Trade":
            case "Robber":
                message += ` ${this.props.player} - ${this.props.stage.message}`;
                break;
			default:
				message += null;
				break;
    	}


        return (
            <div>{message}</div>
        );
    }
}

export default HelpMessage;
