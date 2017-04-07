import _ from 'lodash';
import {buyDevelopmentCard, playDevelopmentCard} from './development-cards';

describe('Development Cards', () => {

    describe('Set up', () => {
        afterEach(() => {
            
        });
    
        beforeEach(() => {
            
        });
    
        it('should ...', () => {
            
        });
    });

    let state = {
		players: {
			player1: {
				developmentCards: {
					"dev1": {type: 'Knight'}
				}
			},
			player2: {
				developmentCards: {
					"dev8": {key: "dev8", type: 'Knight'},
					"dev9": {key: "dev9", type: 'Knight'},
					"dev10": {key: "dev10", type: 'Knight'}
				}
			}
		},
		developmentCards: 
		[
			{key: "dev2", type: 'Knight'},
			{key: "dev3", type: 'Progress'},
			{key: "dev4", type: 'Knight'},
			{key: "dev5", type: 'Victory Point'},
		]
	}

    describe('Player Buying a card', () => {
        it('should only allow the player to draw from the top of the stack', () => {
        	state = _.cloneDeep(state);
            let newState = buyDevelopmentCard(state, {player: 'player1'});
            expect(newState).not.toBe(state);
            expect(Object.keys(newState.developmentCards).length).toEqual(3);            
            expect(Object.keys(newState.players.player1.developmentCards).length).toEqual(2);

        });
    });

    describe('Player playing a card', () => {
        it('should have fewer cards', () => {
        	state = _.cloneDeep(state);
            let newState = playDevelopmentCard(state, {player: 'player2', 'developmentCard': {key: 'dev9'}});
            expect(newState).not.toBe(state);
            expect(Object.keys(newState.players.player2.developmentCards).length).toEqual(2);
            expect(newState.developmentCards[newState.developmentCards.length-1].key).toEqual("dev9");            

        });
    });
});