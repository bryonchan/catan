import catan, {produceResources, setRobber} from '..';

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
	        	},
	        	stage: {
	        		name: "Roll"
	        	},
	        	players: {
		        	player1: {
						resourceCards: {
							bricks: 2,
							lumber: 3,
							wheat: 0
						}
					}
		    	}
	        }


	        let state = catan(islandState, {
	    		type: "ACTIVATE_ROBBER"
	    	});
	        expect(state.players.player1.resourceCards).toEqual({
	        	bricks: 2,
	        	lumber: 3,
	        	wheat: 0,
	        });

	    });    	
    });

    
});