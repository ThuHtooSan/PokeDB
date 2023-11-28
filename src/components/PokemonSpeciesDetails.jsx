import '../sass/components/pokemon-species-details.scss';
import { useAppContext, useFetch } from '../hooks';
import Icon from './Icon';
import { extractId } from '../functions';
import { PokemonAbility } from './';

const PokemonSpeciesDetails = ({ id }) => {
  const { state } = useAppContext();
  const pokemon = state.pokemon[id];
  const species = pokemon?.species;
  const abilities = pokemon?.abilities;
  species?.url && useFetch({
    url: `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    successAction: { type: 'FETCH_SPECIES_SUCCESS', id: id }
  });
  
  const {
    capture_rate,
    base_happiness,
    growth_rate,
    habitat,
    pal_park_encounters,
    pokedex_numbers,
    egg_groups
  } = species;
  
  return (
    <div className="species-details">
      <section className="first-section">
        { abilities && 
          <div className="ability-container">
            <h3 className="title">Abilities</h3>
            <div className="abilities">
              { pokemon?.abilities.map((ability, index) => {
                const id = extractId(ability.ability.url);
                return (
                  <PokemonAbility abilityId={id} isHidden={ability.is_hidden} key={`${id}_${index}`} />
                )
              })}
            </div>
          </div>
        }

        { !species?.url &&
          <div className="species-basic-infos">
            <h3 className="title">Species Info</h3>
            <div className="infos">
              { capture_rate &&
                <div className="capture-rate">
                  <span><Icon name='butterflyNet'/> Capture Rate</span>
                  <span>{capture_rate}%</span>
                </div>
              }
              { base_happiness &&
                <div className="base-hapiness">
                  <span><Icon name='happyFace'/> Base Happiness</span>
                  <span>{base_happiness}%</span>
                </div>
              }
              { growth_rate && 
                <div className="growth-rate">
                  <span><Icon name='growUp'/> Growth Rate</span>
                  <span>{growth_rate.name.replace('-', ' ')}</span>
                </div>
              }
              { habitat && 
                <div className="habitat">
                  <span><Icon name='pond'/>Habitat</span>
                  <span>{habitat.name.replace('-', ' ')}</span>
                </div>
              }
            </div>
          </div>
        }
      </section>

      { !species?.url &&
      <section className='second-section'>
        { !!pal_park_encounters.length && 
          <div className="pal-park-encounters">
            <h4 className='title'><Icon name='park' /> Pal Park Encounters</h4>
            <ul className='encounters'>
              { pal_park_encounters.map(encounter => (
                <li key={encounter.area.name}>
                  <div className="encounter">
                    <span className="place">{encounter.area.name.replace('-', ' ')}</span>
                    <span className="rate">{encounter.rate}%</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        }

        { !!pokedex_numbers.length &&
          <div className="pokedex-numbers">
            <h4 className='title'><Icon name='pokeball' /> Pokedex Numbers</h4>
            <ol className='pokedex-container'>
              { pokedex_numbers.map(number => (
                <li key={number.pokedex.name}>
                  <div className="pokedex">
                    <span className="pokedex-name">
                      {number.pokedex.name.replace(/(^.|(?<=-).(?=\w))|-/g, (m, g1) => {
                        return g1 ? g1.toUpperCase() : ' ';
                      })} Pokédex
                    </span>
                    <span className="pokedex-entry">{number.entry_number}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        }

        { !!egg_groups.length &&
          <div className="egg-groups">
            <h4 className='title'><Icon name='eggs'/>Egg Groups</h4>
            <ul>
              { egg_groups.map(group => 
                <li className={`group-name ${group.name}`} key={group.name}>
                  {group.name.replace(/^./, (m) => m.toUpperCase())}
                </li>
              )}
            </ul>
          </div>
        }
      </section>
      }
    </div>
  )
}

export default PokemonSpeciesDetails;