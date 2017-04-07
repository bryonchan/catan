import {setCoast} from '.';

describe('Coast', () => {
	describe('Initialise', () => {
		it('should set the coast', () => {
			let state = setCoast(null, {coastType: 'wool'});
			expect(state.type).toEqual("wool");
		});
	});
});