import bcrypt from "bcryptjs"
import User from "../models/User.js";
import createToken from "../token/createToken.js";

export async function register(req, res){ 
  const { email } = req.body;
    try {
        const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

        const {password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({...req.body, password: hash});
        const token = createToken(res, user);
        res.json({
            id: user._id,
            email: user.email,
            
          });
      
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)

    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: "User does not exist" });
        }
        const isMatch =  await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = createToken(res, user);
        res.json({
          id: user._id,
          email: user.email,
          
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

export async function logout(req, res) {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({ message: "Logged out successfully" })
}