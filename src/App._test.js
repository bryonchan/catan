import {App} from './App';
import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

describe('App', () => {
	// describe('getNextPlayer', () => {
	//     it('should get next player', () => {
	//     	let players = {
	//     		player1: {
	//     			nextPlayer: 'player2'
	//     		},
	//     		player2: {
	//     			nextPlayer: 'player1'
	//     		}
	//     	};
	//     	const app = shallow(<App terrainHex={{}} players={players} />);
	//     	let nextPlayer = app.instance().getNextPlayer("player1");
	//     	expect(nextPlayer).toEqual("player2");
	//     });

	//     it('should get next player', () => {
	//     	let players = {
	//     		player1: {
	//     			nextPlayer: 'player2'
	//     		},
	//     		player2: {
	//     			nextPlayer: 'player1'
	//     		}
	//     	};
	//     	const app = shallow(<App terrainHex={{}} players={players} />);
	//     	let nextPlayer = app.instance().getNextPlayer("player2");
	//     	expect(nextPlayer).toEqual("player1");
	//     });
	// });
});