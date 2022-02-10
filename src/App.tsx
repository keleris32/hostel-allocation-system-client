import React, { useEffect, useState } from 'react';
import AppRoutes from './routes/Routes';
import { setAccessToken } from './utils/accessToken';
import axiosInstance from './utils/axiosInterceptor';

function App() {
  const [loading, setLoading] = useState(true);

  const fetchRefreshToken = async (): Promise<void> => {
    try {
      const response = await axiosInstance.post('refresh-token');

      setAccessToken(response.data.acess_token);
      setLoading(false);
    } catch (error) {
      console.log(error);
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
