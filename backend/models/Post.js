const {Schema, mongoose, model}  = require("mongoose");

const PostSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    image_link:String,
    userId:{
        type: mongoose.Schema.Types.ObjectId,type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    comments:{
        type:Number,
        default:0
    },
    shares:{
        type:Number,
        default:0
    },
    scheduledTime:{
        type:Date,
        default:null
    }

})

const Post = mongoose.model("Post", PostSchema);

module.exports  = Post