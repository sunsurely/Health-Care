import styled from '@emotion/styled';
import { Routes, Route } from 'react-router-dom';
import MemberContainer from '../memberContainer/MemberContainer';
import RegistContainer from '../registContainer/RegistContainer';
import SigninContainer from '../signinContainer/SigninContainer';
import MemberDetail from '../memberDetailContainer/MemberDetail';
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
          <Route path="/registMember" element={<RegistContainer />} />
          <Route path="/signin" element={<SigninContainer />} />
          <Route path="/member" element={<MemberDetail />} />
        </Routes>
      </Container>
    </MemberListContextProvider>
  );
};

export default BodyContainer;
