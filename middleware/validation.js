
export const validationmiddleware=(schema)=>{
    return(req,res,next)=>{
        let result=schema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({
                message:result.error.issues[0].message,
                path:result.error.issues[0].path,
                sucess:true,
            });
        }
        next();
    }
}