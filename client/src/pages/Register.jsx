import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

import {makePostRequest} from '../utils/serverHelpers'

import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

import { sepia } from "@cloudinary/url-gen/actions/effect";

import { logo } from "../assets";

import { Input } from "../components";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const [checkPassword, setCheckPassword] = useState(false);

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false)

  const googleProvider = new GoogleAuthProvider();

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      console.log(result.user);
      const response = await makePostRequest(
        "/api/auth/register",
        {
          name: result.user.displayName,
          email: result.user.email,
          password: password,
          avatar: result.user.photoURL,
        }
      );
      if (response) {
        navigate("/home");
      }
    } catch (error) {
      console.log("Login Failure: ", error);
    }
  };

  const Register = async () => {
    try {
      if (password != confirmPassword) {
        setCheckPassword(true);
        return;
      }
      const response = await makePostRequest(
        "/apoi/auth/register",
        {
          name: name,
          email: email,
          password: password,
          avatar: avatar,
        }
      );
      if (response && !response.err) {
        navigate("/home");
      } else {
        alert("Failure Register");
      }
    } catch (error) {
      console.log("Register Failure: ", error);
    }
  };

  // Upload Avatar

  
  const REACT_APP_CLOUDINARY_CLOUD_NAME = "de7xcxe5g";
  const REACT_APP_CLOUDINARY_API_KEY = "756349127925357";
  const REACT_APP_CLOUDINARY_API_SECRET = "HxfQw89bJUWmj08aFe06QfeSbvM";
  const REACT_APP_CLOUDINARY_UPLOAD_PRESET = 'nnuhfevn';

  const uploadImage = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append(
      "upload_preset",
      REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    data.append("cloud_name", REACT_APP_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "Cloudinary-React");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      console.log(res.url)
      setUrl(res.public_id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result);
    };
  };


  return (
    <div className="flex justify-center items-center flex-col pb-12">
      <div className="">
        <img className="w-[240px] h-[240px]" src={logo} />
      </div>
      <div>
        <div
          className="flex justify-center items-center px-2 py-1 bg_fill rounded-lg hover:bg-slate-200 cursor-pointer translate-y-[-36px] bg-blue-200"
          onClick={() => {
            GoogleLogin();
          }}
        >
          <div className="flex justify-center items-center text-2xl mr-2">
            <iconify-icon icon="flat-color-icons:google"></iconify-icon>
          </div>
          <div>Đăng ký với Google</div>
        </div>
        <Input
          placeholder="Nhập tên của bạn"
          label="Tên của bạn là gì?"
          type="email"
          value={name}
          setValue={setName}
        />
        <Input
          placeholder="Nhập email của bạn"
          label="Tên email bạn là gì?"
          type="email"
          value={email}
          setValue={setEmail}
        />
        <Input
          placeholder="Mật khẩu"
          label="Tạo mật khẩu"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <Input
          placeholder="Xác nhận mật khẩu"
          label="Xác nhận mật khẩu"
          type="password"
          value={checkPassword ? "" : confirmPassword}
          setValue={setConfirmPassword}
        />
      </div>
      {checkPassword && (
        <span className="text-red-400">Mật khẩu xác nhận không chính xác</span>
      )}
      <button
        className="mt-6 rounded-md bg-green_light px-2 py-1 text-gray-900 hover:text-slate-300 bg-blue-300"
        onClick={(e) => {
          e.preventDefault();
          Register();
        }}
      >
        Đăng ký
      </button>
      <input
        id="hidden-input"
        type="file"
        className="hidden"
        onChange={handleImageChange}
        accept="image/*"
      />
      <label htmlFor="hidden-input" className="cursor-pointer">
        <div className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
          Upload a file
        </div>
      </label>
      <button
        onClick={uploadImage}
        className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none disabled:cursor-not-allowed"
        disabled={!image}
      >
        Upload now
      </button>
    </div>
  );
}

export default Register;
