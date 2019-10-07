import React from 'react';

const RoleList = ({ name, roleData }) => {
  const roleList = roleData.map((role) => {
    const timeOfDeath = parseFloat(role.timeOfDeath);
    const timeOfDeathConversion = new Date(timeOfDeath*1000);
    const deathDate = timeOfDeathConversion.toLocaleDateString();

    return (
      <li key={ role.id }>{ role.name } died at { deathDate }</li>
    )
  });

  return(
    <div className="role-list">
      <h3>{ name }: ({roleData.length})</h3>
      <ol>
        { roleList }
      </ol>
    </div>
  )
}

export default RoleList;

//roleData
/**
 [
   {
    name,
    slackID
   },
   {
    name,
    slackID
   }
 ]
 */