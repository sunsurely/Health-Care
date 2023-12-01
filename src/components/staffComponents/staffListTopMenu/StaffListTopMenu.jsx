import styled from '@emotion/styled';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StaffContext } from '../contexts/StaffContext';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const TopMenu = styled.ul`
  padding-left: 0;
  display: flex;
`;

const Menu = styled.li`
  margin-left: 10px;
  list-style: none;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    opacity: 0.4;
  }
`;

const OptBox = styled.div`
  margin-left: 410px;
  width: 15%;
`;

const Select = styled.select`
  padding: 5px;
  margin-left: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const SearchSet = styled.div`
  display: flex;
`;

const SearchBar = styled.input`
  margin-left: 20px;
`;

const SearchButton = styled.button`
  width: 70px;
  background-color: #ff3131;
  color: white;
  padding: 5px;
  border-radius: 10px;
  border: none;
  margin-left: 10px;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 4px black;
  }
`;

const StaffListTopMenu = () => {
  const { setGender, onDelete } = useContext(StaffContext);
  const navigator = useNavigate();

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      searchMember();
    }
  };

  const onChangeHandler = (e) => {
    setGender(e.target.value);
  };

  return (
    <Container>
      <TopMenu>
        <Menu onClick={() => navigator('/registStaff')}>등록</Menu>
        <Menu onClick={onDelete}>삭제</Menu>
        <Menu>목록다운로드</Menu>
      </TopMenu>
      <SearchSet>
        <SearchBar onKeyDown={onEnter} />
        <select>
          <option>이름</option>
          <option>연락처</option>
        </select>
        <SearchButton>조회</SearchButton>
        <SearchButton onClick={() => location.reload()}>새로고침</SearchButton>
      </SearchSet>
      <OptBox>
        <Select onChange={(e) => onChangeHandler(e)}>
          <option>전체</option>
          <option>남성</option>
          <option>여성</option>
        </Select>
        <Select>
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </Select>
      </OptBox>
    </Container>
  );
};

export default StaffListTopMenu;
