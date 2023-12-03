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
  margin-top: 30px;
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

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const navigator = useNavigate();

  const onRegist = (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      nickname,
    };
    axios
      .post('http://localhost:3100/auth/signup', formData)
      .then((response) => {
        alert('회원가입에 성공했습니다..');
        navigator('/signin');
      })
      .catch((err) => alert(err.response?.data.message));
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  return (
    <Container>
      <InputSet>
        <Label>이메일</Label>
        <Input
          type="text"
          value={email}
          onChange={onChangeEmail}
          placeholder="ex)hong@workout.net"
        />
      </InputSet>
      <InputSet>
        <Label>패스워드</Label>
        <Input type="text" value={password} onChange={onChangePassword} />
      </InputSet>
      <InputSet>
        <Label>닉네임</Label>
        <Input type="text" value={nickname} onChange={onChangeNickname} />
      </InputSet>

      <ButtonContainer>
        <Button type="button" onClick={onRegist}>
          회원등록
        </Button>
        <Button type="button" onClick={() => navigator('/')}>
          취소
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default SignupForm;
