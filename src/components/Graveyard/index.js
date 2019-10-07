import React from 'react';
import CornerBoxes from '../../components/CornerBoxes';
import './graveyard.css';

const Graveyard = ({ channelMembersInfo, graveyardMembersInfo }) => {

  console.log('GRAVEYARD PROPS::');

  console.log("channelMembersInfoo::")
  console.log(channelMembersInfo);

  console.log("graveyardMembersInfo::");
  console.log(graveyardMembersInfo);

  const graveyardMembersInfo_sorted = graveyardMembersInfo.sort((a, b) => (parseFloat(a.timeOfDeath) > parseFloat(b.timeOfDeath)) ? 1 : -1)


  console.log("graveyardMembersInfo_sorted::");
  console.log(graveyardMembersInfo_sorted);

  const tombStones = graveyardMembersInfo_sorted.map((deadPerson) => {
    let fullNameOfTheDead = '';
    let initialsOfTheDead = '';
    let role = '';
    let classRole = '';
    let dod = '';
    let isDead = null;

    if(deadPerson){
      fullNameOfTheDead = deadPerson.name;

      const deadPersonNameArr = deadPerson.name.toUpperCase().split(".");
      initialsOfTheDead = deadPersonNameArr[0].charAt(0) + deadPersonNameArr[1].charAt(0);

      role = deadPerson.role;
      classRole = role.replace(/\s/g, '');

      const timeOfDeath = parseFloat(deadPerson.timeOfDeath);
      const timeOfDeathConversion = new Date(timeOfDeath*1000);
      dod = timeOfDeathConversion.toLocaleDateString();
      isDead = true;
    }

    return (
      <div key={ deadPerson.id } className={ `tombStone ${isDead && "show"} ${classRole}` }>
        <div className="tombStone__info">
          <div className="tombStone__value">Name: { fullNameOfTheDead }</div>
          <div className="tombStone__value">Role: { role }</div>
          <div className="tombStone__value">DoD: { dod }</div>
          <CornerBoxes borderColor="#df0000" />
        </div>
        <span className="tombStone__name">
          { initialsOfTheDead }
        </span>
      </div>
    )
  })

  return(
    <div className="graveyard">
      <div className="tombStone__container">
        { tombStones }
      </div>
      <CornerBoxes borderColor="#000000" />
    </div>
  )
}

export default Graveyard;

/**
 * List of Roles
  Aura Seer
  Bodyguard
  Drunk
  Hunter
  Mayor
  Seer
  Villager
  Minion
  Sorceress
  Werewolf
 */

