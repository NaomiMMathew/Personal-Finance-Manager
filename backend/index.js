const express=require('express')
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require("body-parser");
const registerRoutes=require('./Routes/Resgister-routes')
const loginRoutes=require('./Routes/Login-routes')
const  transactionRoutes=require('./Routes/Transaction-routes');


const app=express();  
const port=3001;  
 app.use(express.json()) ;
app.use(cors());
app.use(bodyParser.json());







//connect to mongoDB
mongoose.connect('mongodb://localhost:27017/personalfinancemananger')
.then(()=>{ console.log('Connected to MongoDB')})
.catch((err)=>{ console.log('Error:',err)});

app.use('/api',registerRoutes)
app.use('/api', loginRoutes);
app.use('/api', transactionRoutes);



app.listen(port,()=>{  console.log('Server is running on port 3001')})