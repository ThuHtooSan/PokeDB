import '../sass/components/icon.scss';
import butterflyNet from '../assets/icons/butterfly-net.png';
import happyFace from '../assets/icons/happy-face.png';
import growUp from '../assets/icons/grow-up.png';
import pond from '../assets/icons/pond.png';
import eggs from '../assets/icons/eggs.png'; 
import pokeball from '../assets/icons/pokeball.png';
import park from '../assets/icons/park.png'
import spinner from '../assets/icons/pokeball-spinner.png';
import error from '../assets/icons/error.png';

const icons = {
  butterflyNet,
  happyFace,
  growUp,
  pond,
  eggs,
  pokeball,
  park,
  spinner,
  error
}

const Icon = ({ name }) => {
  return <img src={icons[name]} className='icon'/>
}

export default Icon;