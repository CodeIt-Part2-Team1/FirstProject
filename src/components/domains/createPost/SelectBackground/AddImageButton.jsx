import React, { useState } from "react";
import { supabase } from "api/supabase/supabaseClient";
import styled from "styled-components";
import { CheckIcon, Image } from "./styled";
import addButtonIcon from "../../../../assets/icon/add-button.png";
import selectedIcon from "../../../../assets/icon/background-selected.png";
import color from "styles/color";
import { SUPABASE_URL } from "constants";

const AddImage = ({ onUpload, onPreviewSelect, isPreviewSelected }) => {
  const [previewImage, setPreviewImage] = useState(false);
  const [filePath, setFilePath] = useState("");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("파일 크기는 2MB 이하여야 합니다.");
        return;
      }
      const filePath = `${Date.now()}`;
      setFilePath(filePath);
      await supabase.storage.from("new_background_images").upload(filePath, file);
      onUpload(filePath);
      setPreviewImage(filePath);
    }
  };

  return (
    <>
      <AddButton>
        <AddInput type="file" id="image" onChange={handleImageChange} />
        <Label htmlFor="image">
          <ButtonIcon src={addButtonIcon} alt="사진 추가 버튼" />
          <p>파일 크기: 2MB 이하</p>
        </Label>
      </AddButton>
      {previewImage && (
        <PreviewImage type="button" onClick={() => onPreviewSelect(previewImage)} $isSelected={isPreviewSelected}>
          <Image src={`${SUPABASE_URL}/new_background_images/${filePath}`} alt="이미지 미리보기" />
          {isPreviewSelected && <CheckIcon src={selectedIcon} alt="선택된 이미지" />}
        </PreviewImage>
      )}
    </>
  );
};

const PreviewImage = styled.button`
  position: relative;
  width: 16.8rem;
  height: 16.8rem;
  border-radius: 1.6rem;
  cursor: pointer;
  padding: 0;
  opacity: ${(props) => props.$isSelected && 0.5};

  @media screen and (max-width: 768px) {
    width: 15.4rem;
    height: 15.4rem;
  }
`;

const AddButton = styled.div`
  position: relative;
  background: ${color.gray[200]};
  width: 16.8rem;
  height: 16.8rem;
  border-radius: 1.6rem;
  cursor: pointer;
  margin: 0;

  p {
    position: absolute;
    left: 26%;
    bottom: 3rem;
  }

  @media screen and (max-width: 768px) {
    width: 15.4rem;
    height: 15.4rem;
  }
`;

const AddInput = styled.input`
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonIcon = styled.img`
  width: 4.4rem;
  height: 4.4rem;
`;

export default AddImage;
