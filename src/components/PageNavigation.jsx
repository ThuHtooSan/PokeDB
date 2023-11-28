import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks';
import '../sass/components/page-nav.scss';

const PageNavigation = ({ currentPage }) => {
  const { state } = useAppContext();

  if (!state.result) return;

  let totalPages = (state.count / state.itemLimit) + 1;
  totalPages = Math.floor(totalPages);

  // const totalPages = 3;
  const startPage = currentPage - 2 < 1 ? 1 : currentPage - 2;
  const endPage = currentPage + 2 > totalPages ? totalPages : currentPage + 2;
  const pages = (num = startPage) => 
    num > endPage ? [] : [num].concat(pages(num + 1));
  
  return (
    <nav className="page-navigation">
      { 
        currentPage > 1 &&
        <>
          <Link to={`/page/1`} className="first-pg">
            &lt;&lt;
          </Link>
          <Link to={`/page/${currentPage - 1}`} className="previous-pg">
            &lt;
        </Link> 
        </>
      }
        { pages().map(page => {
          return page === currentPage
            ? <span className="pg-num active" key={page}>{page}</span>
            : <Link to={`/page/${page}`} className="pg-num" key={page}>{page}</Link>
        }) }
      { 
        currentPage < totalPages &&
        <>
          <Link to={`/page/${currentPage + 1}`} className="next-pg">
            &gt;
          </Link>
          <Link to={`/page/${totalPages}`} className="last-pg">
            &gt;&gt;
          </Link>
        </>
      }
    </nav>
  )
}

export default PageNavigation;