import React, { useState } from 'react';
import roomCSS from './PurchaseRoom.module.css';
import NumberFormat from 'react-number-format';
import { Radio, CircularProgress } from '@mui/material';
import { getStudent } from '../../utils/storageUtils';
import axiosInstance from '../../utils/axiosInterceptor';
import { ErrorAlert } from '../index';

function PurchaseRoom({ data }: any): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>('');
  const [isErrorAlertActive, setIsErrorAlertActive] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('executive');
  const [email, setEmail] = useState<string>('');

  const studentId = getStudent();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const submitBtn = async (): Promise<void> => {
    setLoading(true);

    let selectedAmount;
    let selectedRoom;

    if (selectedValue === 'executive') {
      selectedAmount = data[0].price;
      selectedRoom = data[0].id;
    } else {
      selectedAmount = data[1].price;
      selectedRoom = data[1].id;
    }

    const formData = {
      email: email,
      amount: selectedAmount,
      student_id: studentId,
      room_id: selectedRoom,
    };

    try {
      const response = await axiosInstance.post(
        'create-payment-intent',
        formData
      );

      window.location.href = response.data.data.authorization_url;
    } catch (error) {
      // @ts-ignore
      setFetchError(error.response.data.message);

      setIsErrorAlertActive(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={roomCSS.container}>
      <div style={{ position: 'absolute' }}>
        <ErrorAlert
          isErrorAlertActive={isErrorAlertActive}
          setIsErrorAlertActive={setIsErrorAlertActive}
          severity="error"
          variant="filled"
          title="Could not process payment."
          message={fetchError}
        />
      </div>
      <h3 className={roomCSS.title}>
        Please enter your email, select a room and proceed to payment
      </h3>
      <div className={roomCSS.emailContainer}>
        <label>
          <strong>Email: </strong>
        </label>
        <input type="email" value={email} onChange={handleInputChange} />
      </div>
      <div className={roomCSS.roomsWrapper}>
        <div className={roomCSS.roomHalf}>
          <label>
            <p>
              <strong>Hostel: </strong>
              {data[0]?.hostel}
            </p>
            <p>
              <strong>Room: </strong>
              {data[0]?.room_type}
            </p>
            <p>
              <strong>Price: </strong>
              <NumberFormat
                thousandSeparator={true}
                displayType="text"
                prefix={'₦'}
                value={data[0]?.price}
              />
            </p>
          </label>
          <Radio
            checked={selectedValue === 'executive'}
            onChange={handleRadioChange}
            value="executive"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'Executive' }}
          />
        </div>
        <div className={roomCSS.roomHalf}>
          <label>
            <p>
              <strong>Hostel: </strong>
              {data[1]?.hostel}
            </p>
            <p>
              <strong>Room: </strong>
              {data[1]?.room_type}
            </p>
            <p>
              <strong>Price: </strong>
              <NumberFormat
                thousandSeparator={true}
                displayType="text"
                prefix={'₦'}
                value={data[1]?.price}
              />
            </p>
          </label>
          <Radio
            checked={selectedValue === 'standard'}
            onChange={handleRadioChange}
            value="standard"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'Standard' }}
          />
        </div>
      </div>
      <button className={roomCSS.button} disabled={loading} onClick={submitBtn}>
        {loading ? (
          <CircularProgress style={{ color: '#fff' }} size={25} />
        ) : (
          'Proceed'
        )}
      </button>
    </div>
  );
}

export default PurchaseRoom;
