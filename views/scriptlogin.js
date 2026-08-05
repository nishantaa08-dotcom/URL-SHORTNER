const btn=document.getElementById("btn");
const body=document.getElementById("maincontent");
const label=document.getElementsByClassName("label");
const input0=document.getElementsByClassName("input0");
const input=document.getElementById("look");
const spam=document.getElementsByClassName("spam");
const loginname=document.getElementById("login");
const login=document.getElementsByClassName("login");
const darkthemebutton=document.getElementById("dark");
const popup=document.getElementById("popup");
const form=document.getElementById("form");
darkthemebutton.addEventListener("click",()=>{
    body.classList.toggle("bodydarktheme");
    input.classList.toggle("inputdarktheme");
    spam[0].classList.toggle("labeldarktheme");
    loginname.classList.toggle("labeldarktheme");
    login[0].classList.toggle("logindarktheme");
    btn.classList.toggle("btndatktheme");
    for(let i=0;i<label.length;i++){
        label[i].classList.toggle("labeldarktheme");
    };
    for(let j=0;j<input0.length;j++){
        input0[j].classList.toggle("inputdarktheme");
    };
    popup.classList.add("popupdarktheme");
});
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
                window.location.href="/internalerror";
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