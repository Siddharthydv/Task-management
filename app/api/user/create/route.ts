import { users } from "@/src/db/schema";
import { db } from "@/src/db/index";
import { eq } from "drizzle-orm";
import { newUserType } from "./userTypes";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  // Simple validation
  if (!name || !email || !password) {
    return new Response(
      JSON.stringify({ message: "All fields are required" }),
      {
        status: 400,
      },
    );
  }

  // Check if user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
  if (existingUser.length > 0) {
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 409,
    });
  }

  // Hash the password
  // const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the new user into the database
  try {
    const newUser: newUserType[] = await db
      .insert(users)
      .values({
        name,
        email,
        password: password,
      })
      .returning();
    console.log("sss", newUser);
    // Respond with success
    return new Response(
      JSON.stringify({
        message: "User created successfully",
        user: {
          id: newUser[0].id, // Assuming `newUser` returns the inserted user object
          name: newUser[0].name,
          email: newUser[0].email,
        },
      }),
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
