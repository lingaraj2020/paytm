const mongoose = require("mongoose");
const { number } = require("zod");

//mongodb+srv://raj2020:hbZbztZLkhJnCq2e@cluster0.yhlsrrr.mongodb.net/
mongoose.connect(
  "mongodb+srv://raj2020:hbZbztZLkhJnCq2e@cluster0.yhlsrrr.mongodb.net/paytm"
);

const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    minLength:3,
    maxLength:30
  },
  password: {
    type:String,
    required:true,
    minLength:6
  },
  firstName: {
    type:String,
    required:true,
    trim:true,
    maxLength:30
  },
  lastName: {
    type:String,
    required:true,
    trim:true,
    maxLength:30
  }
});

const accountSchema=new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,   //reference to user model
    ref:'User',
    required:true
  },
  balance:{
    type:number,
    required:true
  }
});

const Account=mongoose.model('Account',accountSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  Account,
};
