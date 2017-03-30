import {
    Action
} from 'path';

const defaultState = {
    buildingSlots: [
    	{key: 1},
    	{key: 2},
    	{key: 3},
    	{key: 4},
    	{key: 5},
    	{key: 6},
    	{key: 7},
    	{key: 8},
    	{key: 9},
    	{key: 10},
    	{key: 11},
    ],
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

export const buildingSlots = (state = defaultState.buildingSlots, action = {}) => {
	return state;
};

export const terrainHex = (state = defaultState.terrainHex, action = {}) => {
	return state;
};

const island = (state = defaultState, action = {}) => {
    switch (action.type) {
        case type:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default island;

