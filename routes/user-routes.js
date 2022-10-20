const express=require('express')
const router=express.Router();
const userController=require('./controllers/user-controller');
const {check}=require('express-validator')

router.get('/',userController.showUser)
router.post('/signup',
[check('email').normalizeEmail().isEmail(),
check('password').isLength({min:6})],userController.createUser)
router.post('/login',
[check('email').normalizeEmail().isEmail(),
check('password').isLength({min:6})]
,userController.loginUser)
module.exports=router