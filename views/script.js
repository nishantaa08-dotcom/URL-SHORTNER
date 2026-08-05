const darkthemebutton=document.getElementById("dark");
const body=document.getElementById("main");
const input=document.getElementsByClassName("input0");
const input1=document.getElementsByClassName("input1");
const label=document.getElementsByClassName("label");
const btn=document.getElementById("btn");
const signup=document.getElementsByClassName("signup");
const popup=document.getElementById("popup");
const form=document.getElementById("form");
darkthemebutton.addEventListener("click",()=>{
    signup[0].classList.toggle("signupdarktheme");
    btn.classList.toggle("btndarktheme");
    body.classList.toggle("maincontent");
    for(let i=0;i<input.length;i++){
        input[i].classList.toggle("darktheme");
    }
    input1[0].classList.toggle("darktheme");
    for(let i=0;i<label.length;i++){
        label[i].classList.toggle("darklabeltheme");
    };
    popup.classList.add("popupdarktheme");
});
const repassword=document.getElementById("repass");
const password=document.getElementById("pass");
const checkbox=document.getElementById("look");
checkbox.addEventListener("change",()=>{
    if(checkbox.checked){
        password.type="text";
        repassword.type="text";
    }
    else{
        password.type="password";
        repassword.type="password";
    }
});
const signingup=(obj)=>{
    console.log("data fetched");
    return fetch("/api/signup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(obj)
    });
};
form.addEventListener("submit",(event)=>{
    console.log("form submitted sucessfully")
    event.preventDefault();
    const form=document.getElementById("form");
    const formdata=new FormData(form);
    const name=formdata.get("name");
    const email=formdata.get("email");
    const password=formdata.get("password");
    const confirmpassword=formdata.get("conformpassword");
    const obj={name,email,password,confirmpassword};
    const fetchdata= signingup(obj);
    fetchdata.then(async(response)=>{
        if(!response.ok){
            if(response.status===500){
                console.log("500");
                window.location.href="/internalerror";
                return;
            }
            const data = await response.json();
            alert(data.message);
        }
        else{
            window.location.href ="/loginpage";
            popup.style.right="20px";
            setTimeout(() => {
                popup.style.display="none";
            }, 3000);
        }
    })
});