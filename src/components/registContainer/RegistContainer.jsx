import styled from '@emotion/styled';
import RegistTitle from '../registTitle/RegistTitle';
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
      <RegistTitle title="멤버등록" />
      <RegistMemberForm />
    </Container>
  );
};

export default RegistContainer;
