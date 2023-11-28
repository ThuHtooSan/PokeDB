import { useState } from 'react'
import { useAppContext } from '../hooks'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../sass/components/header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { state, dispatch } = useAppContext();
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleEnterKey = (e) => {
    if (e.code === 'Enter') handleSearch();
  }

  const handleSearch = () => {
    if (!input) return;

    const query = input
      .toLowerCase()
      .replace(/([^\w\d\s_]+)|[\s_]+/g, (m, g1) => {
        return g1 ? '' : '-';
      });
    
    query && navigate(`/pokemon/${query}`);
    setInput('');
  }

  const handleItemLimit = (e) => {
    dispatch({ type: 'SET_ITEM_LIMIT', count: e.target.value });
  }
  
  return (
    <header>
      <h1 className='page-title'>PokéDB</h1>
      <div className={`search-bar ${state.theme}`}>
        <input value={input} type="search" name="search" className='search' placeholder='Enter Pokémon name or Pokédex number' onChange={(e) => setInput(e.target.value)} onKeyDown={handleEnterKey} />
        <button onClick={handleSearch} className='search-btn'>Search</button>
      </div>
      <div className="filters">
        <label htmlFor="item-limit" className='item-limit'>
          Items per page
          <select 
            onChange={handleItemLimit}
            value={state.itemLimit}
            name="items-per-page" 
            id='item-limit'
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </select>
        </label>
      </div>
      <Link to='/credits' className='credits-link'>
        <FontAwesomeIcon icon={faCopyright} className='icon' />Credits
      </Link>
    </header>
  )
}

export default Header