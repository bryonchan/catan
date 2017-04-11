//state = terrainHex
export const setRobber = (state, action) => {
	return {...state, hasRobber: true};
}

const clearRobber = (state, action) => {
	return {...state, hasRobber: false};
}

const terrainHex = (state = {}, action = {}) => {
    switch (action.type) {
        case "SET_ROBBER":
        	let newState = {};
        	Object.keys(state).forEach((key) => {
        		newState[key] = clearRobber(state[key], action);

        		if(key === action.hex){
        			newState[key] = setRobber(state[key], action);
        		}
        	});

            return newState;

        default:
            return state;
    }
};

export default terrainHex;
