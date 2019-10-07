import React from 'react';
import './cornerBoxes.css';

const CornerBoxes = ({ borderColor }) => {
  const style = {
    borderColor,
  }

  return(
    <>
      <div className="square square-1" style={ style }></div>
      <div className="square square-2" style={ style }></div>
      <div className="square square-3" style={ style }></div>
      <div className="square square-4" style={ style }></div>
    </>
  )
}

export default CornerBoxes;
