import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  username: z.string().min(3),
  password: z.string().min(6),
  isAdmin: z.boolean().default(false),
  email: z.string().email()
});

export const reportSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum(["crime", "accident", "lost_property"]),
  title: z.string(),
  description: z.string(),
  location: z.string(),
  date: z.string(),
  status: z.enum(["submitted", "in_review", "investigating", "resolved", "closed"]),
  attachments: z.array(z.string()),
  createdAt: z.string()
});

export const reportSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum(["crime", "accident", "lost_property"]),
  title: z.string(),
  description: z.string(),
  location: z.string(),
  date: z.string(),
  status: z.enum(["submitted", "in_review", "investigating", "resolved", "closed"]),
  attachments: z.array(z.string()),
  createdAt: z.string()
});
