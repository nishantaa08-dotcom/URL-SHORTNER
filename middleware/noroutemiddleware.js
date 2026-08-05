import path from "path";

export const Noroutemiddleware=(req,res)=>{
    return res.status(404).sendFile(path.join(process.cwd(),"mainurlpage","404.html"));
}