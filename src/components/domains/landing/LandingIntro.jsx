import React from "react";
import styled from "styled-components";

function LandingIntro({ title, contents }) {
  return (
    <StyledPageIntroContainer>
      <StyledPagePointContainer>
        <StyledPagePointText>{title}</StyledPagePointText>
      </StyledPagePointContainer>
      <StyledPageMainIntroText>{contents.mainText}</StyledPageMainIntroText>
      <StyledPagSideIntroText>{contents.subText}</StyledPagSideIntroText>
    </StyledPageIntroContainer>
  );
}

export default LandingIntro;

const StyledPageIntroContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1248px) {
    grid-area: a;
  }

  @media screen and (max-width: 768px) {
    padding: 0 24px;
  }
`;

const StyledPagePointContainer = styled.div`
  display: flex;
  margin-bottom: 1.6rem;
`;

const StyledPagePointText = styled.p`
  border-radius: 5rem;
  background: #9935ff;
  padding: 0.6rem 1.2rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
`;

const StyledPageMainIntroText = styled.h2`
  color: #181818;
  font-family: Pretendard;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3.6rem;
  margin-bottom: 0.8rem;

  @media screen and (max-width: 1248px) {
    br {
      display: none;
    }
  }
`;

const StyledPagSideIntroText = styled.p`
  color: var(--gray-500, #555);
  font-size: 1.8rem;
  font-weight: 400;
`;
