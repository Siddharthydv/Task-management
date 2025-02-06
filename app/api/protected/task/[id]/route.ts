import { NextResponse } from "next/server";
import { db } from "@/src/db/index"; // Your database instance
import { tasks } from "@/src/db/schema"; // Your tasks schema
import { Task } from "../taskTypes";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    console.log("entered");
    const { id } = params;
    console.log("id", id);

    const task = await db.select().from(tasks).where(eq(tasks.id, id));

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    console.log("entereed", id);
    const { title, priority, taskstatus, due_date, category_id } =
      await req.json();
    console.log("title", title);

    const updatedTask = await db
      .update(tasks)
      .set({ title, priority, taskstatus, due_date: new Date(due_date) })
      .where(eq(tasks.id, id));

    if (updatedTask.count === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task updated successfully" });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const deletedTask = await db.delete(tasks).where(eq(tasks.id, id));

    if (deletedTask.count === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
