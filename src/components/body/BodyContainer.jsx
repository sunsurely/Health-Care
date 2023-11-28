import styled from '@emotion/styled';
import { Routes, Route } from 'react-router-dom';
import MemberContainer from '../memberContainer/MemberContainer';
import RegistContainer from '../registContainer/RegistContainer';

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BodyContainer = () => {
  return (
    <Container>
      <Routes>
        <Route path="/memberList" element={<MemberContainer />} />
        <Route path="/registMember" element={<RegistContainer />} />
      </Routes>
    </Container>
  );
};

export default BodyContainer;
