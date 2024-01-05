import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/prisma/db"
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from 'bcrypt'

/**
 * TODO auth with google provider
 * TODO email validation
 * TODO password forgetten
 */


export const nextAuthConfig: NextAuthOptions = {
    pages : {
        signIn : '/signin'
    },
    debug : true,
    adapter : PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "email", placeholder: "exemple@gmail.com" },
            password: { label: "Password", type: "password", placeholder : "your password" }
          },
          async authorize(credentials) {
            console.log('i am in')
            try {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }
                const { email } = credentials
                console.log(email, credentials.password);
                console.log(email);
                const user = await prisma.user.findUnique({where : {email}});
                if (!user) {
                    return null;
                }
                const passwordMach = await bcrypt.compare(credentials.password, user.password!);
                if (!passwordMach) {
                    return null
                }
                console.log(user, 'user');
                const {password, ...userWithoutPassword} = user
                return userWithoutPassword
            } catch (error) {
                // console.log(error);
            }   
            return null
          }
        }),
        GoogleProvider({ 
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            profile(profile) {
                const role = profile.email === process.env.ADMIN_EMAIL ? 'ADMIN' : 'USER'
                return {
                    id: profile.sub,
                    email: profile.email,
                    role
                }
            },
        })
      ],
      secret: process.env.NEXTAUTH_SECRET,
      session: {
          strategy: "jwt",
      },
}

export default NextAuth(nextAuthConfig);