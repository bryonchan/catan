import catan, {setColour, setSettlement} from '.';

describe('Setup', () => {

	describe('Island', () => {
	    it('should have 19 hexes', () => {
	    	let state = catan(undefined, {});
			expect(Object.keys(state.terrainHex).length).toEqual(19);	        
	    });

	    it('should have 126 hexes', () => {
	    	let state = catan(undefined, {});
			expect(Object.keys(state.buildingSlots).length).toEqual(126);
			expect(Object.keys(state.buildingSlots)[99]).toEqual("100");	        
	    });

	    describe('Hex 8', () => {
		    it('should have slot 32', () => {
		    	let state = catan(undefined, {});

		    	expect(state.terrainHex["terrain2"].slots).toContainEqual({key: "6"});	        
				expect(state.terrainHex["terrain2"].slots).toContainEqual({key: "15"});	        
				expect(state.terrainHex["terrain2"].slots).toContainEqual({key: "25"});

				expect(state.terrainHex["terrain3"].slots).toContainEqual({key: "12"});	        
				expect(state.terrainHex["terrain3"].slots).toContainEqual({key: "17"});	        
				expect(state.terrainHex["terrain3"].slots).toContainEqual({key: "30"});

				expect(state.terrainHex["terrain5"].slots).toContainEqual({key: "26"});	        
				expect(state.terrainHex["terrain5"].slots).toContainEqual({key: "49"});	        
				expect(state.terrainHex["terrain5"].slots).toContainEqual({key: "36"});	        

				expect(state.terrainHex["terrain11"].slots).toContainEqual({key: "79"});	        
				expect(state.terrainHex["terrain11"].slots).toContainEqual({key: "81"});	        
				expect(state.terrainHex["terrain11"].slots).toContainEqual({key: "54"});

				expect(state.terrainHex["terrain13"].slots).toContainEqual({key: "89"});	        
				expect(state.terrainHex["terrain13"].slots).toContainEqual({key: "94"});

				
				expect(state.terrainHex["terrain19"].slots).toContainEqual({key: "105"});	        
				expect(state.terrainHex["terrain19"].slots).toContainEqual({key: "126"});	        
				expect(state.terrainHex["terrain19"].slots).toContainEqual({key: "112"});	        
		    });

	    });

	    describe('Building slot', () => {
		    it('should be an intersection', () => {
		    	let state = catan(undefined, {});
		    	expect(state.buildingSlots["73"]).toMatchObject({type: 'Intersection'});
		    });

		    it('should be a path', () => {
		    	let state = catan(undefined, {});
		    	expect(state.buildingSlots["45"]).toMatchObject({type: 'Path'});
		    });
	    });
	});

	describe('Players', () => {
	    it('should have at least 3 players', () => {
	        let state = catan(undefined, {});
	        expect(Object.keys(state.players).length).toBeGreaterThan(2);
	    });

	    it('should have 15 roads', () => {
	        let state = catan(undefined, {});
	        expect(state.players.player2.roads).toEqual(15);
	    });

	    it('should have resource cards', () => {
	        let state = catan(undefined, {});
	        expect(state.players.player2.resourceCards.bricks).not.toBeUndefined();
	    });

	    it('should have a colour', () => {
	    	let state = setColour(undefined, {colour: 'Red'});
	    	expect(state).toMatchObject({colour: 'Red'});
	    });
	});

	describe('Supply Stacks', () => {
	    it('should have bricks', () => {
	        let state = catan(undefined, {});
	        expect(Object.keys(state.supplyStacks)).toContainEqual('bricks');
	    });
	});

	describe('Setup Phase - Round One', () => {
		describe('...', () => {
		    it('should allow players to set initial settlement', () => {
		    	var action = {type: "SET_ITEM", player: 'player1', slot: "87", item: "Settlement"};
		    	let state = catan(undefined, action);
		    	expect(state.buildingSlots[action.slot].item).toEqual('Settlement');
		    	expect(state.buildingSlots[action.slot].owner).toEqual('player1');
		    	expect(state.currentPlayer).toEqual('player1');
		    });

		    it('should only allow players to build roads on paths', () => {
		    	var action = {type: "SET_ITEM", player: 'player2', slot: "87", item: "Road"};
		    	let state = catan(undefined, action);
		    	state.currentPlayer = 'player2';
		    	expect(state.buildingSlots[action.slot].item).toEqual(null);
		    	expect(state.buildingSlots[action.slot].owner).toEqual(null);
		    	expect(state.errorMessage).toEqual("You can only build roads on paths.");
		    	expect(state.currentPlayer).toEqual('player2');
		    });

		    it('should only allow players to build roads adjacent to a settlement', () => {
		    	let action = {type: "SET_ITEM", player: 'player1', slot: "87", item: "Settlement"};
		    	let state = catan(undefined, action);
		    	action = {type: "SET_ITEM", player: 'player2', slot: "59", item: "Road"};
		    	state = catan(state, action);
		    	
		    	expect(state.buildingSlots[action.slot].item).toEqual(null);
		    	expect(state.buildingSlots[action.slot].owner).toEqual(null);
		    	expect(state.errorMessage).toEqual("The road must be adjacent to the settlement.");
		    	
		    });

		    it('should allow players to set initial road', () => {
		    	let action = {type: "SET_ITEM", player: 'player1', slot: "87", item: "Settlement"};
		    	let state = catan(undefined, action);
		    	action = {type: "SET_ITEM", player: 'player1', slot: "86", item: "Road"};
		    	state = catan(state, action);
		    	expect(state.buildingSlots[action.slot].item).toEqual('Road');
		    	expect(state.buildingSlots[action.slot].owner).toEqual('player1');
		    });	
		});
	})
});
