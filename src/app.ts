import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task Manager Backend is running with TypeScript");
});

app.use("/api/tasks", taskRoutes);

export default app;