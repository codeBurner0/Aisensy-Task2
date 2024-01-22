const express = require('express');
const contactroute = express();
const cors=require('cors')
const multer=require('multer')
const Contact=require('../Database/models/contactModel')
const csv=require('csvtojson');
const excelTOJson=require('convert-excel-to-json');
const path=require('path');
contactroute.use(express.json());
contactroute.use(cors());
contactroute.use(express.static(path.resolve(__dirname,'public')))

var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

var upload=multer({storage:storage})
const importContactcsv =async(req,res)=>{
    try {
        csv().fromFile(req.file.path).then(async(resp)=>{
            console.log(resp)
            try {
                await Contact.insertMany(resp)
                res.send({status:200,success:true,msg:resp})
            } catch (error) {
                res.send({status:400,success:false,msg:error.message})
            }
        })
    } catch (error) {
        res.send({status:400,success:false,msg:error.message})
    }
}

const importContactxlsx =async(req,res)=>{
    try {
        
        if(req.file?.filename==null || req.file?.filename=='undefined'){
            res.send({status:400,success:false,msg:"error.message"})
        }else{
            var filePath=req.file.path;
            const excelData=excelTOJson({
                sourceFile:filePath,
                header:{
                    rows:1
                },
                columnToKey:{
                    "*":"{{columnHeader}}"
                }
            });
            try {
                await Contact.insertMany(excelData.hello)
                res.send({status:200,success:true,msg:excelData.hello})
            } catch (error) {
                res.send({status:400,success:false,msg:error.message})
            }

        }
    } catch (error) {
        res.send({status:400,success:false,msg:error.message})
    }
}

contactroute.post('/contacts',upload.single('file'),importContactcsv)
contactroute.post('/contactsxlsx',upload.single('file'),importContactxlsx)

contactroute.post('/all-contacts',async(req,res)=>{
    var result=await Contact.find({}).sort(`${req.body.sorting} : 1`);
    res.status(200).json({msg:result})
})

module.exports=contactroute