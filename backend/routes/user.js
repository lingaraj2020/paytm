const express = require("express");
const zod=require("zod");
const { User } = require("../db");
const jwt=require("jsonwebtoken");
const JWT_SECRET = require("../config");

const router = express.Router();
//signup and signin routes

const signupSchema=zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

router.post("/signup",async(req,res)=>{
    const body=req.body;
    const {success}=signupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg:"Email already taken / Incorrect inputs"
        })
    }

    const user=User.findOne({
        username:body.username
    })

    if(user._id){
        return res.status(411).json({
            msg:"Email already taken / Incorrect inputs"
        })
    }

    const dbUser=await User.create(body);
    const token=jwt.sign({
        userId:dbUser._id
    },JWT_SECRET);

    res.json({
        message:"User created Successfully",
        token:token
    })

});

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const body=req.body;
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const dbUser = await User.findOne({
        username: body.username,
        password: body.password
    });

    if (dbUser) {
        const token = jwt.sign({
            userId: dbUser._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

module.exports=router;

