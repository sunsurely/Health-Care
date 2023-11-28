import { createContext, useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export const MemberListContext = createContext();

const MemberListContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [memberState, setMemberState] = useState('total');
  const [gender, setGender] = useState('total');
  console.log(memberState, gender);
  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6Iuq5gO2VhOyEoCIsImlhdCI6MTcwMTE0MzY3NiwiZXhwIjoxNzAxMTYxNjc2fQ.Vn3NSClZvHmtKVIhHU_cGjjAhrsQ48AexmD_RH_X7s4';

  useEffect(() => {
    const initData = async () =>
      await axios
        .get('http://localhost:3100/member', {
          headers: { Authorization: token },
          params: { gender, state: memberState },
        })
        .then((res) => setData(res.data))
        .catch((error) => {
          console.error(error);
        });

    initData();
  }, [memberState, gender]);

  const onChangeOptState = useCallback((e) => {
    const value = e.target.value;
    let state;
    switch (value) {
      case '전체':
        state = 'total';
        break;
      case '일반':
        state = 'normal';
        break;
      case 'PT':
        state = 'pt';
        break;
      case '만료':
        state = 'expired';
        break;
      default:
        state = 'total';
        break;
    }
    setMemberState(state);
  }, []);

  const onChangeOptGender = useCallback((e) => {
    const value = e.target.value;
    let gender;
    switch (value) {
      case '전체':
        gender = 'total';
        break;
      case '남성':
        gender = 'male';
        break;
      case '여성':
        gender = 'female';
        break;
      default:
        gender = 'total';
        break;
    }
    setGender(gender);
  }, []);

  return (
    <MemberListContext.Provider
      value={{ memberList: data, onChangeOptGender, onChangeOptState }}
    >
      {children}
    </MemberListContext.Provider>
  );
};

export default MemberListContextProvider;
