import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import NameInput from '../../components/commons/NameInput';
import CreateButton from '../../components/commons/CreateButton';
import ProfileLayout from './components/ProfileLayout';
import RelationshipInputBox from './components/RelationshipInputBox';
import WriteInputBox from './WYSIWYG';

const CreateMessage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isName, setIsName] = useState('');
  const [data, setData] = useState({
    team: '2-1',
    recipientId: +id,
    sender: '',
    profileImageURL: 'https://ibb.co/CBLszQC',
    relationship: '',
    content: '',
    font: 'Pretendard',
  });

  async function PostMessageData(postData) {
    console.log('포스트', postData);
    try {
      const res = await fetch(`https://rolling-api.vercel.app/2-1/recipients/${postData?.recipientId}/messages/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return res.json();
    } catch (e) {
      console.error('네트워크 요청 에러:', e);
    }
  }

  const handleCreateMessage = async () => {
    try {
      const resData = await PostMessageData(data);
      navigate(`/post/${resData?.recipientId}`);
      console.log('응답', resData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = name => {
    setIsName(name);
    setData({ ...data, sender: name });
  };

  return (
    <MessageLayout>
      <MessageBox>
        <NameInput value={isName} onChange={handleNameChange} placeholder="이름을 입력해 주세요.">
          From.
        </NameInput>
        <ProfileLayout data={data} setData={setData} />
        <RelationshipInputBox data={data} setData={setData} />
        <WriteInputBox data={data} setData={setData} />
        <CreateButtonBox>
          <CreateButton onClick={handleCreateMessage} mobileWidth="100%" tabletWidth="100%" disabled={!isName} />
        </CreateButtonBox>
      </MessageBox>
    </MessageLayout>
  );
};

const MessageLayout = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4.7rem;
`;

const MessageBox = styled.div`
  width: 72rem;
  flex-direction: column;
  gap: 5rem;
  color: var(--gray-900, #181818);
  display: flex;
  margin-bottom: 6rem;

  @media screen and (max-width: 768px) {
    max-width: 32rem;
  }
`;

const CreateButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default CreateMessage;