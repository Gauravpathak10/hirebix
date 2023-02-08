const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.set('strictQuery', false);
const UserSchema = Schema({
    userName: {
        type: String,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    scores:
    {
        quizName: {
            type: String,
            default: "javascript.."
        },
        points: [],
        createdAt: {
            type: Date,
            default: Date(Date.now())
        }
    }
})




const User = mongoose.model('User', UserSchema);
module.exports = User;
