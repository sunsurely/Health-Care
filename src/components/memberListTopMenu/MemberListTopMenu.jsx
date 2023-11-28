import styled from '@emotion/styled';
import { MemberListContext } from '../../contexts/MemberListContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  width: 20%;
`;

const Select = styled.select`
  padding: 5px;
  margin-left: 10px;
`;

const SearchSet = styled.div`
  display: flex;
`;

const SearchBar = styled.input`
  margin-left: 50px;
  padding: 5px;
`;

const SearchButton = styled.button`
  width: 50px;
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

const MemberListTopMenu = () => {
  const navigator = useNavigate();
  const {
    onChangeOptGender,
    onChangeOptState,
    onChangeSearchbar,
    onChangeSelect,
    searchMember,
    keyword,
    phoneOrName,
  } = useContext(MemberListContext);

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      searchMember();
    }
  };

  return (
    <Container>
      <TopMenu>
        <Menu onClick={() => navigator('/registMember')}>등록</Menu>
        <Menu>삭제</Menu>
        <Menu>목록다운로드</Menu>
        <SearchSet>
          <SearchBar
            onChange={onChangeSearchbar}
            onKeyDown={onEnter}
            value={keyword}
          />
          <select onChange={onChangeSelect} value={phoneOrName}>
            <option>이름</option>
            <option>연락처</option>
          </select>
          <SearchButton onClick={searchMember}>조회</SearchButton>
        </SearchSet>
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
