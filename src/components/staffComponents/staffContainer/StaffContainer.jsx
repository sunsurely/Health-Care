import styled from '@emotion/styled';

import StaffContextProvider from '../contexts/StaffContext';
import StaffListContainer from '../StaffListContainer/StaffListContainer';

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
