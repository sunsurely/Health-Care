import styled from '@emotion/styled';
import RegistMemberForm from '../registMemberForm/RegistMemberForm';
import FormTitle from '../formTitle/FormTitle';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RegistContainer = () => {
  return (
    <Container>
      <FormTitle title="멤버등록" />
      <RegistMemberForm />
    </Container>
  );
};

export default RegistContainer;
