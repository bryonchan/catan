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

export const drawDevelopmentCardFromStack = (state, action) => {
	let cards = state.filter((c, i) => {
		return i != 0;
	});

	return cards;
}

export const getDevelopmentCard = (state, action, globalState) => {
	let topCard = globalState.developmentCards[0];
	return {
		...state,
		[action.player]: {
			...state[action.player],
			developmentCards: Object.assign({},
				state[action.player].developmentCards,
				{[topCard.key]: topCard}
			)
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



