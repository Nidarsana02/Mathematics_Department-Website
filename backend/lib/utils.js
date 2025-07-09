import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import  dotenv  from "dotenv";

dotenv.config();

export const toMongooseId= (id)=>{
  return new mongoose.Types.ObjectId(id)
}

export const generateJwtToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('jwt', token, {
    maxAge: 1000 * 60 * 60 * 27 * 7,
    httpOnly:true,
    sameSite:'strict',
    secure:process.env.NODE_ENV!=='development'
  });

  return token;
};
