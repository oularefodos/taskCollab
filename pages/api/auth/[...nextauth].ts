import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/db";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { getUserByEmail } from "@/helpers/shard";

export const nextAuthConfig: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "exemple@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const { email } = credentials;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          throw new Error("Incorrect password or email");
        }
        if (!user.password) {
          throw new Error(
            "This is related to google account that already exists"
          );
        }
        const passwordMach = await bcrypt.compare(
          credentials.password,
          user.password!
        );
        if (!passwordMach) {
          throw new Error("Incorrect password or email");
        }
        console.log(user, "user");
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {

    async session({session, token, user}) {
        return {
          ...session,
          user : {
            ...session.user,
            id : token.id,
            emailVerified : token.emailVerified
          }
        }
    },

    async jwt({ token }) {
      const user = await getUserByEmail(token.email!);
      if (user) {
        const emailVerified = !user.password ? true : user.emailVerified;
        const { id } = user
        return {
          ...token,
          emailVerified,
          id
        }
      }
      return token;
    },
  },
};

export default NextAuth(nextAuthConfig);
