const express=require('express');
const router=express.Router();
const Doctor=require('./controllers/doctor-controller')
const {check}=require('express-validator')
const doctorController=new Doctor();

router.get("/:pid", doctorController.getDoctorById);
router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("des").isLength({ min: 5 }),
    check("expertise").not().isEmpty(),
    check("age").not().isEmpty(),
    check("image").not().isEmpty(),
    check("fees").not().isEmpty(),
  ],
  doctorController.createDoctor
);
router.patch("/:pid", [], doctorController.updateDoctorById);
router.delete("/:pid", doctorController.deleteDoctorById);
router.get("/search/:name", doctorController.searchDoctor);
router.get("/", doctorController.getAllDoctor);

router.post(
  "/signup",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  doctorController.registerDoctor
);
router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  doctorController.loginDoctor
);

module.exports = router;
