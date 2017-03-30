import {defaultState} from  '.';

export const buildingSlots = (state = defaultState.buildingSlots, action = {}) => {
	return state;
};

export const terrainHex = (state = defaultState.terrainHex, action = {}) => {
	return state;
};

const island = (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'type':
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default island;

