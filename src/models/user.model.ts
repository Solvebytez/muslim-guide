import { model, Schema } from "mongoose";
import bycript from "bcryptjs"

export interface IUser extends Document {
    email:string;
    password?:string;
    name:string;  
    phone?:string;
    role:string;
    isVerified:boolean;
    avatar: Schema.Types.ObjectId | null;
    otp: string | null;
    otp_expiry: Date | null;
    status:string;
    provider:string;
}

const userSchema = new Schema<IUser>({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,       
        select:false
    },
    name:{
        type:String,
        required:true
    },
    provider:{
        type:String,
        enum:["local","google","facebook"],
        default:"local"
    },
    phone:{
        type:String,        
    },   
    role:{
        type:String,
        enum:["admin","user","vendor"],
        default:"user"
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    avatar:{
        type:Schema.Types.ObjectId,
        ref:"Image"
    },
    otp:{
        type:String,
        select:false
    },
    otp_expiry:{
        type:Date,
        select:false
    },
    status:{
        type:String,
        enum:["active","blocked"],
        default:"active"
    }
},{
    timestamps:true
})

userSchema.pre("save", async function(next) {
    if (!this.isModified("password") || !this.password) {
        return next();
    }
    
    try {
        const salt = await bycript.genSalt(16);
        this.password = await bycript.hash(this.password as string, salt) as string;
        next();
    } catch (error:any) {
        next(error);
    }
});

const User = model<IUser>("User",userSchema)

export default User