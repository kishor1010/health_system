const express=require('express')
const mongoose=require('mongoose')
const Disease= require('../models/disease')
const router=express.Router();

router.get('/',async(req,res)=>{
    const diseases= await Disease.find({})
    res.render('disease/show',{diseases})
})
router.get('/new',(req,res)=>{
    res.render('disease/new')
})
router.post('/new',async(req,res)=>{
    const {name,type}=req.body;
    const disease= await Disease.insertMany({name,type})
    res.redirect('/disease')
})
router.get('/:id',async(req,res)=>{
    const id=req.params.id
    const disease=await Disease.findById(id);
    res.render('disease/showone',{disease})
})
router.get('/edit/:id',async(req,res)=>{
    const id=req.params.id;
    console.log(id)
    const disease=await Disease.findById(id);
    res.render('disease/edit',{disease})
})
router.put('/edit/:id',async(req,res)=>{
    const id=req.params.id
    const {name,type}=req.body
    const disease=await Disease.findByIdAndUpdate(id,{name,type})
    res.redirect('/disease')
})
router.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id
    const disease=await Disease.findByIdAndRemove(id)
    res.redirect('/disease')
})
module.exports=router;