const truncateurl=(objecturl)=>{
    if(objecturl.length>=30){
        return objecturl.slice(0,30);
    }
    else{
        return objecturl;
    }
}
const showingdatatoclient=(data)=>{
        document.getElementById("fdata").innerHTML="";
        const objecturl=data.url;
        const shorturl=truncateurl(objecturl);
        const li=document.createElement("li");
        li.innerHTML=`<a href="/s/${data.shortcode}" target="_blank">
        ${window.location.origin}/s/${data.shortcode}</a> - ${shorturl}`;
        document.getElementById("fdata").appendChild(li);
}
const button=document.getElementById("btn");
const fetching=(obj)=>{
    console.log("mainpagedatasendingtoserver");
    return fetch("/api/data",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(obj)
    })
}
button.addEventListener("click",(event)=>{
    event.preventDefault();
    const form=document.getElementById("data-url");
    const formdata=new FormData(form);
    const url=formdata.get("url");
    const shortcode=formdata.get("shortcode");
    const obj={url,shortcode};
    let responsedata= fetching(obj);
    responsedata.then(async(response)=>{
        if(!response.ok){
            try{
                if(response.status===500){
                    window.location.href="/500.html";;
                    return;
                }
                const finalresponse = await response.json();
                if(finalresponse.sucess===false){
                    window.location.href = "/loginpage";
                }
                else{
                    alert(finalresponse.message);
                }
            }
            catch(error){
                console.log(error);
            }
        }
        else{
            try{
                const usersdata= await response.json();
                showingdatatoclient(usersdata.message);
            }
            catch(error){
                console.log(error);
            }
        }
        
    });
});
