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
        if (!user.emailVerified) {
          throw new Error("This user mus validate his email");
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

    async signIn({ account, profile }) {
        if (account?.provider === "google") return true;

        if (!profile || !profile.email) return false;

        const user = await getUserByEmail(profile.email)

        if (!user || !user?.emailVerified) {
            return false;
        }

        return true; 
    },

    async session({session, token}) {
        return session;
    },

    async jwt({ token }) {
      const user = await getUserByEmail(token.email!);
      token.emailVerified = user?.emailVerified
      return token;
    },
  },
};

export default NextAuth(nextAuthConfig);
