import NextAuth from "next-auth";
import { nextauth } from "./authOptions";

const handler = NextAuth(nextauth);

export { handler as GET, handler as POST };
