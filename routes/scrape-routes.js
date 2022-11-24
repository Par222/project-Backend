const express=require('express')
const router=express.Router();
const scrapeController=require("./controllers/scrape-controller")

router.get('/about',scrapeController.fetchAboutInfo)
router.get('/dep',scrapeController.fetchDepInfo)
module.exports=router