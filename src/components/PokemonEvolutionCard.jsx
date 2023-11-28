import { useFetch } from '../hooks';
import PokemonCard from './PokemonCard';
import '../sass/components/pokemon-evolution-card.scss';
import React from 'react';

const PokemonEvolutionCard = ({ evolutionId, evolutions }) => {
  if (!evolutionId) return;
  
  evolutions || useFetch({
    url: `https://pokeapi.co/api/v2/evolution-chain/${evolutionId}`,
    successAction: { type: 'FETCH_EVOLUTIONS_SUCCESS' }
  });

  if (!evolutions) return;

  return (
    <div className="evolution-card">
      <h2 className="title">Evolutions</h2>
        <div className="evolutions">
          {
            evolutions.map((evolutionEntry, index, arr) => {
              const [pokemonId, { evolution_details }] = evolutionEntry;
              const minLevel = evolution_details?.[0]?.min_level 
                || arr[index - 1]?.[1].evolution_details[0]?.min_level
                || 1;
              return (
                <React.Fragment key={pokemonId}>
                  { index > 0 && 
                    <div className="evolution-seperator">
                      <p className="trigger">{evolution_details[0].trigger.name.replace('-', ' ')}</p>
                      <p className="icon">
                        <span>&gt;</span>
                        <span>&gt;</span>
                        <span>&gt;</span>
                      </p>
                    </div>
                  }
                  <div className="card-container">
                    <p className="min-level">Level {minLevel}+</p>
                    <PokemonCard id={pokemonId} delay={`${index * 2}s`}/>
                  </div>
                </React.Fragment>
              )
            })
          }
        </div>
    </div>
  )
}

export default PokemonEvolutionCard;