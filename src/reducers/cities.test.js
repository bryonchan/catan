import {produceResources} from '.';
import _ from 'lodash';

describe('Cities', () => {
    // it('should be worth 2 Victory points', () => {
    //     expect(city.victoryPoints).toEqual(2);
    // });

    let islandStateDefault = {
    		buildingSlots: {
    			"16": {
    				"key": "16",
    				"item": "Settlement",
    				"owner": "player1"
    			},
    			"23": {
    				"key": "23",
    				"item": "City",
    				"owner": "player1"
    			}
    		},
    		terrainHex: {
    			"terrain1": {
    				slots: [
    					{key: "1"},
			    		{key: "2"},
			    		{key: "3"},
			    		{key: "4"},
			    		{key: "5"},
			    		{key: "15"},
			    		{key: "24"},
			    		{key: "23"},
			    		{key: "22"},
			    		{key: "21"},
			    		{key: "20"},
			    		{key: "14"}
    				],
    				type: 'Hills'
    			},
    			"terrain2": {
    				slots: [
    					{key: "7"},
			    		{key: "8"},
			    		{key: "9"},
			    		{key: "16"},
			    		{key: "28"},
			    		{key: "27"},
			    		{key: "26"},
			    		{key: "25"},
			    		{key: "24"},
			    		{key: "15"},
			    		{key: "5"},
			    		{key: "6"}
    				],
    				type: 'Pasture',
    				number: 8
    			},
    			"terrain4": {
    				slots: [
    					{key: "20"},
			    		{key: "21"},
			    		{key: "22"}
    				],
    				type: 'Fields'
    			},
    			"terrain5": {
    				slots: [
    					{key: "24"},
    					{key: "25"},
    					{key: "26"},
			    		{key: "22"},
			    		{key: "23"}
    				],
    				type: 'Forest',
    				number: 6
    			},
    			"terrain6": {
    				slots: [
    					{key: "28"},
    					{key: "29"},
    					{key: "30"},
			    		{key: "26"},
			    		{key: "27"}
    				],
    				type: 'Forest'
    			}
    		}
    	}

    let islandState;

    beforeEach(() => {
    	islandState = _.cloneDeep(islandStateDefault);
    });

    it('should produce 2 resource cards from the adjacent terrain hexes for the owner', () => {

    	let state = {
    		player1: {
				resourceCards: {
					bricks: 2,
					lumber: 3,
					wheat: 0,
					wool: 0
				}
	    	}
	    }

    	state = produceResources(state, {
    		number: 8,
    		type: 'PRODUCE'
    	}, islandState);
    	
    	expect(state.player1.resourceCards).toMatchObject({
    		bricks: 2,
    		lumber: 3,
    		wheat: 0,
    		wool: 1
    	});
    });

    it('should produce 2 resource cards from the adjacent terrain hexes for the owner #2', () => {

    	let state = {
    		player1: {
				resourceCards: {
					bricks: 2,
					lumber: 3,
					wheat: 0,
					wool: 0,
					ore: 0
				}
	    	}
	    }

    	state = produceResources(state, {
    		number: 6,
    		type: 'PRODUCE'
    	}, islandState);
    	
    	expect(state.player1.resourceCards).toMatchObject({
    		bricks: 2,
    		lumber: 5,
    		wheat: 0,
    		wool: 0,
    		ore: 0
    	});
    });


});