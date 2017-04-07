import {produceResources, setRobber} from '.';

describe('Desert', () => {
    describe("Resource production", () => {
		it('should not produce resources', () => {
	        const islandState = {
	        	terrainHex: {
	        		"terrain3": {
	        			type: 'Desert',
	        			number: 7,
	        			slots: [{key: "9"}]
	        		}
	        	},
	        	buildingSlots: {
	        		"9": {
	        			item: "City" ,
	        			owner: "player1"
	        		}
	        	}
	        }

	        let state = {
	        	player1: {
					resourceCards: {
						bricks: 2,
						lumber: 3,
						wheat: 0
					}
				}
	    	}

	        state = produceResources(state, {
	    		number: 7,
	    		buildingSlot: "9",
	    		terrainHex: "terrain3"
	    	}, islandState);
	        expect(state.player1.resourceCards).toEqual({
	        	bricks: 2,
	        	lumber: 3,
	        	wheat: 0,
	        });

	    });    	
    });

    describe("robber", () => {
    	it('should be set', () => {
    		let state = {};
    		state = setRobber(state, {});
    		expect(state.hasRobber).toEqual(true);
    	});
    });
});