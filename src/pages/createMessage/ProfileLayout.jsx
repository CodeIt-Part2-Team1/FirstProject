import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { StyledTitle } from "./CommonStyled";
import person from "../../assets/icon/person.svg";
import color from "../../styles/color";

const ProfileLayout = ({ testData }) => {
  const [profileImage, setProfileImage] = useState();

  return (
    <StyledProfileLayout>
      <StyledTitle>프로필 이미지</StyledTitle>
      <StyledProfileImgBox>
        <StyledPreviewImgBox>
          {profileImage ? (
            <StyledImg>
              <img src={profileImage} />
            </StyledImg>
          ) : (
            <StyledNoImg>
              <img src={person} />
            </StyledNoImg>
          )}
        </StyledPreviewImgBox>
        <StyledImgSelectBox>
          <p>프로필 이미지를 선택해주세요!</p>
          <StyledImgList>
            {testData.profileImages.map((item) => (
              <img key={item} src={item} onClick={() => setProfileImage(item)} />
            ))}
          </StyledImgList>
        </StyledImgSelectBox>
      </StyledProfileImgBox>
    </StyledProfileLayout>
  );
};

const StyledProfileLayout = styled.div``;

const StyledProfileImgBox = styled.div`
  display: flex;
  align-items: center;
  gap: 3.2rem;
`;
const StyledPreviewImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 8rem;
  height: 8rem;
  background-color: ${color.gray[300]};
`;

const StyledImg = styled.div``;

const StyledNoImg = styled.div``;

const StyledImgSelectBox = styled.div`
  & p {
    color: var(--gray-500, #555);
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.6rem;
    letter-spacing: -0.016rem;
  }
`;

const StyledImgList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.4rem;

  & img {
    margin-top: 1.2rem;
    width: 5.6rem;

    @media (max-width: 768px) {
      width: 4.5rem;
      height: 4.5rem;
    }
  }
`;

export default ProfileLayout;
