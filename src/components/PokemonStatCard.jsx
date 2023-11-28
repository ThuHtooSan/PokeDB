import React from 'react';
import '../sass/components/pokemon-stat-card.scss';

const PokemonStatCard = ({ stats }) => {
  return (
    <div className="stat-card">
      { stats.map(stat => (
        <div className="stat-container" key={stat.stat.name}>
          <div className="stat-bar-container">
            <div className="stat-name">{ stat.stat.name.replace('-', ' ') }</div>
            <div className="stat-bar" style={{ width: `${(stat.base_stat / 300) * 100}%` }}></div>
          </div>
          <div className="stat-value">{ stat.base_stat }</div>
        </div>
      )) }
    </div>
  )
}

export default PokemonStatCard;

