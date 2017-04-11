import React, { PropTypes } from 'react';
import BuildingSlot from './building-slot';
import Robber from "./robber";

const TerrainHex = ({ slots, className, onSlotClick, allSlots, number, type, players, hasRobber, onHexClick, hex }) => {
    return (
        <div className={'hex ' + className} onClick={onHexClick.bind(this, hex.key)}>
        	{slots.map((s, i) => {
        		let slot = allSlots[s.key];
        		return <BuildingSlot onClick={() => onSlotClick(slot)} key={slot.key} className={'slot' + i + ' slot'} slot={slot} owner={players[slot.owner]} />
        	})}
        	<div className='number'>{number} {type}</div>
            {hasRobber &&
                <Robber />
            }
        </div>
    );
};

TerrainHex.displayName = 'TerrainHex';

TerrainHex.propTypes = {
    slots: PropTypes.array,
};

export default TerrainHex;
