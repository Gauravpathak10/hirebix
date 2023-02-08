const User = require("../model/UserModel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const cloudinary = require('../cloud');




//Register UserCredentials
exports.CreateUserAccount = async (req, res) => {
    try {
        const { userName, email } = req.body;

        // Check if this user already exisits
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User Already Exists",
                status: false
            });
        } else {
            // Insert the new user if they do not exist yet
            user = await User.create({
                userName,
                email,

            });
            res.status(201).json({
                message: "SuccessFully created",
                status: true,
                data: user
            });
        }
        //Check For Validations & Errors
    } catch (error) {
        res.status(422).json({
            message: error.message,
            status: false,
        });
    }
}

//score card

module.exports.updateScore = async (req, res) => {
    try {
        const { points } = req.body
        const user = await User.findById(req.params.id);
        if (user) {
            user.scores.points.push(points + " " + Date(Date.now()))
            user.save()
            res.status(200).json({
                data: user
            })
        }
        else {
            res.status(422).json({
                message: 'failed updating',
                status: false,
            });
        }
    } catch (error) {
        res.status(422).json({
            message: error.message,
            status: false,
        });
    }
}

exports.Login = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if this user already exisits
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not registered",
                status: false
            });
        } else {
            res.status(201).json({
                message: "SuccessFully created",
                status: true,
                data: user
            });
        }
        //Check For Validations & Errors
    } catch (error) {
        res.status(422).json({
            message: error.message,
            status: false,
        });
    }
}
exports.getprofile = async (req, res) => {
    try {
        const { id } = req.params.id;

        // Check if this user already exisits
        let user = await User.findOne({ id });
        if (!user) {
            return res.status(400).json({
                message: "User not registered",
                status: false
            });
        } else {
            res.status(201).json({
                message: "SuccessFully created",
                status: true,
                data: user
            });
        }
        //Check For Validations & Errors
    } catch (error) {
        res.status(422).json({
            message: error.message,
            status: false,
        });
    }
}
