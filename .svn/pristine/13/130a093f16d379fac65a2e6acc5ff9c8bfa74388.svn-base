const requestController=require('./controllers/request-controller')
const express=require('express');
const router=express.Router();

router.post('/',requestController.createReq)
router.patch('/:pid',requestController.updateReqById)
router.get('/',requestController.getPendingRequest)
router.get('/:pid',requestController.getReqByPatientId)



module.exports=router