import styled from '@emotion/styled';

const Container = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid black;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  padding: 5px;
  margin: 0;
`;

const RegistTitle = ({ title }) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};

export default RegistTitle;
