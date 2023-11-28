import { useParams } from "react-router-dom"
import { useAppContext, useFetch } from "../hooks";
import { PokemonList, PageNavigation } from '../components';

const Results = () => {
  let { pg } = useParams();
  const { state } = useAppContext();
  const itemOffset = state.itemLimit * (pg - 1);

  useFetch({
    url: `https://pokeapi.co/api/v2/pokemon/?offset=${itemOffset}&limit=${state.itemLimit}`,
    successAction: { type: 'FETCH_POKEMONS_SUCCESS' }
  });

  return (
    <>
      <PokemonList offset={0} />
      <PageNavigation currentPage={Number(pg)} />
    </>
  )
}

export default Results;