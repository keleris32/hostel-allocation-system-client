import { useState } from 'react';
import HomeCSS from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axiosInstance from '../../utils/axiosInterceptor';
import { getAccessToken } from '../../utils/accessToken';
import { ErrorAlert } from '../../components';
import salemLogo from '../../assets/salemunilogo.png';
import PurchaseRoom from '../../components/PurchaseRoom';
import StudentInfo from '../../components/StudentInfo';

function Home(): JSX.Element {
  const navigate = useNavigate();
  const token = getAccessToken();

  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>('');
  const [studentData, setstudentData] = useState<any>({});
  const [roomsData, setRoomsData] = useState<any>({});
  const [isErrorAlertActive, setIsErrorAlertActive] = useState<boolean>(false);

  const fetchAvailableRooms = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get('rooms');

      setRoomsData(response.data.data);
    } catch (error) {
      setFetchError(
        // @ts-ignore
        error.response.data.message ??
          'Please Check your internet connection and try again later'
      );
      setIsErrorAlertActive(true);
    }
  };

  const fetchStudentInfo = async (): Promise<void> => {
    setLoading(true);

    try {
      const response = await axiosInstance.get('student');

      if (response.data.data.room_id === null) {
        fetchAvailableRooms();
      } else {
        setstudentData(response.data.data);
      }
    } catch (error) {
      setFetchError(
        // @ts-ignore
        error.response.data.message ??
          'Please Check your internet connection and try again later'
      );

      setIsErrorAlertActive(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchStudentInfo();
    }
  }, []);

  if (loading) {
    return <div>Loadinggg Home!!!</div>;
  }

  return (
    <div className={HomeCSS.container}>
      <div style={{ position: 'absolute' }}>
        <ErrorAlert
          isErrorAlertActive={isErrorAlertActive}
          setIsErrorAlertActive={setIsErrorAlertActive}
          severity="error"
          variant="filled"
          title="Could not fetch User Information"
          message={fetchError}
        />
      </div>
      <div className={HomeCSS.wrapper}>
        <nav className={HomeCSS.header}>
          <div className={HomeCSS.appLogo}>
            <img src={salemLogo} alt="School logo" />
          </div>
        </nav>
        {studentData && console.log(studentData)}
        <div className={HomeCSS.titleContainer}>
          <h1>Welcome to the Hostel Allocation Portal</h1>
        </div>
        <div className={HomeCSS.contentContainer}>
          {studentData.room_id ? (
            <StudentInfo data={studentData} />
          ) : (
            <PurchaseRoom data={roomsData} />
          )}
        </div>
        <footer className={HomeCSS.footer}>
          <h3>
            © IGBINOSA JOSHUA - SU18201010T <br /> CLASS OF 2022
          </h3>
        </footer>
      </div>
    </div>
  );
}

export default Home;
