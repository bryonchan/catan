import catan, {build, createPlayer, defaultState} from '../reducers';
import {buildRoad} from '../actions';
import _ from 'lodash';

describe('Build (Building)', () => {

	describe('Action Creators', () => {
		it('should create an action to build a road', () => {
			var action = buildRoad();
			expect(action).toEqual(expect.objectContaining({
				type: 'BUILD',
				item: 'Road'
			}));
		});
	});

	describe('Initial state', () => {
		test('each player should have a supply of 5 settlements', () => {
			var playerState = createPlayer({}, {});
			expect(playerState.settlements).toEqual(5);
		});
	});

	describe('Reducers', () => {
		
		// var initialState = {
		// 	buildingSlots: {
		// 		"4": {key: "4", item: "City", type: 'Intersection'},
		// 		"5": {key: "5", item: null, type: 'Path'},
		// 		"10": {key: "10", item: null, type: 'Intersection'}
		// 	},
		// 	supplyStacks: {
		// 		bricks: 4,
		// 		lumber: 3
		// 	},
			// players: {
			// 	"player1": {
			// 		resourceCards: {
			// 			bricks: 3,
			// 			lumber: 4
			// 		},
			// 		roads: 15,
			// 		settlements: 4
			// 	},

		// 	},
		// 	terrainHex: {
		// 		 "terrain1": {
		// 		 	slots: [{key: "4"}, {key: "5"}]
		// 		 }
		// 	},
		// 	errorMessage: null
		// } 

		var initialState = defaultState;
		initialState.supplyStacks = {
			bricks: 4,
			lumber: 3
		}

		initialState.players.player1 = {
			...initialState.players.player1,
			resourceCards: {
				bricks: 3,
				lumber: 4
			},
			roads: 15,
			settlements: 4
		}

		initialState.buildingSlots["5"].item = "City";
		initialState.buildingSlots["5"].owner = "player1";

		describe('Building a road', () => {
			var state = _.cloneDeep(initialState);

			//Build road
			var action = {type: 'BUILD', item: 'Road', slot: "6", player: "player1"};
			state = build(state, action);

			it('should build a road', () => {
				expect(state.errorMessage).not.toBeDefined();
				expect(state.buildingSlots["6"]).toMatchObject({
					key: "6",
					item: 'Road'
				});
			});

			it('must turn in the specified combinations of resource cards', () => {			
				expect(state.players["player1"]).toMatchObject({
					resourceCards: {
						bricks: 2,
						lumber: 3
					},
					roads: 14
				});
			});

			it('should return the cards to the supply stacks', () => {
				expect(state.supplyStacks.bricks).toEqual(5);
				expect(state.supplyStacks.lumber).toEqual(4);
			});
		});
		

		describe('Unavailable supply', () => {
			let state = _.cloneDeep(initialState);
			state.players.player1.roads = 0;
			
			var action = {type: 'BUILD', item: 'Road', slot: "10", player: 'player1'};
			let newState = build(state, action);

			it('should not allow building if the supply is unavailable', () => {
				expect(newState.players["player1"]).toMatchObject({
					resourceCards: {
						bricks: 3,
						lumber: 4
					},
					roads: 0
				});

				expect(newState.buildingSlots["10"]).toMatchObject({
					key: "10",
					item: null
				});
				expect(newState).not.toBe(state);
				expect(newState.errorMessage).toEqual("You do not have any roads left.")
			});
		});

		describe('City building', () => {
			let state = _.cloneDeep(initialState);
			var action = {type: 'BUILD', item: 'City', slot: "11", player: "player1"};
			let newState = build(state, action);
			it('should build a city', () => {
				expect(newState.buildingSlots["11"]).toMatchObject({
					key: "11",
					item: 'City'
				});
			});
			it('should return the settlement to your supply', () => {
				expect(newState.errorMessage).not.toBeDefined();
				expect(newState.players.player1).toMatchObject({
					settlements: 5
				});
			});
		});

		describe('Building validation', () => {
			describe('Slots', () => {
				let state = _.cloneDeep(initialState);
				
				var action = {type: 'BUILD', item: 'Road'};
				let newState = build(state, action);

				it('should require a slot to be specified', () => {
					expect(newState).not.toBe(state);
					expect(newState.errorMessage).toEqual("You must specify a slot.")
				});
			});

			describe('Slots', () => {
				let state = _.cloneDeep(initialState);
				state.buildingSlots["12"].item = "Road";
				var action = {type: 'BUILD', item: 'Road', slot: "12", player: "player1"};
				let newState = catan(state, action);				
				it('should not be allowed to be built on something', () => {
					expect(newState).not.toBe(state);
					expect(newState.errorMessage).toEqual("There is already something here.")
				});
			});

			describe('Players', () => {
				let state, action;
				beforeEach(() => {
					state = _.cloneDeep(initialState);
					action = {type: 'BUILD', item: 'City', player: 'player1', slot: "10"};
				});

			    it('should have the right amount of resource cards available for a city', () => {
			    	state.players.player1.resourceCards.ore = 2;    
				    let newState = build(state, action);
			        expect(newState.errorMessage).toEqual("You do not have enough Ore to build a City.")
			    });

			    it('should have at least one Lumber card available for a Road', () => {
			    	action.item = 'Road';
			    	action.slot = '5';
			    	state.players.player1.resourceCards.lumber = 0;    
				    let newState = build(state, action);
			        expect(newState.errorMessage).toEqual("You do not have enough Lumber to build a Road.")
			    });

			    it('should have at least one Lumber card available for a Settlement', () => {
			    	action.item = 'Settlement';
			    	state.players.player1.resourceCards.grain = 0;    
				    let newState = build(state, action);
			        expect(newState.errorMessage).toEqual("You do not have enough Grain to build a Settlement.")
			    });
			});

		});

	});
});

