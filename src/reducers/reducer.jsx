import { extractId, structureEvolutions, removeItem } from "../functions";
import pokeball from '../assets/icons/pokeball-spinner.png';

export const initialState = {
  theme: 'light',
  loading: [],
  isError: false,
  loadingLabel: 'Loading...',
  result: null,
  pokemon: null,
  pokemonEntries: {},
  pokemonAbilities: null,
  itemLimit: 20,
  itemOffset: 0,
  count: null
}

const reducer = (state, action) => {
  console.log(`Received action: ${action.type}`);
  switch (action.type) {
    case 'TOGGLE_THEME': {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      return { ...state, theme: newTheme };
    }
    case 'SET_ITEM_LIMIT': {
      return {
        ...state,
        itemLimit: action.count
      }
    }
    case 'FETCH_START': {
      let label;
      switch (action.successActionType) {
        case 'FETCH_POKEMONS_SUCCESS':
          label = 'Fetching Pokémon list...';
          break;
        case 'FETCH_POKEMON_SUCCESS':
          label = 'Fetching basic data...';
          break;
        case 'FETCH_SPECIES_SUCCESS':
          label = 'Fetching species data...';
          break;
        case 'FETCH_ABILITY_SUCCESS':
          label = 'Fetching ability data...';
          break;
        case 'FETCH_EVOLUTIONS_SUCCESS':
          label = 'Fetching evolution data...';
          break;
        default:
          label = 'Loading...';
      }
      return { 
        ...state,
        loading: state.loading.concat(action.taskId),
        loadingLabel: label
      };
    }
    case 'FETCH_POKEMONS_SUCCESS': {
      const [pokemonIds, pokemonEntries] = action.payload.results
        .reduce((result, pokemon) => {
          const id = extractId(pokemon.url);
          return [
            result[0].concat(id),
            { ...result[1], [pokemon.name]: id }
          ];
        }, [[], {}]);
      
      return {
        ...state,
        loading: removeItem(state.loading, action.taskId),
        isError: false,
        result: pokemonIds,
        pokemonEntries: { ...state.pokemonEntries, ...pokemonEntries },
        count: action.payload.count
      }
    }
    case 'FETCH_POKEMON_SUCCESS': {
      const { sprites } = action.payload;
      const artwork = 
      sprites?.other?.dream_world?.front_default 
      ?? sprites?.other?.home?.front_default
      ?? sprites?.other?.['official-artwork']?.front_default
      ?? sprites?.front_default
      ?? pokeball;
      
      return {
        ...state,
        loading: removeItem(state.loading, action.taskId),
        isError: false,
        pokemon: { 
          ...state.pokemon, 
          [action.payload.id]: {
            ...action.payload,
            artwork
          }
        },
        pokemonEntries: {
          ...state.pokemonEntries,
          [action.payload.name]: action.payload.id
        }
      }
    }
    case 'FETCH_SPECIES_SUCCESS': {
      return {
        ...state,
        loading: removeItem(state.loading, action.taskId),
        isError: false,
        pokemon: {
          ...state.pokemon,
          [action.payload.id]: {
            ...state.pokemon?.[action.payload.id],
            species: {
              ...action.payload
            }
          }
        }
      }
    }
    case 'FETCH_ABILITY_SUCCESS': {
      return {
        ...state,
        loading: removeItem(state.loading, action.taskId),
        isError: false,
        pokemonAbilities: {
          ...state.pokemonAbilities,
          [action.payload.id]: {
            ...action.payload
          }
        }
      }
    }
    case 'FETCH_EVOLUTIONS_SUCCESS': {
      const evolutions = structureEvolutions(action.payload.chain);
      const evolutionsEntries = evolutions.map((evolution, i, arr) => {
        return [evolution[0], {
            ...state.pokemon?.[evolution[0]],
            evolutions: arr
        }]
      });
      const evolutionsForEach = Object.fromEntries(evolutionsEntries);
      return {
        ...state,
        loading: removeItem(state.loading, action.taskId),
        isError: false,
        pokemon: {
          ...state.pokemon,
          ...evolutionsForEach
        }
      }
    }
    case 'FETCH_FAIL': {
      return {
        ...state,
        loading: removeItem(state.loading, action.taskId),
        isError: action.error
      }
    }
    case 'DISMISS_ERROR': {
      return {
        ...state,
        isError: false
      }
    }
    default: 
      return state;
  }
}


export default reducer;