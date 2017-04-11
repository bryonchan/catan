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
export const roll = (number) => {
	if(number === 7)
	{
		return {
			type: 'ACTIVATE_ROBBER'
		};
	}
	else
	{
		return {
			type: 'PRODUCE',
			number: number
		};
	}
}

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

export const buildCity = (player, slot) => ({
    type: 'BUILD',
    item: 'City',
    slot,
    player
});

// trade

// buy
export const buyDevelopmentCard = (player) => ({
	type: "BUY_DEVELOPMENT_CARD",
	player: player
})

//robber
export const setRobber = (hex) => ({
	type: "SET_ROBBER",
	hex
});

export const stealResource = (player, victim, resourceType) => ({
	type: "STEAL_RESOURCE",
	player,
	victim, resourceType
});

export const discardResources = (player, resourceCards) => ({
	type: "DISCARD_RESOURCES",
	resourceCards,
	player
});

export const endDiscard = () => ({
	type: "END_DISCARD"
});

// end turn
export const endTurn = () => ({
	type: "END_TURN"
});
