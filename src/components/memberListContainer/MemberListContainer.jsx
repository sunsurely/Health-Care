import styled from '@emotion/styled';
import MemberListTopMenu from '../memberListTopMenu/MemberListTopMenu';
import MemberList from '../memberList/MemberList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  justify-content: center;
  border: 1px solid black;
  border-left: none;
  border-right: none;
  border-top: none;
  padding: 10px;
`;

const MemberListConttainer = () => {
  return (
    <Container>
      <MemberListTopMenu />
      <MemberList />
    </Container>
  );
};

export default MemberListConttainer;
