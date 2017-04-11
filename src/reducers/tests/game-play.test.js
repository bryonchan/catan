import catan, {endTurn} from "..";

describe('Game Play', () => {
    describe('Player', () => {
        it('should be able to end their turn', () => {
        	let state = catan(undefined, {});//{currentPlayer: "player1"};
        	state.stage.name = "Trade";
            let newState = endTurn(state, {type: "END_TURN"});
            expect(newState).toMatchObject({
            	currentPlayer: "player2",
            	stage: {
            		name: "Roll"
            	}
            });
        });
    });
});