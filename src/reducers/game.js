const defaultState = {
    
};

export const build = (state, action) => {
	return state;
}

const game = (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'BUILD':
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default game;