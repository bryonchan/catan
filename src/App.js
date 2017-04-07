import React, { Component } from 'react';
import './App.css';
import TerrainHex from './components/terrain-hex';
import HelpMessage from './components/help-message';
import {connect} from 'react-redux';
import {setRoad, roll, setResource, setColour, setSettlement, buildRoad, buildSettlement, buildCity, endTurn} from './actions';
import Player from './components/player';

const mapStateToProps = ({ terrainHex, errorMessage, buildingSlots, players, stage, currentPlayer }) => ({
	terrainHex,
	errorMessage,
	buildingSlots,
	players,
	stage,
	currentPlayer
});

export class App extends Component {
	constructor(props){
		super(props);
		this.setup = this.setup.bind(this);
	}

	componentDidMount() {
		this.handleSetResources();
		this.setup();
	}

	handleSlotClick(slot){
		switch(this.props.stage.name){
			case "Set Settlement":
				this.props.dispatch(setSettlement(this.props.currentPlayer, slot.key));      
				break;
			case "Set Road":
				this.props.dispatch(setRoad(this.props.currentPlayer, slot.key));      
				break;
			case "Trade":
				if(slot.type === "Intersection"){
					if(slot.item === "Settlement"){
						this.props.dispatch(buildCity(this.props.currentPlayer, slot.key));
					}else{
						this.props.dispatch(buildSettlement(this.props.currentPlayer, slot.key));
					}
				}else if(slot.type === "Path"){
					this.props.dispatch(buildRoad(this.props.currentPlayer, slot.key));
				}
				break;
			default:
				break;
		}
	}

	handleRoll(number){
		this.props.dispatch(roll(number));
	}

	handleSetResources(){

		this.props.dispatch(setResource("terrain1", "Hills"));
		this.props.dispatch(setResource("terrain2", "Pasture"));
		this.props.dispatch(setResource("terrain3", "Fields"));
		this.props.dispatch(setResource("terrain4", "Mountains"));
		this.props.dispatch(setResource("terrain5", "Forest"));
		this.props.dispatch(setResource("terrain6", "Hills"));
		this.props.dispatch(setResource("terrain7", "Pasture"));
		this.props.dispatch(setResource("terrain8", "Fields"));
		this.props.dispatch(setResource("terrain9", "Mountains"));
		this.props.dispatch(setResource("terrain10", "Desert"));
		this.props.dispatch(setResource("terrain11", "Hills"));
		this.props.dispatch(setResource("terrain12", "Forest"));
		this.props.dispatch(setResource("terrain13", "Fields"));
		this.props.dispatch(setResource("terrain14", "Mountains"));
		this.props.dispatch(setResource("terrain15", "Forest"));
		this.props.dispatch(setResource("terrain16", "Pasture"));
		this.props.dispatch(setResource("terrain17", "Fields"));
		this.props.dispatch(setResource("terrain18", "Forest"));
		this.props.dispatch(setResource("terrain19", "Pasture"));

	}

	setup(){
		this.props.dispatch(setSettlement("player1", "1"));
		this.props.dispatch(setRoad("player1", "2"));
		this.props.dispatch(setSettlement("player2", "5"));
		this.props.dispatch(setRoad("player2", "15"));
		this.props.dispatch(setSettlement("player3", "13"));
		this.props.dispatch(setRoad("player3", "17"));
		this.props.dispatch(setSettlement("player3", "58"));
		this.props.dispatch(setRoad("player3", "57"));
		this.props.dispatch(setSettlement("player2", "81"));
		this.props.dispatch(setRoad("player2", "82"));
		this.props.dispatch(setSettlement("player1", "73"));
		this.props.dispatch(setRoad("player1", "74"));
	}

	handleSelectColour(player, colour){
		this.props.dispatch(setColour(player, colour));
	}

	endTurn(){
		this.props.dispatch(endTurn());
	}

	render() {
	return (
	  <div className="App">
		<HelpMessage stage={this.props.stage} player={this.props.currentPlayer} />
		{this.props.errorMessage}
		{Object.keys(this.props.terrainHex).map((key, i) => {
		  let h = this.props.terrainHex[key];
		  return <TerrainHex onSlotClick={this.handleSlotClick.bind(this)} className={'hex'+i} key={h.key} slots={h.slots} allSlots={this.props.buildingSlots} number={h.number} type={h.type} players={this.props.players} />
		})}
		<Player className="player1" player={this.props.players.player1} onRoll={this.handleRoll.bind(this)} onSelectColour={this.handleSelectColour.bind(this)} />
		<Player className="player2" player={this.props.players.player2} onRoll={this.handleRoll.bind(this)} onSelectColour={this.handleSelectColour.bind(this)} />
		<Player className="player3" player={this.props.players.player3} onRoll={this.handleRoll.bind(this)} onSelectColour={this.handleSelectColour.bind(this)} />
		<button onClick={this.endTurn.bind(this)}>End Turn</button>
	  </div>
	);
	}
}

export default connect(mapStateToProps)(App);
