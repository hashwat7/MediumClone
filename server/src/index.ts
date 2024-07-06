import express from "express";
import signupRoute from "./routes/signup";
import signinRoute from "./routes/signin";
import blogRoute from "./routes/blog";
import dotenv from "dotenv";
import { userMiddleware } from "./middlewares/auth";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/v1/signup", signupRoute);
app.use("/api/v1/signin", signinRoute);
app.use("/api/v1/blog", userMiddleware, blogRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
