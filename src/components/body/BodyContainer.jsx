import styled from '@emotion/styled';
import { Routes, Route } from 'react-router-dom';
import MemberContainer from '../memberContainer/MemberContainer';
import MemberListContextProvider from '../../contexts/MemberListContext';

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BodyContainer = () => {
  return (
    <MemberListContextProvider>
      <Container>
        <Routes>
          <Route path="/memberList" element={<MemberContainer />} />
        </Routes>
      </Container>
    </MemberListContextProvider>
  );
};

export default BodyContainer;
