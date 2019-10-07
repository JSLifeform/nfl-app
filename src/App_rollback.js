import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Players from './Players.js';
// import Axios from 'axios';


class App extends Component {
  constructor(){
      super();
      this.state = {
          isFetching : false,
          teamData : ['1', '2', 'test'],
          parseData : [],
          
            ezra: {name: "ezra", wins: 0, 
              teams: ["Patriots", "Bears", "Vikings", "Titans", "Jets", "Bengals"]},
            adam: {name: "adam", wins: 0, 
              teams: ["Chiefs", "Cowboys", "Packers", "Ravens", "Broncos", "Cardinals"]}, 
            theo: {name: "theo", wins: 0, 
              teams: ["Rams", "Steelers", "Falcons", "Panthers", "Bills", "Lions"]},
            john: {name: "john", wins: 0, 
              teams: ["Eagles", "Chargers", "Seahawks", "49ers", "Colts", "Giants"]},
            tim: {name: "tim", wins: 0,  
              teams: ["Saints", "Browns", "Jaguars", "Texans", "Buccaneers", "Raiders"]}
          
      };
    this.callData = this.callData.bind(this);
    this.showData = this.showData.bind(this);
  }

  async showData() {

    // destructs this.state for future setState
    let updateState = Object.assign({}, this.state)

    const playerList = [this.state.ezra, this.state.adam, this.state.theo, this.state.john, this.state.tim]

    playerList.forEach((player) => {
      // calls in player teams and corresponding setState name for each player
      const playerTeams = player.teams
     // starts counter at 0 for each new player
      let counter = 0;

      // sums wins for each team and adds to player win total
      function sumWins(teamCheck, winTotal){
        playerTeams.forEach((team) => {
          if (teamCheck === team) {
            counter += winTotal;
          }
        })
      } 

      // checks win total for each team in response
      for (let [key, value] of Object.entries(this.state.teamData)) {
        sumWins(key, value);
      }
      // updates wins in updateState
      updateState[player.name].wins = counter
      console.log(updateState[player.name].wins)
      console.log(updateState)
      console.log(this.state)      
    })
    //sets state to updateState
    this.setState(updateState)
  }



  // fetches data from MySportsFeed API
  async callData(){
    // DO NOT FORGET TO ADD AND REMOVE API KEY AND PASSWORD WHEN WORKING ON THIS!!!!
    const encodedString = btoa("7b507641-4ec5-426e-a178-64cf56:" + "G3t!nH3r3")
    console.log(encodedString)
    console.log(atob(encodedString))
    await fetch("https://api.mysportsfeeds.com/v1.2/pull/nfl/current/overall_team_standings.json", {
      "method": "GET",
      "headers": {
        "Authorization": "Basic " + encodedString
      }
    })
    // parses data to json
    .then(response => response.json())
    // pulls teams and wins from response
    .then(response => {
      const results =response.overallteamstandings.teamstandingsentry;
      return results;
    })
    // parses data into {key}:{value} object
    .then(results => {
      let arrayAdd = {}
      results.forEach(loggie => {
        arrayAdd[loggie.team.Name] = JSON.parse(loggie.stats.Wins['#text'])
      })
      // puts team data into teamData state
      this.setState({teamData : arrayAdd})
    })
    .catch(err => {
      console.log("Error " + err + " received!")
    })
  }


  render() {
    if (this.state.isFetching === true) {
      // to be returned when fetching, work in progress
      return (<div>Loading!</div>)
    }
     else {

      return (
      <div className="App">
        <header className="App-header">
          yo
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Players players={this.state}/>
          <p>
            <button onClick={this.callData} >Fetch</button>
            <button onClick={this.showData} >Display</button>
          </p>
        </header>
      </div>
    )}
  };
}

export default App;
