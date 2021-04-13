const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql');
const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'password',
    database:'node_crud'
})
app.use(cors());
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}));
app.get('/api/get',(req,res)=>{
    const sqlselect = "SELECT * FROM   tasktable "
    db.query(sqlselect,(err,result)=>{
        res.send(result)
        
    });
})

app.post('/api/insert',(req,res)=>{
    const t= req.body.taskname
    const sqlinsert="INSERT INTO  tasktable (taskname) VALUES(?);"
    db.query(sqlinsert,[t],(err,result)=>{
        console.log(result);
       
    });
})

// app.get('/',(req,res)=>{
//     res.send("hai");
//     // const sql= "insert into tasktable(taskname) values('neww');"
//     // db.query(sql,(err,result)=>{
//     //     res.send("hai");
//     // })
    
// })

app.listen(3002,()=>{
    console.log("running on port  3002");
});