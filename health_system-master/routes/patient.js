const express=require('express')
const mongoose=require('mongoose')
const Patient= require('../models/patient')
const Disease=require('../models/disease')
const router=express.Router();

router.get('/',async(req,res)=>{
    const patients=await Patient.find({})
    res.render('patient/show',{patients})
})
router.get('/new',async(req,res)=>{
    const diseases= await Disease.find({})
    res.render('patient/new',{diseases})
})
router.post('/new',async(req,res)=>{
    const {firstname,lastname,age,sex,diseases_id}=req.body
    
    const patient= new Patient({firstname,lastname,age,sex});
    const disease=await Disease.findById(diseases_id)
    patient.diseases.push(disease)
    await patient.save();
    res.redirect('/patient')
})
router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    const patient=await Patient.findById(id).populate('diseases');
    res.render('patient/showone',{patient})
})
router.get('/edit/:id',async(req,res)=>{
    const id=req.params.id
    const patient=await Patient.findById(id).populate('diseases')
    const diseases=await Disease.find({});
    res.render('patient/edit',{patient,diseases})
})
router.put('/edit/:id',async(req,res)=>{
    const id=req.params.id
    const {firstname,lastname,age,sex}=req.body;
    const patient =await Patient.findByIdAndUpdate(id,{firstname,lastname,age,sex});
    res.redirect(`/patient/${id}`)
})
router.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id
    const patient=await Patient.findByIdAndDelete(id)
    res.redirect('/patient')
})
module.exports=router