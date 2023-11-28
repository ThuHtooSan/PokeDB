import React from 'react'
import Icon from './Icon';
import '../sass/components/spinner.scss';

const Spinner = ({ label }) => {
  
  return (
    <div className="spinner-container">
      <div className="spinner">
        <Icon name='spinner' className='icon' />
        <p className="description">{ label }</p>
      </div>
    </div>
  )
}

export default Spinner;