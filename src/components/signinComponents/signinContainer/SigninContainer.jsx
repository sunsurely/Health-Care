import styled from '@emotion/styled';
import SigninForm from '../signinForm/SigninForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SigninContainer = () => {
  return (
    <Container>
      <SigninForm />
    </Container>
  );
};

export default SigninContainer;
