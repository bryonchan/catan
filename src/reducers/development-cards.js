import _ from 'lodash';
// players: {
// 	player1: {
// 		developmentCards: {
// 			"dev1": {type: 'Knight'}
// 		}
// 	}
// },
// developmentCards: 
// [
// 	{key: 'dev1', type: 'Knight'},
// 	{key: 'dev2', type: 'Progress'},
// 	{key: 'dev3', type: 'Knight'},
// 	{key: 'dev4', type: 'Victory Point'},
// ]

export const initDevelopmentCards = () => {
	return [
		{key: 'dev1', type: 'Knight'},
		{key: 'dev2', type: 'Progress'},
		{key: 'dev3', type: 'Knight'},
		{key: 'dev4', type: 'Victory Point'},
		{key: 'dev5', type: 'Progress'},
		{key: 'dev6', type: 'Knight'},
		{key: 'dev7', type: 'Victory Point'},
		{key: 'dev8', type: 'Knight'},
		{key: 'dev9', type: 'Progress'},
		{key: 'dev10', type: 'Progress'},
		{key: 'dev11', type: 'Knight'},
		{key: 'dev12', type: 'Knight'},
		{key: 'dev13', type: 'Knight'},
		{key: 'dev14', type: 'Victory Point'},
		{key: 'dev15', type: 'Knight'},
		{key: 'dev16', type: 'Knight'},
		{key: 'dev17', type: 'Progress'},
		{key: 'dev18', type: 'Knight'},
		{key: 'dev19', type: 'Knight'},
		{key: 'dev20', type: 'Victory Point'},
		{key: 'dev21', type: 'Progress'},
		{key: 'dev22', type: 'Knight'},
		{key: 'dev23', type: 'Knight'},
		{key: 'dev24', type: 'Victory Point'},
		
	]
}


// Reducers
export const drawDevelopmentCardFromStack = (state, action) => {
	let cards = state.filter((c, i) => {
		return i !== 0;
	});

	return cards;
}

export const getDevelopmentCard = (state, action, globalState) => {
	let topCard = globalState.developmentCards[0];
	let player = state[action.player];
	return {
		...state,
		[action.player]: {
			...player,
			developmentCards: Object.assign({},
				player.developmentCards,
				{[topCard.key]: topCard}
			),
			resourceCards: {
				...player.resourceCards,
				ore: player.resourceCards.ore - 1,
				wool: player.resourceCards.wool - 1,
				grain: player.resourceCards.grain - 1
			}
		}
	}
}

export const buyDevelopmentCard = (state, action) => {
	return Object.assign({}, state, {
		developmentCards: drawDevelopmentCardFromStack(state.developmentCards, action),
		players: getDevelopmentCard(state.players, action, state)
	});
}

export const replaceDevelopmentCardToStack = (state, action, globalState) => {
	return [...state, action.developmentCard];
}

export const giveDevelopmentCard = (state, action, globalState) => {
	return {
		...state,
		[action.player]: {
			...state[action.player],
			developmentCards: _.omit(state[action.player].developmentCards, [action.developmentCard.key])
		}
	}
}

export const playDevelopmentCard = (state, action) => {
	return Object.assign({}, state, {
		developmentCards: replaceDevelopmentCardToStack(state.developmentCards, action, state),
		players: giveDevelopmentCard(state.players, action)
	});
}


