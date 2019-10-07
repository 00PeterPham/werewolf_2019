import React from 'react';
import './villageScene.css';
import CornerBoxes from '../CornerBoxes';

const VillageScene = ({ villageMembersInfo }) => {
  const villageSceneList = villageMembersInfo.map((villagerInfo) => {
    const topRandom = Math.floor(Math.random() * 80);
    const leftRandom = Math.floor(Math.random() * 90);
    const randomPosition = {
      top: `${topRandom}%`,
      left: `${leftRandom}%`
    }

    const animationList = [
      '',
      '',
      '',
      '',
      '',
      '',
      'side-to-side',
      'bounce-1',
      'bounce-2',
      //'rolling',
      'side-to-side-2'
    ];

    const randomBody = Math.floor(Math.random() * 5) + 1;
    const randomAnimation = animationList[Math.floor(Math.random() * (animationList.length)) + 0 ];

    return (
      <div style={ randomPosition } className={ `villager-sprite person-${randomBody} ${randomAnimation}` } key={ villagerInfo.slackID }>
        { 
          villagerInfo.slackAvatar ?
          <img src={ villagerInfo.slackAvatar } alt="villager avatar" /> 
          : null
        }
        <span className="villager-name">{ villagerInfo.name }</span>
      </div>
    )
  })

  return(
    <div className="village category-list">
      <div className="village__scene">
        { villageSceneList }
      </div>
      <CornerBoxes borderColor="#aaeab6" />
    </div>
  )
}

export default VillageScene;
