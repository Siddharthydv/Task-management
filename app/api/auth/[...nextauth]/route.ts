import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from "next-auth/providers/github";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { eq,and } from "drizzle-orm";
export const nextauth={
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: 'email', type: 'text', placeholder: '' },
            password: { label: 'password', type: 'password', placeholder: '' },
          },
          async authorize(credentials: any) {
            console.log(credentials.user)
            const user = await db.select().from(users).where(and(eq(users.email, credentials.email), eq(users.password, credentials.password))).limit(1);
            //returning null if user does not exists
            if(user.length==0)
                {
                    console.log("null")
                    return null;
                }
            //returning the user details if user exists
            return {
                id: user[0].id,
                email: user[0].email,
                name: user[0].name,  // Add other fields as needed
              };
          },
        }),
        GitHubProvider({
            clientId:process.env.GITHUB_CLIENT_ID ||" ",
            clientSecret:process.env.GITHUB_CLIENT_SECRET || " "
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        //adding id into session so that it can be used by backend server for getting user related info
        session: ({ session, token, user }: any) => {
            if (session.user) {
                session.user.id = token.sub
            }
            return session
        }
  }
  }
const handler = NextAuth(nextauth);

export { handler as GET, handler as POST }


