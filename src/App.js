import BodyContainer from './components/body/BodyContainer';
import { createContext, useEffect, useState } from 'react';
import Header from './components/header/Header';
import './index.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SigninContext = createContext();

const App = () => {
  const navigator = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const login = localStorage.getItem('isLogin');

    if (login === 'true') {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const onSignin = () => {
    localStorage.setItem('isLogin', 'true');
    setIsLogin(true);
  };

  const logout = () => {
    axios
      .post(
        'http://localhost:3100/auth/logout',
        {},
        {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
          },
        },
      )
      .then((res) => {
        alert('로그아웃 되었습니다.');
        localStorage.setItem('accessToken', '');
        localStorage.setItem('refreshToken', '');
        localStorage.setItem('isLogin', 'false');
        setIsLogin(false);
        navigator('/signin');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setIsLogin(false);
          localStorage.setItem('isLogin', '');
          localStorage.setItem('accessToken', '');
          localStorage.setItem('refreshToken', '');
          navigator('/signin');
        }
        alert(error.response?.data.message);
      });
  };

  return (
    <SigninContext.Provider value={{ isLogin, logout, onSignin, setIsLogin }}>
      <Header />
      <BodyContainer />
    </SigninContext.Provider>
  );
};

export default App;
