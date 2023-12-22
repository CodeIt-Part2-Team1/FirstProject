import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { StyledTitle } from "../commonStyled";
import { supabase } from "api/supabase/supabaseClient";
import { defaultProfileImg } from "assets/ProfileImgUrls";
import addButtonIcon from "assets/icon/add-button.png";
import { SUPABASE_URL } from "constants";

const ProfileLayout = ({ data, setData }) => {
  const [defaultProfileList, setDefaultProfileList] = useState();

  const handledefaultImageLoad = async () => {
    const { data } = await supabase.storage.from("profile_images").list("");

    data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const profileUrls = data.map((item) => {
      return `${SUPABASE_URL}/profile_images/${item.name}`;
    });

    setDefaultProfileList(profileUrls);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      await supabase.storage.from("upload_profile_image").upload(`${Date.now()}`, file);
      handleImageLoad();
    }
  };

  const handleImageLoad = async () => {
    const { data } = await supabase.storage.from("upload_profile_image").list("");

    data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const imagePaths = data.map((item) => item.name);

    setData((prevData) => ({
      ...prevData,
      profileImageURL: imagePaths[0]
        ? `${SUPABASE_URL}/upload_profile_image/${imagePaths[0]}`
        : prevData.profileImageURL || defaultProfileImg,
    }));
  };

  useEffect(() => {
    handledefaultImageLoad();
  }, []);

  return (
    <div>
      <StyledTitle>프로필 이미지</StyledTitle>
      <StyledProfileImgBox>
        <StyledPreviewLabel>
          <StyledUploadImgBox type="file" onChange={handleImageChange} />
          <StyledUploadImgDiv>
            <Button>
              <ButtonIcon src={addButtonIcon} alt="사진 추가 버튼" />
            </Button>
            <ProfileImg
              src={data && data.profileImageURL ? data.profileImageURL : defaultProfileImg}
              alt="프로필 이미지"
            />
          </StyledUploadImgDiv>
        </StyledPreviewLabel>
        <StyledImgSelectBox>
          <p>프로필 이미지를 선택해주세요!</p>
          <StyledImgList>
            {defaultProfileList?.map((item) => (
              <img
                key={item}
                src={item}
                onClick={(e) => {
                  setData({ ...data, profileImageURL: e.target.src });
                }}
              />
            ))}
          </StyledImgList>
        </StyledImgSelectBox>
      </StyledProfileImgBox>
    </div>
  );
};
const ProfileImg = styled.img`
  pointer-events: none;
`;
const StyledProfileImgBox = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;
const StyledUploadImgDiv = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  & div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4.4rem;
    height: 4.4rem;
  }
`;

const StyledPreviewLabel = styled.label`
  width: 9rem;
  height: 9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;

  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const StyledImgSelectBox = styled.div`
  & p {
    color: ${({ theme }) => theme.subFontColor};
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
  gap: 0 0.5rem;

  & img {
    margin-top: 1.2rem;
    width: 5.5rem;
    border-radius: 50%;
    border: 0.1rem solid #5b5e66;
    cursor: pointer;
    outline: none;

    &:hover {
      opacity: 0.5;
    }

    @media (max-width: 768px) {
      width: 4.6rem;
      height: 4.6rem;
    }
  }
`;

const StyledUploadImgBox = styled.input`
  display: none;

  & img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
  }
`;

const Button = styled.div`
  width: 9rem;
  height: 9rem;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const ButtonIcon = styled.img``;

export default ProfileLayout;
