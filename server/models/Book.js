import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: null
  }
},
{
  timestamps: true
});

export default mongoose.model("Book", BookSchema);