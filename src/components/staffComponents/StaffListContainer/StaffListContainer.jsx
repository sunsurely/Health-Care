import styled from '@emotion/styled';
import StaffListTopMenu from '../staffListTopMenu/StaffListTopMenu';
import StaffList from '../staffList/StaffList';
import StaffContextProvider from '../contexts/StaffContext';
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

const StaffListContainer = () => {
  return (
    <StaffContextProvider>
      <Container>
        <StaffListTopMenu />
        <StaffList />
      </Container>
    </StaffContextProvider>
  );
};

export default StaffListContainer;
