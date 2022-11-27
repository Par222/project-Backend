const express=require('express')
const router=express.Router();
const Patient=require('./controllers/user-controller');
const {check}=require('express-validator')
const userController=new Patient()
router.get('/',userController.showUser)
router.get('/:uid',userController.getUserById)
router.post('/signup',
[check('email').normalizeEmail().isEmail(),
check('password').isLength({min:6})],userController.createUser)
router.post('/login',
[check('email').normalizeEmail().isEmail(),
check('password').isLength({min:6})]
,userController.loginUser)
router.patch('/:uid',userController.updateUserById)
module.exports=router