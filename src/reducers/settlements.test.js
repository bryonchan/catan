import catan from '.';

describe('Settlements', () => {   
    it('should be built', () => {
    	let state = catan(undefined, {});
    	state.players.player1.resourceCards = {
    		...state.players.player1.resourceCards, 
    		wool: 1,
    		grain: 1
    	};
    	state.buildingSlots["6"] = {
    		item: "Road",
    		owner: "player1"
    	}
        state = catan(state, {type: "BUILD", slot: "7", player: "player1", item: "Settlement"});
        expect(state.errorMessage).toBeUndefined();
        expect(state.buildingSlots["7"]).toMatchObject({item: "Settlement"});
    });
    
    it('should only be built on intersections', () => {
        let state = catan(undefined, {type: "BUILD", slot: "6", player: "player1", item: "Settlement"});
        expect(state.errorMessage).toEqual("You can only build settlements on intersections.");
    });

    it('should always be connected to one or more of your own roads', () => {
        let state = catan(undefined, {type: "BUILD", slot: "30", player: "player1", item: "Settlement"});
        expect(state.errorMessage).toEqual("The settlement should always be connected to one or more of your own roads.");
    });


});