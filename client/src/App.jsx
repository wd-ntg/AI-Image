import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { logo } from "./assets";

import { Home, CreatePost, Register, Login } from "./pages";
import { Nav } from "./components";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes> */}
      <header>
        <Nav />
      </header>
      <Routes>
        <main className="sm:p-8 px-16 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </main>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
