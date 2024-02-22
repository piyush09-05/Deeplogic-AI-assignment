const express = require("express");
const VerifyToken  = require("./VerifyToken.js");
const zod = require("zod");
const schedule = require("node-schedule");

const Post  = require("../models/Post.js")


const router = express.Router();

const postSchema = zod.object({
     title:zod.string(),
     description:zod.string(),
     image_link:zod.string(),
     scheduledTime:zod.string().optional()

})

router.post("/create",VerifyToken, async (req,res) => {
   
    const user = req.User.userId;
    
    const{ success, data} = postSchema.safeParse(req.body);
    
    console.log(success, data)

    if(!success){
        
        return res.status(403).json({
        
            message:"Invalid Input"
        })
    }


    try {

        let newPost;

        if(data.scheduledTime == null){
            newPost = await createPost(user, data);
           return res.status(200).json({
             newPost
           })
        }
        else{
              schedulePost(user, data);
             return res.status(200).json({
                Message:"Post Scheduled",
                newPost
             })
        }

    
        

       
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal Server Error",
            error
        })
    }
})

const createPost =  async  (userId, data) => {
    
    try {
        const newPost = await Post.create({
            title:data.title,
            description:data.description,
            image_link:data.image_link,
            userId:userId,
            scheduledTime:data.scheduledTime
        })

        return {newPost};
    } catch (error) {
        console.log(error);
        throw error;
    }

}
const schedulePost =  (userId, data) => {
    try {
        return new Promise((resolve, reject) => {
            try {
                schedule.scheduleJob(data.scheduledTime, async () => {
                    const newPost = await Post.create({
                        title:data.title,
                        description:data.description,
                        image_link:data.image_link,
                        userId:userId,
                        scheduledTime:data.scheduledTime
                    });
                    console.log("NewPost:" + newPost);

                    resolve();
        
                    
                }) 
            } catch (error) {
                console.log("error scheduling", error)
                reject(error)
            }
        })
       
    } catch (error) {
        console.log(error);
        throw error;
    }
       
    
   
      
}

router.get("/getPosts", VerifyToken,  async (req,res) => {
    try {
        const Posts = await Post.find({});
        return res.status(200).json(Posts);

    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
})

module.exports = router;


// "id": 2,
// "title": "New Recipe Alert!",
// "description": "Just whipped up this delicious pasta dish with fresh basil and tomatoes. Who wants the recipe?",
// "image_link": "https://example.com/pasta.jpg",
// "likes": 120,
// "comments": 15,
// "shares": 30