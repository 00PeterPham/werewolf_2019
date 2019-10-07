import React from 'react';
import CornerBoxes from '../CornerBoxes';
import './status.css';

const Status = ({ elapsedDays, alive, deceased }) => {
  return (
    <div className="status">
      <div className="status__day">Day { elapsedDays }</div>
      <div className="status__alive">Alive: { alive }</div>
      <div className="status__deceased">Deceased: { deceased }</div>
      <CornerBoxes borderColor="#f9d53d" />
    </div>
  )
}

export default Status;