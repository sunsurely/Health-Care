import styled from '@emotion/styled';
import RegistPTForm from './RegistPTForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RegistPTContainer = () => {
  return (
    <Container>
      <RegistPTForm />
    </Container>
  );
};

export default RegistPTContainer;
