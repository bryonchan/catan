import {defaultState} from "."; 

//state = players
export const stealResource = (state, action) => {
	// state[action.player].resourceCards
	let playerResource = state[action.player].resourceCards[action.resourceType] + 1;
	let victimResource = state[action.victim].resourceCards[action.resourceType] - 1; 
	return {
		...state, 
		[action.player]: {
			...state[action.player],
			resourceCards: {
				...state[action.player].resourceCards,
				[action.resourceType]: playerResource
			}
		},
		[action.victim]: {
			...state[action.victim],
			resourceCards: {
				...state[action.victim].resourceCards,
				[action.resourceType]: victimResource
			}
		}
	};
}

export const discardResources = (state, action) => {
	let resourceCards = {};
	Object.keys(state[action.player].resourceCards).forEach((key) => {
		
		if(action.resourceCards[key]){
			resourceCards[key] = state[action.player].resourceCards[key] - action.resourceCards[key];
		}else{
			resourceCards[key] = state[action.player].resourceCards[key];
		}

	});

	return {
		...state,
		[action.player]: {
			...state[action.player],
			resourceCards: resourceCards
		}
	};
}

const players = (state = defaultState.players, action = {}) => {
    switch (action.type) {
        case "STEAL_RESOURCE":
            return stealResource(state, action);
        case "DISCARD_RESOURCES":
            return discardResources(state, action);
        default:
            return state;
    }
};

export default players;
