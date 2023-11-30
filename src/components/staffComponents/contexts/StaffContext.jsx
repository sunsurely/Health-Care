import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { SigninContext } from '../../../App';

export const StaffContext = createContext();

const StaffContextProvider = ({ children }) => {
  const [staffData, setStaffData] = useState([]);
  const [gender, setGender] = useState('전체');

  const { setIsLogin } = useContext(SigninContext);
  useEffect(() => {
    const initData = async () => {
      console.log(gender);
      await axios
        .get(`http://localhost:3100/staff`, {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
          },
          params: { gender },
        })
        .then((response) => {
          setStaffData(response.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            checkRefresh();
          }
          console.log(error);
        });
    };

    initData();
  }, [gender]);

  const checkRefresh = () => (category) => {
    axios
      .post(
        `http://localhost:3100/auth/refresh`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem('refreshToken'),
          },
        },
      )
      .then((response) => {
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem(
          'accessToken',
          `Bearer ${response.data.accessToken}`,
        );

        axios
          .get(`http://localhost:3100/staff/ `, {
            headers: {
              Authorization: `Bearer ${response.data.accessToken}`,
              params: { gender },
            },
          })
          .then((response) => {
            setStaffData(response.data);
          })
          .catch((error) => {
            if (error.response.status === 404) {
              alert('해당 스텝이 존재하지 않습니다.');
            }
          });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setIsLogin(false);
        }
      });
  };

  return (
    <StaffContext.Provider value={{ staffData, setGender }}>
      {children}
    </StaffContext.Provider>
  );
};

export default StaffContextProvider;
