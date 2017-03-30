import _ from 'lodash';

export const defaultState = {
    buildingSlots: {
    	"1": {key: "1"},
    	"2": {key: "2"},
    	"3": {key: "3"},
    	"4": {key: "4"},
    	"5": {key: "5"},
    	"6": {key: "6"},
    	"7": {key: "7"},
    	"8": {key: "8"},
    	"9": {key: "9"},
    	"10": {key: "10"},
    	"11": {key: "11"},
    },
    terrainHex: [
    	{key: 1, slots: [
    		{key: 1},
    		{key: 2},
    		{key: 3},
    		{key: 4},
    		{key: 5},
    		{key: 15},
    		{key: 24},
    		{key: 23},
    		{key: 22},
    		{key: 21},
    		{key: 20},
    		{key: 14},
    		]},
    	{key: 2},
    	{key: 3},
    	{key: 4},
    	{key: 5, slots: [
    		{key: 22},
    		{key: 23},
    		{key: 24},
    		{key: 25},
    		{key: 26},

    		] },
    	{key: 6},
    	{key: 7},
    	{key: 8},
    	{key: 9},
    	{key: 10},
    	{key: 11},
    ]
};

const buildInSpot = (state, action) => {
	return Object.assign({}, state, {item: action.item});
}

//Player reducers
const reducePlayer = (state, action) => {
	state.player1.roads = state.player1.roads - 1;
	state.player1.resourceCards.bricks = state.player1.resourceCards.bricks - 1;
	state.player1.resourceCards.lumber = state.player1.resourceCards.lumber - 1;

	if(action.item === 'City'){
		state.player1.settlements = state.player1.settlements + 1; 
	}

	return Object.assign({}, state);
}

export const produceResources = (state, action, islandState) => {
	state.player2.resourceCards.bricks = state.player2.resourceCards.bricks + 1;
	state.player2.resourceCards.lumber = state.player2.resourceCards.lumber + 1;
	state.player2.resourceCards.wheat = state.player2.resourceCards.wheat + 1;
	return state;
}

export const build = (state, action) => {
	if(state.players.player1.roads > 0) {
		state.buildingSlots[action.slot] = buildInSpot(state.buildingSlots[action.slot], action);
		
		state.supplyStacks.bricks = state.supplyStacks.bricks + 1;
		state.supplyStacks.lumber = state.supplyStacks.lumber + 1;

		state.players = reducePlayer(state.players, action);
	}else{
		state.errorMessage = "You do not have any roads left.";
	}

	switch(action.item){
		case 'Road':

			return state;
		return state;
	}

	return state;
}

const emptyPlayer = {
	settlements: 5
};

export const createPlayer = (state = {}, action = {}) => {
	return Object.assign({}, state, emptyPlayer);
}

const catan = (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'BUILD':
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default catan;
