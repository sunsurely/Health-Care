import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

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
  const navigator = useNavigate();
  return (
    <Container>
      <Nav>
        <Menu onClick={() => navigator('/memberList')}>회원리스트</Menu>
        <Menu>회원관리</Menu>
        <Menu onClick={() => navigator('/registMember')}>회원등록</Menu>
        <Menu>Staff</Menu>
      </Nav>
    </Container>
  );
};

export default Header;
