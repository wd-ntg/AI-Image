import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";

import {makePostRequest} from '../utils/serverHelpers'

import {logo} from '../assets/index'

import { Input } from "../components";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState(null)

    const googleProvider = new GoogleAuthProvider();

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        const response = await makePostRequest("/api/auth/login", {
          email: result.user.email,
          password: ""
        });
  
        if (response && !response.err) {
          navigate("/home");
        } else {
          alert("Failure");
        }
      }
    } catch (error) {
      console.log("Login Failure: ", error);
    }
  };

  const Login = async() => {
    const request = await makePostRequest('/api/auth/login', {email: email, password: password})

    if (request && !request.err) {
        navigate("/home");
    } else {
        setError(request)
    }
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="">
        <img className="w-[240px] h-[240px]" src={logo} />
      </div>
      <div>
        <div
          className="flex justify-center items-center px-2 py-1 bg_fill rounded-lg hover:bg-slate-200 cursor-pointer translate-y-[-36px] boder-solid border-[#39A7FF] border-[1px] bg-blue-200"
          onClick={() => {
            GoogleLogin();
          }}
        >
          <div className="flex justify-center items-center text-2xl mr-2">
            <iconify-icon icon="flat-color-icons:google"></iconify-icon>
          </div>
          <div>Đăng nhập với Google</div>
        </div>
        <Input
          placeholder="Tên người dùng"
          label="Tên người dùng"
          type="text"
          value={email}
          setValue={setEmail}
        />
        <Input
          placeholder="Mật khẩu"
          label="Mật khẩu"
          type="password"
          value={password}
          setValue={setPassword}
        />
      </div>
      <button
        className="mt-8 rounded-full bg-green_light px-2 py-1 text-gray-900 hover:text-slate-300 bg-blue-200"
        onClick={(e) => {
          e.preventDefault();
          Login();
        }}
      >
        Đăng nhập
      </button>
    </div>
  );
}

export default Login;
