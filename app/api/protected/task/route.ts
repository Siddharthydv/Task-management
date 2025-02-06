import { NextResponse } from "next/server";
import { db } from "@/src/db/index"; // Your database instance
import { tasks } from "@/src/db/schema"; // Your tasks schema
import { Task } from "./taskTypes";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { nextauth } from "../../auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    // const { categoryId, status, page = 1, pageSize = 10 } = new URL(req.url).searchParams;

    // let query = db.select().from(tasks).limit(pageSize).offset((page - 1) * pageSize);

    // if (categoryId) {
    //   query = query.where(tasks.categoryId.eq(categoryId));
    // }

    // if (status) {
    //   query = query.where(tasks.status.eq(status));
    // }
    const session = await getServerSession(nextauth); //implement getting user_id from jwt token
    const user_id = session.user.id;

    const taskList = await db
      .select()
      .from(tasks)
      .where(eq(tasks.user_id, user_id));

    return NextResponse.json(taskList);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(nextauth);
  try {
    const user_id = session.user.id;
    const {
      title,
      priority,
      due_date,
      category_id,
      taskstatus,
      project_id,
    }: Task = await req.json();

    if (!title || !priority || !due_date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newTask = await db
      .insert(tasks)
      .values({
        title: title,
        taskstatus: taskstatus,
        priority: priority,
        due_date: new Date(due_date),
        project_id: project_id,
        // category_id:category_id,
        user_id: user_id,
      })
      .returning();

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
