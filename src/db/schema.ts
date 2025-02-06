import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Users Table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  github_id: text("github_id"),
});

// Projects Table
export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id), // Each project belongs to a user
  created_at: timestamp("created_at").defaultNow(),
});

// Categories Table
export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id), // Categories are user-specific
  created_at: timestamp("created_at").defaultNow(),
});

// Tasks Table
export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  taskstatus: text("taskstatus").default("todo"), // "todo", "in-progress", "done"
  priority: text("priority").default("medium"), // "low", "medium", "high"
  due_date: timestamp("due_date"), // Optional due date
  project_id: uuid("project_id").references(() => projects.id), // Task belongs to a project
  category_id: uuid("category_id").references(() => categories.id), // Task can be categorized
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id), // Task belongs to a user
  created_at: timestamp("created_at").defaultNow(),
});
