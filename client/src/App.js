import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import List from "./components/List";
import Upload from "./components/Upload";

function App() {
  const [contentList, setContentList] = useState([]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/list"
          element={
            <List contentList={contentList} setContentList={setContentList} />
          }
        />
        <Route
          path="/upload"
          element={
            <Upload contentList={contentList} setContentList={setContentList} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
