import {PokemonList, PageNavigation } from "../components";
import { useAppContext, useFetch } from '../hooks';

const Home = () => {
  const { state } = useAppContext();

  useFetch({
    url: `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${state.itemLimit}`,
    successAction: { type: 'FETCH_POKEMONS_SUCCESS' }
  });

  return (
    <>
      <PokemonList offset={0} />
      <PageNavigation currentPage={1} />
    </>
  )
}

export default Home;