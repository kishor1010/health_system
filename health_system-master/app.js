const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const ejsMate= require('ejs-mate')
const methodOverride= require('method-override')
const cookieParser= require('cookie-parser')
const session = require('express-session')
const diseaseRoutes=require('./routes/disease')
const patientRoutes=require('./routes/patient')

mongoose.connect('mongodb://localhost:27017/HealthManagement',{
    useNewUrlParser:true,   
    useUnifiedTopology:true
});
const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'))
db.once('open',()=>{
    console.log('database connected')
})
const Disease=require('./models/disease')


require('dotenv').config();

app.use(methodOverride('_method'))
app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));

const port=process.env.PORT||4000;



app.get('/',(req,res)=>{
        res.render('homepage')
})

app.use('/disease',diseaseRoutes)
app.use('/patient',patientRoutes)
app.listen(4000,()=>{
    console.log('server started')
})