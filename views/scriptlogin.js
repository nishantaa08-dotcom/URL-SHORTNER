const btn=document.getElementById("btn");
const password=document.getElementById("pass");
const checkbox=document.getElementById("look");
checkbox.addEventListener("change",()=>{
    if(checkbox.checked){
        password.type="text";
    }
    else{
        password.type="password";
    }
});
const loginup=(obj)=>{
    return fetch("/api/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(obj)
    });
};
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const form=document.getElementById("form");
    const formdata=new FormData(form);
    const username=formdata.get("username");
    const password=formdata.get("password");
    const obj={username,password};
    let fetchdata= loginup(obj);
    fetchdata.then(async(response)=>{
        if(!response.ok){
            if(response.status===500){
                window.location.href="/500.html";
                return;
            }
            const data = await response.json();
            alert(data.message);
        }
        else{
            window.location.href ="/mainpage";
            popup.style.right="20px";
            setTimeout(() => {
                popup.style.display="none";
            }, 3000);
        }
    });
});