import { Request, Response } from "express";
import db from "../config/db";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const [tasks] = await db.query("SELECT * FROM tasks ORDER BY id DESC");

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.log("GET TASKS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body;

    const [result] = await db.query(
      "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
      [title, description, status]
    );

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: result,
    });
  } catch (error) {
    console.log("CREATE TASK ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const [result] = await db.query(
      `
      UPDATE tasks
      SET title = ?, description = ?, status = ?
      WHERE id = ?
      `,
      [title, description, status, id]
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: result,
    });
  } catch (error) {
    console.log("UPDATE TASK ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
};
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM tasks WHERE id = ?",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: result,
    });
  } catch (error) {
    console.log("DELETE TASK ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
};

