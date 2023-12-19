import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import useToggle from "../../hooks/useToggle";
import PostHeader from "./PostHeader";
import PostWrap from "./PostWrap";
import PostModal from "./PostModal";
import ShareComplete from "./ShareComplete";
import { getMessageByPaperId, getEmojiByPaperId, getRollingPaper } from "api";
import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function Post() {
  const [showShare, toggleShare] = useToggle(false);
  const [showModal, toggleModal] = useToggle(false);
  const [emojiAdd, toggleEmoji] = useToggle(false);
  const [share, setShare] = useState(false);
  const [data, setData] = useState([]);
  const [dataEmoji, setDataEmoji] = useState([]);
  const [idSelectName, setIdSelectName] = useState([]);
  const [emojiUp, setEmojiUp] = useState(null);
  const [modalClick, setModalClick] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const params = useParams();

  const pageId = useMemo(() => params.id, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const messagesResult = await getMessageByPaperId(pageId);
        const rollingPaperResult = await getRollingPaper(pageId);

        setData(messagesResult.results);
        setIdSelectName(rollingPaperResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageId]);

  useEffect(() => {
    const fetchEmoji = async () => {
      try {
        const emojiResult = await getEmojiByPaperId(pageId);
        setDataEmoji(emojiResult.results);
      } catch (e) {
        console.log(e);
      }
    };
    fetchEmoji();
  }, [emojiUp, pageId]);

  const modalFind = data.find((item) => item.id === modalClick);
  const selectedPost = idSelectName;
  const backgroundColor = selectedPost?.backgroundColor;
  const backgroundUrl = selectedPost?.backgroundImageURL;

  //url을 불러오지 못하면 null처리
  useEffect(() => {
    const img = new Image();
    img.src = backgroundUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
  }, [backgroundUrl]);

  //이미지가 서버에 없는 경우 null.
  const loadedBackgroundImg = imageLoaded ? backgroundUrl : null;

  return !loading ? (
    <PostBack backgroundColor={backgroundColor} backgroundUrl={loadedBackgroundImg}>
      <PostHeader
        data={data}
        toggleShare={toggleShare}
        toggleEmoji={toggleEmoji}
        dataEmoji={dataEmoji}
        setEmojiUp={setEmojiUp}
        selectedPost={selectedPost}
        pageId={pageId}
        emojiAdd={emojiAdd}
        showShare={showShare}
        setShare={setShare}
      />
      <PostWrap data={data} toggleModal={toggleModal} setModalClick={setModalClick} />

      {/* modal */}
      <AnimatePresence>
        {showModal ? <PostModal toggleModal={toggleModal} modalFind={modalFind} /> : null}
      </AnimatePresence>

      {/* URL이 복사되었습니다. */}
      {share ? <ShareComplete /> : null}
    </PostBack>
  ) : (
    <div>..loading</div>
  );
}

const PostBack = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "backgroundUrl" && prop !== "backgroundColor",
})`
  background: ${({ backgroundUrl, backgroundColor, theme }) =>
    backgroundUrl ? `url(${backgroundUrl})` : theme.backgroundColor[`${backgroundColor}`]};

  background-size: cover;
  width: 100vw;
  min-height: 100vh;
`;

export default Post;
