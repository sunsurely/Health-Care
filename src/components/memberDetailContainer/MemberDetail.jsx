import styled from '@emotion/styled';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { MemberListContext } from '../../contexts/MemberListContext';

const Container = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  border-top: 4px solid #dbdbdb;
  padding: 10px;
`;

const Title = styled.p`
  color: red;
`;

const InfoSection = styled.div`
  padding: 20px;
  border-bottom: 2px solid #c7c7c7;

  display: flex;
  flex-direction: column;
`;

const NameAndGender = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
const Labels = styled.div`
  padding-left: 20px;
  width: 200px;
  display: flex;
  flex-direction: column;
`;

const BirthAndPhoneNumber = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const RegistDateAndState = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const PeriodAndAmounts = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const MemberDetail = () => {
  const [data, setData] = useState('');
  const { setIsLogin } = useContext(MemberListContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const memberId = searchParams.get('id');

  useEffect(() => {
    const initData = async () => {
      await axios
        .get(`http://localhost:3100/member/${memberId}/detail`, {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
          },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            axios
              .post(
                `http://localhost:3100/auth/refresh`,
                {},
                {
                  headers: {
                    Authorization: localStorage.getItem('refreshToken'),
                  },
                },
              )
              .then((response) => {
                localStorage.setItem('isLogin', 'true');
                localStorage.setItem(
                  'accessToken',
                  `Bearer ${response.data.accessToken}`,
                );
                axios
                  .get(`http://localhost:3100/member/${memberId}/detail`, {
                    headers: {
                      Authorization: `Bearer ${response.data.accessToken}`,
                    },
                  })
                  .then((response) => {
                    setData(response.data);
                  })
                  .catch((error) => {
                    if (error.response.status === 404) {
                      alert('해당 회원이 존재하지 않습니다.');
                    }
                  });
              })
              .catch((error) => {
                if (error.response.status === 401)
                  alert('로그인이 필요한 기능입니다.');
                setIsLogin(false);
              });
          }

          alert(error);
        });
    };

    initData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const registrationDate = data.registDate;
  const monthsToAdd = 6;

  const expirationDate = new Date(registrationDate);
  expirationDate.setMonth(expirationDate.getMonth() + monthsToAdd);
  const formattedExpirationDate = expirationDate.toISOString().split('T')[0];

  return (
    <Container>
      <InfoSection>
        <Title>◆ 개인정보</Title>
        <NameAndGender>
          <Labels>
            <p>성명</p>
            <p>{data.name}</p>
          </Labels>
          <Labels style={{ borderLeft: '1px solid grey' }}>
            <p>성별</p>
            <p>{data.gender === 'MALE' ? '남' : '여'}</p>
          </Labels>
        </NameAndGender>
        <BirthAndPhoneNumber>
          <Labels>
            <p>생년월일</p>
            <p>{data.birth}</p>
          </Labels>
          <Labels style={{ borderLeft: '1px solid grey' }}>
            <p>전화번호</p>
            <p>{data.phoneNumber}</p>
          </Labels>
        </BirthAndPhoneNumber>
      </InfoSection>
      <InfoSection>
        <Title>◆ 등록정보</Title>
        <RegistDateAndState>
          <Labels>
            <p>등록일자</p>
            <p>{data.registDate}</p>
          </Labels>
          <Labels style={{ borderLeft: '1px solid grey' }}>
            <p>구분</p>
            <p>{data.state}</p>
          </Labels>
        </RegistDateAndState>
        <PeriodAndAmounts>
          <Labels>
            <p>기간</p>
            <p>{data.period}개월</p>
          </Labels>
          <Labels style={{ borderLeft: '1px solid grey' }}>
            <p>만료일자</p>
            <p>{formattedExpirationDate}</p>
          </Labels>
        </PeriodAndAmounts>
      </InfoSection>
      <InfoSection>
        <Title>◆ PT정보</Title>
        <RegistDateAndState>
          <Labels>
            <p>등록일자</p>
            <p>{data.counting !== '-' ? data.ptRegistDate : '-'}</p>
          </Labels>
          <Labels style={{ borderLeft: '1px solid grey' }}>
            <p>담당 트레이너</p>
            <p>{data.counting !== '-' ? data.trainerName : '-'}</p>
          </Labels>
        </RegistDateAndState>
        <PeriodAndAmounts>
          <Labels>
            <p>남은횟수</p>
            <p
              style={
                data.counting !== '-'
                  ? { marginLeft: '20px' }
                  : { marginLeft: '0px' }
              }
            >
              {data.counting !== '-' ? data.counting : '-'}
            </p>
          </Labels>
          <Labels style={{ borderLeft: '1px solid grey' }}>
            <p>회원권 금액</p>
            <p>
              {data.counting !== '-' ? data.amounts.toLocaleString() : '-'}원{' '}
            </p>
          </Labels>
        </PeriodAndAmounts>
      </InfoSection>
    </Container>
  );
};

export default MemberDetail;
