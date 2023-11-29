import styled from '@emotion/styled';
import FormTitle from '../formTitle/FormTitle';
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
      <FormTitle title="로그인" />
      <SigninForm />
    </Container>
  );
};

export default SigninContainer;
