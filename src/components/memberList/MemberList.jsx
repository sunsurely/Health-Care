import styled from '@emotion/styled';
import { useContext } from 'react';
import { MemberListContext } from '../../contexts/MemberListContext';
import { useNavigate } from 'react-router-dom';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Th = styled.th`
  border: 1px solid black;
  border-left: none;
  border-right: none;
  padding: 5px;
  text-align: left;
`;

const Tr = styled.tr`
  text-align: left;
`;

const Td = styled.td`
  padding: 5px;
  border: none;
  text-align: left;
`;

const Check = styled.input`
  margin-right: 10px;
`;

const MemberList = () => {
  const { memberList } = useContext(MemberListContext);
  const navigator = useNavigate();
  return (
    <Table>
      <thead>
        <Tr>
          <Th>
            <Check type="checkbox" />
            등록일자
          </Th>
          <Th>성명</Th>
          <Th>성별</Th>
          <Th>생년월일</Th>
          <Th>구분</Th>
          <Th>기간</Th>
          <Th>회원권 금액</Th>
          <Th>트레이너</Th>
        </Tr>
      </thead>
      <tbody>
        {memberList.map((member) => {
          return (
            <Tr key={member.id}>
              <Td>
                <Check type="checkbox" />
                {member.registDate}
              </Td>
              <Td
                style={{ cursor: 'pointer' }}
                onClick={() => navigator(`/member?id=${member.id}`)}
              >
                {member.name}
              </Td>
              <Td>{member.gender}</Td>
              <Td>{member.birth}</Td>
              <Td>{member.state}</Td>
              <Td>{member.period}</Td>
              <Td>{member.amounts}</Td>
              <Td>{member.trainerName}</Td>
            </Tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default MemberList;
