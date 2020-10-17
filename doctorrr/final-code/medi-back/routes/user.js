const express = require('express');
const router = express.Router();

const {
    signup,
    signin,
    signout,
    requireSignin, 
    isAuth, 
    userById, 
    read, 
    update
} = require("../controllers/user");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update);

router.param('userId', userById);

module.exports = router;