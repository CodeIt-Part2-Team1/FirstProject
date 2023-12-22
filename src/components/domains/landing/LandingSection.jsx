import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

function LandingSection({ children, first, reverse }) {
  return (
    <StyledLandingSection
      initial={{ x: first ? -30 : 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{ justifyContent: first ? "space-around" : "space-evenly", flexDirection: reverse && "row-reverse" }}
    >
      {children}
    </StyledLandingSection>
  );
}

export default LandingSection;

const StyledLandingSection = styled(motion.section)`
  display: flex;
  background-color: #f6f8ff;
  max-width: 120rem;
  margin: 0 auto;
  padding: 6rem 0;
  border-radius: 16px;
  margin-bottom: 3rem;
  min-height: 30rem;
  @media screen and (max-width: 1248px) {
    display: grid;
    justify-content: center;
    padding: 4rem 0;
    gap: 3rem;
    grid-template-areas:
      "a"
      "b";
  }
`;
