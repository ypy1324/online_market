import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import List from "./components/List";
import Upload from "./components/Upload";
import Detail from "./components/Detail";
import Edit from "./components/Edit";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/post/:postNum" element={<Detail />} />
        <Route path="/edit/:postNum" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
