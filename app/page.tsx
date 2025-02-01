
import Image from "next/image";
import { getServerSession } from "next-auth";
import { nextauth } from "./api/auth/[...nextauth]/route";
export default async function Home() {
  const session=await getServerSession(nextauth)
  return <>
  {JSON.stringify(session)};
  </>
}