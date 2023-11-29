import styled from '@emotion/styled';
import RegistMemberForm from '../registMemberForm/RegistMemberForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RegistContainer = () => {
  return (
    <Container>
      <RegistMemberForm />
    </Container>
  );
};

export default RegistContainer;
