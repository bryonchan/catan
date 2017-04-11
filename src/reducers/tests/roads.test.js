import catan, {build} from '..';

describe('Road', () => {
    it('should only be built on paths', () => {
        let state = catan(undefined, {type: "BUILD", slot: "7", player: "player1", item: "Road"});
        expect(state.errorMessage).toEqual("You can only build roads on paths.");
    });

    it('must always connect to one of your existing roads, settlements, or cities', () => {
    	let state = catan(undefined, {});
    	state.players.player1.resourceCards = {
    		bricks: 2,
    		lumber: 2
    	}
    	let newState = catan(state, {type: "BUILD", slot: "6", player: "player1", item: "Road"});
    	newState = catan(newState, {type: "BUILD", slot: "10", player: "player1", item: "Road"});
        expect(newState.errorMessage).toEqual("A new road must always connect to one of your existing roads, settlements, or cities.");
        expect(newState.buildingSlots["10"].item).toEqual(null);
    });

    it('must always connect to one of your existing roads, settlements, or cities #2', () => {
        let state = catan(undefined, {});
    	state.players.player1.resourceCards = {
    		bricks: 2,
    		lumber: 2
    	}
    	state.buildingSlots["6"].item = "Road";
    	state.buildingSlots["6"].owner = "player1";
    	let newState = catan(state, {type: "BUILD", slot: "8", player: "player1", item: "Road"});
        expect(newState.buildingSlots["8"].item).toEqual("Road");
    });
});