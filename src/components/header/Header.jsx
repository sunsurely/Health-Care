import styled from '@emotion/styled';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SigninContext } from '../../App';

const Container = styled.div`
  width: 100%;
  background-color: aqua;
  display: flex;
  padding: 10px;
`;

const Nav = styled.ul`
  display: flex;
  margin: 0;
`;

const Menu = styled.li`
  list-style: none;
  margin-left: 15px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    color: white;
  }
`;

const Header = () => {
  const { isLogin, logout } = useContext(SigninContext);
  const navigator = useNavigate();

  return (
    <Container>
      <Nav>
        <Menu onClick={() => navigator('/memberList')}>회원리스트</Menu>
        <Menu onClick={() => navigator('/registMember')}>회원등록</Menu>
        <Menu onClick={() => navigator('/staff')}>Staff</Menu>
        <Menu onClick={isLogin ? logout : () => navigator('/signin')}>
          {isLogin ? '로그아웃' : '로그인'}
        </Menu>
        <Menu onClick={() => navigator('/signup')}>
          {isLogin ? '' : '회원가입'}
        </Menu>
      </Nav>
    </Container>
  );
};

export default Header;
