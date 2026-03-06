import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be of atleast 6 character" });
    }
    if (password != confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirmPassword is not same" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await new User({email, password: hashedPassword});
    await newUser.save()
    res.status(200).json({message: "Signup Sucessfull", id: newUser._id, email:newUser.email})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
};

export const login = async(req,res) =>{
    try {
        const{email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({email});
        if(!user){
            return res
              .status(400)
              .json({ message: "Email not registered" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Password is not correct"})
        }
        const token = jwt.sign({id: user._id, email: user.email}, process.env.SECRET, {expiresIn:'1d'});
        res.status(200).json({message: "Login Successfull", id:user._id, email:user.email, token})
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const logout = (req,res) =>{
  try {
    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}