import { db } from "@/src/db";
import { projects } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { nextauth } from "../../auth/[...nextauth]/authOptions";
export async function GET() {
  const session = await getServerSession(nextauth) 
  try {
    // Fetch all projects
    
    const user_id = session?.user?.id;
    if(!user_id)
      return;
    const allProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.user_id, user_id));
    console.log(allProjects);
    if (!allProjects[0])
      return new Response(
        JSON.stringify({ error: "no projects found for the user " }),
        { status: 404 },
      );
    return new Response(JSON.stringify(allProjects), { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return new Response(
        JSON.stringify({
          message: "Error fetching projects",
          error: error.message,
        }),
        { status: 500 },
      );
  }
}
export async function POST(req: Request) {
  const session = await getServerSession(nextauth);
  try {
    const user_id = session.user.id;
    const { name } = await req.json();
    console.log("namssssssssssse", name);
    //  return new Response('hello')
    // Insert new project into database
    const newProject = await db
      .insert(projects)
      .values({
        name,
        user_id,
      })
      .returning();

    return new Response(JSON.stringify(newProject), { status: 201 });
  } catch (error) {
    if (error instanceof Error)
      return new Response(
        JSON.stringify({
          message: "Error creating project",
          error: error.message,
        }),
        { status: 500 },
      );
  }
}
