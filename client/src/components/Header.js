import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <Link to="/">home</Link>
      <Link to="/upload">upload</Link>
      <Link to="list">list</Link>
    </>
  );
}

export default Header;
