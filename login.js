function SigninValidation(){
  let Id=document.getElementById("signin_id").value;
  let Password=document.getElementById("signin_password").value;
  if(Id==="" || Password==="")
  {
    return false ;
  }
  else{
    let params={
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
              Id:Id,
              Password:Password,
      }),
      method:"POST"
    }
    fetch('http://localhost:4000/signin',params)
    .then(response=>response.json())
    .then(data => { 
      console.log(data.valid);
      if(data.valid===1){
        alert("Login Succesfull")
        location.href='./admin.html'+"?Id="+data.info.Id+"?Name="+data.info.Name+"?Email="+data.info.Email+"?Gender="+data.info.Gender+"?Phone="+data.info.Phone;
      }
      else{
        prompt(data.valid)
        console.log("User Not Found With this type");
        return false;
      }
    })
  }
}

