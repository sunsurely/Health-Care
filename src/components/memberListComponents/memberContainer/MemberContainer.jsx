import styled from '@emotion/styled';
import MemberListContainer from '../memberListContainer/MemberListContainer';

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
      <MemberListContainer />
    </Container>
  );
};

export default MemberContainer;
