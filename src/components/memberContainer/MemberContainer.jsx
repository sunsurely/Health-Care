import styled from '@emotion/styled';
import MemberListTitle from '../memberListTitle/MemberListTitle';
import MemberListContainer from '../memberListContainer/MemberListContainer';
import MemberListContextProvider from '../../contexts/MemberListContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1200px;
`;

const MemberContainer = () => {
  return (
    <Container>
      <MemberListTitle title="회원 리스트" />
      <MemberListContainer />
    </Container>
  );
};

export default MemberContainer;
