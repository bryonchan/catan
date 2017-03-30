import {build} from './game';
import {buildRoad} from '../actions';


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

	describe('Reducers', () => {
		it('must turn in the specified combinations of resource cards', () => {
			var state = {
				buildingSlots: []
			} 

			state.buildingSlots[4] = {key: 5, item: null};

			expect(state.buildingSlots[4]).toEqual(expect.objectContaining({
				key: 5,
				item: null
			}));

			//Build road
			var action = {type: 'BUILD', cards: [{type: 'Bricks'}, {type: 'Lumber'}], item: 'Road', slot: 5};
			state = build(null, action);

			expect(state.buildingSlots[4]).toEqual(expect.objectContaining({
				key: 5,
				item: 'Road'
			}));
		});
	});
	
});

