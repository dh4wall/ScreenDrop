import { db } from "@/drizzle/db";
import { betterAuth, Schema } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {schema} from "@/drizzle/schema"
import { nextCookies } from "better-auth/next-js";
export const auth=betterAuth({
     database:drizzleAdapter(db,{
          provider:'pg',
          schema:schema,
     }),
     socialProviders:{
          google:{
               clientId:process.env.GOOGLE_CLIENT_ID!,
               clientSecret:process.env.GOOGLE_CLIENT_SECRET!
          }
     },
     pluggins:[nextCookies()],
     baseUrl:process.env.NEXT_PUBLIC_BASE_URL!,
})




//here ! is for type assertion it tells typescript that im definitely sure its not nulkl and bro chill