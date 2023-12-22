import React from "react";
import styled from "styled-components";
import PostPreview from "assets/img/PostPreview.png";
import EmojiPreview from "assets/img/EmojiPreview.png";
import { NavigationButton } from "components/commons/Button";
import { LandingCards, LandingIntro, LandingSection } from "components/domains/landing";

const introData = [
  {
    title: "Point. 01",
    contents: {
      mainText: (
        <>
          누구나 손쉽게, 온라인 <br /> 롤링 페이퍼를 만들 수 있어요
        </>
      ),
      subText: "로그인 없이 자유롭게 만들어요.",
    },
  },
  {
    title: "Point. 02",
    contents: {
      mainText: (
        <>
          서로에게 이모지로 감정을
          <br />
          표현해보세요
        </>
      ),
      subText: "롤링 페이퍼에 이모지를 추가할 수 있어요.",
    },
  },
];

function Landing() {
  return (
    <>
      <Layout>
        <LandingSection first>
          <LandingIntro {...introData[0]} />
          <LandingCards imgSrc={PostPreview} repeat={3} childWidth={"20.5"} />
        </LandingSection>
        <LandingSection reverse>
          <LandingIntro {...introData[1]} />
          <LandingCards imgSrc={EmojiPreview} childWidth={"47"} />
        </LandingSection>
      </Layout>

      <NavigationButton link={"/list"}>구경해보기</NavigationButton>
    </>
  );
}

const Layout = styled.main`
  padding: 6rem 24px;
`;

export default Landing;
