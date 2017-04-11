import React, { Component, PropTypes } from 'react';
import Settlement from './settlement';
import Road from './road';
import City from './city';

class BuildingSlot extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.ItemComponents = {
            "Road": Road,
            "Settlement": Settlement,
            "City": City
        }
    }
    
    handleClick() {
    	this.props.onClick();
    }

    render() {
        const Item = this.ItemComponents[this.props.slot.item];

        return (
            <div onClick={this.handleClick.bind(this)} className={this.props.className + (this.props.slot.type === 'Path' ? ' path':'')}>
                {this.props.slot.key}
            	
                {this.props.slot.item  &&
                    <Item colour={this.props.owner.colour} />
                }
                
            </div>
        );
    }
}

export default BuildingSlot;
