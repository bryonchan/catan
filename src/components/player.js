import React, { Component, PropTypes } from 'react';

class Player extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props){
        super(props);
        this.state = {
            rollNumber: 7,
            discardCards: {
                bricks: 0,
                lumber: 0, 
                ore: 0,
                grain: 0,
                wool: 0
            }
        }
    }

    handleClick(){
        this.props.onRoll(this.state.rollNumber);
    }

    handleRoll(ev){
        this.setState({
            rollNumber:  parseInt(ev.target.value, 10)
        });
    }

    handleDiscard(ev){
        let resourceCards = {
            bricks: this.state.discardCards.bricks,
            lumber: this.state.discardCards.lumber,
            ore: this.state.discardCards.ore,
            grain: this.state.discardCards.grain,
            wool: this.state.discardCards.wool
        };
        this.props.onDiscard(resourceCards);
    }

    handleDiscardChange(resourceType, ev){
        this.setState({
            discardCards: {
                ...this.state.discardCards,
                [resourceType]: ev.target.value
            }
        });
    }

    handleSelectColour(ev) {
        this.props.onSelectColour(this.props.player.key, ev.target.value)
    }

    render() {
        return (
            <div className={'player ' + this.props.className}>
                Roads: {this.props.player.roads}
                Settlements: {this.props.player.settlements}
                Cities: {this.props.player.cities}
                <div>Resource Cards: 
                    {Object.keys(this.props.player.resourceCards).map((key) => (
                        <li key={key}>{key}: {this.props.player.resourceCards[key]}
                            <input min="0" max={this.props.player.resourceCards[key]} type="number" value={this.state.discardCards[key]} onChange={this.handleDiscardChange.bind(this, key)} />
                        </li>
                    ))}
                </div>
                <select value={this.props.player.colour} onChange={this.handleSelectColour.bind(this)}>
                    <option></option>
                    <option>Red</option>
                    <option>Blue</option>
                    <option>Green</option>
                    <option>Orange</option>
                </select>
                <button onClick={this.handleClick.bind(this)}>Roll</button>
                
                <input min="2" max="12" type="number" value={this.state.rollNumber} onChange={this.handleRoll.bind(this)} />
                <button onClick={this.handleDiscard.bind(this)}>Discard</button>
                <div>{this.props.player.message}</div>
            </div>
        );
    }
}

export default Player;
