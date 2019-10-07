import React from 'react';





const PlayerView = (props) => {
    return(
      <div>{props.player.name}: {props.player.wins} wins</div>
    )
  }

  export default PlayerView;