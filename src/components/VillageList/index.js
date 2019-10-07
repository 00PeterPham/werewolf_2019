import React from 'react';
import './villageList.css';

const VillageList = ({ villageMembersInfo }) => {
  const villageList = villageMembersInfo.map((villagerInfo) => {
    return (
      <li key={ villagerInfo.slackID }>{ villagerInfo.name }</li>
    )
  })

  return(
    <div className="villageList">
      <h2>Villagers:</h2>
      <ol>
        { villageList }
      </ol>
    </div>
  )
}

export default VillageList;
