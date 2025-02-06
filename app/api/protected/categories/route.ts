import { categories } from "@/src/db/schema";
import { db } from "@/src/db";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { nextauth } from "../../auth/[...nextauth]/route";
export async function GET() {
  const session = await getServerSession(nextauth);
  try {
    // Fetch all categories
    //@ts-ignore
    const user_id = session?.user?.id;
    // const user_id="4edc4d62-ef89-4491-95c8-3048dd5bfa93"
    if(!user_id)
      return;
    const allCategories = await db
      .select()
      .from(categories)
      .where(eq(categories.user_id, user_id));

    return new Response(JSON.stringify(allCategories), { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return new Response(
        JSON.stringify({
          message: "Error fetching categories",
          error: error.message,
        }),
        { status: 500 },
      );
  }
}

export async function POST() {
  const session = await getServerSession(nextauth);
  try {
    // Assuming category name comes in the body
    const user_id = session?.user?.id;
    const name = session?.user?.name;
    if(!user_id ||  !name)
      return;
    // Insert new category into database
    const newCategory = await db
      .insert(categories)
      .values({ user_id, name })
      .returning();

    return new Response(JSON.stringify(newCategory), { status: 201 });
  } catch (error) {
    if (error instanceof Error)
      return new Response(
        JSON.stringify({
          message: "Error creating category",
          error: error.message,
        }),
        { status: 500 },
      );
  }
}
