import React from "react";
import styled from "styled-components";

function ProfileImgs({ list, count, $ignore }) {
  const leng = count - 3;
  const isVisible = count > 3;
  return (
    <ProfileBox>
      {list.slice(0, 3).map((item, index) => (
        <ProfileImg key={index} $src={item?.profileImageURL} style={{ left: `${index * 20}px` }} $ignore={$ignore} />
      ))}
      {isVisible && <ProfileDiv $ignore={$ignore}>+ {leng}</ProfileDiv>}
    </ProfileBox>
  );
}

const ProfileBox = styled.div`
  position: relative;
  display: flex;
  min-width: 7.6rem;
  height: 2.8rem;
`;

const Profile = styled.div`
  width: 2.8rem;
  height: 2.8rem;
  background-color: #fff;
  border-radius: 100px;
  border: 1px solid ${({ $ignore, theme }) => ($ignore ? "white" : theme.border)};
  position: absolute;
`;

const ProfileImg = styled(Profile)`
  background: ${(props) => (props.$src ? `url(${props.$src})` : "gray")};
  background-size: cover;
  background-position: center;
`;

const ProfileDiv = styled(Profile)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  left: 60px;
`;

export default ProfileImgs;
