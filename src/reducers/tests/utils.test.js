import {defaultState, _getAdjacentSlots, _getAdjacentSlotsOnceRemoved} from "..";

describe('Utilities', () => {
    describe('_getAdjacentSlots', () => {
        it('should return a list of adjacent slot keys', () => {
            let adjacentSlots = _getAdjacentSlots(defaultState.terrainHex, "11");
            expect(adjacentSlots).toContainEqual("10");
            expect(adjacentSlots).toContainEqual("12");

            adjacentSlots = _getAdjacentSlots(defaultState.terrainHex, "83");
            expect(adjacentSlots).toContainEqual("82");
            expect(adjacentSlots).toContainEqual("84");
            expect(adjacentSlots).toContainEqual("65");
        });

        it('should return a list of adjacent slot keys once removed', () => {
            let adjacentSlots = _getAdjacentSlotsOnceRemoved(defaultState.terrainHex, "12");
            expect(adjacentSlots).toContainEqual("10");
            expect(adjacentSlots).toContainEqual("17");

            adjacentSlots = _getAdjacentSlotsOnceRemoved(defaultState.terrainHex, "53");
            expect(adjacentSlots).toContainEqual("55");
            expect(adjacentSlots).toContainEqual("51");
        });
    });
});