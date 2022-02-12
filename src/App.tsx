import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import AppRoutes from './routes/Routes';
import { setAccessToken } from './utils/accessToken';
import axiosInstance from './utils/axiosInterceptor';

function App() {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchRefreshToken = async (): Promise<void> => {
    try {
      const response = await axiosInstance.post('refresh-token');

      setAccessToken(response.data.acess_token);
    } catch (error) {
      console.log(error);
      // navigate('login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefreshToken();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loadinggggggg whole app </h1>
      </div>
    );
  }

  return <AppRoutes />;
}

export default App;
