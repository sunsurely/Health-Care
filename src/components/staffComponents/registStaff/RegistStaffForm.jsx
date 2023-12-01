import styled from '@emotion/styled';
import axios from 'axios';
import { useState } from 'react';
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

const RegistStaffForm = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const ymd = `${year}-${month}-${day}`;
  const token = localStorage.getItem('accessToken');

  const navigator = useNavigate();

  const onRegist = (e) => {
    e.preventDefault();

    const formData = {
      name,
      phoneNumber,
      birth,
      gender: gender === '여성' ? 'female' : 'male',
      email,
    };

    axios
      .post('http://localhost:3100/staff', formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        alert('멤버를 등록했습니다.');
        navigator('/staff');
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

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
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
        <select
          value={gender}
          style={{ border: '1px solid #a2a2a2' }}
          onChange={onChangeGender}
        >
          <option>남성</option>
          <option>여성</option>
        </select>
      </InputSet>
      <InputSet>
        <Label>이메일</Label>
        <Input type="text" value={email} onChange={onChangeEmail} />
      </InputSet>
      <ButtonContainer>
        <Button type="button" onClick={onRegist}>
          등록
        </Button>
        <Button type="button" onClick={() => navigator('/staffList')}>
          취소
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default RegistStaffForm;
