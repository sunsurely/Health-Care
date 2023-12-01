import styled from '@emotion/styled';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #a2a2a2;
  border-radius: 5px;
  padding: 30px;
`;

const InputSet = styled.div`
  margin-left: 30px;
  width: 450px;
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  width: 100px;
  line-height: 2;
  font-weight: bold;
  margin-right: 10px;
`;

const Input = styled.input`
  width: 300px;
  padding: 5px;
  border: 1px solid #a2a2a2;

  &:focus::placeholder {
    opacity: 0;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  width: 130px;
  align-items: center;
  justify-content: space-around;
`;

const Button = styled.button`
  width: 50px;
  background-color: #ff3131;
  color: white;
  padding: 5px;
  border-radius: 10px;
  border: none;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 4px black;
  }
`;

const RegistPTForm = () => {
  const [registDate, setRegistDate] = useState('');
  const [counting, setCounting] = useState(0);
  const [amounts, setAmounts] = useState(0);
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainerId, setSelectedTrainerId] = useState(0);

  const navigator = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const memberId = searchParams.get('memberId');

  useEffect(() => {
    axios
      .get(`http://localhost:3100/staff?gender=전체`, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => setTrainers(response.data))
      .catch((err) => {
        if (err.response.statur === 401) {
          axios
            .post('http://localhost:3100/auth/refresh', {
              headers: {
                Authorization: localStorage.getItem('refreshToken'),
              },
            })
            .then(
              axios
                .get(`http://localhost:3100/staff?gender=전체`)
                .then((res) => {
                  setTrainers(res.data);
                }),
            );
        }
      });
  }, [counting]);

  const onChangeTrainerId = (e) => {
    setSelectedTrainerId(e.target.value);
  };

  const onChangeAmounts = (e) => {
    setAmounts(e.target.value);
  };

  const onChangeCounting = (e) => {
    setCounting(e.target.value);
  };

  const onChangeRegistDate = (e) => {
    setRegistDate(e.target.value);
  };

  const registPt = () => {
    const formData = {
      registDate,
      counting: parseInt(counting),
      amounts: parseInt(amounts),
    };
    axios
      .post(
        `http://localhost:3100/member/pt/${selectedTrainerId}/${memberId}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
          },
        },
      )
      .then((res) => {
        alert('회원의 PT를 등록했습니다.');
        navigator('/memberList');
      })
      .catch((err) => {
        if (err.response.statur === 401) {
          axios
            .post('http://localhost:3100/auth/refresh', {
              headers: {
                Authorization: localStorage.getItem('refreshToken'),
              },
            })
            .then(
              axios
                .post(
                  `http://localhost:3100/member/pt/${selectedTrainerId}/${memberId}`,
                  formData,
                  {
                    headers: {
                      Authorization: localStorage.getItem('accessToken'),
                    },
                  },
                )
                .then((res) => {
                  alert('회원의 PT를 등록했습니다.');
                  navigator('/memberList');
                }),
            );
        }

        console.log(err.response.data.message);
      });
  };

  return (
    <Container>
      <InputSet>
        <Label>등록일자</Label>
        <Input type="text" value={registDate} onChange={onChangeRegistDate} />
      </InputSet>
      <InputSet>
        <Label>횟수</Label>
        <Input type="text" value={counting} onChange={onChangeCounting} />
      </InputSet>
      <InputSet>
        <Label>회원권금액</Label>
        <Input type="text" value={amounts} onChange={onChangeAmounts} />
      </InputSet>

      <InputSet>
        <Label>트레이너</Label>
        <select onChange={onChangeTrainerId}>
          <option value={0}>선택</option>
          {trainers.map((trainer) => {
            return (
              <option key={trainer.id} value={trainer.id}>
                {trainer.name}
              </option>
            );
          })}
        </select>
      </InputSet>
      <ButtonContainer>
        <Button type="button" onClick={registPt}>
          등록
        </Button>
        <Button type="button" onClick={() => navigator('/memberList')}>
          취소
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default RegistPTForm;
