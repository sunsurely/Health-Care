import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { SigninContext } from '../../../App';
import { useNavigate } from 'react-router-dom';

export const StaffContext = createContext();

const StaffContextProvider = ({ children }) => {
  const [staffData, setStaffData] = useState([]);
  const [gender, setGender] = useState('전체');
  const [checkedArray, setCheckedArray] = useState([]);
  const navigator = useNavigate();
  const { setIsLogin } = useContext(SigninContext);
  useEffect(() => {
    const initData = async () => {
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

  useEffect(() => {
    const newArr = staffData.map((staff) => {
      return { id: staff.id, checked: false };
    });

    setCheckedArray(newArr);
  }, [staffData]);

  const checkRefresh = () => () => {
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

  const checkHandleAll = () => {
    const newArr = checkedArray.map((check) => {
      return {
        ...check,
        checked: !checkedArray.every((check) => check.checked),
      };
    });
    setCheckedArray(newArr);
  };

  const checkHandleSingle = (id) => {
    const newArr = checkedArray.map((check) => {
      return {
        ...check,
        checked: check.id === id ? !check.checked : check.checked,
      };
    });

    setCheckedArray(newArr);
  };

  const onDelete = () => {
    if (checkedArray.every((check) => check.checked === false)) {
      alert('선택된 항목이 없습니다.');
      return;
    }
    const confirmed = window.confirm('삭제하시겠습니까?');

    if (confirmed) {
      checkedArray.forEach((check) => {
        if (check.checked) {
          axios
            .delete(`http://localhost:3100/staff/${check.id}`, {
              headers: {
                Authorization: localStorage.getItem('accessToken'),
              },
            })
            .then((res) => {
              alert('삭제했습니다.');
              location.reload();
            })
            .catch((error) => {
              if (error.response.status === 401) {
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
                  .then(() => {
                    localStorage.setItem('isLogin', 'true');
                    localStorage.setItem(
                      'accessToken',
                      `Bearer ${response.data.accessToken}`,
                    );
                    axios
                      .delete(`http://localhost:3100/staff/${check.id}`, {
                        headers: {
                          Authorization: localStorage.getItem('accessToken'),
                        },
                      })
                      .then((res) => navigator('/staff'))
                      .catch(() => alert('삭제할 수 없습니다.'));
                  });
              }

              alert('삭제할 수 없습니다.');
            });
        }
      });
    }
  };
  return (
    <StaffContext.Provider
      value={{
        staffData,
        setGender,
        checkedArray,
        checkHandleAll,
        checkHandleSingle,
        onDelete,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};

export default StaffContextProvider;
