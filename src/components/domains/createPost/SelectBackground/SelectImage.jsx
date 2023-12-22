import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import AddImage from "./AddImageButton.jsx";
import SkImageCard from "components/commons/SkImageCard.jsx";
import selectedIcon from "assets/icon/background-selected.png";
import { SUPABASE_URL } from "constants/index.js";
import { supabase } from "api/supabase/supabaseClient.jsx";
import { PaletteWrapper, CheckIcon, Image } from "./styled.js";

const SelectImage = ({ onImageSelect }) => {
  const [imageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedPreviewImage, setSelectedPreviewImage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchImageList = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await supabase.storage.from("background_images").list("");
      const imagePaths = data.map((item) => item.name);
      setImageList(imagePaths);
      setSelectedImage(imagePaths[0]);
    } catch (error) {
      throw new error();
    } finally {
      setLoading(false);
    }
  }, []);

  const handleImageChange = (image) => {
    setSelectedImage(image);
    setSelectedPreviewImage(false);
    onImageSelect(image);
  };

  const handlePreviewImageChange = (image) => {
    setSelectedPreviewImage(image);
    setSelectedImage(false);
    onImageSelect(image);
  };

  useEffect(() => {
    fetchImageList();
  }, [fetchImageList]);

  return (
    <PaletteWrapper>
      <AddImage
        onUpload={fetchImageList}
        onPreviewSelect={handlePreviewImageChange}
        selectedPreviewImage={selectedPreviewImage}
        isPreviewSelected={selectedPreviewImage}
      />
      {loading ? (
        <SkImageCard />
      ) : (
        <ImageList imageList={imageList} selectedImage={selectedImage} handleImageChange={handleImageChange} />
      )}
    </PaletteWrapper>
  );
};

const ImageList = ({ imageList, selectedImage, handleImageChange }) => {
  return (
    <>
      {imageList.map((itemPath) => (
        <ImageButton
          type="button"
          key={itemPath}
          onClick={() => handleImageChange(itemPath)}
          style={{ opacity: selectedImage === itemPath && 0.5 }}
        >
          <Image
            key={itemPath}
            src={`${SUPABASE_URL}/background_images/${itemPath}`}
            alt={`Image ${itemPath}`}
            onClick={() => handleImageChange(itemPath)}
          />
          {selectedImage === itemPath && <CheckIcon src={selectedIcon} alt="선택된 이미지" />}
        </ImageButton>
      ))}
    </>
  );
};

const ImageButton = styled.button`
  position: relative;
  width: 16.8rem;
  height: 16.8rem;
  border-radius: 1.6rem;
  cursor: pointer;
  padding: 0;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  }

  @media screen and (max-width: 768px) {
    width: 15.4rem;
    height: 15.4rem;
  }
`;

export default SelectImage;
