import catan, {defaultState} from "..";
import terrainHex, {setRobber} from "../terrain-hex";
import _ from "lodash";

describe('Robber', () => {
    it('should begin the game in the desert', () => {
        let state = catan(_.cloneDeep(defaultState), {type: "SET_RESOURCE", hex: "terrain4", resourceType: "Desert"});
        expect(state.terrainHex["terrain4"].hasRobber).toEqual(true);
    });

	it('should be set', () => {
		let state = {};
		state = setRobber(state, {});
		expect(state.hasRobber).toEqual(true);
	});

	it('should be a singleton', () => {
		let state = {"terrainHex1": {
			hasRobber: false
		},
		"terrainHex2": {
			hasRobber: false
		}};
		state = terrainHex(state, {type: "SET_ROBBER", hex: "terrainHex1" });
		expect(state.terrainHex1.hasRobber).toEqual(true);
		
		state = terrainHex(state, {type: "SET_ROBBER", hex: "terrainHex2" });
		expect(state.terrainHex1.hasRobber).toEqual(false);
		expect(state.terrainHex2.hasRobber).toEqual(true);
	});

	it("should prevent resources from being produced", () => {
		let state = catan(_.cloneDeep(defaultState), {});
		state.players.player1.resourceCards.wool = 0;
		state.terrainHex.terrain1.type = "Pasture";
		state.terrainHex.terrain1.number = 11;
		state.terrainHex.terrain1.hasRobber = true;
		state.buildingSlots["1"].item = "Settlement";
		state.buildingSlots["1"].owner = "player1";
		let newState = catan(state, {type:"PRODUCE", number: 11});
		expect(state.players.player1.resourceCards.wool).toEqual(0);
	});

	describe('Rolling a 7', () => {
	     it('should activate the Robber', () => {
	     	let state = catan(_.cloneDeep(defaultState), {});
	     	state.stage.name = "Roll";
			state = catan(state, {type: "ACTIVATE_ROBBER", number: 7});
			expect(state.stage.name).toEqual("Robber");
	     });

	     it("should remove half of the resource cards from players with more than 7", () => {
	     	let state = catan(_.cloneDeep(defaultState), {});
	     	state.stage.name = "Roll";
	     	state.players.player2.resourceCards = {
	     		...state.players.player2.resourceCards,
	     		wool: 3,
	     		bricks: 2,
	     		ore: 4,
	     		grain: 0,
	     		lumber: 0
	     	}
	     	let newState = catan(state, {type: "ACTIVATE_ROBBER", number: 7});
	     	expect(newState.players.player2.message).toEqual("Robber: You must discard 4 cards");
	     });

	     it("should take a resource card from a player with a settlement or city", () =>{
	     	let state = catan(_.cloneDeep(defaultState), {});
	     	
	     	let action = {type: "SET_ROBBER"};
	     	let newState = catan(state, action);

	     	expect(newState.stage.message).toEqual("Choose a player with a settlement or city to steal a resource");
	     	expect(newState.stage.round).toEqual(3);

	     	newState = catan(newState, {type: "STEAL_RESOURCE", player: "player1", victim: "player2", resourceType: "bricks"});
	     	
	     	expect(newState.players.player2.resourceCards.bricks).toEqual(4);
	     	expect(newState.players.player1.resourceCards.bricks).toEqual(6);
	     	expect(newState.stage.name).toEqual("Trade");
	     	expect(newState.stage.round).toEqual(1);

	     });
	 }); 

	describe("Ending Discard stage", () => {
		it("should move stage to Move the Robber", () => {
	     	let state = catan(_.cloneDeep(defaultState), {});
	     	state.stage = {
	     		name: "Robber",
	     		round: 1
	     	}
	     	let newState = catan(state, {type: "END_DISCARD"});
			expect(newState.stage.name).toEqual("Robber");
			expect(newState.stage.round).toEqual(2);
		});
	});

	describe("Discard stage", () => {
		it("should allow players to discard resources", () => {
	     	let state = catan(_.cloneDeep(defaultState), {});
	     	state.stage.name = "Robber";
	     	state.players.player2.resourceCards.bricks = 4;
	     	state.players.player2.resourceCards.grain = 4;
	     	let newState = catan(state, {
	     		type: "DISCARD_RESOURCES", 
	     		resourceCards: {
		     		bricks: 2,
		     		grain: 1
		     	}, 
	     		player: "player2"
	     	});

			expect(newState.players.player2.resourceCards.bricks).toEqual(2);
			expect(newState.players.player2.resourceCards.grain).toEqual(3);
		});
	});
});