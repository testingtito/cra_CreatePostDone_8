import React, { useContext } from 'react'
import StateContext from '../StateContext';

const FlashMessage = () => {
  const globalState = useContext(StateContext);

  return (
    <div className="floating-alerts">
      {globalState.flashMessages.map((msg, index) => {
        return (
          <div key={index} className="alert alert-success text-center floating-alert shadow-sm">
            {msg}
          </div>
        )
      })}
    </div>
  )
}

export default FlashMessage
