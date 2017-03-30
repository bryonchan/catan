import {build, createPlayer} from '../reducers';
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
		
		var initialState = {
			buildingSlots: {
				"5": {key: "5", item: null},
				"10": {key: "10", item: null}
			},
			supplyStacks: {
				bricks: 4,
				lumber: 3
			},
			players: {
				"player1": {
					resourceCards: {
						bricks: 3,
						lumber: 4
					},
					roads: 15,
					settlements: 4
				}
			},
			errorMessage: null
		} 

		describe('Simple building', () => {
			var state = _.cloneDeep(initialState);

			//Build road
			var action = {type: 'BUILD', cards: [{type: 'Bricks'}, {type: 'Lumber'}], item: 'Road', slot: "5"};
			state = build(state, action);

			it('should build a road', () => {
				expect(state.buildingSlots["5"]).toMatchObject({
					key: "5",
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
			var state = _.cloneDeep(initialState);
			state.players.player1.roads = 0;
			
			var action = {type: 'BUILD', cards: [{type: 'Bricks'}, {type: 'Lumber'}], item: 'Road', slot: "5"};
			state = build(state, action);

			it('should not allow building if the supply is unavailable', () => {
				expect(state.players["player1"]).toMatchObject({
					resourceCards: {
						bricks: 3,
						lumber: 4
					},
					roads: 0
				});

				expect(state.buildingSlots["5"]).toMatchObject({
					key: "5",
					item: null
				});

				expect(state.errorMessage).toEqual("You do not have any roads left.")
			});
		});

		describe('City building', () => {
			var state = _.cloneDeep(initialState);
			var action = {type: 'BUILD', cards: [{type: 'Ore', quantity: 3}, {type: 'Grain', quantity: 2}], item: 'City', slot: "10"};
			state = build(state, action);
			it('should build a city', () => {
				expect(state.buildingSlots["10"]).toMatchObject({
					key: "10",
					item: 'City'
				});
			});
			it('should return the settlement to your supply', () => {
				
				expect(state.players.player1).toMatchObject({
					settlements: 5
				});
			});

		});
	});
});

