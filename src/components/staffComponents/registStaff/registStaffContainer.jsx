import styled from '@emotion/styled';
import RegistStaffForm from './RegistStaffForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RegistStaffContainer = () => {
  return (
    <Container>
      <RegistStaffForm />
    </Container>
  );
};

export default RegistStaffContainer;
