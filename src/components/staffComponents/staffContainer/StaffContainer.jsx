import styled from '@emotion/styled';
import StaffListContainer from '../staffListContainer/StaffListContainer';
import StaffContextProvider from '../contexts/StaffContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1200px;
`;

const StaffContainer = () => {
  return (
    <StaffContextProvider>
      <Container>
        <StaffListContainer />
      </Container>
    </StaffContextProvider>
  );
};

export default StaffContainer;
