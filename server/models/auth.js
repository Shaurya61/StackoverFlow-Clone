import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  about: {
    type: String,
  },
  tags: {
    type: [String],
  },
  joinedON: {
    type: Date,
    default: Date.now
  },
  planOpted: { 
    type: String,
    default: 'Free',
    required: true
  },
  planOptedOn: {
    type: Date,
    },
  noOfQuestions: {
    type: Number,
    default:1, 
    required:true},
    salt: String,
    updated: Date,
    created: {
      type: Date,
      default: Date.now
    },
    about: {
      type: String,
      trim: true
    },
    photo: {
      data: Buffer,
      contentType: String
    },
    following: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    followers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    reputations: {type:Number,default:0},
})

export default mongoose.model('User', userSchema)