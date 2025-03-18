const Register=require('../models/Register-model')


const createRegister=async(req,res)=>{
    const{username,email,password}=req.body

try{
const register=await Register.create({username,email,password}) //workout will required in index.js
res.status(200).json(register)
}
catch(error){
res.status(400).json({error:error.message})
}
};




module.exports={createRegister}
