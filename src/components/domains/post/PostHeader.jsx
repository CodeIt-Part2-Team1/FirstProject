import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileImgs from "components/commons/ProfileImages";
import downImg from "assets/icon/arrow_down.svg";
import addEmojiImg from "assets/icon/add-24.svg";
import shareImg from "assets/icon/share-24.svg";
import Emoji from "components/commons/Emoji";
import EmojiPicker from "emoji-picker-react";
import { addEmojiToPage } from "api";
import { useLocation } from "react-router-dom";
import kakaoShare from "utils/kakaoShare";

function PostHeader({
  data,
  toggleShare,
  toggleEmoji,
  dataEmoji,
  emojiAdd,
  setEmojiUp,
  selectedPost,
  pageId,
  showShare,
  setShare,
  toggleFalse,
  emojiPick,
  toggleEmojiPick,
  params,
}) {
  const [selectEmoji, setSelectEmoji] = useState(null);

  const kakao = "post/" + params.id;

  const handleEmojiSelect = (e) => {
    setSelectEmoji({ emoji: e.emoji, type: "increase" });
    console.log(e);
  };
  const location = useLocation();
  const baseUrl = window.location.host;

  const urlShare = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setShare(true);
      setTimeout(() => {
        setShare(false);
      }, 4000);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (selectEmoji !== null) {
      const emojiUpdate = async () => {
        try {
          await addEmojiToPage(selectEmoji, pageId);
          // console.log(result);
          setEmojiUp(selectEmoji);
        } catch (e) {
          console.log(e);
        }
      };
      emojiUpdate();
    }
  }, [pageId, selectEmoji, setEmojiUp]);

  return (
    <PostHead onClick={() => toggleFalse()}>
      <HeaderService>
        <ToName>To. {selectedPost?.name || "Loading..."}</ToName>

        <HeaderServiceBox>
          <HeaderServicePost>
            <ProfileImgs list={data} count={data.length} />
            <ServiceP>
              <ServiceSpan>{data.length}</ServiceSpan> 명이 작성했어요!
            </ServiceP>
          </HeaderServicePost>

          <EmojiWrap>
            {dataEmoji.slice(0, 3).map((item) => (
              <Emoji key={item.id}>
                {item.emoji} {item.count}
              </Emoji>
            ))}

            <EmojiButton src={downImg} onClick={toggleEmoji} alt="downImg" />

            {emojiAdd ? (
              dataEmoji.length !== 0 ? (
                <ToggleAddEmoji>
                  {dataEmoji.slice(0, 6).map((item) => (
                    <Emoji key={item.id}>
                      {item.emoji} {item.count}
                    </Emoji>
                  ))}
                </ToggleAddEmoji>
              ) : (
                <ToggleAddEmoji>
                  <p>등록된 이모지가 없습니다.</p>
                </ToggleAddEmoji>
              )
            ) : null}

            <ButtonWrap onClick={toggleEmojiPick}>
              <img src={addEmojiImg} alt="addEmojiImg" />
              <ButtonWrapP>추가</ButtonWrapP>
            </ButtonWrap>

            {emojiPick ? (
              <EmojiPickerWrap>
                <EmojiPicker onEmojiClick={handleEmojiSelect} searchDisabled />
              </EmojiPickerWrap>
            ) : null}

            <Line />
            <ButtonWrap onClick={toggleShare}>
              <img src={shareImg} alt="shareImg" />
            </ButtonWrap>

            {showShare ? (
              <ShareBox>
                <Share
                  onClick={() => {
                    kakaoShare(kakao);
                  }}
                >
                  카카오톡 공유
                </Share>
                <Share onClick={() => urlShare(`${baseUrl}${location.pathname}`)}>URL 공유</Share>
              </ShareBox>
            ) : null}
          </EmojiWrap>
        </HeaderServiceBox>
      </HeaderService>
    </PostHead>
  );
}

const ToggleAddEmoji = styled.div`
  min-width: 27.4rem;
  display: flex;
  padding: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid #b6b6b6;
  background: #fff;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
  background-color: beige;
  position: absolute;
  right: 19rem;
  top: 6rem;
  z-index: 2;
  /* @media all and (max-width: 1248px) {
    right: 20rem;
  } */
  @media all and (max-width: 768px) {
    left: 0;
  }
`;

const EmojiPickerWrap = styled.div`
  position: absolute;
  right: 0;
  top: 6rem;
  z-index: 2;
  .epr-header {
    display: none !important;
  }
  @media all and (max-width: 768px) {
    left: 0;
  }
`;
const PostHead = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.header};
  position: relative;
  z-index: 2;
`;

const HeaderService = styled.div`
  max-width: 120rem;
  width: 100%;
  margin: 0 auto;
  padding: 1.3rem 2.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media all and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
  }
`;
const ToName = styled.h2`
  color: ${({ theme }) => theme.fontColor};
  font-size: 2.8rem;
`;
const HeaderServiceBox = styled.div`
  /* min-width: 41.8rem; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;
const HeaderServicePost = styled.div`
  display: flex;
  gap: 1.1rem;
  font-size: 1.8rem;
  color: #181818;
  width: 21rem;
  @media all and (max-width: 1248px) {
    display: none;
  }
`;
const ServiceSpan = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  margin-right: 0.5rem;
`;
const ServiceP = styled.p`
  display: flex;
  align-items: center;
  margin-left: 5px;
  color: ${({ theme }) => theme.fontColor};
`;

const EmojiWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  position: relative;
  @media all and (max-width: 768px) {
    gap: 0.8rem;
  }
`;
const EmojiButton = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
  background-color: #fff;
  border-radius: 50%;
  @media all and (max-width: 768px) {
    width: 2rem;
    height: 2rem;
  }
`;

const ButtonWrap = styled.button`
  display: flex;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  @media all and (max-width: 768px) {
    padding: 0.6rem 0.8rem;
  }
`;
const ButtonWrapP = styled.p`
  font-size: 1.6rem;
  @media all and (max-width: 768px) {
    display: none;
  }
`;
const Line = styled.div`
  width: 1px;
  height: 2.8rem;
  background-color: ${({ theme }) => theme.border};
`;
const ShareBox = styled.div`
  width: 13.8rem;
  height: 10rem;
  position: absolute;
  top: 6rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fff;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
  z-index: 2;
  @media all and (max-width: 1248px) {
    right: 0rem;
  }
`;
const Share = styled.div`
  width: 100%;
  text-align: center;
  padding: 12px 16px;
  color: #181818;
  font-size: 1.6rem;
  cursor: pointer;
  &:hover {
    background-color: #f6f6f6;
  }
`;

export default PostHeader;
