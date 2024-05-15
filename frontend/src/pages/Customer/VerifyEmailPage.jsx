import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const VerifyEmailPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
  
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/verifyEmail?token=${token}`);
        if (response.ok) {
          // Email verification successful
          console.log('Email verification successful!');
        } else {
          console.error('Email verification failed.');
        }
      } catch (error) {
        console.error('Error verifying email:', error);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div>
      <h1>Verifying Email...</h1>
    </div>
  );
};

export default VerifyEmailPage;
