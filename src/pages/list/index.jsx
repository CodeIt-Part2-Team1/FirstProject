import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { getRollingPaperAll } from "api";
import { NavigationButton } from "components/commons/Button";
import CardSection from "components/domains/list/CardSection";
import SearchBar from "components/commons/SearchBar";
import LoadingSpinner from "components/commons/LodingSpinner";
import { LIST_TITLE } from "constants";

function SearchResult({ loading, searchDatas }) {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (searchDatas.length > 0) {
    return <CardSection title={LIST_TITLE[0]} recipients={searchDatas} $resultSection={true} />;
  }

  return <EmptyResult>검색 결과가 없습니다</EmptyResult>;
}

function DefaultView({ loading, sortByMost, sortByRecent }) {
  return (
    <>
      <CardSection loading={loading} title={LIST_TITLE[1]} recipients={sortByMost} $resultSection={false} />
      <CardSection loading={loading} title={LIST_TITLE[2]} recipients={sortByRecent} $resultSection={false} />
    </>
  );
}

function ListPage() {
  const [loading, setLoading] = useState(false);
  const [sortByMost, setSortByMost] = useState([]);
  const [sortByRecent, setSortByRecent] = useState([]);
  const [searchDatas, setSearchDatas] = useState([]); // 검색한 값
  const [searchParams, setSearchParams] = useSearchParams();
  const queryValue = searchParams.get("name");
  const [searchValue, setSearchValue] = useState(queryValue || ""); // 입력한 값
  const [onInput, setOnInput] = useState(false);

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOnInput(searchValue.length > 0);
    setSearchParams(searchValue ? { name: searchValue } : {});
  };

  useEffect(() => {
    setLoading(true);
    getRollingPaperAll()
      .then((res) => res.results)
      .then((data) => {
        //가장 메시지가 많은 순.
        const like = [...data].sort((a, b) => b.messageCount - a.messageCount).slice(0, 10);
        //가장 최근에 만들어진 순.
        const recent = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
        //검색 필터
        const searchResults = queryValue ? data.filter(({ name }) => name.includes(queryValue.toLowerCase())) : [];

        setSortByMost(like);
        setSortByRecent(recent);
        setSearchDatas(searchResults);
      })
      .finally(() => setLoading(false));
  }, [queryValue]);

  return (
    <>
      <SearchBar onChange={handleSearchValue} value={searchValue} onSubmit={handleSubmit} />
      <Layout>
        {onInput ? (
          <SearchResult loading={loading} searchDatas={searchDatas} onInput={onInput} />
        ) : (
          <DefaultView loading={loading} sortByMost={sortByMost} sortByRecent={sortByRecent} />
        )}
      </Layout>
      {!loading && <NavigationButton link={"/post"}>나도 만들어보기</NavigationButton>}
    </>
  );
}

export default ListPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2.4rem;
  margin: 0 auto 4rem;
`;

const EmptyResult = styled.p`
  margin-top: 5rem;
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.fontColor};
`;
