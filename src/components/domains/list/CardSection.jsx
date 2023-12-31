import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as ALeft } from "assets/icon/arrow_left.svg";
import { ReactComponent as ARight } from "assets/icon/arrow_right.svg";
import CardItem from "./CardItem";
import { useDeviceSize, useSwipe } from "hooks";
import { ITEMS_PER_PAGE } from "constants";
import { CardList } from "./CardList";
import { DEVICE_MAX_SIZE } from "constants";
import { CARD_WIDTH } from "constants";
import SkListCard from "components/commons/SkListCard";

function Loading() {
  const renderItems = Array.from({ length: 4 }).map((_, index) => <SkListCard key={index} />);
  return <CardList>{renderItems}</CardList>;
}

function CardSection({ loading, title, recipients, $resultSection }) {
  const { isMobile, isTablet, isNotebook, isPC } = useDeviceSize();
  const [maxIndex, setMaxIndex] = useState(4);

  const { currentIndex, offset, handleSwipe, startDrag, endDrag, moveItem } = useSwipe(maxIndex, !isPC);

  const handleMouseDown = (e) => {
    e.preventDefault();
    startDrag(e.pageX);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (!isPC) moveItem(e.pageX);
  };

  const handleMouseUp = () => {
    if (!isPC) endDrag();
  };

  const handleTouchStart = (e) => {
    startDrag(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    moveItem(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    endDrag();
  };

  const renderItems = recipients.map((recipient, index) => <CardItem key={index} recipient={recipient} />);

  useEffect(() => {
    const updateMaxIndex = () => {
      if (isPC) {
        setMaxIndex(recipients.length - ITEMS_PER_PAGE.PC);
      } else if (isNotebook) {
        setMaxIndex(recipients.length - ITEMS_PER_PAGE.NOTEBOOK);
      } else if (isTablet) {
        setMaxIndex(recipients.length - ITEMS_PER_PAGE.TABLET);
      } else if (isMobile) {
        setMaxIndex(recipients.length - ITEMS_PER_PAGE.MOBILE);
      }
    };

    updateMaxIndex();
    window.addEventListener("resize", updateMaxIndex);
    return () => {
      window.removeEventListener("resize", updateMaxIndex);
    };
  }, [isPC, isNotebook, isTablet, isMobile, recipients.length]);
  return (
    <Container>
      <SubTitle>{title}</SubTitle>
      <Relative $resultSection={$resultSection}>
        <ArrowButton $left onClick={() => handleSwipe("prev")} $hide={loading || !isPC || currentIndex === 0}>
          <ALeft />
        </ArrowButton>
        <Wrapper
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {loading ? <Loading /> : <CardList offset={offset}>{renderItems}</CardList>}
        </Wrapper>
        <ArrowButton onClick={() => handleSwipe("next")} $hide={loading || !isPC || currentIndex >= maxIndex}>
          <ARight />
        </ArrowButton>
      </Relative>
    </Container>
  );
}

export default CardSection;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  max-width: 116rem;
  width: 100%;
`;

const Relative = styled.div`
  position: relative;
  display: flex;
  justify-content: ${({ $resultSection }) => ($resultSection ? "flex-start" : "center")};
`;

const Wrapper = styled.div`
  overflow: hidden;
  @media screen and (max-width: ${DEVICE_MAX_SIZE.PC}px) {
    max-width: ${CARD_WIDTH * ITEMS_PER_PAGE.NOTEBOOK}rem;
  }
  @media screen and (max-width: ${DEVICE_MAX_SIZE.TABLET}px) {
    max-width: ${CARD_WIDTH * ITEMS_PER_PAGE.TABLET}rem;
  }
  @media screen and (max-width: ${DEVICE_MAX_SIZE.MOBILE}px) {
    max-width: ${CARD_WIDTH * ITEMS_PER_PAGE.MOBILE}rem;
  }
`;

const SubTitle = styled.span`
  margin-top: 5rem;
  display: block;
  color: ${({ theme }) => theme.fontColor};
  font-family: Pretendard;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3.6rem;
  letter-spacing: -0.24px;
  font-style: normal;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.$left ? "left: -2rem" : "right: -2rem")};

  display: ${({ $hide }) => ($hide ? "none" : "flex")};
  align-items: center;
  justify-content: center;

  z-index: 1;

  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #dadcdf;
  background-color: white;
  opacity: 0.9;

  cursor: pointer;
`;
