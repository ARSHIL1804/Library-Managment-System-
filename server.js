const express=require('express')
const app=express()
const mysql=require('mysql')
const bodyParser=require('body-parser')
const cors=require('cors')
const { response } = require('express')
const { copyFileSync } = require('fs')
app.use(express.static(__dirname));
const db=mysql.createPool({
  host: 'localhost',
  user:'root',
  password: '',
  database: 'Library'
});
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.post('/signin',(req,res)=>{
  let sql="SELECT Id,Name,Email,Phone,Gender from  admin WHERE Id=? and Password=?";
  db.query(sql,[req.body.Id,req.body.Password],(e,results)=>{
    if(e){
      console.log(e);
    }
    console.log(results);
    if (results.length>0){
      return res.json({
        valid:1,
        info:results[0]
      })
    }
    else {
      return res.json({
        valid:0
      })
    }
  }) 
})
app.post('/book',(req,res)=>{
  console.log("here")
  let sql="SELECT Bookid,Bookname,ISBN,Author,Publisher,Edition,Pages,Available,Issued from book"
  db.query(sql,(e,results)=>{
    if(e){
      console.log(e);
    }
    return res.json({
      data:results
    })
  }) 

})
app.post('/student',(req,res)=>{
  console.log("here")
  let sql="SELECT studentid,studentname,email,phone,gender,department,semester,division from student"
  db.query(sql,(e,results)=>{
    if(e){
      console.log(e);
    }
    return res.json({
      data:results
    })
  }) 
})
app.post('/bookreport',(req,res)=>{
  console.log("here")
  let sql="SELECT sid,sname,bid,bname,issuedate,duedate from bookreport"
  db.query(sql,(e,results)=>{
    if(e){
      console.log(e);
    }
    return res.json({
      data:results
    })
  }) 
})

app.post('/addbook',(req,res)=>{
  let sql="SELECT Bookid,Available from book WHERE Bookid=?"
  db.query(sql,[req.body.id],(e,results)=>{
    if(e){
      console.log(e);
    }
    console.log(results);
    if (results.length===0)
    {
      sql="INSERT INTO book (Bookid,Bookname,Publisher,Author,ISBN,Edition,Pages,Available) VALUES (?,?,?,?,?,?,?,?)"
      db.query(sql,[req.body.id,req.body.name,req.body.publisher,req.body.author,req.body.isbn,req.body.edition,req.body.pages,req.body.quantity],(e,results)=>{
        if(e){
          console.log(e);
        }
        return res.json({
          msg:"New Book INserted"
        })
      }) 
    }
    else{
      let add=parseInt(req.body.quantity,10);
      let New=results[0].Available+add;
      sql= "UPDATE book SET Available=? WHERE Bookid=?";
      db.query(sql,[New,req.body.id],(e,results)=>{
        if(e){
          console.log(e);
        }
        return res.json({
          msg:"Book Quantity Updated"
        })
      }) 
    }
  })
  console.log(req.body)
})
app.post('/searchbook',(req,res)=>{
  let sql="SELECT Bookname,ISBN,Author,Publisher,Edition,Pages from book WHERE Bookid=?"
  db.query(sql,[req.body.id],(e,results)=>{
    if(e){
      console.log(e);
    }
    console.log(results);
    return res.json({
      data:results
    })
  }) 
})


app.post('/addstudent',(req,res)=>{
  console.log(req.body.id)
  let sql="SELECT studentid from student WHERE studentid=?"
  db.query(sql,[req.body.id],(e,results)=>{
    if(e){
      console.log(e);
    }
    console.log(results)
    if(results.length>0)
    {
      console.log("0")
    return res.json({
      status:0
    })
    }
    else{
      console.log("0")
      let sql="INSERT INTO student (studentid,studentname,email,phone,gender,department,semester,division) VALUES (?,?,?,?,?,?,?,?)"
      db.query(sql,[req.body.id,req.body.name,req.body.email,req.body.phone,
        req.body.gender,req.body.dep,req.body.sem,req.body.div],(e,results)=>{
        if(e){
          console.log(e);
        }
        return res.json({
          status:1
        })
    })
  }
})
})


app.post('/removestudent',(req,res)=>{
  let sql="DELETE FROM student WHERE studentid=?"
  db.query(sql,[req.body.id],(e,results)=>{
    if(e){
      console.log(e);
    }
    console.log(results);
    return res.json({
      msg:"Student Removed Succesfully"
    })
  }) 
})

app.post('/searchstudent',(req,res)=>{
  let sql="SELECT studentname  from student WHERE studentid=?"
  db.query(sql,[req.body.id],(e,results)=>{
    if(e){
      console.log(e);
    }
    console.log(results);
    return res.json({
      data:results
    })
  }) 
})


app.post('/issuebook',(req,res)=>{
      let sql="INSERT INTO bookreport (sid,sname,bid,bname,issuedate,duedate) VALUES (?,?,?,?,?,?)"
      db.query(sql,[req.body.sid,req.body.sname,req.body.bid,req.body.bname,
        req.body.issuedate,req.body.duedate],(e,results)=>{
        if(e){
          console.log(e);
        }
        return res.json({
          msg:"Book Issue Succesfully"
        })
    })
})

app.post('/bookreturned',(req,res)=>{
  let sql="DELETE FROM bookreport WHERE sid=? and bid=?"
  db.query(sql,[req.body.sid,req.body.bid],(e,results)=>{
    if(e){
      console.log(e);
    }
    console.log(results);
    return res.json({
      msg:"Book Returned Succesfully"
    })
  }) 
})

app.listen(4000,() => {
  console.log("Run on 4000");
})