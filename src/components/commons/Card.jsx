import React from "react";
import styled from "styled-components";
import { setDayYMD } from "../../utils/setDayYMD";
import Delete from "../../assets/icon/deleted.svg";
import nullImg from "../../assets/icon/person.svg";
import useToggle from "../../hooks/useToggle";
import { motion } from "framer-motion";

function Card({ id, onClick, name, profileImg, description, tag, ago, deleteCard = true, deleteCardClick }) {
  const [deleteChoice, deleteChoiceToggle] = useToggle(false);
  const htmlContent = { __html: description };
  const day = setDayYMD(ago);
  const profile = profileImg ? profileImg : nullImg;
  const tagColor = (tag) => {
    if (tag === "지인") {
      return { back: "#FFF0D6", font: "#FF8832" };
    }
    if (tag === "동료") {
      return { back: "#F8F0FF", font: "#9935FF" };
    }
    if (tag === "가족") {
      return { back: "#E4FBDC", font: "#2BA600" };
    }
    if (tag === "친구") {
      return { back: "#E2F5FF", font: "#00A2FE" };
    }
  };

  return (
    <CardBox
      onClick={() => {
        onClick();
      }}
      deleteChoice={deleteChoice}
      deleteCard={deleteCard}
      whileHover={{ scale: 0.95 }}
      whileTap={{ scale: 0.9 }}
    >
      <CardWrap>
        <From>
          <FromInner>
            <ImgBox>
              <StyledImg src={profile} alt="profileImg" />
            </ImgBox>
            <FromBox>
              <FromP>
                <FromSpan>From. </FromSpan>
                {name}
              </FromP>
              <FromTag back={tagColor(tag).back} font={tagColor(tag).font}>
                {tag}
              </FromTag>
            </FromBox>
          </FromInner>

          {deleteCard ? null : (
            <DeleteWrap
              onClick={() => {
                deleteCardClick(id);
                deleteChoiceToggle();
              }}
            >
              <img src={Delete} />
            </DeleteWrap>
          )}
        </From>

        <CardDescription dangerouslySetInnerHTML={htmlContent} />
        <Ago>{day}</Ago>
      </CardWrap>
    </CardBox>
  );
}

const DeleteWrap = styled.button`
  width: 4rem;
  height: 4rem;
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  cursor: pointer;
`;
const FromInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;
const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardBox = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => prop !== "deleteChoice" && prop !== "deleteCard",
})`
  max-width: 38.4rem;
  min-width: 30rem;
  width: 100%;
  height: 28rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.card.backgroundColor};
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
  padding: 2.8rem 2.4rem;
  opacity: ${(props) => (props.deleteChoice ? 0.5 : 1)};
  cursor: ${(props) => (!props.deleteCard ? "auto" : "pointer")};

  @media all and (max-width: 1248px) {
    max-width: 50rem;
  }
`;
const CardWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.5rem;
  position: relative;
`;
const CardDescription = styled.div`
  width: 100%;
  height: 45%;
  font-weight: 400;
  color: ${({ theme }) => theme.card.color};
  /* display: -webkit-box; */
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: break-word;
  white-space: pre-line;

  & > p {
    /* display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: normal; */
    font-size: 1.8rem;
  }
`;

const From = styled.div`
  display: flex;
  width: 100%;
  height: 40%;
  padding-bottom: 1.5rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.card.border};
`;
const FromBox = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;
const FromTag = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "back" && prop !== "font",
})`
  width: 4.1rem;
  height: 2rem;
  display: flex;
  padding: 0px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: ${(props) => props.back};
  color: ${(props) => props.font};
  font-size: 1.4rem;
`;
const FromP = styled.p`
  font-size: 2rem;
  color: ${({ theme }) => theme.card.color};
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
`;
const FromSpan = styled.span`
  font-weight: 400;
  font-size: 2rem;
`;
const ImgBox = styled.div`
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 50%;
  background-color: #555;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Ago = styled.div`
  color: #999;
  font-size: 1.2rem;
  position: absolute;
  bottom: 0;
`;

export default Card;
