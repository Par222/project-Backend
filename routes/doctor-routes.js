const express=require('express');
const router=express.Router();
const doctorController=require('./controllers/doctor-controller')
const {check}=require('express-validator')


router.get('/:pid',doctorController.getDoctorById)
router.post('/',[check('name').not().isEmpty(),
check('des').isLength({min:5}),
check('expertise').not().isEmpty(),check('age').not().isEmpty(),check('image').not().isEmpty(),check('fees').not().isEmpty()],doctorController.createDoctor)
router.patch('/:pid',[],doctorController.updateDoctorById)
router.delete('/:pid',doctorController.deleteDoctorById)
router.get('/search/:name',doctorController.searchDoctor)
router.get('/',doctorController.getAllDoctor)



module.exports=router