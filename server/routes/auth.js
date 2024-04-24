import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";

import AuthSchema from "../mongodb/models/auth.js";

dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    if (email) {
      const user = await AuthSchema.findOne({ email: email });

      if (user) {
        return res
          .status(403)
          .json({ error: "A user with this email already exists!" });
      } else {
        const salt = 10;
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = await AuthSchema.create({
          name: name,
          email: email,
          password: hashPassword,
          avatar: avatar,
        });
        return res.status(200).json({user: newUser ,message: "Register is success!" });
      }
    }
  } catch (error) {
    console.log("Error register: ", error);
    return res.status(500).json({ error: "Register error, server error!" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email) {
      const user = await AuthSchema.findOne({ email: email });
      if (user) {
        const passwordCompare = await bcrypt.compare(user.password);

        if (password == passwordCompare) {
          return res.status(200).json({ user: user });
        } else {
          return res
            .status(403)
            .json({ message: "Your password is not correct!" });
        }
      } else {
        return res.status(403).json({message: "Account not found!"})
      }
    } 
  } catch (error) {
    console.log("Error login: ", error);
    return res.status(500).json({ error: "Login error, server error!" });
  }
});

export default router;
