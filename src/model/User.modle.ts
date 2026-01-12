import mongoose, { Schema, Document}  from "mongoose";

export interface User extends Document{

    email:string,
    password?:string,
    isVerified:boolean,
    verifyCode:string,
    verifyCodeExpiry:Date,
    providers:string[]
    createdAt:Date,
}

const UserSchema:Schema<User> = new Schema({
    email:{
        type:String,
        unique:true,
        required:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please use a valid email"]      //REGEX (regular expression for email validation)
    },
    
        password:{
            type:String,
            default:null,
            
        },
        verifyCode:{
        type:String,
       
        
    },
    verifyCodeExpiry:{
        type:Date,
        
        
    },
    isVerified:{
        type:Boolean,
        default:false
        
    },
    providers:{
        type:[String],
        required:[true,"Provider is required"]
    },
   
    
},
{
timestamps: true 
}
    
    
)

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User",UserSchema)
export default UserModel