import HomeCSS from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../utils/accessToken';

function Home(): JSX.Element {
  const navigate = useNavigate();
  const token = getAccessToken();

  if (!token) {
    navigate('/login');
  }

  return (
    <div>
      <h1 className={HomeCSS.title}>Helllooo Homeeee</h1>
    </div>
  );
}

export default Home;
