import React from "react";
import "./App.scss";
import Posts from "./pages/posts";
import { Route, Routes } from "react-router-dom";
import Post from "./pages/post";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
