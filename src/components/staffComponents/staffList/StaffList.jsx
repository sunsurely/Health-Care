import styled from '@emotion/styled';
import { useContext } from 'react';
import { StaffContext } from '../contexts/StaffContext';

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

const StaffList = () => {
  const { staffData } = useContext(StaffContext);

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
          <Th>연락처</Th>
          <Th>이메일</Th>
        </Tr>
      </thead>
      <tbody>
        {staffData.map((staff) => {
          const originalDate = staff.createdAt;
          const registDate = new Date(originalDate);
          const formattedDate = `${registDate.getFullYear()}-${(
            registDate.getMonth() + 1
          )
            .toString()
            .padStart(2, '0')}-${registDate
            .getDate()
            .toString()
            .padStart(2, '0')}`;
          return (
            <Tr key={staff.id}>
              <Td>{formattedDate}</Td>
              <Td>{staff.name}</Td>
              <Td>{staff.gender}</Td>
              <Td>{staff.birth}</Td>
              <Td>{staff.phoneNumber}</Td>
              <Td>{staff.email}</Td>
            </Tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default StaffList;
