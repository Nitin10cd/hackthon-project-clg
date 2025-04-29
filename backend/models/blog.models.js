import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    blogname: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    tags: [
        {
            type: String,
            trim: true
        }
    ],
    likes: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    isPublished: {
        type: Boolean,
        default: false
    }
});

const BlogModel = mongoose.model("Blog" , BlogSchema);
export default BlogModel;