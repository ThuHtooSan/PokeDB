import React from 'react';
import '../sass/components/credits.scss';
import { Icon } from '../components';

const Credits = () => {
  return (
    <div className="credits-container">
      <h3 className="title">Credits</h3>
      <ul className="credits">
        <li>
          <Icon name='pokeball' className='icon' />
          <a href="https://www.flaticon.com/free-icons/pokemon" title="pokemon icons">Pokemon icons created by Smashicons - Flaticon</a>
        </li>
        <li>
          <Icon name='spinner' className='icon' />
          <a href="https://www.flaticon.com/free-icons/pokeball" target='_blank' title="pokeball icons">Pokeball icons created by Freepik - Flaticon</a>
        </li>
        <li>
          <Icon name='butterflyNet' className='icon' />
          <a href="https://www.flaticon.com/free-icons/catch" target='_blank' title="catch icons">Catch icons created by Freepik - Flaticon</a>
        </li>
        <li>
          <Icon name='eggs' className='icon' />
          <a href="https://www.flaticon.com/free-icons/egg" target='_blank' title="egg icons">Egg icons created by Hasymi - Flaticon</a>
        </li>
        <li>
          <Icon name='error' className='icon' />
          <a href="https://www.flaticon.com/free-icons/error" target='_blank' title="error icons">Error icons created by Freepik - Flaticon</a>
        </li>
        <li>
          <Icon name='growUp' className='icon' />
          <a href="https://www.flaticon.com/free-icons/growth" target='_blank' title="growth icons">Growth icons created by Fingerprint Designs - Flaticon</a>
        </li>
        <li>
          <Icon name='happyFace' className='icon' />
          <a href="https://www.flaticon.com/free-icons/happiness" target='_blank' title="happiness icons">Happiness icons created by Freepik - Flaticon</a>
        </li>
        <li>
          <Icon name='park' className='icon' />
          <a href="https://www.flaticon.com/free-icons/park" target='_blank' title="park icons">Park icons created by Freepik - Flaticon</a>
        </li>
        <li>
          <Icon name='pond' className='icon' />
          <a href="https://www.flaticon.com/free-icons/pond" target='_blank' title="pond icons">Pond icons created by Mihimihi - Flaticon</a>
        </li>
      </ul>
    </div>
  )
}

export default Credits;