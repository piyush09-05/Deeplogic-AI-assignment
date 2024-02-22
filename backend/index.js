const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const AuthMiddleWare = require("./middlewares/Authentication.js");
const PostMiddleWare = require("./middlewares/SocialPosts.js")

const app = express();

app.use(express.json());
app.use(cors());

app.use(AuthMiddleWare);
app.use(PostMiddleWare);


mongoose.connect("mongodb+srv://piyush09:qTMy38x22hXofIyI@cluster0.1bqc8.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("DB connected");
    });

app.listen(3000, () => {
    console.log("Server Running");
})

