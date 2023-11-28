import styled from '@emotion/styled';
import { MemberListContext } from '../../contexts/MemberListContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const TopMenu = styled.ul`
  display: flex;
  flex: 1;
`;

const Menu = styled.li`
  margin-left: 30px;
  list-style: none;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    opacity: 0.4;
  }
`;

const OptBox = styled.div`
  width: 15%;
`;

const Select = styled.select`
  margin-left: 10px;
`;

const MemberListTopMenu = () => {
  const navigator = useNavigate();
  const { onChangeOptGender, onChangeOptState } = useContext(MemberListContext);
  return (
    <Container>
      <TopMenu>
        <Menu onClick={() => navigator('/registMember')}>등록</Menu>
        <Menu>삭제</Menu>
        <Menu>목록다운로드</Menu>
      </TopMenu>
      <OptBox>
        <Select onChange={onChangeOptState}>
          <option>전체</option>
          <option>PT</option>
          <option>일반</option>
          <option>만료</option>
        </Select>
        <Select onChange={onChangeOptGender}>
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

export default MemberListTopMenu;
