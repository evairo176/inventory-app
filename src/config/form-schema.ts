import { z } from "zod";

const createCategorySchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  slug: z.string().optional(),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
  imageUrl: z.string().optional(),
});

export { createCategorySchema };
