import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

function LandingCards({ imgSrc, childWidth, repeat = 1 }) {
  return (
    <StyledCardContainer $childWidth={childWidth}>
      {Array.from({ length: repeat }).map((_, index) => (
        <StyledPostCard key={index} src={imgSrc} alt={`Image ${index}`} />
      ))}
    </StyledCardContainer>
  );
}

export default LandingCards;

const StyledCardContainer = styled(motion.div)`
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 1248px) {
    grid-area: b;
  }

  & img {
    width: ${({ $childWidth }) => `${$childWidth}rem`};
  }
`;

const StyledPostCard = styled.img`
  width: 20.5rem;
`;
