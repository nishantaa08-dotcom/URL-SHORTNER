import {z} from "zod";
//login schema
export const loginschema=z.object({
    username:z.string().min(1,{message:"minimum one characters allowed"}).max(10,{message:"maximum ten characters allowed"}).regex(/^[a-zA-Z]+$/,{
        message:"username must contain small letters and capital letters",
    }),
    password:z.string().min(1).max(8,{message:"maximum eight characters allowed"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/,{
        message:"password must contian one small,capital letters and one digit",
    })
});
//signup schema
export const signupschema=z.object({
    name:z.string().min(2,{message:"minimum two charactetrs allowed"}).max(10,{message:"maximum ten characters allowed"}).regex(/^[a-zA-Z]+$/,{
        message:"name must contain small and capital letters",
    }),
    email:z.email(),
    password:z.string().min(2,{message:"minimum two characters allowed"}).max(8,{message:"maximum eight characters allowed"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/,{
        message:"password must contian one small,capital letters and one digit",
    }),
    confirmpassword:z.string().min(1,{message:"minimum one characters allowed"}).max(8,{message:"maximum eight characters allowed"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/,{
        message:"password must contian one small,capital letters and one digit",
    }),
}).refine((data)=>{
        return data.password===data.confirmpassword;
        },
        {
            message:"password and confirmpassword are not same",
            path: ["confirmpassword"]
        }
);
//data schema
export const dataschema= z.object({
    url:z.url(),
    shortcode:z.string().min(2,{message:"shortcode Atleast have two characters"}).max(6,{message:"Shortcode Atleast have six characters"}).regex(/^(?=.*[0-9])(?=.*[a-z]).+$/,{
        message:"shortcode must exit small letters and digit only"
    }),
});
