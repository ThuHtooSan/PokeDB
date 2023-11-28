import { useAppContext, useFetch } from "../hooks";
import bulbasaur from '../../pokemon.json';
import { PokemonStatCard, PokemonEvolutionCard, PokemonSpeciesDetails, Icon, PokemonAbility } from './';
import { useParams } from "react-router-dom";
import '../sass/components/pokemon-detail.scss';
import { extractId } from "../functions";

const PokemonDetail = () => {
  const { state } = useAppContext();
  const { query } = useParams();
  const id = /^\d+$/.test(query) ? query : state.pokemonEntries?.[query];
  const pokemon = state.pokemon?.[id];
  const species = !!pokemon?.species?.flavor_text_entries?.length && pokemon?.species;
  const evolutionId = !!species?.evolution_chain?.url && extractId(species?.evolution_chain?.url);

  pokemon?.name || useFetch({
    url: `https://pokeapi.co/api/v2/pokemon/${query}`,
    successAction: { type: 'FETCH_POKEMON_SUCCESS' }
  });
  
  if (!pokemon) return;

  return (
    <div className="detail-container">
      <h2 className="title">
        {pokemon.name.replaceAll('-', ' ').toUpperCase()}
      </h2>
      <div className="details">
        <section className="first-section">
          <section className="left">
            <div className="avatar-container">
              <div className="img-container">
                <img src={pokemon.artwork} alt={pokemon.name} title={pokemon.name} />
              </div>

              <div className="types-container">
                { pokemon.types.map(type => (
                  <div className={`type ${type.type.name}`} key={type.type.name}>
                    {type.type.name.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
            { !!species?.flavor_text_entries?.length &&
              <div className="flavor-text-container">
                <p className="flavor-text">
                  { 
                    species.flavor_text_entries.reduce((result, entry) => {
                      if (entry.language.name === 'en') {
                        return entry.flavor_text;
                      }
                      return result;
                    }, '')
                  }
                </p>
              </div>
            }
          </section>
          <section className="right">
            <PokemonStatCard stats={pokemon.stats} />
          </section>
        </section>
        <section className="second-section">
          <PokemonSpeciesDetails id={id} />
        </section>
        <section className="third-section">
          { evolutionId &&
            <PokemonEvolutionCard evolutionId={evolutionId} evolutions={pokemon.evolutions} />
          }
        </section>
      </div>
    </div>
  )
}

export default PokemonDetail;