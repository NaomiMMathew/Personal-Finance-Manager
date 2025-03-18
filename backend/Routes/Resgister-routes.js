const express=require("express")
const{createRegister}=require('../controllers/Register-controller')
const router=express.Router()

router.post('/register',createRegister)

module.exports=router