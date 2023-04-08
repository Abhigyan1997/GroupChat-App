async function signup(event) {
    try{
        event.preventDefault();
        const obj = {
            name:event.target.name.value,
            email:event.target.email.value,
            phone:event.target.phone.value,
            password:event.target.password.value
        }
        
     const response= await axios.post('http://localhost:4000/users/signup',obj)
        if(response.status=201){
            window.location.href="./login.html"
            alert ("Successfull Signup")
            console.log(response);
        }
        else{
            throw new Error('failed to signup')
        }

        }
    catch(err){
        alert("User alredy Exist");
        document.body.innerHTML=`<div style="color:red;">${err}</div>`;
    }
}