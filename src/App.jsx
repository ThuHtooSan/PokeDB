import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppContext } from './hooks';
import { Header, PokemonList, PokemonDetail, Spinner, ErrorView } from './components';
import { Home, Results, Credits } from './pages';
import './sass/base.scss';

function App() {
  const { state } = useAppContext();
  useEffect(() => {
    document.body.className = state.theme;
  }, [state.theme])

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='type/:type' element={<PokemonList />} />
        <Route path='page/:pg' element={<Results/>} />
        <Route path='pokemon/:query' element={<PokemonDetail />} />
        <Route path='credits/' element={<Credits />} />
      </Routes>
      { !!state.loading.length && <Spinner label={state.loadingLabel} />}
      { state.isError && <ErrorView /> }
    </Router>
  )
}

export default App
