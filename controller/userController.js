

const User = require('../schema/userSchema');
const axios = require('axios');
const nodemailer = require('nodemailer');

//To GetAll UserDetails
const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.json({ users: users });
}


//To post 
const UserDetails = async (req, res) => {
    const user = new User(req.body);
    user.save((error, result) => {
        if (error) {
            res.json({ status: false });
        } else {
            res.json({ status: true });
        }
    })
}

//To Find a Particular User
const getParticularUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    res.json({ user: user });
}

//To update
const UpdateUser = async (req, res) => {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
    res.json({ updated: user });
}



//Delete

const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete({ _id: req.params.id });
    res.json({ deleted: user });
}

//Axios

const findDistance = async (req, res) => {

    const s_lat = req.body.s_lat;
    const s_lng = req.body.s_lng;
    const d_lat = req.body.d_lat;
    const d_lng = req.body.d_lng;

    const dist = axios.get("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + s_lat + "," + s_lng + "&destinations=" + d_lat + "," + d_lng + "&key=AIzaSyDop9-AriW2sANSeThYlqixD0yHR8UL4FY ")

        .then((response) => {
            res.json({ results: response.data })
            console.log(response)
        })

}



//NodeMailer

var transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
        user: 'asathishkumar54@gmail.com',
        pass: 'lezmrrmgryeqfvxr'
    }
});

const mailOptions = {
    from: 'asathishkumar54@gmail.com', // sender address
    to: 'asathishkumar54@gmail.com', // list of receivers
    subject: 'lezmrrmgryeqfvxr', // Subject line
    html: `
      <h1>Hello world</h1>
    `,            // plain text body
}
transporter.sendMail(mailOptions, function (err, info) {
    if (err)
        console.log(err)
    else
        console.log(info);
});


module.exports = { getAllUsers, UserDetails, getParticularUser, UpdateUser, deleteUser, findDistance };