import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
// import Axios from 'axios';


class App extends Component {
  constructor(){
      super();
      this.state = {
          isFetching : false,
          teamData : ['1', '2', 'test'],
          parseData : []
      };
    this.callData = this.callData.bind(this);
  }


  // attempt axios get request from RapidAPI, hopefully I won't use this
  // async callData() {
  //   Axios.get('https://odds.p.rapidapi.com/v1/odds?sport=americanfootball_nfl&region=us&mkt={mkt}', 
  //     {headers: {'X-RapidAPI-Host' : 'odds.p.rapidapi.com',
  //     'X-RapidAPI-Key' : 'cf3158f26fmsh630e3fa612dce00p1d7a03jsn969cd041f3ec'
  //   }})
    
  // }

// fetches data from MySportsFeed API
async callData(){
  const encodedString = btoa("" + ":" + "Irulej00!")
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
  // parses response to teams section
  .then(response => {
    const results =response.overallteamstandings.teamstandingsentry;
    // console.log(results);
    // this.setState({teamData : response.overallteamstandings.teamstandingsentry})
    return results;
  })
  // parses data into {key}:{value} object
  .then(results => {
    let arrayAdd = {}
    results.forEach(loggie => {
      arrayAdd[JSON.stringify(loggie.team.Name)] = JSON.parse(loggie.stats.Wins['#text'])
    // console.log(arrayAdd)
    // console.log(JSON.stringify(loggie.team.Name) + ' ' + JSON.stringify(loggie.stats.Wins['#text']))
    })
    console.log(arrayAdd)
    this.setState({teamData : arrayAdd})
  })
  .catch(err => {
    console.log("Error " + err + " received!")
  })
}


  render() {
    return (
      <div className="App">
        <header className="App-header">
          yo
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>
            <button onClick={this.callData} >Click</button>
          </p>
        </header>
      </div>
    )
  };
}

export default App;
