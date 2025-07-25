import dotEnv from "dotenv"
dotEnv.config()
export const getEnv=(key:string,defaultValue:string)=>{
    const value = process.env[key]
    if(value === undefined){
        if(defaultValue){
            return defaultValue
        }else{
            throw new Error(`Environment variable ${key} is not set`)}
    }
    return value

}