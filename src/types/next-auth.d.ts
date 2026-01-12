import 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth'{
    interface User {
        _id?:string,
        isVerified?:boolean,
    }
    interface Session {
      user:{
        _id?:string,
        isVerified?:boolean,
      } & DefaultSession['user']     // it will provide a key in default session so that it doesn't throw error 
    }
}
// we cal also write like this :- 
declare module 'next-auth/jwt'{
    interface JWT{
        _id?:string,
        isVerified?:boolean
    }
}