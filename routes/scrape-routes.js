const express=require('express')
const router=express.Router();
const scrapeController=require("./controllers/scrape-controller")

router.get('/about',scrapeController.fetchAboutInfo)
router.get('/dep',scrapeController.fetchDepInfo)
router.get('/service',scrapeController.fetchServiceInfo)
module.exports=router