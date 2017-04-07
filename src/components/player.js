import React, { Component, PropTypes } from 'react';

class Player extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props){
        super(props);
        this.state = {
            rollNumber: 2
        }
    }

    handleClick(){
        this.props.onRoll(this.state.rollNumber);
    }

    handleRoll(ev){
        this.setState({
            rollNumber:  parseInt(ev.target.value, 10)
        })
    }

    handleSelectColour(ev) {
        this.props.onSelectColour(this.props.player.key, ev.target.value)
    }

    render() {
        return (
            <div className={'player ' + this.props.className}>
                Roads: {this.props.player.roads}
                <div>Resource Cards: 
                    {Object.keys(this.props.player.resourceCards).map((key) => (
                        <li key={key}>{key}: {this.props.player.resourceCards[key]}</li>
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
            </div>
        );
    }
}

export default Player;
