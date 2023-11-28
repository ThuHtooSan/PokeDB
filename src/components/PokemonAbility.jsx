import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useAppContext, useFetch } from "../hooks";
import '../sass/components/pokemon-ability.scss';

const PokemonAbility = ({ abilityId, isHidden }) => {
  const { state } = useAppContext();
  const ability = state?.pokemonAbilities?.[abilityId];

  state.pokemonAbilities?.[abilityId] || useFetch({
    url: `https://pokeapi.co/api/v2/ability/${abilityId}`,
    successAction: { type: 'FETCH_ABILITY_SUCCESS', abilityId}
  })

  if (!ability) return;

  const handleClick = (e) => {
    const target = e.target;
    const nextSibiling = target.nextElementSibling;
    const nextSiblingWidth = nextSibiling.getBoundingClientRect().width;
    const space = window.innerWidth - target.getBoundingClientRect().x + 10;

    nextSibiling.classList.toggle('show');
    nextSibiling.classList.toggle('reversed', space < nextSiblingWidth);
  }

  return (
    <div className={`ability${isHidden ? ' hidden' : ''}`}>
      <div className="ability-name">
        { ability.name.replaceAll('-', ' ').toUpperCase() }
      </div>
      { ability.effect_entries.some(entry => entry.language.name === 'en') &&
      <>
        <button onClick={handleClick} className="expand-ability">
          <FontAwesomeIcon icon={faQuestion} />
        </button>
        <div className="ability-detail">
          { ability.effect_entries.reduce((result, entry) => {
              if (entry.language.name === 'en') {
                return entry.effect;
              }
              return result;
            }, '')
          }
        </div>
      </>
      }

      
    </div>
  )
}

export default PokemonAbility;