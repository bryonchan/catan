export const setup = () => ({
	type: 'SETUP'
})

// setup Terrain
export const setResource = (hex, resourceType) => ({
	type: "SET_RESOURCE",
	resourceType,
	hex 
});

export const setColour = (player, colour) => ({
	type: "SET_COLOUR",
	player,
	colour 
});

// For initial setup
export const setSettlement = (player, slot) => ({
	type: "SET_ITEM",
	slot,
	player,
	item: 'Settlement'
});

export const setRoad = (player, slot) => ({
	type: "SET_ITEM",
	slot,
	player,
	item: 'Road'
});

// roll
export const roll = (number) => ({
	type: 'PRODUCE',
	number: number
})

export const setCurrentPlayer = (player) => ({
	type: "SET_CURRENT_PLAYER",
	player
});


// build
export const buildRoad = (player, slot) => ({
    type: 'BUILD',
    item: 'Road',
    slot,
    player
});

export const buildSettlement = (player, slot) => ({
    type: 'BUILD',
    item: 'Settlement',
    slot,
    player
});

// trade

// end turn
export const endTurn = () => ({
	type: "END_TURN"
});
