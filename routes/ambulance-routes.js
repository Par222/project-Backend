const express=require('express');
const router=express.Router();
const ambulanceController=require('./controllers/ambulance-controller')
const {check}=require('express-validator')


router.get('/',ambulanceController.getAllAmbulance)
router.get('/:pid',ambulanceController.getAmbulanceByPatientId)
router.post('/',[check('plate').not().isEmpty(),
check('status').not().isEmpty()],ambulanceController.createAmbulance)
router.patch('/:pid',[],ambulanceController.updateAmbulanceById)
router.delete('/:pid',ambulanceController.deleteAmbulanceById)





module.exports=router