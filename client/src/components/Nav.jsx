import React from "react";

import { logo } from "../assets";

import { Link } from "react-router-dom";

function Nav() {
  return (
    <header className="w-full flex px-16 py-4 justify-between">
      <Link>
        <img src={logo} alt="logo" className="w-28 object-contain" />
      </Link>
      <Link to='/create-post'><button className="bg-purple-600 px-2 py-1 rounded-md text-white">Create</button></Link>
    </header>
  );
}

export default Nav;
