import React, {Component} from 'react';
import PlayerView from './Playerview.js';

class Players extends Component {
  render(){

    const playerList = [
      this.props.players.ezra, 
      this.props.players.adam, 
      this.props.players.theo, 
      this.props.players.john, 
      this.props.players.tim]
    // const playerList = this.props.players.map(player)
    // const playerTest = this.props.players.map()





    return playerList.map((player) => {
      return (
        <div className="playerselector">
          <PlayerView player={player} />
        </div>
      )
    })
  }
}

export default Players;
