import styled from '@emotion/styled';
import StaffListContainer from '../staffListContainer/StaffListContainer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1200px;
`;

const StaffContainer = () => {
  return (
    <Container>
      <StaffListContainer />
    </Container>
  );
};

export default StaffContainer;
