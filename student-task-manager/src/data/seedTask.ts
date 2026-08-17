import type { Task } from "../types/task";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);
const nextMonth = new Date(today);
nextMonth.setDate(nextMonth.getDate() + 30);

export const seedTasks: Task[] = [
	{
		id: "1",
		title: "Complete Math Homework",
		description: "Solve chapters 5-7 problems and submit online",
		category: "Assignment",
		priority: "High",
		status: "Todo",
		dueDate: tomorrow.toISOString(),
		createdAt: new Date().toISOString(),
	},
	{
		id: "2",
		title: "Study for History Exam",
		description: "Review chapters 1-4, focus on World War II",
		category: "Exam",
		priority: "High",
		status: "In Progress",
		dueDate: nextWeek.toISOString(),
		createdAt: new Date().toISOString(),
	},
];
