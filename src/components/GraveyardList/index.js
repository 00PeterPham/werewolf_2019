import React from 'react';
import RoleList from '../RolesList';
import './graveyardList.css';

const GraveyardList = ({ roles, graveyardMembersInfo }) => {
  const roleData = {};

  //Populates roleData object with roles with empty arrays. ie. { auraseer: [], bodyguard: [] }
  roles.map((role) => {
    role = role.toLowerCase().replace(/\s/g, ''); //Sanitized
    roleData[role] = [];
    return true; //Not require. Added to solve console warnings
  })

  //Populates roleData object with deadPpl in specific role
  graveyardMembersInfo.map((deadPerson) => {
    const deadPersonRole = deadPerson.role.toLowerCase().replace(/\s/g, ''); //Sanitized

    if(deadPersonRole in roleData){
      roleData[deadPersonRole].push(deadPerson);
    }else {
      roleData["villager"].push(deadPerson)
    }
    return true; //Not require. Added to solve console warnings
  })

  const allRolesLists = [];
  
  //Creates array of <RoleList />'s 
  roles.map((role) => {
    const deadRole = role.replace(/\s/g, ''); //Sanitize role
    allRolesLists.push( <RoleList key={ role } name={ role } roleData={ roleData[deadRole] } /> );
    return true; //Not require. Added to solve console warnings
  })

  return(
    <div className="graveyardList">
      <h2>Deceased:</h2>
      { 
        graveyardMembersInfo.length > 0 ? 
        <>
          { allRolesLists }
        </>
        :
        <h3>No one's dead. Yet..... >:-D</h3>
      }
    </div>
  )
}

export default GraveyardList;

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

