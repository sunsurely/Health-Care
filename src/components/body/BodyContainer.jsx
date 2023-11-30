import styled from '@emotion/styled';
import { Routes, Route } from 'react-router-dom';
import MemberListContextProvider from '../memberListComponents/contexts/MemberListContext';
import RegistContainer from '../registComponts/registContainer/RegistContainer';
import SigninContainer from '../signinComponents/signinContainer/SigninContainer';
import MemberDetail from '../memberDetailContainer/MemberDetail';
import StaffContainer from '../staffComponents/staffContainer/StaffContainer';
import MemberContainer from '../memberListComponents/memberContainer/MemberContainer';

const Container = styled.div`
  margin-top: 200px;
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
          <Route path="/staff" element={<StaffContainer />} />
        </Routes>
      </Container>
    </MemberListContextProvider>
  );
};

export default BodyContainer;
