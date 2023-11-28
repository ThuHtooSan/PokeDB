import '../sass/components/pokemon-list.scss';
import { useAppContext } from "../hooks";
import PokemonCard from './PokemonCard';

const PokemonList = ({ offset }) => {
  const { state } = useAppContext();

  if (!state.result) return;
  const sortedIds = state.result.sort((a, b) => a - b);

  const selectedIds = sortedIds.slice(offset, offset + state.itemLimit);

  return (
    <>
      <div className="pokemon-list">
        { selectedIds.map(id => <PokemonCard id={id} key={id} />) }
      </div>
    </>
  )
}

export default PokemonList;