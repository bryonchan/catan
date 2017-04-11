import catan, {produceResources, setTerrainResourceType} from '..';

describe('Resource Production', () => {
	describe('Terrain resource setup', () => {
	    it('should set a terrain to have a resource', () => {
	        expect(setTerrainResourceType(undefined, {resourceType: "Hills"})).toMatchObject({type: "Hills"});
	    });
	});

	describe('Roll', () => {
	    it('should specify what number has been rolled', () => {
	     	let state = catan(undefined, {});
	     	state.stage.name = "Roll";
	    	let action = {type: "PRODUCE"};
	        expect(catan(state, action)).toMatchObject({errorMessage: "You must specify the number that was rolled"})
	    });
	});

	describe('Player', () => {

	    it("should roll the dice for the turn's resource production", () => {
	        expect()
	    });
	});
    afterEach(() => {
        
    });

    beforeEach(() => {
        
    });

    it('should ...', () => {
        
    });
});
