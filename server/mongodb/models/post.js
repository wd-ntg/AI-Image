import mongoose from "mongoose";

const Post = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "Auth",
  },
});

const PostSchema = mongoose.model("Post", Post);

export default PostSchema;
