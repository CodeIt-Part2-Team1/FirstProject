import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Post from "../src/pages/post";
import PostEdit from "../src/pages/postEdit";
import ListPage from "./pages/list";
import Landing from "pages/landing";
import Header from "./components/commons/Header";
import CreateMessage from "./pages/createMessage";
import CreatePost from "./pages/createPost";
import NotFound from "./pages/not_found/NotFound";
import { LocationProvider } from "contexts/LocationContext";
import { SnowTheme } from "styles/snowTheme";

function Main({ onToggleTheme, isDark }) {
  return (
    <BrowserRouter>
      <LocationProvider>
        <Header onThemaClick={onToggleTheme} />
        <SnowTheme isDark={isDark} />
        <Routes>
          <Route path="/">
            <Route index element={<Landing />} />
            <Route path="/list" element={<ListPage />} />
          </Route>
          <Route path="/post">
            <Route index element={<CreatePost />} />
            <Route path=":id" element={<Post />} />
            <Route path=":id/edit" element={<PostEdit />} />
            <Route path=":id/message" element={<CreateMessage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LocationProvider>
    </BrowserRouter>
  );
}

export default Main;
