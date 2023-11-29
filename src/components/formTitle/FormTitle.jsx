import styled from '@emotion/styled';

const Container = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const Title = styled.h1`
  padding: 5px;
  margin: 0;
`;

const FormTitle = ({ title }) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};

export default FormTitle;
