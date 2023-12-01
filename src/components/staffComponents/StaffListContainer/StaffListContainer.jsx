import styled from '@emotion/styled';
import StaffListTopMenu from '../staffListTopMenu/StaffListTopMenu';
import StaffList from '../staffList/StaffList';

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
  padding-bottom: 5px;
`;

const StaffListContainer = () => {
  return (
    <Container>
      <StaffListTopMenu />
      <StaffList />
    </Container>
  );
};

export default StaffListContainer;
