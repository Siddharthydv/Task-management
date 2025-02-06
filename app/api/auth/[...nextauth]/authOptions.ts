import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
// import { AdapterUser } from "next-auth/adapters";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt"; // ✅ Fix: Import JWT type
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { eq, and } from "drizzle-orm";

export const nextauth:NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "email", type: "text", placeholder: "" },
          password: { label: "password", type: "password", placeholder: "" },
        },
        async authorize(credentials: Record<"email" | "password", string> | undefined) {
          if (!credentials) return null;
  
          const user = await db
            .select()
            .from(users)
            .where(and(eq(users.email, credentials.email), eq(users.password, credentials.password)))
            .limit(1);
  
          if (user.length === 0) {
            return null;
          }
  
          return {
            id: user[0].id,
            email: user[0].email,
            name: user[0].name,
          };
        },
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
  
    callbacks: {
      // async signIn({ user, account }: { user: AdapterUser; account: Account | null }) {
      //   if (account?.provider === "github") {
      //     if (!user.email || !user.name) {
      //       console.error("User email or name is missing");
      //       return false;
      //     }
  
      //     const existingUser = await db
      //       .select()
      //       .from(users)
      //       .where(eq(users.email, user.email))
      //       .limit(1);
  
      //     if (existingUser.length === 0) {
      //       const newUser = await db
      //         .insert(users)
      //         .values({
      //           email: user.email,
      //           name: user.name,
      //           password: "",
      //           github_id: user.id ?? "",
      //         })
      //         .returning();
  
      //       user.id = newUser[0].id;
      //     } else {
      //       user.id = existingUser[0].id;
      //     }
      //   }
  
      //   return true;
      // },
  
      async session({ session, token }: { session: Session; token: JWT }) {
        if (session.user) {
         
  
          session.user.id= token.sub!;
        }
        return session;
      },
  
      // async jwt({ token, user }: { token: JWT; user?: AdapterUser }) {
      //   if (user) {
      //     token.sub = user.id;
      //   }
      //   return token;
      // },
    },
  };
  