import { config } from "dotenv";
import {defineConfig} from "drizzle-kit"

config({path:'./env'})
export default defineConfig({
    schema:'./drizzle/schema.ts',   
    out: './drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials:{
        url:process.env.DATABASE_URL_POSTGRES!
    } 
})
// schema defines where the schema is coming from.
// out defines where we spit out the getMigrations.
// dialect can be said as which type of db we are using.

