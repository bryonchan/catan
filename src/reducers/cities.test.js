import {produceResources} from '.';

describe('Cities', () => {
    // it('should be worth 2 Victory points', () => {
    //     expect(city.victoryPoints).toEqual(2);
    // });
    it('should produce 2 resource cards from the adjacent terrain hexes for the owner', () => {
    	
    	let islandState = {
    		terrainHex: {
    			"terrain1": {
    				slots: [
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
			    		{key: 14}
    				],
    				type: 'brick'
    			},
    			"terrain4": {
    				slots: [
    					{key: 20},
			    		{key: 21},
			    		{key: 22}
    				],
    				type: 'wheat'
    			},
    			"terrain5": {
    				slots: [
    					{key: 24},
			    		{key: 22},
			    		{key: 23}
    				],
    				type: 'wood'
    			}
    		}
    	}

    	let state = {
    		player2: {
    			resourceCards: {
    				bricks: 2,
    				lumber: 3,
    				wheat: 0
    			}
    		}  
    	}

    	state = produceResources(state, {
    		buildingSlot: "22"
    	}, islandState);
    	expect(state.player2.resourceCards).toMatchObject({
    		bricks: 3,
    		lumber: 4,
    		wheat: 1
    	});
    });
});