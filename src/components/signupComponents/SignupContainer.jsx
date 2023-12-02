import styled from '@emotion/styled';
import SignupForm from './SignupForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignupContainer = () => {
  return (
    <Container>
      <SignupForm />
    </Container>
  );
};

export default SignupContainer;
