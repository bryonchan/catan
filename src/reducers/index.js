import _ from 'lodash';

let _defaultSlots;

export const defaultState = {
    buildingSlots: (function(){
    	const _slots = {};
    
    	for(let i = 0; i < 126; i ++){
    		let key = (i+1) + "";
    		_slots[key] = {key: key, item: null, owner: null, type: null}
    	}

    	_defaultSlots = _slots;
    	
    	return _slots;
    })(),
    terrainHex: (function(){
    	const hexes = {};
    	for (let i = 0; i < 19; i++){
    		hexes["terrain"+(i+1)] = {key: (i+1)+"", slots: []};
    	}
    	// a - initial 
    	// rows
    	function initSlots(a, m, h, i, adj, adj2) {

    		let key = (a + (i * 4) + 1);
    		h.slots.push({key: key+""});
    		_defaultSlots[key].type = "Intersection";

    		key = (a + (i * 4) + 2);
    		h.slots.push({key: key+""});
    		_defaultSlots[key].type = "Path";

    		key = (a + (i * 4) + 3);
    		h.slots.push({key: key+""});
    		_defaultSlots[key].type = "Intersection";
    		
    		key = (a + (i * 4) + 4);
    		h.slots.push({key: key+""});
    		_defaultSlots[key].type = "Path";
    		
    		key = (a + (i * 4) + 5);
    		h.slots.push({key: key+""});
    		_defaultSlots[key].type = "Intersection";
    		
    		key = (3 + a + (m * 4) + i + adj);
    		h.slots.push({key: key+""});
    		_defaultSlots[key].type = "Path";

    		key = 8 + a + ((m * 5) + 1) + (i * 4) + adj2;
    		h.slots.push({key: key+"" });
    		_defaultSlots[key].type = "Intersection";

    		key = 7 + a + ((m * 5) + 1) + (i * 4) + adj2;
    		h.slots.push({key: key+"" });
    		_defaultSlots[key].type = "Path";

    		key = 6 + a + ((m * 5) + 1) + (i * 4) + adj2;
    		h.slots.push({key: key+"" });
    		_defaultSlots[key].type = "Intersection";

    		key = 5 + a + ((m * 5) + 1) + (i * 4) + adj2;
    		h.slots.push({key: key+"" });
    		_defaultSlots[key].type = "Path";

    		key = 4 + a + ((m * 5) + 1) + (i * 4) + adj2;
    		h.slots.push({key: key+"" });
    		_defaultSlots[key].type = "Intersection";
    		
    		key = (2 + a + (m * 4) + i + adj);
			h.slots.push({key: key+""});
    		_defaultSlots[key].type = "Path";
    	}

    	Object.keys(hexes).forEach((key, i) => {
    		let h = hexes[key];
    		if(i>=0 && i<3){
	    		initSlots(0, 3, h, i, 0, 0);
    		}else if(i<7){
	    		initSlots(17, 4, h, i-3, 0, 0);
    		}else if(i<12){
	    		initSlots(39, 5, h, i-7, 0, -2);
    		}else if(i<16){
	    		initSlots(68, 4, h, i-12, 2, 0); 
    		}else if(i<19){
	    		initSlots(94, 3, h, i-16, 2, 0);
    		}
    	});

    	hexes["terrain1"].number = 3;
    	hexes["terrain2"].number = 4;
    	hexes["terrain3"].number = 5;
    	hexes["terrain4"].number = 6;
    	hexes["terrain5"].number = 12;
    	hexes["terrain6"].number = 8;
    	hexes["terrain7"].number = 9;
    	hexes["terrain8"].number = 10;
    	hexes["terrain9"].number = 11;
    	hexes["terrain10"].number = 7;
    	hexes["terrain11"].number = 2;
    	hexes["terrain12"].number = 3;
    	hexes["terrain13"].number = 4;
    	hexes["terrain14"].number = 5;
    	hexes["terrain15"].number = 6;
    	hexes["terrain16"].number = 11;
    	hexes["terrain17"].number = 8;
    	hexes["terrain18"].number = 9;
    	hexes["terrain19"].number = 2;

    	return hexes;
    })(),
    players: (function(){
    	let playerNames = ["player1", "player2", "player3"];
    	let players = {};
    	playerNames.forEach((playerName, i) => {
    		players[playerName] = {
    			key: playerName,
    			roads: 15, 
    			resourceCards: {
	    			bricks: 2,
	    			lumber: 2,
	    			ore: 1,
	    			grain: 1,
	    			wool: 1
	    		},
	    		nextPlayer: (playerNames[i+1] ? playerNames[i+1] : playerNames[0] ),
	    		prevPlayer: (playerNames[i-1] ? playerNames[i-1] : playerNames[playerNames.length-1] )
	    	}
    	});

    	players.player1.colour = "Red";
    	players.player2.colour = "Blue";
    	players.player3.colour = "Green";

    	players.player1.isFirst = true;
    	players.player3.isLast = true;

    	return players;
    })(),
    supplyStacks: {
    	bricks: 0
    },
    stage: {
    	name: 'Set Settlement',
    	round: 1
    },
    currentPlayer: 'player1'
};

// state = buildingSlots
const buildInSpot = (state = defaultState.buildingSlots, action) => {
	return {
		...state,
		[action.slot]: {
			...state[action.slot],
			item: action.item,
			owner: action.player
		}
	};
}

//Set up reducers
export const setTerrainResourceType = (state, action) => {
	return {...state, type: action.resourceType};
}

export const setCoast = (state, action) => {
	return Object.assign({}, state, {type: action.coastType});
}

export const setColour = (state, action) => {
	return {...state, colour: action.colour};
}

export const setSettlement = (state, action) => {
	// check distance rule
	let adjacentSlotKeysOnceRemoved = _getAdjacentSlotsOnceRemoved(state.terrainHex, action.slot);
	let adjacentIntersections = adjacentSlotKeysOnceRemoved.map((k) => {
		return state.buildingSlots[k];
	});
	
	let existingBuildings = adjacentIntersections.filter((s) => {
		return s.item;
	});

	if(existingBuildings.length > 0){
		return {...state, errorMessage: "A settlement may be placed on an open intersection only if none of the adjacent intersections are occupied by settlements or cities."};
	}

	return {...state, 
		buildingSlots: buildInSpot(state.buildingSlots, action),
		stage: {...state.stage, name: "Set Road"}
	};
}

export const setRoad = (state, action) => {

	let adjacentSlotKeys = _getAdjacentSlots(state.terrainHex, action.slot);
	let adjacentPaths = adjacentSlotKeys.map((k) => {
		return state.buildingSlots[k];
	});

	let existingBuildings = adjacentPaths.filter((s) => {
		return s.item === "Settlement" && s.owner === action.player;
	});

	if(existingBuildings.length === 0){
		return {...state, errorMessage: "The road must be adjacent to the settlement."}
	}

	let currentPlayer = state.players[action.player];
	let nextPlayer, stage;
	if(currentPlayer.isLast){
		if(state.stage.round === 1){
			nextPlayer = currentPlayer.key;
			stage = {name: 'Set Settlement', round: 2};
		}else if(state.stage.round === 2){
			nextPlayer = currentPlayer.prevPlayer;
			stage = {name: 'Set Settlement', round: 2};
		}
		
	}else{
		if(state.stage.round === 1){
			nextPlayer = currentPlayer.nextPlayer;
			stage = {name: 'Set Settlement', round: 1};
		}else if(state.stage.round === 2){
			if(currentPlayer.isFirst){
				nextPlayer = currentPlayer.key;
				stage = {name: 'Roll', round: 1};	
			}else{
				nextPlayer = currentPlayer.prevPlayer;
				stage = {name: 'Set Settlement', round: 2};	
			}
		}
	}
	
	return {...state, 
		buildingSlots: buildInSpot(state.buildingSlots, action),
		currentPlayer: nextPlayer,
		stage: stage
	};
}

//state = terrainHex
export const setRobber = (state, action) => {
	return Object.assign({}, state, {hasRobber: true})
}

//Player reducers
const reducePlayer = (state, action) => {
	state[action.player].roads -= 1;
	state[action.player].resourceCards.bricks -= 1;
	state[action.player].resourceCards.lumber -= 1;

	if(action.item === 'City'){
		state[action.player].settlements += 1; 
	}

	return Object.assign({}, state);
}

export const produceResources = (state, action, islandState) => {
	if(!action.number){
		return {...state, errorMessage: "You must specify the number that was rolled"}
	}

	if(action.number === 7){
		return {...state};
	}

	const mapping = {"Hills": "bricks", "Pasture": "wool", "Forest": "lumber", "Mountains": "ore", "Fields": "grain"}

	let players = {...state};

	// For each matching hex
	let matchedTerrainKeys = Object.keys(islandState.terrainHex).filter((key, i) => {
		return islandState.terrainHex[key].number === action.number;
	});
	matchedTerrainKeys.forEach((key) => {
		let terrainHex = islandState.terrainHex[key];
		let type = mapping[terrainHex.type];	
		// For each slot with a settlement or city
		terrainHex.slots.forEach((s) => {
			let slot = islandState.buildingSlots[s.key];
			if(slot){
				// Add 1 or 2 resources to the owner of the settlement or city
				if(slot.item === 'City'){
					state[slot.owner].resourceCards[type] += 2;
				}else if(slot.item === 'Settlement'){
					state[slot.owner].resourceCards[type]++;
				}	
			}
		});
		
	})

	return players;
}

const _checkResources = (player, action) => {
	switch(action.item){
		case 'Road':
			if(player.resourceCards.bricks < 1){
				return "You do not have enough Bricks to build a Road.";
			}
			if(player.resourceCards.lumber < 1){
				return "You do not have enough Lumber to build a Road.";
			}
			return null;
		case 'Settlement':
			if(player.resourceCards.bricks < 1){
				return "You do not have enough Bricks to build a Settlement.";
			}
			if(player.resourceCards.lumber < 1){
				return "You do not have enough Lumber to build a Settlement.";
			}
			if(player.resourceCards.wool < 1){
				return "You do not have enough Wool to build a Settlement.";
			}
			if(player.resourceCards.grain < 1){
				return "You do not have enough Grain to build a Settlement.";
			}
			return null
		case 'City':
			if(player.resourceCards.ore < 3){
				return "You do not have enough Ore to build a City.";
			}
			if(player.resourceCards.grain < 2){
				return "You do not have enough Grain to build a City.";
			}
			return null;
		default:
			return null;
	}
}

export const _getAdjacentSlots = (allHexes, slotKey, delta = 0) => {
	let settlements = [];
	let hexes = Object.keys(allHexes).map((key) => {
		let hex = allHexes[key];
		// find adjacent hexes
		let slot = hex.slots.find((s) => {
			return s.key === slotKey;
		});
		if(slot){
			return hex;
		}else{
			return null;
		}
	}).filter((hex) => (hex));
	hexes.forEach((h) => {
		let slot = h.slots.find((s) => {
			return s.key === slotKey;
		});
		let index = h.slots.indexOf(slot);
		let nextIndex = index + (1 + delta);
		if(nextIndex > 11) nextIndex -= 12;
		let prevIndex = index - (1 + delta);
		if(prevIndex < 0) prevIndex += 12;

		settlements.push(h.slots[nextIndex].key);
		settlements.push(h.slots[prevIndex].key);
	});

	settlements = settlements.filter((s, i) => {
		return settlements.indexOf(s) === i;
	});

	return settlements;
}

export const _getAdjacentSlotsOnceRemoved = (allHexes, slotKey) => {
	return _getAdjacentSlots(allHexes, slotKey, 1);
}

export const buildRoad = (state, action) => {
	// Check for buildings in adjacent slots
	let adjacentSlotKeys = _getAdjacentSlots(state.terrainHex, action.slot);
	let adjacentIntersections = adjacentSlotKeys.map((k) => {
		return state.buildingSlots[k];
	});

	let existingBuildings = adjacentIntersections.filter((s) => {
		return (s.item === "Settlement" || s.item === "City") && s.owner === action.player;
	});

	// Check for roads on adjacent slots
	let adjacentSlotKeysOnceRemoved = _getAdjacentSlotsOnceRemoved(state.terrainHex, action.slot);
	let adjacentPaths = adjacentSlotKeysOnceRemoved.map((k) => {
		return state.buildingSlots[k];
	});
	
	let existingRoads = adjacentPaths.filter((s) => {
		return (s.item === "Road") && s.owner === action.player;
	});

	if(existingBuildings.length === 0 && existingRoads.length === 0){
		return {...state, errorMessage: "A new road must always connect to one of your existing roads, settlements, or cities."}
	}

	state.buildingSlots = buildInSpot(state.buildingSlots, action);
	
	state.supplyStacks.bricks += 1;
	state.supplyStacks.lumber += 1;

	state.players = reducePlayer(state.players, action);

	return {...state};
}

export const buildSettlement = (state, action) => {
	// check it's next to road
	let adjacentSlotKeys = _getAdjacentSlots(state.terrainHex, action.slot);
	let adjacentPaths = adjacentSlotKeys.map((k) => {
		return state.buildingSlots[k];
	});
	
	let existingRoads = adjacentPaths.filter((s) => {
		return s.item === "Road" && s.owner === action.player;
	});

	if(existingRoads.length === 0){
		return {...state, errorMessage: "The settlement should always be connected to one or more of your own roads."};
	}

	// check distance rule
	let adjacentSlotKeysOnceRemoved = _getAdjacentSlotsOnceRemoved(state.terrainHex, action.slot);
	let adjacentIntersections = adjacentSlotKeysOnceRemoved.map((k) => {
		return state.buildingSlots[k];
	});
	
	let existingBuildings = adjacentIntersections.filter((s) => {
		return s.item;
	});

	if(existingBuildings.length > 0){
		return {...state, errorMessage: "A settlement may be placed on an open intersection only if none of the adjacent intersections are occupied by settlements or cities."};
	}

	state.buildingSlots = buildInSpot(state.buildingSlots, action);
	
	state.supplyStacks.bricks += 1;
	state.supplyStacks.lumber += 1;
	state.supplyStacks.wool += 1;
	state.supplyStacks.grain += 1;

	state.players = reducePlayer(state.players, action);

	return {...state};
}

export const buildCity = (state, action) => {
	// let adjacentSlotKeys = _getAdjacentSlots(state.terrainHex, action.slot);
	// let adjacentSlots = adjacentSlotKeys.map((k) => {
	// 	return state.buildingSlots[k];
	// });
	// let existingBuildings = adjacentSlots.filter((s) => {
	// 	return (s.item === "Settlement" || s.item === "City") && s.owner === action.player;
	// });

	// if(existingBuildings.length === 0){
	// 	return {...state, errorMessage: "A new road must always connect to one of your existing roads, settlements, or cities."}
	// }

	state.buildingSlots = buildInSpot(state.buildingSlots, action);
	
	state.supplyStacks.ore += 3;
	state.supplyStacks.grain += 2;

	state.players = reducePlayer(state.players, action);

	return {...state};
}

export const build = (state = defaultState, action) => {
	if(!action.slot){
		return {...state, errorMessage: "You must specify a slot."};
	}

	if(!action.player){
		return {...state, errorMessage: "You must specify a player."};
	}

	if(state.players[action.player].roads === 0) {
		return {...state, errorMessage: "You do not have any roads left."};
	}

	let _resourcesErrorMessage = _checkResources(state.players[action.player], action); 
	if(_resourcesErrorMessage){
		return {...state, errorMessage: _resourcesErrorMessage};
	}

	switch(action.item){
		case 'Road':
			return buildRoad(state, action);
		case 'Settlement':
			return buildSettlement(state, action);
		case 'City':
			return buildCity(state, action);
		default:
			return state;
	}
}


export const endTurn = (state = defaultState, action) => {
	let currentPlayer = state.players[state.currentPlayer];
	return {...state, currentPlayer: currentPlayer.nextPlayer, stage: {...state.stage, name: "Roll"}};
}

// Development card reducers
const emptyPlayer = {
	settlements: 5
};

export const createPlayer = (state = {}, action = {}) => {
	return Object.assign({}, state, emptyPlayer);
}

const catan = (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'SET_ITEM':
       	case 'BUILD':
       		if(action.item === 'Settlement' && state.buildingSlots[action.slot].type !== 'Intersection') {
				return {...state, errorMessage: "You can only build settlements on intersections."};
			}

			if(action.item === 'Road' && state.buildingSlots[action.slot].type !== 'Path') {
				return {...state, errorMessage: "You can only build roads on paths."};
			}

			if(state.buildingSlots[action.slot].item) {
				return {...state, errorMessage: "There is already something here."};
			}

       		if(action.type === "SET_ITEM"){
       			if(action.item === "Settlement"){
					return setSettlement(state, action);

       			}else if(action.item === "Road"){
					return setRoad(state, action);
       			}
       		}else if(action.type === "BUILD"){
       			var newState = build(state, action);
            	return newState;
       		}
       		break;
       	case 'SET_RESOURCE':
       		newState = {...state, 
       			terrainHex: {
       				...state.terrainHex,
       				[action.hex]: setTerrainResourceType(state.terrainHex[action.hex], action)		
       			}
       		}
       		return newState;
       	case 'SET_COLOUR':
        	newState = {...state, 
        		players: {
        			...state.players, 
        			[action.player]: setColour(state.players[action.player], action)
        		}
        	};
            return newState;
        case 'SET_CURRENT_PLAYER':
        	return {...state, currentPlayer: action.player};
        case 'PRODUCE':
        	return {...state, players: produceResources(state.players, action, state), stage: {name: "Trade"}};
        case "END_TURN":
        	return endTurn(state, action);
        default:
            return state;
    }
};

export default catan;
