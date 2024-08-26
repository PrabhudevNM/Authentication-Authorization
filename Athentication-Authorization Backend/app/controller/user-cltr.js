import User from "../model/user-model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"
const usersCltr={}


usersCltr.register= async (req,res)=>{                              // First updation in controller after validation or From validation to controller 
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    // extrct only fields required
    const {email,password}=req.body

    try{
        //to create first user as admin
        const userCount=await User.countDocuments()
        const user=new User({email,password})
        // hash password
        const salt=await bcryptjs.genSalt()
        const hash=await bcryptjs.hash(user.password,salt)
        user.password=hash
        if(userCount === 0){
            user.role='admin'
        }
        await user.save()
        res.status(201).json(user)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}

usersCltr.login= async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body
    try{
        const user= await User.findOne({email})
        if(!user){
            return res.status(404).json({errors:'invalid email or passsword'})
        }
        const isVerified= await bcryptjs.compare(password,user.password)
        if(!isVerified){
            return res.status(404).json({errors:'invalid email or password'})
        }
        const tokenData={userId:user._id, role:user.role}    //Add role in the token data
        // console.log(process.env.JWT_SECRET)
        const token=jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'7d'})
        res.json({token:token})
    }catch(err){
        console.log(err)
        res.status(500).json({errors:'something went wrong'})
    }
}

// usersCltr.profile= async (req,res)=>{
//     try{
//         const user = await User.findById(req.userId)
//         res.json(user)
//     }catch(err){
//         console.log(err)
//         res.status(500).json({errors:'something went wrong'})
//     }
// }

usersCltr.account = async (req, res) => {
    try  {
        const user = await User.findById(req.userId) 
        res.json(user)
    } catch(err) {
        console.log(err) 
        res.status(500).json({ error: "something went wrong"})
    }
}

usersCltr.listUsers=async(req,res)=>{
    try {
        const users=await User.find()
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({errors:"Something went wrong"})
    }
}

usersCltr.destroy=async(req,res)=>{
    try {
        const id=req.params.id
        const user=await User.findByIdAndDelete(id)
        //const profile=await Profile.findOne({user:user._id})
        //const posts=await Post.deleteMany({user:user._id})
        // post.comments=[{title:user}]
        //const.comments=await Post.updateMany({'comments.user':id},{$pull:{comments:{user:id}})
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({errors:'something went wrong'})
    }
}

usersCltr.changeRole=async(req,res)=>{
    try {
        const id=req.params.id
        const body=req.body
        if(id==req.userId){
            return res.status(400).json({error:'You cannot change role of your qwn account'})
        }
        const user=await User.findByIdAndUpdate(id,body,{new:true})
        res.json(user)
    } catch (error) {
        console.log(err)
        res.status(500).json({errors:'Something went wrong'})
    }
}



export default usersCltr