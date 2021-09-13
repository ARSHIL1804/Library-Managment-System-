Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
function  loaddata()
{
  var url = decodeURIComponent(document.location.href),
  params = url.split('?')
  let id=document.getElementById("adminid");
  let name=document.getElementById("adminname");
  let gender=document.getElementById("admingender");
  let mail=document.getElementById("adminmail");
  let phone=document.getElementById("adminphone");
  id.innerHTML=params[1].split('=')[1];
  name.innerHTML=params[2].split('=')[1];
  mail.innerHTML=params[3].split('=')[1];
  gender.innerHTML=params[4].split('=')[1];
  phone.innerHTML=params[5].split('=')[1];
}
class admin{
   constructor()
   {
    this.dash=document.getElementById("dashboard");
    this.stud=document.getElementById("student");
    this.issue=document.getElementById("issue");
    this.book=document.getElementById("book")
    this.dashmenu=document.getElementById("dashmenu")
    this.studmenu=document.getElementById("studmenu")
    this.issuemenu=document.getElementById("issuemenu")
    this.bookmenu=document.getElementById("bookmenu")
   }
   gotobook=function(){
    const heading=["BookId","Name","ISBN","Author","Publisher","Edition","Pages","Available","Issued"];
    let booktable=document.getElementById('booktable');
    booktable.innerHTML=""
    let tr=document.createElement("tr");
    for (let index = 0; index < heading.length; index++) {
      let th=document.createElement("th");
      th.setAttribute("align","left");
      th.setAttribute("valign","middle");
      th.innerHTML=heading[index];
      tr.appendChild(th);
    }
    booktable.appendChild(tr);
    this.dash.style.display="none";
    this.stud.style.display="none";
    this.issue.style.display="none";
    this.book.style.display="flex";
    this.dashmenu.classList.remove("active");
    this.studmenu.classList.remove("active");
    this.issuemenu.classList.remove("active");
    this.bookmenu.classList.add("active");
    {
      let params={
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
        }),
        method:"POST"
      }
      fetch('http://localhost:4000/book',params)
      .then(response=>response.json())
      .then(res => { 
        let data=res.data;
        for (let index = 0; index < data.length; index++) {
          let tr=document.createElement("tr");
          for (let i in data[index]) {  
            let td=document.createElement("td");
            td.innerHTML=data[index][i];
            tr.appendChild(td);
          }
          booktable.appendChild(tr);
        }
      })
    }
  }
  gotodash=function()
  {
    this.dash.style.display="flex";
    this.stud.style.display="none";
    this.issue.style.display="none";
    this.book.style.display="none";
    this.dashmenu.classList.add("active");
    this.studmenu.classList.remove("active");
    this.issuemenu.classList.remove("active");
    this.bookmenu.classList.remove("active");

  }
  gotostud=function()
  {
    const heading=["Id","Name","Email","Phone","Gender","Department","Semester","Divison","Remove"];
    let studenttable=document.getElementById('studenttable')
    studenttable.innerHTML=""
    let tr=document.createElement("tr");
    for (let index = 0; index < heading.length; index++) {
      let th=document.createElement("th");
      th.setAttribute("align","left");
      th.setAttribute("valign","middle");
      th.innerHTML=heading[index];
      tr.appendChild(th);
    }
    studenttable.appendChild(tr);
    this.dash.style.display="none";
    this.stud.style.display="flex";
    this.issue.style.display="none";
    this.book.style.display="none";
    this.dashmenu.classList.remove("active");
    this.studmenu.classList.add("active");
    this.issuemenu.classList.remove("active");
    this.bookmenu.classList.remove("active");
    {
      let params={
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
        }),
        method:"POST"
      }
      fetch('http://localhost:4000/student',params)
      .then(response=>response.json())
      .then(res => { 
        let data=res.data;
        for (let index = 0; index < data.length; index++) {
          let tr=document.createElement("tr");
          for (let i in data[index]) {  
            let td=document.createElement("td");
            td.innerHTML=data[index][i];
            tr.appendChild(td);
          }
          let td=document.createElement("td");
          td.innerHTML="<button type=\"button\"\">Remove</button>";
          td.onclick=removestudent;
          tr.appendChild(td);
          studenttable.appendChild(tr);
        }
      })
    }
  }  
  gotoissue=function()
  {
    const heading=["Student Id","Student Name","Book Id","Book Name","Issued Date","Due Data","Return","Fine"];
    let reporttable=document.getElementById('reporttable')
    reporttable.innerHTML=""
    let tr=document.createElement("tr");
    for (let index = 0; index < heading.length; index++) {
      let th=document.createElement("th");
      th.setAttribute("align","left");
      th.setAttribute("valign","middle");
      th.innerHTML=heading[index];
      tr.appendChild(th);
    }
    reporttable.appendChild(tr);
    this.dash.style.display="none";
    this.stud.style.display="none";
    this.issue.style.display="flex";
    this.book.style.display="none";
    this.dashmenu.classList.remove("active");
    this.studmenu.classList.remove("active");
    this.issuemenu.classList.add("active");
    this.bookmenu.classList.remove("active");
    {
      let params={
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
        }),
        method:"POST"
      }
      fetch('http://localhost:4000/bookreport',params)
      .then(response=>response.json())
      .then(res => { 
        let data=res.data;
        for (let index = 0; index < data.length; index++) {
          let tr=document.createElement("tr");
          for (let i in data[index]) {  
            let td=document.createElement("td");
            td.innerHTML=data[index][i];
            tr.appendChild(td);
          }
          let Return=document.createElement("td");
          Return.innerHTML="<a href=\"#\">Return</a>"
          Return.onclick=Returned;
          let curtime=new Date();
          console.log(curtime);
          let fine=document.createElement("td");
          let duedate=data[index].duedate.split('-');
          duedate=new Date(duedate[0],duedate[1]-1,duedate[2]);
          console.log(duedate);
          console.log(curtime-duedate)
          if((curtime-duedate) > 0)
          {
            fine.innerHTML=((curtime-duedate)/(1000*60*60*24));
          }
          else{
          fine.innerHTML=0;
          }
          tr.appendChild(Return);
          tr.appendChild(fine)
          reporttable.appendChild(tr);
        }
      })
    }

  }
}
Admin=new admin();
function gotobook(){
  Admin.gotobook();  
}
function gotodash()
{
  Admin.gotodash();
}
function gotostud()
{
  Admin.gotostud();
}
function gotoissue()
{
  Admin.gotoissue();
}
function closebook()
{
  document.getElementById('bookname').value="",
  document.getElementById('bookid').value="",
  document.getElementById('isbn').value="",
  document.getElementById('author').value="",
  document.getElementById('publisher').value="",
  document.getElementById('edition').value="",
  document.getElementById('pages').value="",
  document.getElementById('quantity').value="";
  document.getElementById('addbook').style.display="none";
}
function openbook()
{
  document.getElementById('addbook').style.display="flex";
}
function closestudent()
{
  document.getElementById('studentname').value="";
  document.getElementById('studentid').value="";
  document.getElementById('studentemail').value="";
  document.getElementById('studentphone').value="";
  document.getElementById('studentgender').value="";
  document.getElementById('studentdepartment').value="";
  document.getElementById('studentsemester').value="";
  document.getElementById('studentdivision').value    ="";
  document.getElementById('addstudent').style.display="none";
}
function openstudent()
{
  document.getElementById('addstudent').style.display="flex";
}
function closeissue()
{
  document.getElementById('sname').value="";
  document.getElementById('sid').value="";
  document.getElementById('bid').value="";
  document.getElementById('bname').value="";
  document.getElementById('currentdate').value="";
  document.getElementById('days').value="";
  document.getElementById('issuebook').style.display="none";
}
function openissue()
{  document.getElementById('issuebook').style.display="flex";
   let today=new Date();
   today=[today.getFullYear(), String(today.getMonth()+1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
   document.getElementById('currentdate').value=today;
}
function savebook()
{
  let name=document.getElementById('bookname').value,
        id=document.getElementById('bookid').value,
        isbn=document.getElementById('isbn').value,
        author=document.getElementById('author').value,
        publisher=document.getElementById('publisher').value,
        edition=document.getElementById('edition').value,
        pages=document.getElementById('pages').value,
        quantity=document.getElementById('quantity').value;
  if(name==="" || id==="" || isbn==="" || author==="" || publisher==="" || edition==="" || pages==="" || quantity==="") 
  {
    alert("Can not add empty entry");
    return
  }
  else if( isNaN(edition) || isNaN(pages) || isNaN(quantity) )
  {
    alert("There is an error in edition,pages or quantity.All must be number");
    return 
  }
  {
    let params={
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name,
        id,
        isbn,    
        author,   
        publisher,
        edition,
        pages,   
        quantity
      }),
      method:"POST"
    }
    fetch('http://localhost:4000/addbook',params)
    .then(response=>response.json())
    .then(res=>{
      alert(res.msg);
      closebook();
      Admin.gotobook();
    })
  }
}

function searchbook(){
  console.log('here we go')
  let name=document.getElementById('bookname'),
  id=document.getElementById('bookid'),
  isbn=document.getElementById('isbn'),
  author=document.getElementById('author'),
  publisher=document.getElementById('publisher'),
  edition=document.getElementById('edition'),
  pages=document.getElementById('pages');
  if(id.value==="")
  {
    alert("Insert Id for search");
    return;
  }
  {
    let params={
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
       id:id.value
      }),
      method:"POST"
    }
    fetch('http://localhost:4000/searchbook',params)
    .then(response=>response.json())
    .then(res => {
       data=res.data[0];
       if(data===undefined)
       {
        alert("No Record Found");
        return; 
      }
       name.value=data.Bookname;
       isbn.value=data.ISBN;
       author.value=data.Author;
       publisher.value=data.Publisher;
       edition.value=data.Edition;
       pages.value=data.Pages;
  })
  } 
}
function savestudent()
{
  let name=document.getElementById('studentname').value,
        id=document.getElementById('studentid').value,
        email=document.getElementById('studentemail').value,
        phone=document.getElementById('studentphone').value,
        gender=document.getElementById('studentgender').value,
        dep=document.getElementById('studentdepartment').value,
        sem=document.getElementById('studentsemester').value,
        div=document.getElementById('studentdivision').value;
  if(name==="" || id==="" || email==="" || phone==="" || gender==="" || dep==="" || sem==="" || div==="") 
  {
    alert("Can not add empty entry");
    return
  }
  else if (phone.length!=10)
  {
    alert("Invalid Phone Number");
    return 
  }
  else if( isNaN(phone) || isNaN(div) || isNaN(sem))
  {
    alert("There is an error in edition,pages or quantity.All must be number");
    return 
  }
  else if(phone.length>10){
    alert("Invalid Phone Number");
    return
  }
  let params={
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name,
        id,
        email,    
        phone,   
        gender,
        dep,
        sem,   
        div
      }),
      method:"POST"
    }
    
    fetch('http://localhost:4000/addstudent',params)
    .then(response=>response.json())
    .then(res=>{
      if(res.status===1)
      {
        alert("Student added");
        closestudent();
        Admin.gotostud();
      }    
      else{
        alert("Student wih this id already present in database");
        return
      }
    })

}

function removestudent(e){
  let id=e.currentTarget.parentElement.childNodes[0].innerText;
  let params={
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
      id
    }),
    method:"POST"
  }
  
  fetch('http://localhost:4000/removestudent',params)
  .then(response=>response.json())
  .then(res=>{
    alert(res.msg);
    closestudent();
    Admin.gotostud();
  })
}
function  issue(){
  let res=search();
  console.log(res);
  if(res)
   {
    let bid=document.getElementById('bid').value;
    let sid=document.getElementById('sid').value;
    let bname=document.getElementById('bname').value;
    let sname=document.getElementById('sname').value;
    let issuedate=document.getElementById('currentdate').value;
    let day=document.getElementById('days').value;
    let arr=issuedate.split('-');
    let date=new Date(arr[0],parseInt(arr[1])-1,arr[2]);
    console.log(date);
    let duedate=date.addDays(parseInt(day));
    console.log(duedate)
    duedate=[duedate.getFullYear(),String(duedate.getMonth()+1).padStart(2, '0'), String(duedate.getDate()).padStart(2,'0')].join('-');
    console.log(duedate,"grkngr");
    let params={
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
         sid,bid,sname,bname,issuedate,duedate
        }),
        method:"POST"
      }
      fetch('http://localhost:4000/issuebook',params)
      .then(response=>response.json())
      .then(res => {
        alert(res.msg);
        closeissue()
        gotoissue();
       })
  }
}

function search()
{
  let bid=document.getElementById('bid').value;
  let sid=document.getElementById('sid').value;
  if(bid==="" || sid==="")
  {
    alert("Enter Student  Id and Book Id");
    return false;
  }
  let params={
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
       id:bid
      }),
      method:"POST"
    }
    fetch('http://localhost:4000/searchbook',params)
    .then(response=>response.json())
    .then(res => {
       data=res.data[0];
       if(data===undefined)
       {
        alert("No Record Found For Entered Book Id");
        return false; 
      }
      document.getElementById('bname').value=data.Bookname;
      }).then(()=>{
          let params={
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
            id:sid
            }),
            method:"POST"
          }
          fetch('http://localhost:4000/searchstudent',params)
          .then(response=>response.json())
          .then(res => {
            data=res.data[0];
            if(data===undefined)
            {
              alert("No Record Found For Entered Student Id");       
              return false; 
            }
            document.getElementById('sname').value=data.studentname;
          })
  })
  return true;
}
function  Returned(e){
  let sid=e.currentTarget.parentElement.childNodes[0].innerText;
  let bid=e.currentTarget.parentElement.childNodes[2].innerText;
  let params={
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
      sid,
      bid
    }),
    method:"POST"
  }
  
  fetch('http://localhost:4000/bookreturned',params)
  .then(response=>response.json())
  .then(res=>{
    alert(res.msg);
    closeissue();
    Admin.gotoissue();
  })
}