import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { SigninContext } from '../../../App';
import { useNavigate } from 'react-router-dom';

export const MemberListContext = createContext();

const MemberListContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [memberState, setMemberState] = useState('total');
  const [gender, setGender] = useState('total');
  const [keyword, setKeyword] = useState('');
  const [phoneOrName, setPhoneOrName] = useState('이름');
  const [checkedArray, setCheckedArray] = useState([]);

  const navigator = useNavigate();

  const handleToggleAll = () => {
    const newArr = checkedArray.map((check) => {
      return {
        ...check,
        checked: !checkedArray.every((check) => check.checked),
      };
    });
    setCheckedArray(newArr);
  };

  const handleToggleSingle = (id) => {
    const newArr = checkedArray.map((check) => {
      return {
        ...check,
        checked: check.id === id ? !check.checked : check.checked,
      };
    });

    setCheckedArray(newArr);
  };

  const { setIsLogin } = useContext(SigninContext);

  useEffect(() => {
    const initData = async () => {
      await axios
        .get('http://localhost:3100/member', {
          headers: { Authorization: localStorage.getItem('accessToken') },
          params: { gender, state: memberState },
        })
        .then((res) => setData(res.data))
        .catch((error) => {
          if (error.response?.status === 401) {
            checkRefresh();
          }
          console.error(error);
        });
    };
    initData();
  }, [memberState, gender]);

  useEffect(() => {
    const updateArr = data.map((member) => {
      return { id: member.id, checked: false };
    });
    setCheckedArray(updateArr);
  }, [data]);

  const checkRefresh = (category) => {
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

        const categoryString = category ? `${category}=${keyword}` : '';

        axios
          .get(`http://localhost:3100/member/${categoryString} `, {
            headers: {
              Authorization: `Bearer ${response.data.accessToken}`,
              params: { gender, state: memberState },
            },
          })
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            if (error.response?.status === 404) {
              alert('해당 회원이 존재하지 않습니다.');
            }
          });
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          alert('로그인이 필요합니다.');
          setIsLogin(false);
          navigator('/signin');
        }
      });
  };

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
            Authorization: localStorage.getItem('accessToken'),
          },
        })
        .then((response) => {
          setData([response.data]);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            checkRefresh('phone?phoneNumber');
          }

          if (err.response.status === 404) {
            alert('해당 회원이 존재하지 않습니다.');
          }

          setData([]);
        });

      return;
    }
    axios
      .get(`http://localhost:3100/member/name?name=${keyword}`, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          checkRefresh('name?name');
        }

        if (err.response.status === 404) {
          alert('해당 회원이 존재하지 않습니다.');
        }
        setData([]);
      });
  };

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
        handleToggleAll,
        handleToggleSingle,
        checkedArray,
        setMemberState,
      }}
    >
      {children}
    </MemberListContext.Provider>
  );
};

export default MemberListContextProvider;
