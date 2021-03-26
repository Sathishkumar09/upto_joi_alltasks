const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const { storeUserValidator } = require('./validation/userValidation');

const { getAllUsers, UserDetails, getParticularUser, UpdateUser, deleteUser, findDistance } = require('./controller/userController');


async function connectDB() {
    await mongoose.connect('mongodb://127.0.0.1:27017/projects_together', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}


connectDB();



//routes

const router = express.Router();


router.get('/users', getAllUsers);
router.post('/user', UserDetails);
router.get('/user/:id', getParticularUser);
router.put('/user/:id', UpdateUser);
router.delete('/user/:id', deleteUser);
router.post('/distance', findDistance);    //Axios
router.post('/user', storeUserValidator, UserDetails);  //validation using joi

app.use('/api/v1', router);





app.listen(9090, () => {
    console.log('App Running On Port 9090');
});