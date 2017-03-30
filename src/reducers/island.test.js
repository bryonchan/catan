import island, {buildingSlots, terrainHex} from './island';

describe('Building slots, i.e. terrain hex edges and intersections', () => {
	var initialState; 
	beforeEach(() => {
		initialState = buildingSlots();
	});

	it('should initialise with a non empty collection', () => {
		expect(initialState.length).toBeGreaterThan(0);
	});
	
	it('should contain key', () => {
		expect(initialState[0].key).toEqual(1);
		expect(initialState[10].key).toEqual(11);	
	});
});

describe('Terrain Hex reducers', () => {
	var initialState; 
	beforeEach(() => {
		initialState = terrainHex();
	});

	it('should return initial state', () => {
		expect(initialState.length).toBeGreaterThan(0);
	});

	it('should contain key', () => {
		expect(initialState[0].key).toEqual(1);
		expect(initialState[10].key).toEqual(11);	
	});

	describe('Terrain Hex', () => {
		it('should have slots', () => {
			let terrainHex = initialState[0];
			expect(terrainHex.slots.length).toBeGreaterThan(0);	
		});

		it('should have the correct slot', () => {
			let terrainHex5 = initialState[4];
			expect(terrainHex5.slots[2].key).toEqual(24);	
		});

		it('should have the correct slot (shared with terrainHex5)', () => {
			let terrainHex1 = initialState[0];
			expect(terrainHex1.slots[6].key).toEqual(24);	
		});
		
	});
	
});
