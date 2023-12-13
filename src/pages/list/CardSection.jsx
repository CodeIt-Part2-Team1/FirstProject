import React from "react";
import styled from "styled-components";
import useIsTablet from "../../hooks/useIsTablet";
import { ReactComponent as ALeft } from "../../assets/icon/arrow_left.svg";
import { ReactComponent as ARight } from "../../assets/icon/arrow_right.svg";
import CardItem from "./CardItem";
import { CardList } from "./CardList";
import useSwipe from "../../hooks/useSwipe";

function CardSection({ title, recipients }) {
  const isTablet = useIsTablet();
  const { currentIndex, offset, maxIndex, handleSwipe, startDrag, endDrag, moveItem } = useSwipe(
    recipients.length,
    isTablet
  );

  const handleMouseDown = (e) => {
    startDrag(e.pageX);
  };

  const handleMouseMove = (e) => {
    if (isTablet) moveItem(e.pageX);
  };

  const handleMouseUp = () => {
    if (isTablet) endDrag();
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

  return (
    <Container>
      <SubTitle>{title}</SubTitle>
      <Relative>
        <ArrowButton $left onClick={() => handleSwipe("prev")} $hide={isTablet || currentIndex === 0}>
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
          <CardList offset={offset}>{renderItems}</CardList>
        </Wrapper>
        <ArrowButton onClick={() => handleSwipe("next")} $hide={isTablet || currentIndex >= maxIndex}>
          <ARight />
        </ArrowButton>
      </Relative>
    </Container>
  );
}

export default React.memo(CardSection);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  max-width: 116rem;
  width: 100%;
`;

const Relative = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  overflow: hidden;
`;

const SubTitle = styled.span`
  margin-top: 5rem;
  display: block;
  color: ${({ theme }) => theme.subtitle};
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
  border: 1px solid #ccc;
  background-color: white;

  cursor: pointer;
`;
