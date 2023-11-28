import { createContext, useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export const MemberListContext = createContext();

const MemberListContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [memberState, setMemberState] = useState('total');
  const [gender, setGender] = useState('total');
  const [keyword, setKeyword] = useState('');
  const [phoneOrName, setPhoneOrName] = useState('이름');

  const token = localStorage.getItem('token');

  const onChangeSearchbar = (e) => {
    setKeyword(e.target.value);
  };

  const onChangeSelect = (e) => {
    setPhoneOrName(e.target.value);
  };

  const searchMember = () => {
    if (phoneOrName === '연락처') {
      axios
        .get(`http://localhost:3100/member/phone?phoneNumber=${keyword}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then((response) => {
          setData([response.data]);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            alert('연락처에 해당하는 회원이 존재하지 않습니다.');
          }

          setData([]);
        });

      return;
    }
    axios
      .get(`http://localhost:3100/member/name?name=${keyword}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          alert('이름에 해당하는 회원이 존재하지 않습니다.');
        }
        setData([]);
      });
  };

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
      value={{
        memberList: data,
        onChangeOptGender,
        onChangeOptState,
        onChangeSearchbar,
        onChangeSelect,
        searchMember,
        keyword,
        phoneOrName,
      }}
    >
      {children}
    </MemberListContext.Provider>
  );
};

export default MemberListContextProvider;
