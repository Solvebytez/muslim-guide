import { getEnv } from "../utils/get-env";


export const appConfig = ()=>(
    {
        PORT: getEnv("PORT", "5000"),
        MONGO_URI: getEnv("MONGO_URI", ""),
        APP_ORIGIN: getEnv("APP_ORIGIN","localhost"),
        NODE_ENV: getEnv("NODE_ENV","development"),
        BASE_PATH: getEnv("BASE_PATH","/api"),       
        // JWT
        JWT_ACCESS_SECRET: getEnv("JWT_ACCESS_SECRET",""),
        JWT_ACCESS_EXPIRES_IN: getEnv("JWT_ACCESS_EXPIRES_IN","1d"),
        JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET",""),
        JWT_REFRESH_EXPIRES_IN: getEnv("JWT_REFRESH_EXPIRES_IN","7d"),
        //CAPTAIN JWT
        JWT_CAPTAIN_ACCESS_SECRET: getEnv("JWT_CAPTAIN_ACCESS_SECRET",""),
        JWT_CAPTAIN_ACCESS_EXPIRES_IN: getEnv("JWT_CAPTAIN_ACCESS_EXPIRES_IN","1d"),
        JWT_CAPTAIN_REFRESH_SECRET: getEnv("JWT_CAPTAIN_REFRESH_SECRET",""),
        JWT_CAPTAIN_REFRESH_EXPIRES_IN: getEnv("JWT_CAPTAIN_REFRESH_EXPIRES_IN","7d"),

        //APP_API_TOKEN
        APP_API_TOKEN: getEnv("APP_API_TOKEN",""),
        ADMIN_API_TOKEN: getEnv("ADMIN_API_TOKEN",""),
       
        CLOUDINERY_NAME: getEnv("CLOUDINERY_NAME",""),
        CLOUDINARY_API_KEY: getEnv("CLOUDINERY_API_KEY",""),
        CLOUDINARY_API_SECRET: getEnv("CLOUDINERY_API_SECRET",""),       
    }
)

export const config = appConfig();
