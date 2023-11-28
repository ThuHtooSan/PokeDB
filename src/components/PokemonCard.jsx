import { useAppContext, useFetch } from '../hooks';
import '../sass/components/pokemon-card.scss';
import { Link } from 'react-router-dom';

const PokemonCard = ({ id, delay }) => {
  const { state } = useAppContext();
  state.pokemon?.[id]?.name || useFetch({
    url: `https://pokeapi.co/api/v2/pokemon/${id}`,
    successAction: { type: 'FETCH_POKEMON_SUCCESS' }
  });

  if (state.pokemon?.[id]?.name) {
    const { name, artwork, types: rawTypes, stats} = state.pokemon[id];
    const types = rawTypes.map(rawType => rawType.type);
    const [hp, attack] = stats.reduce((result, statObj) => {
      switch (statObj?.stat?.name) {
        case 'hp': 
          result[0] = statObj.base_stat;
          break;
        case 'attack':
          result[1] = statObj.base_stat;
          break; 
      }
      return result;
    }, [0, 0]);

    const animationDelay = delay ?? `${Math.floor(Math.random() * 10)}s`;

    return (
      <Link to={`/pokemon/${id}`} className='pokemon-card-link'>
        <div className="pokemon-card">
          <div className="shine" style={{ animationDelay }}></div>
          <div className="hp">{hp}</div>
          <div className="img-container">
            <img src={artwork} alt={`${name} artwork`} />
          </div>
          <p className="pokemon-name">{name.replaceAll('-', ' ').toUpperCase()}</p>
          <div className="types">
              {types.map(type => (
                <span className={`type ${type.name}`} key={type.name}>{type.name}</span>
              ))}
          </div>
        </div>
      </Link>
    )
  }
}

export default PokemonCard;