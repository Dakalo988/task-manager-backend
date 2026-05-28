"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const db_1 = __importDefault(require("../config/db"));
const getTasks = async (req, res) => {
    try {
        const [tasks] = await db_1.default.query("SELECT * FROM tasks ORDER BY id DESC");
        res.status(200).json({
            success: true,
            data: tasks,
        });
    }
    catch (error) {
        console.log("GET TASKS ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch tasks",
        });
    }
};
exports.getTasks = getTasks;
const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const [result] = await db_1.default.query("INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)", [title, description, status]);
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: result,
        });
    }
    catch (error) {
        console.log("CREATE TASK ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create task",
        });
    }
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const [result] = await db_1.default.query(`
      UPDATE tasks
      SET title = ?, description = ?, status = ?
      WHERE id = ?
      `, [title, description, status, id]);
        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: result,
        });
    }
    catch (error) {
        console.log("UPDATE TASK ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update task",
        });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db_1.default.query("DELETE FROM tasks WHERE id = ?", [id]);
        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            data: result,
        });
    }
    catch (error) {
        console.log("DELETE TASK ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete task",
        });
    }
};
exports.deleteTask = deleteTask;
