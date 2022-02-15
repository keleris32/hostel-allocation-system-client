// import { useEffect, useState } from 'react';
// import { Preloader } from './components';
import AppRoutes from './routes/Routes';
// import { setAccessToken } from './utils/accessToken';
// import axiosInstance from './utils/axiosInterceptor';

function App() {
  // const [loading, setLoading] = useState(true);

  // const fetchRefreshToken = async (): Promise<void> => {
  //   try {
  //     const response = await axiosInstance.post('refresh-token');

  //     if (response.data.access_token) {
  //       setAccessToken(response.data.acess_token);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchRefreshToken();
  // }, []);

  // if (loading) {
  //   return (
  //     <div>
  //       <Preloader />
  //     </div>
  //   );
  // }

  return <AppRoutes />;
}

export default App;
