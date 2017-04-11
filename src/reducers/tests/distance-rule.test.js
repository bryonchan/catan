import catan from '..';

describe('Distance Rule', () => {
    describe('A settlement', () => {
        it('may be placed on an open intersection only if none of the adjacent intersections are occupied by settlements or cities', () => {
            let newState = catan(undefined, {type: "SET_ITEM", item: "Settlement", slot: "5", player: "player1"});
            newState = catan(newState, {type: "SET_ITEM", item: "Settlement", slot: "7", player: "player1"});
            expect(newState.buildingSlots["7"].item).toBeNull();
            expect(newState.errorMessage).toEqual("A settlement may be placed on an open intersection only if none of the adjacent intersections are occupied by settlements or cities.");

        });

        it('may be built on an open intersection only if none of the adjacent intersections are occupied by settlements or cities', () => {
            let newState = catan(undefined, {type: "SET_ITEM", item: "Settlement", slot: "5", player: "player1"});
            newState.players.player1 = {
            	...newState.players.player1, resourceCards: {
            		wool: 1, grain: 1, bricks: 1, lumber: 1
            	}
            }
            newState.buildingSlots["6"] = {
	    		item: "Road",
	    		owner: "player1"
	    	}
            newState = catan(newState, {type: "BUILD", item: "Settlement", slot: "7", player: "player1"});
            expect(newState.buildingSlots["7"].item).toBeNull();
            expect(newState.errorMessage).toEqual("A settlement may be placed on an open intersection only if none of the adjacent intersections are occupied by settlements or cities.");

        });
    });
});