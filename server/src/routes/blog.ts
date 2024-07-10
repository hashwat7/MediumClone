import { Router, Request, Response } from "express";
const router = Router();
import { PrismaClient } from "@prisma/client";
import { z, ZodError } from "zod";

const prisma = new PrismaClient();

export const createPostInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const updatePostInput = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});
// to get all the blogs
router.get("/bulk", async (req: Request, res: Response) => {
  console.log("this was called");
  try {
    const posts = await prisma.post.findMany(); // Fetch all posts
    console.log(posts);
    return res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error });
  }
});

//to get author name
router.get("/author_name/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);
  try {
    const author = await prisma.user.findFirst({ where: { id: id } });
    res.status(200).json({ name: author?.name });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

//to get a specific blog
router.get("/:id", async (req: Request, res: Response) => {
  console.log("specific");
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    if (post) {
      return res.json(post);
    } else {
      return res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({ error: "Error fetching post" });
  }
});

//to post a blog
router.post("/", async (req: Request, res: Response) => {
  console.log("this was called post");

  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({ error: "Invalid user" });
  }
  const body = req.body;
  const { success } = createPostInput.safeParse(body);
  if (!success) {
    return res.status(400).json({ error: "invalid input" });
  }
  const { title, content } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });

    return res.json({ id: post.id });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ error: "Error creating post" });
  }
});

// to update a blog
router.put("/", async (req: Request, res: Response) => {
  console.log("this was called put");

  const userId = req.userId; // Assuming userId is in headers
  const { id, title, content } = req.body;

  if (!userId) {
    return res.status(400).send("Invalid user");
  }

  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: id,
        authorId: userId,
      },
      data: {
        title: title,
        content: content,
      },
    });

    if (updatedPost) {
      return res.send("Updated post");
    } else {
      return res.status(404).send("Post not found");
    }
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ error: "Error updating post" });
  }
});

// to delete a blog
router.get("/delete", async (req: Request, res: Response) => {
  const { id } = req.body;
  const userId = req.userId;
  if (!userId) {
    return res.status(400).send("Invalid user");
  }

  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: id,
        authorId: userId,
      },
    });
    if (deletedPost) {
      return res.send("Deleted post");
    } else {
      return res.status(404).send("Post not found");
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ error: "Error deleting post" });
  }
});

export default router;
