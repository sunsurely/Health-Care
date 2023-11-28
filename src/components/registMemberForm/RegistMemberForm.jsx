import styled from '@emotion/styled';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
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

  &:focus::placeholder {
    opacity: 0;
  }
`;

const RegistDate = styled.div`
  line-height: 2;
  padding: 0;
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

const RegistMemberForm = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [period, setPeriod] = useState(1);

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const ymd = `${year}-${month}-${day}`;
  const token = localStorage.getItem('token');

  const navigator = useNavigate();

  const onRegist = (e) => {
    e.preventDefault();

    const formData = {
      name,
      phoneNumber,
      birth,
      gender: gender === '여성' ? 'male' : 'female',
      period: parseInt(period),
      registDate: ymd,
    };
    console.log(formData);
    axios
      .post('http://localhost:3100/member', formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        alert('멤버를 등록했습니다.');
        navigator('/memberList');
      })
      .catch((err) => alert(err.response.data.message));
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const onChangeBirth = (e) => {
    setBirth(e.target.value);
  };
  const onChangeGender = (e) => {
    setGender(e.target.value);
  };
  const onChangePeriod = (e) => {
    setPeriod(e.target.value);
  };

  return (
    <Container>
      <InputSet>
        <Label>이름</Label>
        <Input type="text" value={name} onChange={onChangeName} />
      </InputSet>
      <InputSet>
        <Label>연락처</Label>
        <Input
          type="text"
          value={phoneNumber}
          onChange={onChangePhoneNumber}
          placeholder="000-0000-0000 형태로 입력해주세요"
        />
      </InputSet>
      <InputSet>
        <Label>생년월일</Label>
        <Input type="date" value={birth} onChange={onChangeBirth} />
      </InputSet>
      <InputSet>
        <Label>성별</Label>
        <select value={gender} onChange={onChangeGender}>
          <option>남성</option>
          <option>여성</option>
        </select>
      </InputSet>
      <InputSet>
        <Label>기간</Label>
        <select value={period} onChange={onChangePeriod}>
          <option>1</option>
          <option>3</option>
          <option>4</option>
          <option>6</option>
          <option>12</option>
        </select>
      </InputSet>
      <InputSet>
        <Label>등록일</Label>
        <RegistDate>{ymd}</RegistDate>
      </InputSet>
      <ButtonContainer>
        <Button type="button" onClick={onRegist}>
          등록
        </Button>
        <Button type="button">취소</Button>
      </ButtonContainer>
    </Container>
  );
};

export default RegistMemberForm;
