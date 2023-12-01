import styled from '@emotion/styled';
import MemberListContainer from '../memberListContainer/MemberListContainer';
import MemberListContextProvider from '../contexts/MemberListContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1200px;
`;

const MemberContainer = () => {
  return (
    <MemberListContextProvider>
      <Container>
        <MemberListContainer />
      </Container>
    </MemberListContextProvider>
  );
};

export default MemberContainer;
