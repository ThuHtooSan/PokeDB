import React from 'react'
import Icon from './Icon'
import '../sass/components/error-view.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../hooks';

const ErrorView = () => {
  const { dispatch } = useAppContext();
  return (
    <div className="error-view-container">
      <div className="error">
        <Icon name={'error'} className='logo' />
        <p className="description">An error occurred when fetching data!</p>
        <button 
          onClick={() => dispatch({ type: 'DISMISS_ERROR' })} 
          className="dismiss-error"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </div>
  )
}

export default ErrorView