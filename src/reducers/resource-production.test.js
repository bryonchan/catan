import {produceResources, setTerrainResourceType} from '.';

describe('Resource Production', () => {
	describe('Terrain resource setup', () => {
	    afterEach(() => {
	        
	    });
	
	    beforeEach(() => {
	        
	    });
	
	    it('should set a terrain to have a resource', () => {
	        expect(setTerrainResourceType(undefined, {resourceType: "Hills"})).toMatchObject({type: "Hills"});
	    });
	});

	describe('Roll', () => {
	    afterEach(() => {
	        
	    });
	
	    beforeEach(() => {
	        
	    });
	
	    it('should specify what number has been rolled', () => {
	    	let action = {};
	        expect(produceResources(undefined, action)).toMatchObject({errorMessage: "You must specify the number that was rolled"})
	    });
	});

	describe('Player', () => {
	    afterEach(() => {
	        
	    });
	
	    beforeEach(() => {
	        
	    });
	
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